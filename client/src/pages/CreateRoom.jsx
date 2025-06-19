import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Sun, Moon } from 'lucide-react';
import Header from '../components/Header';

function CreateRoom() {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:4000/api/rooms/create', {
        name,
        topic,
        isPrivate,
        userId: user?._id || "000000000000000000000000"
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate(`/room/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-500 ${
      darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
        : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
    }`}>
      {/* Theme Toggle */}
      <div className="absolute top-20 right-12">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition ${
            darkMode
              ? "bg-white/20 hover:bg-white/30"
              : "bg-black/10 hover:bg-black/20"
          }`}
        >
          {darkMode ? <Sun size={25} /> : <Moon size={25} className="text-gray-800" />}
        </button>
      </div>

      <div className={`rounded-2xl p-8 max-w-md w-full shadow-2xl transition-all duration-300 ${
        darkMode
          ? "bg-gray-800/70 backdrop-blur-sm border border-gray-700/50"
          : "bg-white/90 backdrop-blur-sm border border-gray-200"
      }`}>
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${
            darkMode ? "from-teal-400 to-blue-500" : "from-teal-500 to-blue-600"
          }`}>
            Create Study Room
          </h2>
          <p className={`text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            Set up your perfect study environment
          </p>
        </div>

        <form onSubmit={handleCreateRoom} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Room Name"
              className={`pl-4 pr-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 text-sm ${
                darkMode
                  ? "bg-gray-700/80 border-gray-600 focus:ring-teal-500 text-white placeholder-gray-400"
                  : "bg-gray-100 border-gray-300 focus:ring-teal-400 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>

          <div className="relative">
            <input
              type="text"
              id="topic"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Study Topic (e.g. Calculus, History)"
              className={`pl-4 pr-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 text-sm ${
                darkMode
                  ? "bg-gray-700/80 border-gray-600 focus:ring-teal-500 text-white placeholder-gray-400"
                  : "bg-gray-100 border-gray-300 focus:ring-teal-400 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="private"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className={`h-4 w-4 rounded focus:ring-2 ${
                darkMode
                  ? "text-teal-500 bg-gray-700 border-gray-600 focus:ring-teal-500"
                  : "text-teal-500 bg-gray-200 border-gray-300 focus:ring-teal-400"
              }`}
            />
            <label htmlFor="private" className={`ml-2 text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              Private Room (Only invited members can join)
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium text-sm transition-all duration-300 shadow-lg ${
              darkMode
                ? "bg-teal-600 hover:bg-teal-500 text-white"
                : "bg-teal-500 hover:bg-teal-400 text-white"
            } flex items-center justify-center`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              "Create Room"
            )}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default CreateRoom;