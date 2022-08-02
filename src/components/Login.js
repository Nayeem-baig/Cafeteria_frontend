import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setUserLogin({ ...userLogin, [name]: value });
  };
  const handleSubmit = (event) => {
    const newRecord = { ...userLogin };
  };
 const handleLogin = (issuceful) => {
    if(issuceful){
      navigate('/product')
    }
  };

  const PostData = async (event) => {
    event.preventDefault();
    const { email, password} = userLogin;

    var axios = require('axios');
    var data = JSON.stringify({
      email : email,
      password : password
    });
    
    var config = {
      method: 'post',
      url: 'http://localhost:4000/users/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      localStorage.setItem('token', (response.data))
      const succeful = 1;
      handleLogin(succeful);
    })
    .catch(function (error) {
      console.log(error);
      alert(error)
    });
    
    
  };

  return (
    <div className="container">
      <form method="post" className="container" onSubmit={handleSubmit}>
        <div className="logo">
          <h1>Login</h1>
        </div>
        <div>
          <input
            type="text"
            onChange={handleInput}
            value={userLogin.email}
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="on"
          ></input>
        </div>
        <div>
          <input
            type="text"
            onChange={handleInput}
            value={userLogin.password}
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="on"
          ></input>
        </div>
        <input
          type="submit"
          name="login"
          id="login"
          className="form-submit"
          value="Login"
          onClick={PostData}
        />
      </form>
    </div>
  );
};

export default Login