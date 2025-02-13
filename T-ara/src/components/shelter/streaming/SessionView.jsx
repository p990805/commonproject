// src/components/streaming/SessionView.jsx
import React from "react";
import UserVideoComponent from "./UserVideoComponent";
import SessionHeader from "./SessionHeader";
import ChatWindow from "./ChatWindow";

const SessionView = ({
  session,
  mySessionId,
  myUserName,
  hostName,  // hostName prop 추가
  mainStreamManager,
  publisher,
  subscribers,
  leaveSession,
  switchCamera,
}) => {
  return (
    <div id="session" className="w-screen h-screen flex flex-col bg-black">
      <div className="w-full bg-gray-900 p-4">
        <SessionHeader
          mySessionId={mySessionId}
          leaveSession={leaveSession}
          switchCamera={switchCamera}
        />
      </div>
      <div className="flex flex-1 gap-3">
        <div className="flex-1 flex flex-col items-center bg-black">
          <div className="w-full max-w-[1280px] h-[720px] flex justify-center items-center bg-black rounded-lg shadow-lg">
            {mainStreamManager && (
              <UserVideoComponent
                streamManager={mainStreamManager}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="w-full max-w-[1280px] bg-gray-900 text-white p-4 mt-3 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-lg font-bold">
                {myUserName.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">테스트 방송 제목</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[350px] h-full bg-gray-800 text-black p-3 overflow-y-auto rounded shadow-lg">
          <ChatWindow session={session} myUserName={myUserName} hostName={hostName} />  {/* hostName 전달 */}
        </div>
      </div>
    </div>
  );
};

export default SessionView;
