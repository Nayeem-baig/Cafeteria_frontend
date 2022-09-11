import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate , useParams} from "react-router-dom";
import styles from "./Login.css";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { motion } from "framer-motion";


const Login = () => {
  const {table} = useParams();
  localStorage.setItem("table", table);
  console.log(table)
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
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

  function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const PostData = async (event) => {
    event.preventDefault();
    const { email, password } = userLogin;
    if (email === "") {
      return toast.error("Please enter email");
    } else if (!isValidEmail(email)) {
      toast.error("Email is invalid");
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
          navigate("/allcategory");
          toast("Login successful!");
        })
        .catch(function (error) {
          toast.error(error.response.data);
          console.log(error);
        });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <div className="loginbody">
        <form
          method="post"
          className="Auth-form bodyCon"
          onSubmit={handleSubmit}
        >
          <div className="logo">
            <p className="title">Cafeteria❞</p>
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
              type={passwordType}
              className="form-control mt-1 mb-3"
              onChange={handleInput}
              value={userLogin.password}
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="on"
            ></input>
          </div>
          <div className="btn btn-outline-primary" onClick={togglePassword}>
            {passwordType === "password" ? <BsEyeFill /> : <BsEyeSlashFill />}
          </div>
          <div className="text-center">
            <Button className="wd-100 mt-3" onClick={PostData}>
              Login
            </Button>
          </div>
        </form>
        <div className="create d-flex flex-column justify-content-center">
          <p className="create ">
            Don't have an account?<Link to="/register"> Create one!</Link>
          </p>
          <p className="create justify-content-center">
            <Link to="/adminlogin"> Admin login?</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
