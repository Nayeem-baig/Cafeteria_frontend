import './App.css';
import { BrowserRouter, Route , Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Product from './components/Product';
import Profile from './components/Profile';
import Favourites from './components/favourites';
import AddItem from './components/Admin/AddItem';
import Recommended from './components/Recommended';

function App() {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/product" element={<Product/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/users/display_favourites" element={<Favourites/>}/>
      <Route path="/addItems" element={<AddItem/>}/>
      <Route path="/recommended" element={<Recommended/>}/>
    </Routes>
    </BrowserRouter>
)}

export default App;
