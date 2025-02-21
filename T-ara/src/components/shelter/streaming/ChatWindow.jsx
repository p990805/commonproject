// src/components/shelter/streaming/ChatWindow.jsx
import React, { useState, useEffect, useRef } from "react";
import api from "../../../api"; // api 인스턴스 경로에 맞게 수정

const ChatWindow = ({ session, myUserName, hostName: propHostName, streamId }) => {
  const hostName = propHostName || "Host";
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const chatContainerRef = useRef(null);

  // 도우미 함수: data를 두 번 파싱해서 { clientData, role } 반환
  const extractData = (data) => {
    if (!data) return { clientData: "Anonymous", role: "SUBSCRIBER" };
    let parsed;
    try {
      parsed = JSON.parse(data.trim());
    } catch (error) {
      return { clientData: data, role: "SUBSCRIBER" };
    }
    if (typeof parsed.clientData === "string") {
      const innerStr = parsed.clientData.trim();
      if (innerStr.startsWith("{") && innerStr.endsWith("}")) {
        try {
          const inner = JSON.parse(innerStr);
          return {
            clientData: inner.clientData || parsed.clientData,
            role: inner.role || parsed.role || "SUBSCRIBER",
          };
        } catch (innerError) {
          return {
            clientData: parsed.clientData,
            role: parsed.role || "SUBSCRIBER",
          };
        }
      }
    }
    return {
      clientData: parsed.clientData || "Anonymous",
      role: parsed.role || "SUBSCRIBER",
    };
  };

  // 스트림 ID가 있을 경우 백엔드에서 기존 채팅 메시지 로드
  useEffect(() => {
    if (streamId) {
      api.get(`/chat/mongo/stream/${streamId}`)
        .then(response => {
          // 응답이 배열이라고 가정합니다.
          setMessages(response.data);
        })
        .catch(error => {
          console.error("Error fetching chats:", error);
        });
    }
  }, [streamId]);

  // OpenVidu 채팅 신호 처리
  useEffect(() => {
    if (session) {
      const chatSignalHandler = (event) => {
        // 자신의 메시지는 건너뛰기
        if (event.from.connectionId === session.connection.connectionId) {
          return;
        }
        let sender = "Anonymous";
        let role = "SUBSCRIBER";
        if (event.from && event.from.data) {
          const extracted = extractData(event.from.data);
          sender = extracted.clientData;
          role = extracted.role;
        }
        const newMessage = {
          sender,
          text: event.data,
          timestamp: new Date().toLocaleTimeString(),
          role,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      };

      session.on("signal:chat", chatSignalHandler);
      return () => {
        session.off("signal:chat", chatSignalHandler);
      };
    }
  }, [session, hostName]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (session && message.trim() !== "") {
      session
        .signal({
          data: message,
          type: "chat",
        })
        .then(() => {
          const localRole = myUserName === hostName ? "PUBLISHER" : "SUBSCRIBER";
          const newMessage = {
            sender: myUserName || "Anonymous",
            text: message,
            timestamp: new Date().toLocaleTimeString(),
            role: localRole,
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
  
          // 백엔드에 채팅 메시지 저장
          const chatPayload = {
            streamId: streamId,
            sender: myUserName || "Anonymous",
            text: message,
            timestamp: new Date().toISOString(),
          };
  
          console.log("💬 [DEBUG] 전송할 채팅 데이터:", chatPayload);
  
          api.post("/chat/mongo/save", chatPayload)
            .then((response) => {
              console.log("✅ [DEBUG] 채팅 저장 성공:", response.data);
            })
            .catch((error) => {
              console.error("❌ [DEBUG] 채팅 저장 실패:", error.response ? error.response.data : error.message);
            });
  
          setMessage("");
        })
        .catch((error) => {
          console.error("❌ [DEBUG] 메시지 전송 에러:", error);
        });
    }
  };
  

  // 메시지 업데이트 시 스크롤 최하단으로 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto bg-white p-2 rounded-md"
      >
        {messages.map((msg, idx) => {
          const displayedSender =
            msg.role === "PUBLISHER" ? hostName : msg.sender || "Anonymous";
          const messageStyle =
            msg.role === "PUBLISHER" ? "text-blue-500" : "text-black";
          return (
            <div key={idx} className={`mb-2 text-sm ${messageStyle}`}>
              <strong>{displayedSender}</strong>: {msg.text}
            </div>
          );
        })}
      </div>
      <form
        onSubmit={handleSendMessage}
        className="p-2 flex border-t border-gray-600 rounded"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 p-2 bg-white text-black rounded placeholder:text-black"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 cursor-pointer"
        >
          전송
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
