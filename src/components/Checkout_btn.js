import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import styles from "./Product.css";
const Checkout_btn = () => {
  let amount = 0;
  const cartData = useSelector((state) => state?.CartReduser);
  console.log(cartData)
  const amt =() =>{
    for(let i = 0 ; i < cartData.length ; i++){
      amount = amount + cartData[i].price * cartData[i].cartQuantity;
    }
    return amount
  };
  amount = 0;
  function checkout (cartData){
    console.log("orders",cartData)
  }
  return (
    <div className="titlesCart">
      <p className="titlesCart">Sub Amount: ₹{amt()}/-</p>
      <p className="titlesCart">Discount : 5%  - {amount *0.05}/-</p>
      <p className="titlesCart">Taxes & Charges : 9%  + {amount *0.09}/-</p>
      <p className="titlesCart">Total Amount: ₹{amount + amount *0.09 - amount*0.05}/-</p>
      <div className="">
      <Button onClick={checkout(cartData)} variant="light" className="m-10 justify-content-center align-items-center">
        Checkout {cartData.length}
      </Button>
      <Button variant="danger" className="m-10 justify-content-center align-items-center">
        Pay {amount + amount *0.09 - amount*0.05}/-
      </Button>
      </div>
    </div>
  );
};

export default Checkout_btn;
