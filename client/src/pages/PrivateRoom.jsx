import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import api from "../api";

function PrivateRoom() {
  const { user } = useContext(AuthContext);
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [myPrivateRooms, setMyPrivateRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return;

    const fetchRooms = async () => {
      try {
        const res = await api.get(`/rooms/privateRooms/${user._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMyPrivateRooms(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch rooms", err);
        setError("Could not load private rooms.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [user]);

  const handleDirectJoin = async (e) => {
    e.preventDefault();
    setError("");

    if (!roomId.trim()) return setError("Please enter a room ID.");

    try {
      const res = await api.get(`/rooms/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const room = res.data;

      if (!room) return setError("Room not found.");
      if (!room.isPrivate) return setError("This is not a private room.");

      navigate(`/room/${roomId}`);
    } catch (err) {
      console.error(err);
      setError("Room not found or not accessible.");
    }
  };

  const copyRoomId = (id) => {
    navigator.clipboard.writeText(id);
    alert("Room ID copied to clipboard!");
  };

  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    try {
      await api.delete(`/rooms/delete/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMyPrivateRooms((prev) => prev.filter((room) => room._id !== roomId));
    } catch (err) {
      console.error("Failed to delete room:", err);
      alert("Error deleting room. Try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-6 sm:px-6 lg:px-8 text-white">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Private Study Rooms
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
              {user ? `Welcome, ${user.name || user.email.split("@")[0]}` : "Please login to access private rooms"}
            </p>
          </div>

          {/* My Private Rooms */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
              <span className="w-2 h-2 bg-teal-500 rounded-full mr-2" />
              My Private Rooms
            </h2>

            {loading ? (
              <p className="text-gray-400">Loading rooms...</p>
            ) : myPrivateRooms.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {myPrivateRooms.map((room) => (
                  <div key={room._id} className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow">
                    <div className="mb-2">
                      <h3 className="font-bold text-lg truncate">{room.name}</h3>
                      <p className="text-sm text-gray-400 truncate">{room.topic}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded break-all">
                        ID: {room._id}
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1 sm:mt-0">
                        <button
                          onClick={() => copyRoomId(room._id)}
                          className="text-xs bg-teal-600 hover:bg-teal-500 text-white px-3 py-1 rounded"
                        >
                          Copy ID
                        </button>
                        <button
                          onClick={() => navigate(`/room/${room._id}`)}
                          className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Enter
                        </button>
                        <button
                          onClick={() => handleDeleteRoom(room._id)}
                          className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">You haven't created any private rooms yet.</p>
            )}
          </div>

          {/* Join by Room ID */}
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 border border-gray-700/50">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Join by Room ID</h2>
            <form onSubmit={handleDirectJoin} className="space-y-6">
              <div>
                <label htmlFor="roomId" className="block text-sm font-medium text-gray-300 mb-2">
                  Enter Private Room ID
                </label>
                <input
                  type="text"
                  id="roomId"
                  placeholder="Paste the room ID here"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow hover:shadow-lg"
              >
                Join Private Room
              </button>
              {error && (
                <div className="mt-4 p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-300 text-sm">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivateRoom;
