// src/components/live/LivePlayer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';
import api from '../../api';
import ChatWindow from '../shelter/streaming/ChatWindow';

const LivePlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { streamId } = useParams();

  // location.state가 없으면 빈 객체로 처리하고, hostName에 기본값을 강제로 지정
  const state = location.state || {};
  const { sessionId, myUserName } = state;
  const hostName = state.hostName || "Host"; // hostName이 없거나 falsy하면 "Host"로 설정

  const [connectionStatus, setConnectionStatus] = useState('연결 안됨');
  const [ovSession, setOvSession] = useState(null);
  const [subscriber, setSubscriber] = useState(null);
  const [viewerToken, setViewerToken] = useState(null);
  const videoRef = useRef(null);

  // 디버깅: 전달받은 location.state 출력
  console.log("[LivePlayer] location.state:", state);
  console.log("[LivePlayer] hostName:", hostName);

  // sessionId가 없으면 에러 처리
  useEffect(() => {
    if (!sessionId) {
      alert('라이브 스트림 정보가 없습니다.');
      navigate('/');
      return;
    }
    // 백엔드에서 sessionId를 기반으로 뷰어용 토큰을 받아옵니다.
    const fetchViewerToken = async () => {
      try {
        const response = await api.get(`/stream/viewerToken?sessionId=${sessionId}`);
        setViewerToken(response.data.token);
        console.log("[LivePlayer] Viewer token received:", response.data.token);
      } catch (error) {
        console.error('Viewer token fetch error:', error);
        alert('유효한 토큰을 가져오지 못했습니다.');
        navigate('/');
      }
    };
    fetchViewerToken();
  }, [sessionId, navigate]);

  // 뷰어 토큰이 준비되면 OpenVidu 세션에 연결
  useEffect(() => {
    if (!viewerToken) return;
    const OV = new OpenVidu();
    const session = OV.initSession();
    setOvSession(session);

    session.on('streamCreated', (event) => {
      console.log("[LivePlayer] Stream created event:", event);
      const sub = session.subscribe(event.stream, undefined);
      setSubscriber(sub);
    });

    session.on('streamDestroyed', () => {
      console.log("[LivePlayer] Stream destroyed");
      setSubscriber(null);
    });
    session.on('exception', (exception) => console.warn(exception));

    session
      .connect(viewerToken, { clientData: myUserName })
      .then(() => {
        setConnectionStatus('연결됨');
        console.log("[LivePlayer] Session connected");
      })
      .catch((error) => {
        console.error('세션 연결 오류:', error);
        setConnectionStatus('에러 발생');
      });

    return () => {
      if (session) session.disconnect();
    };
  }, [viewerToken, myUserName, navigate]);

  // 구독한 스트림을 video 태그에 연결
  useEffect(() => {
    if (subscriber && videoRef.current) {
      subscriber.addVideoElement(videoRef.current);
      console.log("[LivePlayer] Video element attached");
    }
  }, [subscriber]);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">라이브 방송 {streamId}</h1>
      <div className="mb-2">
        <p><strong>세션 ID:</strong> {sessionId}</p>
        <p><strong>뷰어 토큰:</strong> {viewerToken}</p>
        <p><strong>연결 상태:</strong> {connectionStatus}</p>
        <p><strong>호스트 이름:</strong> {hostName}</p>
      </div>
      <div className="flex mt-4 space-x-4">
        {/* 비디오 영역 */}
        <div className="flex-1 border p-4 bg-black">
          <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
        </div>
        {/* 채팅창 영역 */}
        <div className="w-1/3 border p-4 bg-white min-h-[500px] overflow-y-auto">
          {ovSession ? (
            <ChatWindow session={ovSession} myUserName={myUserName} hostName={hostName} />
          ) : (
            <p>채팅을 불러오는 중...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LivePlayer;
