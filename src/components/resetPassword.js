import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const token = localStorage.getItem("resetToken");
  const email = localStorage.getItem("userEmail");
  
  const handleSubmit = async (e) =>{
      e.preventDefault();
      if(password === '' && confirmPassword === '')
      {
        toast.error('Please Enter Password', {autoClose:10000})  
      }
      if(password !== confirmPassword)
      {
        toast.error('Confirm Password Not Match!', {autoClose:10000})  
      }      
      let data = {
        password,
        token,
        email
      } 
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data,
        url: `${process.env.REACT_APP_API_URL}/reset-password`
      };
      const response = await axios(options);
      console.log(response)
      if (!response.data.success)
      {
        toast.error(response.data.error, {autoClose:10000})  
      }
      if (response.data.success) {
        toast.success('Success', {autoClose:10000});
        localStorage.removeItem("resetToken");
        localStorage.removeItem("userEmail"); 
        setTimeout(() => {
          navigate('/login') 
        }, 2000);         
                  
      }
  }
  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }
  const checkAuth = () =>{
    if(!token)
    {
      navigate('/login');
    }
  }
  useEffect(()=>{
    checkAuth()
  },[])
  return (
    <div className="container_box">
      <ToastContainer />
      <div className="forms">
        <div className="form login">
          <span className="title">Reset Password</span>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type={passwordType}
                className="password"
                placeholder="Enter your password"
                name="password"
                onChange={(e)=>{setPassword(e.target.value)}}
              />
              <i className="uil uil-lock icon"></i>
              {
                passwordType==="password" ? <i className="uil uil-eye-slash showHidePw" onClick={togglePassword}></i> : <i className="uil uil-eye showHidePw" onClick={togglePassword}></i>
              }
              <i className="uil uil-lock icon"></i>
            </div>
            <div className="input-field">
              <input
                type={passwordType}
                className="password"
                placeholder="Enter your password"
                name="password"
                onChange={(e)=>{setconfirmPassword(e.target.value)}}
              />
              <i className="uil uil-lock icon"></i>
              {
                passwordType==="password" ? <i className="uil uil-eye-slash showHidePw" onClick={togglePassword}></i> : <i className="uil uil-eye showHidePw" onClick={togglePassword}></i>
              }
              <i className="uil uil-lock icon"></i>
            </div>
            <div className="input-field button">
              <input type="submit" value="Reset Password" />
            </div>
          </form>
          <div className="login-signup">
            <span className="text">
              Not a member?
              <Link to="/register" className="text signup-link">
                Signup Now
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
