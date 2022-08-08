import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
const Checkout_btn = () => {
  let amount = 0;
  const cartData = useSelector((state) => state?.CartReduser);
  console.log(cartData)
  const amt=() =>{
    for(let i = 0 ; i < cartData.length ; i++){
      amount = amount + cartData[i].price
    }
    return amount;
  };
  return (
    <div>
      <Button variant="danger" className="w-100 btns">
        Checkout {cartData.length}
      </Button>
      <p>Total Amount {amt()}</p>
    </div>
  );
};

export default Checkout_btn;
