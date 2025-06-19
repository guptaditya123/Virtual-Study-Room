import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateRoom from './pages/CreateRoom';
import RoomView from './pages/RoomView';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import PrivateRoom from './pages/PrivateRoom';

function App() {
  return (
    <BrowserRouter>
    {/* <h1 className='text-2xl bg-red-600'>vitual study room</h1> */}
      <Routes>
        <Route path="/" element={  <LandingPage /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        <Route path="/create-room" element={<ProtectedRoute><CreateRoom /></ProtectedRoute>} />
        <Route path="/privateRoom" element={<PrivateRoom />} />
        <Route path="/room/:id" element={<ProtectedRoute> <RoomView/> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;