import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const [profile, setProfile] = useState([]);  
    const navigate = useNavigate();
    let userData;

    useEffect(() => {
      
        loadProfiles();
      
    },[]);

  const usertoken = localStorage.getItem("token");
//   console.log(usertoken);

    const loadProfiles = async () => {

        var config = {
          method: 'get',
          url: 'http://localhost:4000/users/profile',
          headers: { 
            'Authorization': "Bearer "+ usertoken
          }
        };
        
        axios(config)
        .then(function (response) {
            userData = response.data
            setProfile(userData)
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    
    console.log(profile)
 function logout(){
  localStorage.removeItem("token");
  navigate("/login");
  
 }
    function RenderFunc() {
        return (
            <div className='container'>
              Profile
                <div>Name: {profile.name} </div>
                <div>Username: {profile.username} </div>
                <div>Phn: {profile.phn} </div>
                <div>Email: {profile.email}</div>
                <button onClick={logout}>Logout</button>
            </div>
        )
    }

    return <RenderFunc />
}
export default Profile