import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
const Checkout_btn = () => {
  let amount;
  // (function (){
  //   for(let i = 0 ; i <= cartData.length ; i++){
  //     amount = cartData.price [i] + cartData.price[i+1]
  //   }
  //   return amount;
  // })();
  const cartData = useSelector((state) => state?.CartReduser);    
  return (
    <div>
      <Button variant="danger" className="w-100 btns">
        Checkout {cartData.length}
      </Button>
    </div>
  );
};

export default Checkout_btn;
