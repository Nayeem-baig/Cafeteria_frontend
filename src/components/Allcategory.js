import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navi from "./Navi";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

const Allcategory = () => {
  useEffect(() => {
    loadCategory();
  }, []);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
    navigate("/selectedcat");
  };

  return (
    <motion.div 
    className="body"
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:0.2}}
    exit={{opacity:0}}
    >
    <div className="body">
      <Navi/>
      <p className="titles margin-top-10">All categories</p>
      <div className="d-flex mb-3">
        <Col lg="2">
        <input
          className="form-control"
          style={{ minWidth: "300px" }}
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        </Col>
      </div>
      <Row>
        {category.length > 0 &&
          category.filter((product) => {
            if (search == "") {
              return product;
            } else if (
              product.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return product;
            }
          }).map((product) => (
        
            <Col className="procon" lg="3">
              <div
                className="mb-3 ml-3 mr-3"
                onClick={() => takeCategory(product.name)}
              >
              <Card
                    className="wd-100 flexRow"
                    style={{ minWidth: "300px" }}
                  >
                  <Card.Body>
                    <Card.Img
                      className="card-img-top"
                      variant="top"
                      src={product.img}
                    />
                    <Card.Text
                      style={{ textTransform: "uppercase" }}
                      className="text category"
                    >
                      {product.name}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
           
          ))}
      </Row>
    </div>
    </motion.div>
  );
};

export default Allcategory;
