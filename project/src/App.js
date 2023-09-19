import toast, { Toaster } from "react-hot-toast";

import "./App.css";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Cart from "./components/Cart";
import MyOrders from "./screens/Profile";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./screens/Signup";
import { CartProvider } from "./components/ContextReducer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/profile" element={<MyOrders />} />
          </Routes>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </Router>
    </CartProvider>
  );
}

export default App;
