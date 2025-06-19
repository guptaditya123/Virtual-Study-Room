import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Trash2, Loader2 } from "lucide-react";

const RoomList = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("/api/rooms/getRooms");
        setRooms(res.data);
      } catch (err) {
        console.error("Failed to load rooms", err);
        alert("Failed to load rooms. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleDeleteClick = (roomId) => {
    setRoomToDelete(roomId);
    setShowConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!roomToDelete) return;
    
    try {
      setDeletingId(roomToDelete);
      await axios.delete(`http://localhost:4000/api/rooms/delete/${roomToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setRooms(rooms.filter(room => room._id !== roomToDelete));
    } catch (err) {
      console.error("Failed to delete room", err);
      alert(err.response?.data?.message || "Failed to delete room");
    } finally {
      setDeletingId(null);
      setShowConfirm(false);
      setRoomToDelete(null);
    }
  };

  return (
    <>
      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl p-6 max-w-md w-full ${
            loading ? "bg-gray-800" : "bg-gray-800"
          } border border-gray-700 shadow-xl`}>
            <h3 className="text-xl font-semibold mb-4 text-white">Delete Room</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this room? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deletingId === roomToDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors flex items-center"
              >
                {deletingId === roomToDelete ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Room List Content */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="animate-spin h-8 w-8 text-teal-500" />
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
              className="bg-gray-800/80 hover:bg-gray-800 rounded-lg p-4 border border-gray-700/50 hover:border-teal-400/30 transition-all duration-200 shadow-sm hover:shadow-md relative"
            >
              {/* Delete button with loading state */}
              <button
                onClick={() => handleDeleteClick(room._id)}
                disabled={deletingId === room._id}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-400 transition-colors"
                title="Delete room"
              >
                {deletingId === room._id ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  <Trash2 size={18} />
                )}
              </button>

              <div className="flex flex-col h-full pt-6">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-teal-400 mb-1 truncate">
                    {room.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {room.topic || "No topic specified"}
                  </p>
                  {room.createdBy && (
                    <p className="text-xs text-gray-500">
                      Created by: {room.createdBy.name || "Unknown"}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => navigate(`/room/${room._id}`)}
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white px-3 py-2 rounded-md text-sm transition-colors duration-200 mt-4"
                  disabled={deletingId === room._id}
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