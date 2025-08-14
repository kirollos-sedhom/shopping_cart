import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout";
import ProductDetails from "./components/Product/ProductDetails";
import Checkout from "./components/Checkout/Checkout";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

import { supabase } from "./lib/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/features/auth/authSlice";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import AllProducts from "./components/Product/AllProducts";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function handleUserSession() {
      const { data, error } = await supabase.auth.getSession();
      /*
        This is an async call that checks if a user is already logged in (based on the token stored in browser storage).

        data.session contains the user info if logged in.

        data.session.user gives you the user object you care about.

      */

      if (data.session?.user) {
        dispatch(setUser(data.session.user));
      } else {
        dispatch(setUser(null));
      }
    }

    handleUserSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      handleUserSession();
    });

    /* 
      This is object destructuring with renaming.

      You're doing two things at once:

      Extracting the data property from the object

      Giving it a new name: authListener */

    /*
      This sets up a real-time listener.

      It runs the callback whenever the login/logout status changes.

      You clean it up later to prevent memory leaks.


    */
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<AllProducts />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
