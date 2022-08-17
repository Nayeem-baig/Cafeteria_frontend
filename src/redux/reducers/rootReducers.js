import { combineReducers } from "redux";
import CartReduser from "./CartReduser";
import FavouritesReduser from "./FavouritesReducer";
import UpdatesReduser from "./UpdatesReducer";
import SelectCategory from "./SelectCategory";
import TotalReducer from "./TotalReducer";
const rootReducer = combineReducers({
  CartReduser,
  FavouritesReduser,
  UpdatesReduser,
  SelectCategory,
TotalReducer,
});

export default rootReducer;
