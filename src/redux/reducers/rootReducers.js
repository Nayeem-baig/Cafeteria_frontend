import { combineReducers } from "redux";
import CartReduser from "./CartReduser";
import FavouritesReduser from "./FavouritesReducer";
import UpdatesReduser from "./UpdatesReducer";

const rootReducer = combineReducers({
  CartReduser,
  FavouritesReduser,
  UpdatesReduser,
});

export default rootReducer;
