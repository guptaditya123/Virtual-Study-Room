import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RoomList = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/rooms/getRooms");
        setRooms(res.data);
      } catch (err) {
        console.error("Failed to load rooms", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : rooms.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 text-lg">No public rooms available</p>
          <p className="text-gray-500 text-sm mt-2">Be the first to create one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="bg-gray-800/80 hover:bg-gray-800 rounded-lg p-4 border border-gray-700/50 hover:border-teal-400/30 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-teal-400 mb-1 truncate">
                    {room.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {room.topic || "No topic specified"}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/room/${room._id}`)}
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white px-3 py-2 rounded-md text-sm transition-colors duration-200"
                >
                  Join Room
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default RoomList;