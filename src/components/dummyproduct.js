import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import styles from "./dummy.css";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navi from "./Navi";
const Dummy = () => {
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
  const favourites = useSelector((state) => state?.FavouritesReduser);
  const updates = useSelector((state) => state?.UpdatesReduser);
  console.log("cartData", cartData);
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  let item;

  useEffect(() => {
    loadProducts();
    loadFavouritess();
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
        notify(x.name + " Added to favourites");
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
        // userFavs = response.data ;
        // setFavourites(userFavs);
        dispatch({ type: "GET_FAV_LIST", payload: response.data });
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
        dispatch({ type: "ADDED", payload: response.data });

        notify(x.name + " Added to favourites");
      })
      .catch(function (error) {
        if ((error = 409)) {
          notify("Something went wrong. Please try again.");
        } else console.log(error);
      });
  }

  function removeFav(x) {
    var axios = require("axios");
    var data = JSON.stringify({
      id: x,
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
        dispatch({ type: "REMOVE", payload: response.data });
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handlecart = (x) => {
    console.log(x);
    dispatch({ type: "ADD_PRODUCT_TO_CART", payload: x });
  };
  function RenderFunc() {
    return (
      <body>
        <div className="html">
          {/* main */}
          <div className="container">
            {/* title */}
            <h3 className="title">Dummy Products</h3>
            {/* sub */}
            <div className="products-container">
              {product.length > 0 &&
                product.map((x) => (
                  // product
                  <div className="product">
                    {/* img */}
                    <Card.Img
                      className="card-img-top"
                      variant="top"
                      src={require("../assets/burger.jpg")}
                    />
                    {/* product title */}
                    <h3>{x.name}</h3>
                    <p>{x.description}</p>
                    <div>{x.veg ? "Veg" : "Non Veg"}</div>
                    {/* price  */}
                    <div className="price">₹. {x.price}/-</div>
                    <div className="buttons">
                      <div>
                        {cartData.filter((d) => d._id == x._id).length === 1 ? (
                          <div className="plusminus">
                            <Button
                              variant="light"
                              className="w-100 btn btn-outline-dark btns"
                            >
                              +
                            </Button>
                            {cartData.filter((obj) => obj._id === x._id).length}
                            <Button
                              variant="light "
                              className="w-100 btn btn-outline-dark btns"
                            >
                              -
                            </Button>
                          </div>
                        ) : (
                          <Button
                            onClick={() => handlecart(x)}
                            variant="danger"
                            className="btns"
                          >
                            Add to cart
                          </Button>
                        )}
                        {favourites.filter((d) => d._id === x._id).length ===
                        1 ? (
                          <Button
                            onClick={() => removeFav(x._id)}
                            variant="light"
                            className="btn btn-outline-dark btns"
                          >
                            Remove from Favourites
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleFav(x)}
                            variant="danger"
                            className="btns"
                          >
                            Add to Favourites
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <ToastContainer />
          </div>
        </div>
      </body>
    );
  }
  return <RenderFunc />;
};
export default Dummy;

//   <div>
//   <Card className="bgcard" style={{ minWidth: "400px" }}>
//     <Card.Body>
//       <Card.Img
//         className="card-img-top"
//         variant="top"
//         src={require("../assets/burger.jpg")}
//       />
//       <Card.Text>{x.name}</Card.Text>
//       <Card.Text>{`₹${x.price}`}</Card.Text>
//       <Card.Text>{x.veg ? "Veg" : "Non Veg"}</Card.Text>
//       <Card.Text>{x.description}</Card.Text>
//       <div>
//       {cartData.filter((d) => d._id == x._id).length === 1 ? (
//                 <div>
//                 <Button
//                 // onClick={() => }
//                 variant="danger"
//                 className="w-100 buttons">
//                 +
//               </Button>
//               <Button
//                 // onClick={() =>}
//                 variant="danger"
//                 className="w-100 buttons">
//               -
//               </Button>
//               </div>
//             ) : (
//               <Button
//               onClick={() => handlecart(x)}
//                 variant="danger"
//                 className="w-100 buttons"
//               >
//                 Add to cart
//               </Button>
//             )}
//         {favourites.filter((d) => d._id === x._id).length === 1 ? (
//               <Button
//                 onClick={() => removeFav(x._id)}
//                 variant="danger"
//                 className="w-100 buttons"
//               >
//                 Remove from Favourites
//               </Button>
//             ) : (
//               <Button
//                 onClick={() => handleFav(x)}
//                 variant="danger"
//                 className="w-100 buttons"
//               >
//                 Add to Favourites
//               </Button>
//             )}
//       </div>
//     </Card.Body>
//   </Card>
// </div>
