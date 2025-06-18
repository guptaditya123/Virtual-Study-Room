import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function CreateRoom() {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/rooms/create', {
        name,
        topic,
        isPrivate,
        userId: user?._id || "000000000000000000000000"  // ✅ correct user ID
      });
      navigate(`/room/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create room");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Study Room</h2>
      <form onSubmit={handleCreateRoom}>
        <input type="text" placeholder="Room Name" value={name} onChange={(e) => setName(e.target.value)} className="block w-full mb-2 p-2 border" required />
        <input type="text" placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} className="block w-full mb-2 p-2 border" required />
        <label className="block mb-2">
          <input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} /> Private Room
        </label>
        <button type="submit" className="bg-purple-600 text-white px-4 py-2">Create Room</button>
      </form>
    </div>
  );
}

export default CreateRoom;
