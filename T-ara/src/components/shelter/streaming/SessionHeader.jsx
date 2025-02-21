import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import { toast } from "react-toastify";

const SessionHeader = ({ hostName, streamId, leaveSession, switchCamera, session }) => {
  const navigate = useNavigate();

  const handleEndStream = async () => {
    try {
      // 방송 종료 API 호출
      const response = await api.put(`/stream/end/${streamId}`);
      console.log("방송 종료 성공, 상태:", response.data);
      toast.success("방송이 종료되었습니다.");
      
      // 호스트 세션에서 'stream-ended' 시그널 전송 (시청자에게 방송 종료를 알림)
      if (session) {
        await session.signal({
          data: 'stream-ended',
          type: 'stream-ended'
        });
      }
      
      // 약간의 지연 후 세션 종료 및 홈으로 이동
      setTimeout(() => {
        leaveSession();
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("방송 종료 에러:", err);
      toast.error("방송 종료 중 오류가 발생했습니다.");
    }
  };

  return (
    <div id="session-header" className="flex items-center justify-between">
      <h1 id="session-title" className="text-black text-xl">{hostName}</h1>
      <div className="flex gap-3">
        <button
          onClick={handleEndStream}
          className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
        >
          방송 끄기
        </button>
        <button
          onClick={switchCamera}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          카메라 전환
        </button>
      </div>
    </div>
  );
};

export default SessionHeader;
