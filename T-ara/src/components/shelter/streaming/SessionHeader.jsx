// src/components/streaming/SessionHeader.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import { toast } from "react-toastify";

const SessionHeader = ({ hostName, streamId, leaveSession, switchCamera }) => {
  const navigate = useNavigate();

  const handleEndStream = () => {
    // 방송 종료 API 호출
    api.put(`/stream/end/${streamId}`)
      .then((response) => {
        console.log("방송 종료 성공, 상태:", response.data);
        toast.success("방송이 종료되었습니다.");
        navigate("/");
      })
      .catch((err) => {
        console.error("방송 종료 에러:", err);
        toast.error("방송 종료 중 오류가 발생했습니다.");
      });
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
