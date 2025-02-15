// src/components/streaming/UserVideoComponent.jsx
import React, { forwardRef } from "react";
import OpenViduVideoComponent from "./OpenViduVideoComponent";

const UserVideoComponent = forwardRef(({ streamManager, className, fallbackName }, ref) => {
  const getNicknameTag = () => {
    const data = streamManager?.stream?.connection?.data;
    console.log("connection.data:", data, typeof data);
    if (!data && fallbackName) return fallbackName; // fallback: 직접 전달한 이름 사용

    let parsed;
    if (typeof data === "string") {
      try {
        parsed = JSON.parse(data.trim());
      } catch (error) {
        console.error("Error parsing connection.data:", error);
        return data; // 파싱 실패하면 원본 반환
      }
    } else if (typeof data === "object") {
      parsed = data;
    }

    console.log("Parsed data:", parsed);
    let nickname = "Unknown";
    if (parsed && typeof parsed.clientData === "string") {
      try {
        // 두 번째 파싱: 만약 clientData가 이중으로 인코딩되었을 경우
        const innerParsed = JSON.parse(parsed.clientData);
        nickname = innerParsed.clientData || "Unknown";
      } catch (error) {
        console.error("Error parsing inner clientData:", error);
        nickname = parsed.clientData;
      }
    } else if (parsed && typeof parsed.clientData === "object") {
      nickname = parsed.clientData || "Unknown";
    }
    return nickname;
  };

  return (
    <div className={`relative bg-black ${className}`}>
      {streamManager ? (
        <div className="relative w-full h-full">
          {/* ref 전달 */}
          <OpenViduVideoComponent ref={ref} streamManager={streamManager} />
        </div>
      ) : null}
    </div>
  );
});

export default UserVideoComponent;
