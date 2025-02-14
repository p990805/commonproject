// src/components/streaming/ChatWindow.jsx
import React, { useState, useEffect } from "react";

const ChatWindow = ({ session, myUserName, hostName: propHostName }) => {
  const hostName = propHostName || "Host";
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // 도우미 함수: data를 두 번 파싱해서 { clientData, role }를 반환
  const extractData = (data) => {
    if (!data) return { clientData: "Anonymous", role: "SUBSCRIBER" };
    let parsed;
    try {
      parsed = JSON.parse(data.trim());
    } catch (error) {
      return { clientData: data, role: "SUBSCRIBER" };
    }
    // 만약 parsed.clientData가 JSON 문자열이면 다시 파싱
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
        // (디버깅 로그 필요시 주석 처리 가능)
        console.log("[ChatWindow] Received message from:", sender, "role:", role);
        console.log("[ChatWindow] hostName prop:", hostName);

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
          console.log("[ChatWindow] Sent message as:", myUserName);
          // 내 메시지: 만약 내 이름이 hostName과 같으면 role은 "PUBLISHER"
          const localRole = myUserName === hostName ? "PUBLISHER" : "SUBSCRIBER";
          const newMessage = {
            sender: myUserName || "Anonymous",
            text: message,
            timestamp: new Date().toLocaleTimeString(),
            role: localRole,
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          setMessage("");
        })
        .catch((error) => {
          console.error("메시지 전송 에러:", error);
        });
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto bg-white p-2 rounded-md">
        {messages.map((msg, idx) => {
          // 만약 메시지의 role이 "PUBLISHER"이면, 표시할 이름은 hostName.
          const displayedSender = msg.role === "PUBLISHER" ? hostName : (msg.sender || "Anonymous");
          const messageStyle = msg.role === "PUBLISHER" ? "text-blue-500" : "text-black";
          return (
            <div key={idx} className={`mb-2 text-sm ${messageStyle}`}>
              <strong>{displayedSender}</strong>: {msg.text}
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSendMessage} className="p-2 flex border-t border-gray-600 rounded">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 p-2 bg-white text-black rounded placeholder:text-black"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
          전송
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
