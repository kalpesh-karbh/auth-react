import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ForgetPassword from './components/forgetPassword';
import ResetPassword from './components/resetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profile></Profile>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/register" element={<Register></Register>} />
        <Route path="/admin-profile" element={<Profile></Profile>} />
        <Route path="/user-profile" element={<Profile></Profile>} />
        <Route path="/forget-password" element={<ForgetPassword></ForgetPassword>} />
        <Route path="/reset-password" element={<ResetPassword></ResetPassword>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
