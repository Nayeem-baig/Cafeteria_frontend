import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.css";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
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
    if (issuceful) {
      navigate("/allcategory");
    }
  };
  function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  const PostData = async (event) => {
    event.preventDefault();
    const { email, password } = userLogin;
    if (email === "") {
      return toast.error("Please enter email");
    } else if (!isValidEmail(email)) {
      toast.error('Email is invalid');
    } else if (password === "") {
      return toast.error("Please enter password");
    } else if (password.length < 6) {
      return toast.error("Minimum length of password is 6 or above");
    } else {
      var axios = require("axios");
      var data = JSON.stringify({
        email: email,
        password: password,
      });

      var config = {
        method: "post",
        url: "http://localhost:4000/users/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          localStorage.setItem("token", response.data);
          const succeful = 1;
          handleLogin(succeful);
        })
        .catch(function (error) {
          toast.error(error.response.data);
          console.log(error);
        });
    }
  };

  return (
    <div className="body">
      <form method="post" className="Auth-form" onSubmit={handleSubmit}>
        <div className="logo">
          <h1>Login</h1>
        </div>
        <div>
          <input
            type="text"
            className="form-control mt-1 mb-3"
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
            type="password"
            className="form-control mt-1 mb-3"
            onChange={handleInput}
            value={userLogin.password}
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="on"
          ></input>
        </div>
        <div className="text-center">
          <Button className="wd-100 mt-3" onClick={PostData}>
            Login
          </Button>
        </div>
      </form>
      <div className="create">
        <p className="create">
          Don't have an account ?<Link to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
