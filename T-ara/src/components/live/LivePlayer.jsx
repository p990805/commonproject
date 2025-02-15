
import { useState, useEffect, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';
import api from '../../api';
import ChatWindow from '../shelter/streaming/ChatWindow';
import { jwtDecode } from 'jwt-decode';

const LivePlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { streamId } = useParams();

  const token =localStorage.getItem("authToken");
  const myName = jwtDecode(token).name;
  console.log( "내이름은 뭘까? "+myName);

  const state = location.state || {};
  const sessionId = state.sessionId;
  const myUserName = myName || 'Viewer';
  const hostName = state.hostName ? state.hostName : '';

  console.log('[LivePlayer] location.state:', state);
  console.log('[LivePlayer] myUserName:', myUserName, 'hostName:', hostName);

  const [connectionStatus, setConnectionStatus] = useState('연결 안됨');
  const [ovSession, setOvSession] = useState(null);
  const [subscriber, setSubscriber] = useState(null);
  const [viewerToken, setViewerToken] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!sessionId) {
      alert('라이브 스트림 정보가 없습니다.');
      navigate('/');
      return;
    }
    const fetchViewerToken = async () => {
      try {
        const response = await api.get(`/stream/viewerToken?sessionId=${sessionId}`);
        setViewerToken(response.data.token);
        console.log('[LivePlayer] Viewer token received:', response.data.token);
      } catch (error) {
        console.error('Viewer token fetch error:', error);
        alert('유효한 토큰을 가져오지 못했습니다.');
        navigate('/');
      }
    };
    fetchViewerToken();
  }, [sessionId, navigate]);

  useEffect(() => {
    if (!viewerToken) return;
    const OV = new OpenVidu();
    const session = OV.initSession();
    setOvSession(session);

    session.on('streamCreated', (event) => {
      console.log('[LivePlayer] Stream created event:', event);
      const sub = session.subscribe(event.stream, undefined);
      setSubscriber(sub);
    });

    session.on('streamDestroyed', () => {
      console.log('[LivePlayer] Stream destroyed');
      setSubscriber(null);
    });
    session.on('exception', (exception) => console.warn(exception));

    session
      .connect(viewerToken, { clientData: myUserName })
      .then(() => {
        setConnectionStatus('연결됨');
        console.log('[LivePlayer] Session connected');
      })
      .catch((error) => {
        console.error('세션 연결 오류:', error);
        setConnectionStatus('에러 발생');
      });

    return () => {
      if (session) session.disconnect();
    };
  }, [viewerToken, myUserName, navigate]);

  useEffect(() => {
    if (subscriber && videoRef.current) {
      subscriber.addVideoElement(videoRef.current);
      console.log('[LivePlayer] Video element attached');
    }
  }, [subscriber]);

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="max-w-[1380px] w-full mx-auto mt-4 px-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 bg-black relative flex justify-center items-center h-[500px]">
          <video
            ref={videoRef}
            autoPlay
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-[400px] bg-white border border-gray-300 rounded-lg p-4 flex flex-col h-[500px] overflow-y-auto">
          {ovSession ? (
            <ChatWindow
              session={ovSession}
              myUserName={myUserName}
              hostName={hostName}
            />
          ) : (
            <p>채팅을 불러오는 중...</p>
          )}
        </div>
      </div>

      <div className="max-w-[1380px] mx-auto w-full px-4 py-4">
        <h3 className="text-lg font-semibold mb-2">{hostName}</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          여기에는 방송 설명, 진행 내용, 관련 링크 등이 들어갑니다.
        </p>
      </div>
    </div>
  );
};

export default LivePlayer;
