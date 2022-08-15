import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Product from "./components/Product";
import Profile from "./components/Profile";
import Favourites from "./components/favourites";
import AddItem from "./components/Admin/AddItem";
import Veg from "./components/veg";
import Nonveg from "./components/Nonveg";
import UserCart from "./components/UserCart";
import Navi from "./components/Navi";
import Dummy from "./components/dummyproduct";
import Allcategory from "./components/Allcategory";
import CategorySelected from "./components/CategorySelected";
import Orderhistory from "./components/Orderhistory";

function App() {
  return (
    <div>
    <BrowserRouter>
    {/* {localStorage.getItem('token') === null && <Login/>} */}
    {/* {localStorage.getItem('token') !== null && <Navi/>} */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allcategory" element={<Allcategory />} />
        <Route path="/selectedcat" element={<CategorySelected />} />
        <Route path="/product" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users/display_favourites" element={<Favourites />} />
        <Route path="/addItems" element={<AddItem />} />
        <Route path="/product/veg" element={<Veg />} />
        <Route path="/product/nonveg" element={<Nonveg />} />
        <Route path="/user/checkout" element={<UserCart />} />
        <Route path="/orderhistory" element={<Orderhistory />} />
      </Routes>
    </BrowserRouter>
    </div>
    // <CartProvider>
    // </CartProvider>
  );
}

export default App;
