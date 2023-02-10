import React, { useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const [email, setEmail] =useState("");
  const [password, setPassword] = useState("");
  const [showHidePw, setshowHidePw] = useState(false);
  const handleSubmit = async (e) =>{
      e.preventDefault();
      if(password === '' && email === '')
      {
        toast.error('Please Enter Email or Password', {autoClose:10000})  
      }
      let data = {
        email,
        password
      } 
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data,
        url: `${process.env.BASE_URL}/api/login`
      };
      const response = await axios(options);
      console.log(response)
      if (!response.data.success)
      {
        toast.error(response.data.error, {autoClose:10000})  
      }
      if (response.data.success) {
        toast.success('Success', {autoClose:10000});
        const user = response.data.user
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", user.role);        
        if(user.role === 'admin')
        {
          setTimeout(() => {
            navigate('/admin-profile')
          }, 2000);            
        }
        if(user.role === 'user')
        {
          setTimeout(() => {
            navigate('/user-profile')
          }, 2000);          
        }
           
      }
  }
  const togglePassword =()=>{
    if(passwordType==="password")
    {
      setshowHidePw(true)
     setPasswordType("text")
     return;
    }
    setshowHidePw(false)
    setPasswordType("password")
  }

  return (
    <div class="container_box">
      <ToastContainer />
      <div class="forms">
        <div className="form login">
          <span className="title">Login</span>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input type="text" placeholder="Enter your email" name="name" onChange={(e)=>{setEmail(e.target.value)}} />
              <i className="uil uil-envelope icon"></i>
            </div>
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
            <div className="checkbox-text">
              <div className="checkbox-content">
                <input type="checkbox" id="logCheck" />
                <label for="logCheck" className="text">
                  Remember me
                </label>
              </div>
              <Link to="/forget-password" className="text">
                Forgot password?
              </Link>
            </div>
            <div className="input-field button">
              <input type="submit" value="Login" />
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
