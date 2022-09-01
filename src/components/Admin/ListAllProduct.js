import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col } from "reactstrap";
import AdminNavi from "./AdminNavi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

const ListAllProduct = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const updates = useSelector((state) => state?.UpdatesReduser);
  const [delBtn, setdelBtn] = useState(0);
  const [recommended, setRecommended] = useState([]);
  const [search, setSearch] = useState("");
  let userFavs;
  // const [favourites, setFavourites] = useState([]);
  function setChange() {
    if (delBtn === 0) {
      setdelBtn(1);
    } else {
      setdelBtn(0);
    }
  }
  useEffect(() => {
    loadProducts();
    loadrecommended();
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", unloadCallback);
    setTimeout(() => {
      dispatch({ type: "CLEAR_UPDATES" });
    }, 1000);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, [updates]);

  const loadrecommended = async () => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: "http://localhost:4000/product/recommended",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        userFavs = response.data;
        setRecommended(userFavs);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  let item;

  const loadProducts = async () => {
    var config = {
      method: "get",
      url: "http://localhost:4000/product/all",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        item = response.data;
        setProduct(item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  function deleteItem(product) {
    var axios = require("axios");
    var data = JSON.stringify({
      id: product._id,
    });

    var config = {
      method: "delete",
      url: "http://localhost:4000/product/delete",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch({ type: "REMOVE", payload: response.data });
        toast.error(product.name, " deleted!");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // const handleInput = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setSearchTerm({...searchTerm ,[name]: value})
  // };
  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:0.5}}
    exit={{opacity:0}}
    >
    <div className="body">
      <AdminNavi />
        <p className="titles margin-top-10">All products</p>
      <Col lg="0">
      <div className="d-flex mb-3">
        <input
          className="form-control"
          style={{ minWidth: "300px" }}
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

      <Button className="mb-3 ml-3 mr-5" variant="danger" onClick={setChange}>
        {" "}
        <RiDeleteBin6Line />
      </Button>
      </div>
        </Col>
      <Row>
        {product.length > 0 &&
          product
            .filter((product) => {
              if (search == "") {
                return product;
              } else if (
                product.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return product;
              }
            })
            .map((product) => (
              <Col lg="3">
                  <motion.div layout>
                <div className="mb-3 ml-3 mr-3">
                  <Card
                    className="wd-100 flexRow"
                    style={{ minWidth: "300px" }}
                  >
                    <Card.Body >
                      <div className="d-flex">
                      <Card.Img
                        className="card-img-top"
                        variant="top"
                    style={{ minWidth: "100px" ,maxWidth:"100px" }}
                        src={product.img}
                      />
                      <div>
                      <Card.Text className="text bold p-1 m-0">{product.name}</Card.Text>
                      <Card.Text className="text p-0 m-0">{`₹${product.price}`}/-</Card.Text>
                      </div>
                      </div>
                      <Card.Text className="text">ID: {product._id}</Card.Text>
                      <Card.Text className="p-0 m-0" style={{ color:"#575653" , fontSize:"13px" }}>
                        {product.description}
                      </Card.Text>
                      <Card.Text className="text">
                        {product.veg ? (
                          <img
                            className="card-img-icon"
                            variant="top"
                            src={require("../Admin/assets/veg.jpg")}
                          />
                        ) : (
                          <img
                            src={require("../Admin/assets/nonveg.jpg")}
                            className="card-img-icon"
                          />
                        )}
                      </Card.Text>
                      <Card.Text className="text">
                        {product.description}
                      </Card.Text>
                      {delBtn ? (
                        <Button
                          variant="danger"
                          onClick={() => deleteItem(product)}
                        >
                          <RiDeleteBin6Line />
                        </Button>
                      ) : null}
                    </Card.Body>
                  </Card>
                </div>
                </motion.div>
              </Col>
            ))}
      </Row>
      <ToastContainer />
    </div>
    </motion.div>
  );
};
export default ListAllProduct;
