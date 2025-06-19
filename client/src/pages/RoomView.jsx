import React, { useState, useEffect } from "react";
import ChatBox from "../components/ChatBox";
import Pomodoro from "../components/Pomodoro";
import WhiteBoard from "../components/WhiteBoard";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { SOCKET_URL } from '../Config';

const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: true, // Optional: automatically connect
  reconnectionAttempts: 5, // Optional: retry logic
  reconnectionDelay: 1000 // Optional: 1 second between retries
});

const RoomView = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState("Loading...");

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        const data = await res.json();
        setTopic(data.topic || "Untitled Room");
      } catch (error) {
        console.error("Failed to load room topic", error);
        setTopic("Unknown Room");
      }
    };

    fetchTopic();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 overflow-auto text-white">
      <div className="max-w-7xl mx-auto flex flex-col space-y-6">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-500">
            Study Room: <span className="text-indigo-400">{topic}</span>
          </h1>
          <p className="text-lg text-indigo-400 mt-1">Room Id:{id}</p>
          <p className="text-gray-400 text-sm mt-1">
            Collaborate in real-time with your team
          </p>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Whiteboard */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-700 flex flex-col">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
              Collaborative Whiteboard
            </h2>
            <div className="flex-1 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] overflow-auto">
              <WhiteBoard socket={socket} roomId={id} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col space-y-4">
            {/* Timer */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-700 w-full">
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
                Focus Timer
              </h2>
              <Pomodoro socket={socket} roomId={id} />
            </div>

            {/* Chat */}
            <div className="flex-1 bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-700 overflow-auto max-h-[400px]">
              <ChatBox socket={socket} roomId={id} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-6">
          <p className="text-gray-500 text-xs">
            Room Code:{" "}
            <span className="font-mono font-bold text-indigo-400">{id}</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default RoomView;
