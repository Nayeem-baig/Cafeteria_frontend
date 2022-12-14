import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import styles from "./Product.css";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import { BsWallet2, BsFillBagCheckFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

const Checkout_btn = () => {
  let amount = 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const cartData = useSelector((state) => state?.CartReduser);
  const totalAmount = useSelector((state) => state?.TotalReduser);
  const amt = () => {
    for (let i = 0; i < cartData.length; i++) {
      amount = amount + cartData[i].price * cartData[i].cartQuantity;
    }
    // dispatch({ type: "TOTAL", payload: amount });
    return amount;
  };
  amount = 0;

  return (
    <div>
      <div className="titlesCart">
        <p className="titlesCart">Sub Amount: ₹{amt()}/-</p>
        <p className="titlesCart">
          Discount : 5% - ₹{Math.floor(amount * 0.05)}/-
        </p>
        <p className="titlesCart">
          Taxes & Charges : 9% + ₹{Math.floor(amount * 0.09)}/-
        </p>
        <p className="titlesCart">
          Total Amount: ₹{Math.floor(amount + amount * 0.09 - amount * 0.05)}
          /-
        </p>

        <div className="">
          <Button
            onClick={() => checkout(cartData)}
            variant="light"
            className="m-10 justify-content-center align-items-center"
          >
            Checkout {cartData.length} <BsFillBagCheckFill />
          </Button>
          <Button
            onClick={() => toast("Online payment option coming soon")}
            variant="danger"
            className="m-10 justify-content-center align-items-center"
          >
            Pay {Math.floor(amount + amount * 0.09 - amount * 0.05)}/-
            <BsWallet2 />
          </Button>
        </div>
      </div>
    </div>
  );

  function checkout(cartData) {
    var axios = require("axios");
    const table = localStorage.getItem("table");
    var data = JSON.stringify({
      order: cartData,
      total: Math.floor(amount + amount * 0.09 - amount * 0.05),
      table: table,
    });

    var config = {
      method: "post",
      url: "http://localhost:4000/orders",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        toast(response.data);
        dispatch({ type: "CLEAR_CART", payload: "claer" });
        navigate("/allcategory");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

export default Checkout_btn;
