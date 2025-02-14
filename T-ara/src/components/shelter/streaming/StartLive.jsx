// src/components/streaming/StartLive.jsx
import React, { useState } from "react";
import { OpenVidu } from "openvidu-browser";
import { toast } from "react-toastify";
import api from "../../../api";
import SessionView from "./SessionView";
import LiveSessionForm from "./LiveSessionForm";
import { jwtDecode } from "jwt-decode";

const StartLive = () => {
  // JWT에서 사용자 이름 가져오기 (토큰이 localStorage에 있다고 가정)
  const token = localStorage.getItem("authToken");
  const hostNameFromToken = token ? jwtDecode(token).name : "anonymous";

  // 초기 form 상태에서 participantName에 hostNameFromToken을 설정
  const [form, setForm] = useState({
    shelterId: "",
    dataSource: "shelter", // "shelter" 또는 "animal"
    title: "",
    description: "",
    participantName: hostNameFromToken,
  });

  const [streamingInfo, setStreamingInfo] = useState(null);
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const startLiveSession = async (e) => {
    e.preventDefault();

    try {
      // 백엔드에 방송 정보 생성 요청
      const response = await api.post("/stream/new", {
        shelterId: Number(form.shelterId),
        dataSource: form.dataSource,
        title: form.title,
        description: form.description,
        participantName: form.participantName,
      });
      const streamData = response.data;
      setStreamingInfo(streamData);

      const OV = new OpenVidu();
      const newSession = OV.initSession();
      setSession(newSession);

      newSession.on("streamCreated", (event) => {
        if (event.stream.connection.connectionId !== newSession.connection.connectionId) {
          const subscriber = newSession.subscribe(event.stream, undefined);
          setSubscribers((prevSubs) => [...prevSubs, subscriber]);
        }
      });

      newSession.on("streamDestroyed", (event) => {
        setSubscribers((prevSubs) =>
          prevSubs.filter((sub) => sub !== event.stream.streamManager)
        );
      });

      newSession.on("exception", (exception) => console.warn(exception));

      // 방송자(방장) 연결 시 clientData에 JSON 문자열로 이름과 role을 포함하여 보냅니다.
      await newSession.connect(streamData.sessionKey, {
        clientData: JSON.stringify({
          clientData: form.participantName,
          role: "PUBLISHER",
        }),
      });

      const newPublisher = await OV.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: "640x480",
        frameRate: 30,
        insertMode: "APPEND",
        mirror: false,
      });

      newSession.publish(newPublisher);
      setPublisher(newPublisher);

      toast.success("라이브 방송이 시작되었습니다.");
    } catch (error) {
      console.error("라이브 방송 시작 오류:", error);
      toast.error("라이브 방송 시작 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {streamingInfo === null ? (
        <LiveSessionForm
          form={form}
          handleChange={handleChange}
          handleSubmit={startLiveSession}
        />
      ) : (
        <SessionView
          session={session}
          mySessionId={streamingInfo.sessionId}
          streamId={streamingInfo.streamId} // streamId 전달
          myUserName={form.participantName}
          hostName={form.participantName} // 방송자의 이름을 hostName으로 전달
          title={form.title} // 방송 제목 전달
          description={form.description}
          mainStreamManager={publisher}
          publisher={publisher}
          subscribers={subscribers}
          leaveSession={() => {
            if (session) {
              session.disconnect();
              window.location.reload();
            }
          }}
          switchCamera={async () => {
            console.log("카메라 전환");
          }}
        />
      )}
    </div>
  );
};

export default StartLive;
