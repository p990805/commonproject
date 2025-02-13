// src/components/streaming/SessionHeader.jsx
import React from 'react';

const SessionHeader = ({ mySessionId, leaveSession, switchCamera }) => {
  return (
    <div id="session-header" className="flex items-center justify-between">
      <h1 id="session-title" className="text-white text-xl">{mySessionId}</h1>
      <div className="flex gap-3">
        <button
          onClick={leaveSession}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Leave Session
        </button>
        <button
          onClick={switchCamera}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Switch Camera
        </button>
      </div>
    </div>
  );
};

export default SessionHeader;
