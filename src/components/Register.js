import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Login.css";
import { ToastContainer, toast } from "react-toastify";

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

    setUserRegistration({ ...userRegistration, [name]: value });
  };
  const handleSubmit = (event) => {
    const newRecord = { ...userRegistration };
  };

  const handleReg = (issuceful) => {
    if (issuceful) {
      navigate("/login");
    }
  };
  function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
 function isNameValid(name) {
    return /^[A-Za-z]+$/.test(name);
  }

  const PostData = async (event) => {
    event.preventDefault();
    const { name, username, email, password, phn } = userRegistration;
    if (name === "") {
      return toast.error("Please enter name");
    }
    if (!isNameValid(name)) {
      return toast.error("Please enter a valid name!");
    }
    if (username === "") {
      return toast.error("Please enter username!");
    }
    if (email === "") {
      return toast.error("Please enter email!");
    }
    if (!isValidEmail(email)) {
      return toast.error("Email is invalid!");
    }
    if (password === "") {
      return toast.error("Please enter password!");
    }
    if (password.length < 6) {
      return toast.error("Minimum length of password is 6 or above!");
    }
    if (phn === "") {
      return toast.error("Please enter phn!");
    }
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
        alert("Register successful please login to continue.");
        handleReg(succeful);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <div className="body">
      <form method="post" className="Auth-form" onSubmit={handleSubmit}>
        <div className="logo">
          <h1>Register</h1>
        </div>
        <div>
          <input
            type="text"
            className="form-control mt-1 mb-3"
            value={userRegistration.name}
            onChange={handleInput}
            name="name"
            id="name"
            placeholder="Name"
            autoComplete="on"
          ></input>
        </div>
        <div>
          <input
            type="text"
            className="form-control mt-1 mb-3"
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
            className="form-control mt-1 mb-3"
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
            className="form-control mt-1 mb-3"
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
            className="form-control mt-1 mb-3"
            onChange={handleInput}
            value={userRegistration.phn}
            name="phn"
            id="phn"
            placeholder="Phone number"
            autoComplete="on"
          ></input>
        </div>
        <div className="text-center">
          <Button className="button" onClick={PostData}>
            Register
          </Button>
        </div>
      </form>
      <Link to="/login">Already have an account Login</Link>
    </div>
  );
};

export default Register;
