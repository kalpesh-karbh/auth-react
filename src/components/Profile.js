import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const checkAuth = () =>{
        let login = localStorage.getItem("user");
        setUser(login)
        if(!login){
            navigate('/login')
        } 
        if(login === 'admin'){
          navigate('/admin-profile')
        }
        if(login === 'user'){
          navigate('/user-profile')
        }
    }
    const handleLogout = () =>{
        toast.success("Logout Success", {autoClose:10000});      
        localStorage.removeItem("token");
        localStorage.removeItem("user"); 
        navigate('/login')
    }
    const getUserDetails = () =>{
      const token = localStorage.getItem("token")
      const config = {
        headers: { Authorization: `Bearer ${token}` }
        };       
        axios.get( 
          'http://localhost:4000/api/profile',
          config
        ).then((data)=>{
          setUser(data.data.user)
        }).catch(console.log);
    }
    useEffect(()=>{
        checkAuth();
        getUserDetails();
    },[])
  return (
    <div class="page-content page-container" id="page-content">
      <ToastContainer />
      <div class="padding">
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-xl-12 col-md-12">
            <div class="card user-card-full">
              <div class="row m-l-0 m-r-0">
                <div class="col-sm-4 bg-c-lite-green user-profile">
                  <div class="card-block text-center text-white">
                    <div class="m-b-25">
                      <img
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        class="img-radius"
                        alt="User-Profile-Image"
                      />
                    </div>
                    <h6 class="f-w-600">{user.name}</h6>
                    <p>{user.role}</p>
                    <button className="btn" onClick={handleLogout}>Logout</button>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="card-block">
                    <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                      Information
                    </h6>
                    <div class="row">
                      <div class="col-sm-12">
                        <p class="m-b-10 f-w-600">Email</p>
                        <h6 class="text-muted f-w-400">{user.email}</h6>
                      </div>
                      <div class="col-sm-12">
                        <p class="m-b-10 f-w-600">Name</p>
                        <h6 class="text-muted f-w-400">{user.name}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
