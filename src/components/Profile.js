import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import styles from "./Profile.css";
import Navi from "./Navi";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { BiHistory } from "react-icons/bi";
import { BsFillPersonXFill } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { MdAccountCircle , MdAlternateEmail ,MdOutlinePersonAddAlt1 } from "react-icons/md";
const Profile = () => {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
  let userData;

  useEffect(() => {
    loadProfiles();
  }, []);

  const usertoken = localStorage.getItem("token");

  const loadProfiles = async () => {
    var config = {
      method: "get",
      url: "http://localhost:4000/users/profile",
      headers: {
        Authorization: "Bearer " + usertoken,
      },
    };

    axios(config)
      .then(function (response) {
        userData = response.data;
        setProfile(userData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  function orderHistory() {
    navigate("/orderhistory");
  }
  function RenderFunc() {
    return (
      <div className="align-content-center justify-content-center d-flex">
        <Navi />
        <div className="d-flex margin-top-10">
          <Card
            style={{ width: "18rem" }}
            className="align-content-center justify-content-center"
          >
            <Card.Img
              className="profile-img"
              variant="top"
              src={require("../assets/profileimg.png")}
            />
            <div className="align-content-center justify-content-center">
              <Card.Body className="align-content-center justify-content-center">
                <Card.Title><MdAccountCircle/>{" "}Profile</Card.Title>
                <Card.Text> <MdOutlinePersonAddAlt1/>{" "} {profile.name}</Card.Text>
                <Card.Text> <FiPhone/>{" "}+91 {profile.phn}</Card.Text>
                <Card.Text> <MdAlternateEmail/>{" "} {profile.email}</Card.Text>
                <div className="titlesCart">
                <Button className="mb-3" onClick={orderHistory}><BiHistory/>{" "}Order history</Button> <div></div>
                <Button variant="primary" onClick={logout}><BsFillPersonXFill/>
                 {" "} Logout
                </Button>
                </div>
              </Card.Body>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return <RenderFunc />;
};
export default Profile;
