const CartReduser = (state = [], action) => {
    switch (action.type) {
        case "ADD_PRODUCT_TO_CART":
            return state.concat(action.payload);
            case "REMOVE_PRODUCT_TO_CART":
                return state.filter((e) => {
                    return e?._id !== action?.payload;
                });
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
