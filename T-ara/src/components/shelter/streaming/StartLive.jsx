// src/components/streaming/StartLive.jsx
import { useState } from "react";
import { OpenVidu } from "openvidu-browser";
import { toast } from "react-toastify";
import api from "../../../api";
import SessionView from "./SessionView";
import LiveSessionForm from "./LiveSessionForm";
import { jwtDecode } from "jwt-decode";

const StartLive = () => {
  const token = localStorage.getItem("authToken");
  const hostNameFromToken = token ? jwtDecode(token).name : "anonymous";

  const [form, setForm] = useState({
    shelterId: "",
    relationalId: "", // animal 선택 시 사용
    dataSource: "shelter", 
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
      // dataSource에 따라 전송할 필드가 달라집니다.
      const payload = {
        dataSource: form.dataSource,
        title: form.title,
        description: form.description,
        participantName: form.participantName,
      };

      if (form.dataSource === "shelter") {
        payload.shelterId = Number(form.shelterId);
      } else if (form.dataSource === "animal") {
        payload.relationalId = Number(form.relationalId);
      }

      const response = await api.post("/stream/new", payload);
      const streamData = response.data;
      // streamingInfo에 form.description과 hostName를 추가하여 전달
      setStreamingInfo({ 
        ...streamData, 
        description: form.description, 
        hostName: form.participantName 
      });

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
          streamId={streamingInfo.streamId} 
          myUserName={form.participantName}
          hostName={form.participantName} 
          title={form.title} 
          description={streamingInfo.description}  // 전달된 방송 설명 사용
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
