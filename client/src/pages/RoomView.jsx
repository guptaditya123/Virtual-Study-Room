import React, { useState, useEffect } from "react";
import ChatBox from "../components/ChatBox";
import Pomodoro from "../components/Pomodoro";
import WhiteBoard from "../components/WhiteBoard";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Header from "../components/Header";

const socket = io("http://localhost:4000");

const RoomView = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState("Loading...");

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/rooms/${id}`);
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
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 overflow-auto text-white">
        <div className="max-w-7xl mx-auto flex flex-col space-y-6">
          {/* Header */}
          <header className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Study Room: <span className="text-white">{topic}</span>
            </h1>
            <p className="text-lg text-teal-400 mt-2 font-mono">Room ID: {id}</p>
            <p className="text-gray-400 text-sm mt-1">
              Collaborate in real-time with your team
            </p>
          </header>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Whiteboard */}
            <div className="lg:col-span-2 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-gray-700/50 flex flex-col">
              <h2 className="text-lg font-semibold mb-3 flex items-center text-white">
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
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-gray-700/50 w-full">
                <h2 className="text-lg font-semibold mb-2 flex items-center text-white">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
                  Focus Timer
                </h2>
                <Pomodoro socket={socket} roomId={id} />
              </div>

              {/* Chat */}
              <div className="flex-1 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-gray-700/50 overflow-auto max-h-[400px]">
                <ChatBox socket={socket} roomId={id} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center mt-6">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent mb-3"></div>
            <p className="text-gray-500 text-xs">
              Share this code to invite others:{" "}
              <span className="font-mono font-bold text-indigo-400">{id}</span>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default RoomView;