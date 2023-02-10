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
          `${process.env.REACT_APP_API_URL}/profile`,
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
    <div className="page-content page-container" id="page-content">
      <ToastContainer />
      <div className="padding">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-12 col-md-12">
            <div className="card user-card-full">
              <div className="row m-l-0 m-r-0">
                <div className="col-sm-4 bg-c-lite-green user-profile">
                  <div className="card-block text-center text-white">
                    <div className="m-b-25">
                      <img
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        className="img-radius"
                        alt="User-Profile-Image"
                      />
                    </div>
                    <h6 className="f-w-600">{user.name}</h6>
                    <p>{user.role}</p>
                    <button className="btn" onClick={handleLogout}>Logout</button>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="card-block">
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                      Information
                    </h6>
                    <div className="row">
                      <div className="col-sm-12">
                        <p className="m-b-10 f-w-600">Email</p>
                        <h6 className="text-muted f-w-400">{user.email}</h6>
                      </div>
                      <div className="col-sm-12">
                        <p className="m-b-10 f-w-600">Name</p>
                        <h6 className="text-muted f-w-400">{user.name}</h6>
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
