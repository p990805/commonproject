// src/components/streaming/UserVideoComponent.jsx
import React from "react";
import OpenViduVideoComponent from "./OpenViduVideoComponent";

const UserVideoComponent = ({ streamManager, className }) => {
  const getNicknameTag = () => {
    try {
      return JSON.parse(streamManager?.stream?.connection?.data || "{}")?.clientData || "Unknown";
    } catch (error) {
      return "Unknown";
    }
  };

  return (
    <div className={`relative bg-black ${className}`}>
      {streamManager ? (
        <div className="relative w-full h-full">
          <OpenViduVideoComponent streamManager={streamManager} />
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
            {getNicknameTag()}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
