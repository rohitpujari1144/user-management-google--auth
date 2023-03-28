import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Account from './components/Account';
import UserDetails from './components/UserDetails';
import Admin from './components/Admin';
import AdminSignIn from './components/AdminSignIn';
import Registration from './components/Registration';
import EditProfile from './components/EditProfile';

function App() {

  // const userD = JSON.parse(localStorage.getItem('userDetails'))
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/edit-profile" element={<EditProfile/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/user-details" element={<UserDetails/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/signin/adminsignin" element={<AdminSignIn/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;