import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import styles from "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [userRegistration, setUserRegistration] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phn: "",
  });
  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);

    setUserRegistration({ ...userRegistration, [name]: value });
  };
  const handleSubmit = (event) => {
    const newRecord = { ...userRegistration };
    console.log(newRecord);
  };

  const handleReg = (issuceful) => {
    if (issuceful) {
      navigate("/login");
    }
  };

  const PostData = async (event) => {
    event.preventDefault();
    const { name, username, email, password, phn } = userRegistration;

    var axios = require("axios");
    var data = JSON.stringify({
      name: name,
      username: username,
      email: email,
      phn: phn,
      password: password,
    });
    console.log(data);
    var config = {
      method: "post",
      url: "http://localhost:4000/users/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        const succeful = 1;
        alert("Register successful please login to continue.")
        handleReg(succeful)
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <div className="container">
      <form method="post" className="container" onSubmit={handleSubmit}>
        <div className="logo">
          <h1>Register</h1>
        </div>
        <div>
          <input
            type="text"
            value={userRegistration.name}
            onChange={handleInput}
            name="name"
            id="name"
            placeholder="name"
            autoComplete="on"
          ></input>
        </div>
        <div>
          <input
            type="text"
            onChange={handleInput}
            value={userRegistration.username}
            name="username"
            id="username"
            placeholder="Username"
            autoComplete="on"
          ></input>
        </div>
        <div>
          <input
            type="text"
            onChange={handleInput}
            value={userRegistration.email}
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
            value={userRegistration.password}
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="on"
          ></input>
        </div>
        <div>
          <input
            type="number"
            onChange={handleInput}
            value={userRegistration.phn}
            name="phn"
            id="phn"
            placeholder="Phone number"
            autoComplete="on"
          ></input>
        </div>
        <input
          type="submit"
          name="signup"
          id="signup"
          className="form-submit"
          value="register"
          onClick={PostData}
          Register
        />
      </form>
      <Link to="/login">Already have an account</Link>
    </div>
  );
};

export default Register;
