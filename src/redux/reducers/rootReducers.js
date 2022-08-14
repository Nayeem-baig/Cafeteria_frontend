import { combineReducers } from "redux";
import CartReduser from "./CartReduser";
import FavouritesReduser from "./FavouritesReducer";
import UpdatesReduser from "./UpdatesReducer";
import SelectCategory from "./SelectCategory";

const rootReducer = combineReducers({
  CartReduser,
  FavouritesReduser,
  UpdatesReduser,
  SelectCategory,
});

export default rootReducer;
