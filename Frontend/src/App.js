
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UserDetails from './components/UserDetails';
import Admin from './components/Admin';
import AdminSignIn from './components/AdminSignIn';
import EditProfile from './components/EditProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile-details" element={<EditProfile/>} />
        <Route path="/profile" element={<UserDetails/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/admin-login" element={<AdminSignIn/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;