import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import formatDistance from "date-fns/formatDistance";
import AdminNavi from "./AdminNavi";

const ListAllCategory = () => {
  useEffect(() => {
    loadCategory();
  }, []);
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function conDate(dateNo) {
    const dateStr = dateNo;
    const str = formatDistance(new Date(dateStr), new Date());
    return <h6>{str} ago.</h6>;
  }
  const loadCategory = async () => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: "http://localhost:4000/category/list",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        let allcategory = response.data;
        setCategory(allcategory);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const takeCategory = (category) => {
    dispatch({ type: "TAKE_CATEGORY", payload: category });
    console.log(category);
    navigate("/selectedcat");
  };

  return (
    <div className="body">
      <div className="Navigation">
        {/* <Container fluid>
          <p className="title mt-5">Cafeteria❞ </p>
        </Container> */}
        <AdminNavi/>
      </div>
      <div  className="margin-top-10">
      <Row>
        {category.length > 0 &&
          category.map((product) => (
            <Col lg="3">
              <div
                style={{ marginBottom: "20px", margin: "20px" }}
                className="catBox"
              >
                <Card className="wd-100 flexRow" style={{ maxWidth: "275px" }}>
                  <Card.Body>
                    <Card.Img
                      className="card-img-top"
                      variant="top"
                      src={product.img}
                    />
                    <Card.Text
                      style={{ textTransform: "uppercase" }}
                      className="text"
                    >
                     ID:{product._id}
                    </Card.Text> 
                    <Card.Text
                      style={{ textTransform: "uppercase" }}
                      className="text category"
                    >
                      {product.name}
                    </Card.Text>  
                    <Card.Text
                      style={{ textTransform: "uppercase" }}
                      className="text"
                    >
                      {conDate(product.createdAt)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
      </Row>
      </div>
    </div>
  );
};

export default ListAllCategory