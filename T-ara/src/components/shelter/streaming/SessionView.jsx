// src/components/streaming/SessionView.jsx
import React from "react";
import UserVideoComponent from "./UserVideoComponent";
import SessionHeader from "./SessionHeader";
import ChatWindow from "./ChatWindow";

const SessionView = ({
  session,
  mySessionId,
  streamId, // StartLive에서 전달받은 streamId
  myUserName,
  hostName,   // 방송자 이름
  title,      // 방송 제목
  description,
  mainStreamManager,
  publisher,
  subscribers,
  leaveSession,
  switchCamera,
}) => {
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
        {/* 왼쪽 영역: 영상 및 방송정보 */}
        <div className="flex flex-col flex-1 justify-center items-center overflow-hidden bg-gray-200 p-4">
          {/* 영상 영역 */}
          <div className="w-full flex-1 flex justify-center items-center bg-black rounded-lg shadow-lg overflow-hidden">
            {mainStreamManager && (
              <UserVideoComponent
                streamManager={mainStreamManager}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          {/* 방송 정보 영역 */}
          <div className="w-full bg-gray-100 text-white p-4 mt-3 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg text-black font-bold">
                {myUserName.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-black">{title}</h2>
                <h2 className="text-sm font-semibold text-black">{description}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 영역: 채팅창 */}
        <div className="w-full md:w-[350px] h-full bg-gray-200 text-black p-3 overflow-y-auto rounded border-l border-gray-100">
          <ChatWindow session={session} myUserName={myUserName} hostName={hostName} />
        </div>
      </div>
    </div>
  );
};

export default SessionView;
