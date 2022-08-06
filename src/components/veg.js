import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import styles from "./Product.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Veg = () => {
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
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  let item;

  useEffect(() => {
    loadProducts();
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const token = localStorage.getItem("token");
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
        console.log(JSON.stringify(response.data));
        notify(x.name +" Added to favourites");
      })
      .catch(function (error) {
        if ((error = 409)) {
          console.log("Item already in fav");
        } else console.log(error);
      });
  }

  const loadProducts = async () => {
    var config = {
      method: "get",
      url: "http://localhost:4000/product/veg",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then(function (response) {
        item = response.data;
        setProduct(item);
        console.log(item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlecart = (x) => {
    console.log(x);
    dispatch({ type: "ADD_PRODUCT_TO_CART", payload: x });
  };
  // function RenderFunc() {
  return (
    <div>
      Veg Products
      <ul>
        <li>
          {" "}
          <NavLink to="/product">View All</NavLink> <t />
        </li>
      </ul>
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
                    onClick={() => handlecart(x)}
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
};
// return <RenderFunc />;
// };
export default Veg;
