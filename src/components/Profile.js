import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import styles from "./Profile.css";
import Navi from "./Navi";
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from "react-bootstrap";
import Container from 'react-bootstrap/Container';

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
  function RenderFunc() {
    return (
      <div>
            <div>
            <Navi/>
    </div>
        <Card style={{ width: "18rem" }} className="container">
        <Card.Img className="profile-img" variant="top" src={require("../assets/profileimg.png")} />
          <div className={styles.pcard}>
          <Card.Body>
            <Card.Title>Profile</Card.Title>
            <Card.Text> Name: {profile.name}</Card.Text>
            <Card.Text> Phn: +91 {profile.phn}</Card.Text>
            <Card.Text> Email: {profile.email}</Card.Text>
           
            
            <Button variant="primary" onClick={logout}>
              Logout
            </Button>
          </Card.Body>
          </div>
        </Card>
      </div>
    );
  }

  return <RenderFunc />;
};
export default Profile;
