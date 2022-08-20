import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { BiHistory } from "react-icons/bi";
import { BsFillPersonXFill } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { BiPencil } from "react-icons/bi";
import {
  MdAccountCircle,
  MdAlternateEmail,
  MdOutlinePersonAddAlt1,
} from "react-icons/md";
import AdminNavi from "./AdminNavi";
const AdminProfile = () => {
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
  function update() {
    navigate("/updateprofile");
  }
  function orderHistory() {
    navigate("/orderhistory");
  }
  function RenderFunc() {
    return (
      <div className="align-content-center justify-content-center d-flex">
        <AdminNavi />
        <div className="d-flex margin-top-10">
          <Card
            style={{ width: "18rem" }}
            className="align-content-center justify-content-center"
          >
            <Card.Img
              className="profile-img"
              variant="top"
              src={require("../Admin/assets/profileimg.png")}
            />
            <div className="align-content-center justify-content-center">
              <Card.Body className="align-content-center justify-content-center">
                <Card.Title>
                  <MdAccountCircle /> Profile
                </Card.Title>

                <Card.Text style={{ textTransform: "uppercase" ,border:" 1px ", boxShadow: "5px 10px #8888" }}>
                  {" "}
                  <MdOutlinePersonAddAlt1 /> {profile.name}
                </Card.Text>
                <Card.Text style={{ border:" 1px ", boxShadow: "5px 10px #8888" }}>
                  {" "}
                  <FiPhone /> +91 {profile.phn}
                </Card.Text>
                <Card.Text style={{ border:" 1px ", boxShadow: "5px 10px #8888" }}>
                  {" "}
                  <MdAlternateEmail /> {profile.email}
                </Card.Text>
                <Card.Text
                  className="mb-3 change"
                  variant="primary"
                  onClick={update}
                >
                  <BiPencil /> Change password
                </Card.Text>
                <div className="titlesCart">
                  <Button variant="primary" onClick={logout}>
                    <BsFillPersonXFill /> Logout
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
export default AdminProfile;