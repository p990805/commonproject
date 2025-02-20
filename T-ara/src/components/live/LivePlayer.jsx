import { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import api from "../../api";
import ChatWindow from "../shelter/streaming/ChatWindow";
import { jwtDecode } from "jwt-decode";

const LivePlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { streamId } = useParams();

  const token = localStorage.getItem("authToken");
  const myName = jwtDecode(token).name;
  const state = location.state || {};
  const sessionId = state.sessionId;
  const hostName = state.hostName || "";
  const description = state.description || ""; // 추가된 부분
  const myUserName = myName || "Viewer";

  const [connectionStatus, setConnectionStatus] = useState("연결 안됨");
  const [ovSession, setOvSession] = useState(null);
  const [subscriber, setSubscriber] = useState(null);
  const [viewerToken, setViewerToken] = useState(null);
  const [streamEnded, setStreamEnded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!sessionId) {
      alert("라이브 스트림 정보가 없습니다.");
      navigate("/");
      return;
    }
    const fetchViewerToken = async () => {
      try {
        const response = await api.get(
          `/stream/viewerToken?sessionId=${sessionId}`
        );
        setViewerToken(response.data.token);
      } catch (error) {
        console.error("Viewer token fetch error:", error);
        alert("유효한 토큰을 가져오지 못했습니다.");
        navigate("/");
      }
    };
    fetchViewerToken();
  }, [sessionId, navigate]);

  useEffect(() => {
    if (!viewerToken) return;
    const OV = new OpenVidu();
    const session = OV.initSession();
    setOvSession(session);

    session.on("streamCreated", (event) => {
      console.log("[LivePlayer] Stream created event:", event);
      const sub = session.subscribe(event.stream, undefined);
      setSubscriber(sub);
      // 스트림이 재생되면 방송 종료 상태 초기화
      setStreamEnded(false);
    });

    session.on("streamDestroyed", (event) => {
      console.log("[LivePlayer] Stream destroyed event:", event);
      setSubscriber(null);
      // 스트림이 종료되면 방송 종료 메시지 표시
      setStreamEnded(true);
    });

    // 추가: connectionDestroyed 이벤트 (필요한 경우)
    session.on("connectionDestroyed", (event) => {
      console.log("[LivePlayer] Connection destroyed event:", event);
      // 모든 연결이 끊겼을 경우 종료 처리
      setStreamEnded(true);
    });

    session.on("exception", (exception) => console.warn(exception));

    session
      .connect(viewerToken, { clientData: myUserName })
      .then(() => {
        setConnectionStatus("연결됨");
        console.log("[LivePlayer] Session connected");
      })
      .catch((error) => {
        console.error("세션 연결 오류:", error);
        setConnectionStatus("에러 발생");
      });

    return () => {
      if (session) session.disconnect();
    };
  }, [viewerToken, myUserName, navigate]);

  useEffect(() => {
    if (subscriber && videoRef.current) {
      subscriber.addVideoElement(videoRef.current);
      console.log("[LivePlayer] Video element attached");
    }
  }, [subscriber]);

  return (
    <div className="flex flex-col bg-gray-100 gap-3">
      <div className="max-w-[1380px] w-full mx-auto mt-4 px-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 bg-black relative flex justify-center items-center h-[500px]">
          {streamEnded ? (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-75">
              <h2 className="text-white text-3xl font-bold">
                방송이 종료되었습니다.
              </h2>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              className="w-full h-full object-cover"
            />
          )}
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

      <div className="max-w-[1380px] mx-auto w-full px-4 py-4 ">
        <div className="bg-white p-3 rounded-md shadow-md flex justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">{hostName}</h3>
            <p className="text-gray-700 leading-relaxed mb-4">{description}</p>
          </div>

          <div className="flex items-center p-2">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="px-3 py-2 bg-blue-500 rounded text-white cursor-pointer hover:bg-blue-400"
            >
              뒤로가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePlayer;
