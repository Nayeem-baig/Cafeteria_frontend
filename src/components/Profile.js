import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import styles from "./Profile.css";
const Profile = () => {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
  let userData;

  useEffect(() => {
    loadProfiles();
  }, []);

  const usertoken = localStorage.getItem("token");
  //   console.log(usertoken);

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

  console.log(profile);
  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  function RenderFunc() {
    return (
      <div className="container">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <div className={styles.pcard}>
          <Card.Body>
            <Card.Title>Profile</Card.Title>
            
            <Card.Text> Name: {profile.name}</Card.Text>
            <Card.Text> Phn: {profile.phn}</Card.Text>
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
