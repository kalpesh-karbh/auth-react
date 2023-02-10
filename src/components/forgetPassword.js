import React, { useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] =useState("");
  const handleSubmit = async (e) =>{
      e.preventDefault();
      if(email === '')
      {
        toast.error('Please Enter Email or Password', {autoClose:10000})  
      }
      let data = {
        email
      } 
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data,
        url: `${process.env.HOST}/api/forget-password`
      };
      const response = await axios(options);
      console.log(response)
      if (!response.data.success)
      {
        toast.error(response.data.error, {autoClose:10000})  
      }
      if (response.data.success) {
        toast.success('Success', {autoClose:10000});
        localStorage.setItem("resetToken", response.data.token);        
        localStorage.setItem("userEmail", response.data.email);
        setTimeout(() => {
          navigate('/reset-password')
        }, 2000);  
      }
  }

  return (
    <div class="container_box">
      <ToastContainer />
      <div class="forms">
        <div className="form login">
          <span className="title">Forget Password</span>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input type="text" placeholder="Enter your email" name="name" onChange={(e)=>{setEmail(e.target.value)}} />
              <i className="uil uil-envelope icon"></i>
            </div>
            <div className="input-field button">
              <input type="submit" value="Reset" />
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
