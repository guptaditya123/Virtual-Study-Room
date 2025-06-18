import React from "react";
import { Link } from "react-router-dom";
import RoomList from "../components/RoomList";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[url('https://assets.codepen.io/1468070/star-bg.jpg')] bg-cover bg-fixed text-white p-4 sm:p-8 overflow-hidden relative">
      {/* Cosmic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/90 z-0"></div>
      
      {/* Shooting Stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="absolute top-0 h-0.5 bg-gradient-to-r from-transparent to-white animate-shooting-star"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              top: `${Math.random() * 100}%`
            }}
          ></div>
        ))}
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes shooting-star {
            0% { transform: translateX(0) translateY(0); opacity: 1; }
            70% { opacity: 1; }
            100% { transform: translateX(-1000px) translateY(500px); opacity: 0; }
          }
          .animate-shooting-star { animation: shooting-star 5s linear infinite; }
          .glow-text {
            text-shadow: 0 0 10px rgba(20, 184, 166, 0.7);
          }
          .room-card {
            min-height: auto !important;
            height: auto !important;
          }
        `}
      </style>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 text-center"> {/* Reduced margin-bottom */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 glow-text bg-gradient-to-r from-teal-400 to-amber-300 bg-clip-text text-transparent">
            Study Cosmos
          </h1>
          <p className="text-md text-zinc-300 max-w-2xl mx-auto">
            Create or join virtual study rooms
          </p>
        </div>

        {/* Action Buttons - Made more compact */}
        <div className="flex flex-wrap justify-center gap-3 mb-8"> {/* Reduced gap and margin */}
          <Link
            to="/create-room"
            className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-teal-500/20 flex items-center text-sm"
          >
            <span className="mr-2">+</span> Create Room
          </Link>
          <Link
            to="/join-room"
            className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-zinc-700/10 flex items-center border border-zinc-700 text-sm"
          >
            Join Room
          </Link>
        </div>

        {/* Rooms Container - Made more compact */}
        <div className="bg-zinc-900/70 backdrop-blur-sm rounded-lg border border-zinc-700/50 p-4 shadow-md">
          {/* Section Header - Simplified */}
          <h2 className="text-lg font-semibold text-center text-teal-300 mb-4">
            Active Rooms
          </h2>

          {/* Room Grid - Tightened spacing */}
            <RoomList className="room-card p-3 bg-zinc-800/50 rounded-md border border-zinc-700/30 hover:border-teal-400/50 transition-colors" />
         
        </div>

        {/* Footer - Made smaller */}
        <div className="text-center text-zinc-500 text-xs mt-8">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent mb-3"></div>
          <p>Navigate knowledge dimensions</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;