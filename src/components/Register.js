import React from "react";
import {Link} from 'react-router-dom'
import { useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [email, setEmail] =useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const handleSubmit = async (e) =>{
      e.preventDefault();
      if(password === '' && email === '' && role === '' && name === '')
      {
        toast.error('Please Enter Email or Password', {autoClose:10000})  
      }
      let data = {
        name,
        email,
        password,
        role
      } 
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data,
        url: `${process.env.REACT_APP_API_URL}/register`
      };
      const response = await axios(options);
      if (!response.data.success)
      {
        toast.error(response.data.error, {autoClose:10000});         
      }
      if (response.data.success) {
        toast.success('Success', {autoClose:10000});
        setEmail("");  
        setPassword("");  
        setName("");  
        setRole("");   
      }
  }
  return (
    <div className="container_box active">
      <ToastContainer />
      <div className="forms">
        <div className="form signup">
              <span className="title">Registration</span>
              <form onSubmit={handleSubmit}>
                  <div className="input-field">
                      <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                      <i className="uil uil-user"></i>
                  </div>
                  <div className="input-field">
                      <input type="text" placeholder="Enter your email"  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                      <i className="uil uil-envelope icon"></i>
                  </div>
                  <div className="input-field">
                    <select name="role" onChange={(e)=>{setRole(e.target.value)}}>
                      <option disabled selected>Select Role Type</option>
                      <option value={"admin"}>Admin</option>
                      <option value={"user"}>User</option>
                    </select>
                  </div>
                  <div className="input-field">
                      <input type="password" className="password" placeholder="Create a password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                      <i className="uil uil-lock icon"></i>
                  </div>

                  <div className="input-field button">
                      <input type="submit" value="Signup" />
                  </div>
              </form>

              <div className="login-signup">
                  <span className="text">Already a member?
                      <Link to="/login" className="text login-link">Login Now</Link>
                  </span>
              </div>
          </div>
      </div>
    </div>
  );
}
