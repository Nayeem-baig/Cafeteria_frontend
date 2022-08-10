function increase(qunatity) {
  return qunatity + 1;
}
function decrease(qunatity) {
  return qunatity - 1;
}

const CartReduser = (state = [], action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART":
      const tempProduct = { ...action.payload, cartQuantity: 1 };
      return state.concat(tempProduct);
    case "ADD":
      const objIndex = state.findIndex((obj) => obj._id === action.payload);
      state[objIndex].cartQuantity = increase(state[objIndex].cartQuantity);
      return state;
    case "SUB":
      const objInde = state.findIndex((obj) => obj._id === action.payload);
      if (state[objInde].cartQuantity === 0) {
        // if cartquantity is  1 then replace - button action with REMOVE_PRODUCT_TO_CART if its greater than 1 call decrease function
      }
      state[objInde].cartQuantity = decrease(state[objInde].cartQuantity);
      return state;
    case "REMOVE_PRODUCT_FROM_CART":
      return state.filter((e) => e?._id !== action?.payload);
    default:
      return state;
  }
};
export default CartReduser;

// case 'ADD_PRODUCT_TO_CART':
//     return state.map((d)=> {
//         if(action.payload._id !== state._id){
//             return state.concat(action.payload)
//         } else if (state.length == 0 ){

//             return action.payload;
//         }
//         else {

//         }
//     })
