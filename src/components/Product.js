import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import styles from "./Product.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Product = () => {
  const token = localStorage.getItem("token");
  const notify = (noti) =>
    toast.info(noti, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  const cartData = useSelector((state) => state?.CartReduser);
  console.log("cartData", cartData);
  const dispatch = useDispatch();
  const [recommended, setRecommended] = useState([]);
  let userFavs;
  useEffect(() => {
    loadrecommended();
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

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

  useEffect(() => {
    loadProducts();
  }, []);

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

  function handleFav(x) {
    var axios = require("axios");
    var data = JSON.stringify({
      id: x._id,
    });

    var config = {
      method: "post",
      url: "http://localhost:4000/users/add_favourites",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        notify(x.name+" Added to favourites");
      })
      .catch(function (error) {
        if ((error = 409)) {
          notify("Something went wrong. Please try again.");
        } else console.log(error);
      });
  }
  const handlecart = (x) => {
    dispatch({ type: "ADD_PRODUCT_TO_CART", payload: x });
    notify(x.name + "Added to your cart")
  };
  function RenderFunc() {
    return (
      <div>
        Products
       
        {/* <ul>
          <li>
            {" "}
            <NavLink to="/users/display_favourites">
              View favourites
            </NavLink>{" "}
            <t />
          </li>
          <li>
            <NavLink to="/product/veg">Veg</NavLink>
          </li>
          <li>
            <NavLink to="/product/nonveg">Non Veg</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/user/cart">Cart <>{cartData.length}</></NavLink>
          </li>
        </ul> */}
        <div >
          <p>Recommended</p>
        </div>
        {recommended.length > 0 &&
          recommended.map((x) => (
            <div >
              <Card className="bgcard" style={{ minWidth: "400px" }}>
                <Card.Body >
                  <Card.Img
                    className="card-img-top"
                    variant="top"
                    src={require("../assets/burger.jpg")}
                  />
                  <Card.Text>{x.name}</Card.Text>
                  <Card.Text>{`₹${x.price}`}</Card.Text>
                  <Card.Text>{x.veg ? "Veg" : "Non Veg"}</Card.Text>
                  <Card.Text>{x.description}</Card.Text>
                  <div>
                    <Button
                      onClick={() => handlecart(x)}
                      variant="danger"
                      className="w-100 btns buttons cartBtn"
                    >
                      Add to cart{" "}
                    </Button>
                    <Button
                      onClick={() => handleFav(x)}
                      variant="danger"
                      className="w-100 buttons"
                    >
                      Add to Favourites{" "}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        <div className="active">
          <p>All products</p>
        </div>
        {product.length > 0 &&
          product.map((x) => (
            <div>
              <Card className="bgcard" style={{ minWidth: "400px" }}>
                <Card.Body>
                  <Card.Img
                    className="card-img-top"
                    variant="top"
                    src={require("../assets/burger.jpg")}
                  />
                  <Card.Text>{x.name}</Card.Text>
                  <Card.Text>{`₹${x.price}`}</Card.Text>
                  <Card.Text>{x.veg ? "Veg" : "Non Veg"}</Card.Text>
                  <Card.Text>{x.description}</Card.Text>
                  <div>
                    <Button
                      onClick={() => handlecart({ x })}
                      variant="danger"
                      className="w-100 btns"
                    >
                      Add to cart{" "}
                    </Button>
                    <Button
                      onClick={() => handleFav(x)}
                      variant="danger"
                      className="w-100"
                    >
                      Add to Favourites{" "}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        <ToastContainer />
      </div>
    );
  }
  return <RenderFunc />;
};
export default Product;
