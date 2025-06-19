import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";

function PrivateRoom() {
  const { user } = useContext(AuthContext);
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const [myPrivateRooms, setMyPrivateRooms] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
 if (!user || !user._id) {
    console.log("User not loaded yet or missing _id:", user);
    return;
  }
  console.log("Fetching private rooms for user:", user);
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/rooms/privateRooms/${user._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const myRooms = res.data
        console.log("My Private Rooms:", myRooms);

        setMyPrivateRooms(myRooms);
      } catch (err) {
        console.error("Failed to fetch rooms", err);
      }
    };

    if (user) fetchRooms();
  }, [user]);

  const handleDirectJoin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:4000/api/rooms/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const room = res.data;

      if (!room) {
        setError("Room not found.");
      } else if (!room.isPrivate) {
        setError("This is not a private room.");
      } else {
        navigate(`/room/${roomId}`);
      }
    } catch (err) {
      setError("Room not found or not accessible.");
    }
  };

  const handlePopupJoin = () => {
    if (selectedRoom) {
      navigate(`/room/${selectedRoom._id}`);
    }
  };

  const copyRoomId = (id) => {
    navigator.clipboard.writeText(id);
    alert('Room ID copied to clipboard!');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Private Study Rooms
            </h1>
            <p className="text-lg text-gray-300 max-w-lg mx-auto">
              {user ? `Welcome, ${user.name || user.email.split('@')[0]}` : 'Please login to access private rooms'}
            </p>
          </div>

          {/* My Private Rooms */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
              My Private Rooms
            </h2>

            {myPrivateRooms.length > 0 ? (
              <ul className="space-y-4">
                {myPrivateRooms.map((room) => (
                  <li key={room._id} className="bg-gray-800/80 border border-gray-700/50 p-4 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-lg">{room.name}</h3>
                        <p className="text-sm text-gray-400">{room.topic}</p>
                        <div className="mt-2 flex items-center">
                          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded mr-2">
                            ID: {room._id}
                          </span>
                          <button
                            onClick={() => copyRoomId(room._id)}
                            className="text-xs bg-teal-600 hover:bg-teal-500 text-white px-2 py-1 rounded"
                          >
                            Copy ID
                          </button>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => navigate(`/room/${room._id}`)}
                          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Enter
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">You haven't created any private rooms yet.</p>
            )}
          </div>

          {/* Join by Room ID */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-gray-700/50">
            <h2 className="text-xl font-semibold mb-4">Join by Room ID</h2>
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
            </form>
            {error && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Join Confirmation Popup (optional, if needed for other rooms) */}
          {showPopup && selectedRoom && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-gray-800 p-6 rounded shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-white">Join Room: {selectedRoom.name}</h2>
                <p className="text-sm text-gray-300 mb-2">Topic: {selectedRoom.topic}</p>
                <div className="space-y-4">
                  <button
                    onClick={handlePopupJoin}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded w-full"
                  >
                    Confirm Join
                  </button>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded w-full"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PrivateRoom;
