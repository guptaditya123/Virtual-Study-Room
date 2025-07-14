import React, { useEffect, useState, useRef } from "react";

const ChatBox = ({ socket, roomId }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [memberCount, setMemberCount] = useState(1);
  const chatEndRef = useRef(null);

  const [username] = useState(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      return storedUser?.name || "Guest";
    } catch {
      return "Guest";
    }
  });

  useEffect(() => {
    socket.emit("join_room", { roomId, username });

    const handleReceiveMessage = (data) => {
  console.log("Received message data:", data); // <--- Must log full object
      setChat((prev) => [...prev, data]);
    };

    const handleRoomUserCount = (data) => {
      setMemberCount(data.count);
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("room_user_count", handleRoomUserCount);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("room_user_count", handleRoomUserCount);
    };
  }, [socket, roomId, username]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      const messageData = {
        roomId,
        username,
        message: trimmedMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        id: Date.now() + Math.random().toString(36).substr(2, 9),
      };
      socket.emit("send_message", messageData);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col bg-gray-800 rounded-xl border border-gray-700 w-full h-[400px]">
      {/* Header */}
      <div className="p-4 border-b border-gray-600 flex items-center justify-between">
        <div className="flex items-center">
          <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse" />
          <h2 className="text-lg font-semibold text-white">Group Chat</h2>
        </div>
        <span className="text-sm text-gray-400">
          {memberCount} member{memberCount !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3" style={{ minHeight: 0 }}>
        {chat.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-400 italic">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          chat.map((msg) => (
            <div
              key={msg.id || `${msg.username}-${msg.time}`}
              className={`flex ${msg.username === username ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.username === username
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-gray-700 text-white rounded-bl-none"
                }`}
              >
                <p className="text-xs font-semibold text-gray-300 mb-1">{msg.username}</p>
                <p className="text-sm break-words">{msg.message}</p>
                <p className="text-xs text-gray-400 text-right mt-1">{msg.time}</p>
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-gray-600">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
