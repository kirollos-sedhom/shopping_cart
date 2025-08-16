import React, { useState } from "react";
import { Link, Navigate, replace, useNavigate } from "react-router";
import { selectCartItemCount } from "../redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/app/store";
import { supabase } from "../lib/supabaseClient";
import { logOut } from "../redux/features/auth/authSlice";
export default function Navbar() {
  const cartSize = useSelector(selectCartItemCount);
  const user = useSelector((state: RootState) => state.auth.user);
  const userEmail = user?.email;
  const userName = userEmail?.substring(0, userEmail.indexOf("@"));

  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="p-4 flex justify-between shadow-sm">
      <Link to={"./"}>CarloClub</Link>

      <div className="flex gap-2">
        <Link to={"./"}>
          <p>Home</p>
        </Link>

        <Link to={"/shop"}>
          <p>Shop</p>
        </Link>

        {user ? (
          <div className="relative flex gap-2 border-2">
            <p
              onMouseEnter={() => setShowLogout(true)}
              onMouseLeave={() => setShowLogout(false)}
            >
              {userName}
            </p>{" "}
            {showLogout && (
              <p
                className="bg-green-500 absolute top-5 left-auto right-auto backdrop-opacity-50"
                onMouseEnter={() => setShowLogout(true)}
                onMouseLeave={() => setShowLogout(false)}
              >
                want to log out?
              </p>
            )}
            <p className="cursor-pointer" onClick={handleLogout}>
              Logout
            </p>
          </div>
        ) : (
          <Link to={"/login"}>
            <p>Login</p>
          </Link>
        )}
      </div>

      <Link to={"./cart"}>Cart: {cartSize}</Link>
    </div>
  );

  async function handleLogout() {
    await supabase.auth.signOut();
    dispatch(logOut());

    navigate("/", { replace: true });
  }
}
