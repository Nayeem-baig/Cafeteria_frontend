import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import styles from "./Product.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navi from "./Navi";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Favourites = () => {
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
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const cartData = useSelector((state) => state?.CartReduser);
  console.log("cartData", cartData);
  const dispatch = useDispatch();
  const [favourites, setFavourites] = useState([]);
  let userFavs;
  let item;
  useEffect(() => {
    loadFavouritess();
    // const unloadCallback = (event) => {
    //   event.preventDefault();
    //   event.returnValue = "";
    //   return "";
    // };
    // window.addEventListener("beforeunload", unloadCallback);
    // return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const loadFavouritess = async () => {
    var config = {
      method: "get",
      url: "http://localhost:4000/users/display_favourites",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        userFavs = response.data;
        setFavourites(userFavs);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const removeFav = (x) => {
    var axios = require("axios");
    var data = JSON.stringify({
      id: x._id,
    });

    var config = {
      method: "delete",
      url: "http://localhost:4000/users/del_favourites",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        notify(x.name + " Removed from your favourites");
        console.log(JSON.stringify(response.data));
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handlecart = (x) => {
    dispatch({ type: "ADD_PRODUCT_TO_CART", payload: x });
  };
  console.log(favourites);
  function RenderFunc() {
    return (
      <div>
        <div>
        <Navi/>
        </div>
        Favourites
        {favourites.length > 0 &&
          favourites.map((x) => (
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
                      onClick={() => handlecart(x)}
                      variant="danger"
                      className="w-100 btns"
                    >
                      Add to cart{" "}
                    </Button>
                    <Button
                      onClick={() => removeFav(x)}
                      variant="danger"
                      className="w-100"
                    >
                      Remove Favourite
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
export default Favourites;
