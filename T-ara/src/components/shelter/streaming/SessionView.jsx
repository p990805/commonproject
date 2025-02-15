// src/components/streaming/SessionView.jsx
import React, { useRef, useState, useEffect } from "react";
import UserVideoComponent from "./UserVideoComponent";
import SessionHeader from "./SessionHeader";
import ChatWindow from "./ChatWindow";
import api from "../../../api"; // axios 대신 api 모듈 사용

const SessionView = ({
  session,
  mySessionId,
  streamId,
  myUserName,
  hostName,
  title,
  description,
  mainStreamManager,
  leaveSession,
  switchCamera,
  autoCapture = true, // 자동 캡처 활성화 여부
}) => {
  // OpenViduVideoComponent을 래핑한 UserVideoComponent에 전달할 ref
  const videoComponentRef = useRef(null);
  const [thumbnailData, setThumbnailData] = useState(null);

  // 자동 캡처: autoCapture가 true이면 5초마다 캡처하여 S3 업로드 API를 호출합니다.
  useEffect(() => {
    let intervalId;
    if (autoCapture) {
      intervalId = setInterval(() => {
        if (videoComponentRef.current && videoComponentRef.current.captureFrame) {
          const dataUrl = videoComponentRef.current.captureFrame();
          console.log("자동 캡쳐된 데이터 URL:", dataUrl);
          if (dataUrl) {
            setThumbnailData(dataUrl);
            // S3 업로드: 방송 중이면 같은 streamId로 덮어쓰게 됩니다.
            console.log("API 호출 시작: /stream/thumbnail?streamId=", streamId);
            api
              .post(`/stream/thumbnail?streamId=${streamId}`, { image: dataUrl })
              .then((res) => {
                console.log("Thumbnail uploaded to S3:", res);
              })
              .catch((err) => {
                console.error("Error uploading thumbnail to S3:", err.response || err);
              });
          }
        }
      }, 5000);
    }
    return () => clearInterval(intervalId);
  }, [autoCapture, streamId]);

  return (
    <div id="session" className="w-screen h-screen flex flex-col bg-gray-200 overflow-hidden">
      {/* 헤더 */}
      <header className="w-full bg-gray-100 p-4">
        <SessionHeader
          hostName={hostName}
          streamId={streamId}
          leaveSession={leaveSession}
          switchCamera={switchCamera}
        />
      </header>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 왼쪽: 영상, 방송 정보 */}
        <div className="flex flex-col flex-1 justify-center items-center overflow-hidden bg-gray-200 p-4">
          {/* 영상 영역 */}
          <div className="w-full flex-1 flex justify-center items-center bg-black rounded-lg shadow-lg overflow-hidden">
            {mainStreamManager && (
              <UserVideoComponent
                streamManager={mainStreamManager}
                className="w-full h-full object-cover"
                ref={videoComponentRef} // ref 전달
              />
            )}
          </div>
          {/* 캡처 버튼 (수동 테스트용) 및 미리보기 */}
          <div className="mt-4">
            <button
              onClick={() => {
                if (videoComponentRef.current && videoComponentRef.current.captureFrame) {
                  const dataUrl = videoComponentRef.current.captureFrame();
                  console.log("수동 캡쳐된 데이터 URL:", dataUrl);
                  if (dataUrl) {
                    setThumbnailData(dataUrl);
                    console.log("수동 API 호출 시작: /stream/thumbnail?streamId=", streamId);
                    // 수동 캡처 시에도 백엔드에 이미지 업로드 요청 수행
                    api
                      .post(`/stream/thumbnail?streamId=${streamId}`, { image: dataUrl })
                      .then((res) => {
                        console.log("Thumbnail manually uploaded to S3:", res);
                      })
                      .catch((err) => {
                        console.error("Error uploading thumbnail manually to S3:", err.response || err);
                      });
                  }
                }
              }}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              썸네일 수동 캡처하기
            </button>
            {thumbnailData && (
              <div className="mt-2">
                <p className="text-black">캡처된 썸네일:</p>
                <img src={thumbnailData} alt="썸네일" className="w-64 border" />
              </div>
            )}
          </div>
          {/* 방송 정보 */}
          <div className="w-full bg-gray-100 text-black p-4 mt-3 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-black">
                {myUserName.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{title}</h2>
                <h2 className="text-sm font-semibold">{description}</h2>
              </div>
            </div>
          </div>
        </div>
        {/* 오른쪽: 채팅창 */}
        <div className="w-full md:w-[350px] h-full bg-gray-200 text-black p-3 overflow-y-auto rounded border-l border-gray-100">
          <ChatWindow session={session} myUserName={myUserName} hostName={hostName} />
        </div>
      </div>
    </div>
  );
};

export default SessionView;
