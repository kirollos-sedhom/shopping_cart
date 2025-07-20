import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout";
import ProductDetails from "./components/Product/ProductDetails";
import Checkout from "./components/Checkout/Checkout";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

/*
todo:
homepage will have a nice navbar at the top, containing two routes. home and cart.
the home will contain data fetched from API
the data is just some products. every product in its card. the card should have the product image, name, and add to cart button

* when you visit the cart route, you should see all your cart items, their price, and a remove from cart button
  on the right there should be the calculated price of all products

*/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
