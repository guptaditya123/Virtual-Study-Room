// src/pages/JoinRoom.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PrivateRoom() {
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/rooms/${roomId}`);
      if (res.data.isPrivate) {
        navigate(`/room/${roomId}`);
      } else {
        setError('This is not a private room or does not exist.');
      }
    } catch (err) {
      setError('Room not found or not accessible.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Join Private Room</h2>
      <form onSubmit={handleJoin}>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="block w-full mb-2 p-2 border"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Join</button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default PrivateRoom;
