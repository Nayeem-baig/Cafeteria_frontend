import './App.css';
import { BrowserRouter, Route , Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Product from './components/Product';
import Profile from './components/Profile';
import Favourites from './components/favourites';
import AddItem from './components/Admin/AddItem';
import Veg from './components/veg';
import Nonveg from './components/Vonveg';
import UserCart from './components/UserCart';



function App() {
  return ( 
    // <CartProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/product" element={<Product/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/users/display_favourites" element={<Favourites/>}/>
      <Route path="/addItems" element={<AddItem/>}/>
      <Route path="/product/veg" element={<Veg/>}/>
      <Route path="/product/nonveg" element={<Nonveg/>}/>
      <Route path="/user/cart" element={<UserCart/>}/>
    </Routes>
    </BrowserRouter>
    // </CartProvider>
)}

export default App;
