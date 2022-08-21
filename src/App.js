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
import UpdateProfile from "./components/UpdateProfile";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDasboard from "./components/Admin/AdminDasboard";
import DeleteItem from "./components/Admin/DeleteItem";
import AdminProfile from "./components/Admin/AdminProfile";
import AdminActions from "./components/Admin/AdminActions";
import AddCategory from "./components/Admin/AddCategory";
import BlockUser from "./components/Admin/BlockUser";
import DeleteUser from "./components/Admin/DeleteUser";
import ListAllProduct from "./components/Admin/ListAllProduct";
import ListAllCategory from "./components/Admin/ListAllCategory";
import ListAllUsers from "./components/Admin/ListAllUsers";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/allcategory" element={<Allcategory />} />
          <Route path="/selectedcat" element={<CategorySelected />} />
          <Route path="/product" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users/display_favourites" element={<Favourites />} />
          <Route path="/product/veg" element={<Veg />} />
          <Route path="/product/nonveg" element={<Nonveg />} />
          <Route path="/user/checkout" element={<UserCart />} />
          <Route path="/orderhistory" element={<Orderhistory />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          {/* Admin routes */}
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admindasboard" element={<AdminDasboard />} />
          <Route path="/addItems" element={<AddItem />} />
          <Route path="/deleteItem" element={<DeleteItem />} />
          <Route path="/blockuser" element={<BlockUser />} />
          <Route path="/deleteuser" element={<DeleteUser />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/adminprofile" element={<AdminProfile />} />
          <Route path="/admindactions" element={<AdminActions />} />
          <Route path="/listallproduct" element={<ListAllProduct />} />
          <Route path="/listcategory" element={<ListAllCategory />} />
          <Route path="/listusers" element={<ListAllUsers />} />
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
