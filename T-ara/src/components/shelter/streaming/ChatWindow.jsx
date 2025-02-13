// src/components/streaming/ChatWindow.jsx
import React, { useState, useEffect } from "react";

const ChatWindow = ({ session, myUserName, hostName }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session) {
      const chatSignalHandler = (event) => {
        console.log("[ChatWindow] Full event.from:", event.from);
        // 자신의 메시지는 건너뛰기
        if (event.from.connectionId === session.connection.connectionId) {
          return;
        }
        
        let sender = "Anonymous";
        let role = event.from.role || "SUBSCRIBER";
        if (event.from && event.from.data) {
          try {
            const parsed = JSON.parse(event.from.data);
            sender = parsed.clientData || "Anonymous";
          } catch (error) {
            sender = event.from.data;
          }
        }
        console.log("[ChatWindow] Received message from:", sender, "role:", role);
        console.log("[ChatWindow] hostName prop:", hostName);

        const newMessage = {
          sender,
          text: event.data,
          timestamp: new Date().toLocaleTimeString(),
          role, // "PUBLISHER" 또는 "SUBSCRIBER"
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
          // 내 메시지: 만약 myUserName가 hostName과 같다면 role을 "PUBLISHER"로 처리
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
      <div className="flex-1 overflow-y-auto bg-white p-2">
        {messages.map((msg, idx) => {
          // 만약 메시지의 role이 "PUBLISHER"이면 방송자 이름(hostName)을 표시
          const displayedSender = msg.role === "PUBLISHER" ? hostName : (msg.sender || "Anonymous");
          console.log(`[ChatWindow] Message ${idx}: sender=${msg.sender}, role=${msg.role}, hostName=${hostName}, displayedSender=${displayedSender}`);
          // 스타일: 방송자 메시지는 파란색, 그 외는 검정색
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
        <button type="submit" className="ml-2 px-4 py-2 bg-red-500 text-white rounded">
          전송
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
