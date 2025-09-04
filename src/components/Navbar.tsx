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
  const isAdmin = useSelector((s: RootState) => s.auth.isAdmin);
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
          <div className="relative flex gap-2">
            <p className="group relative inline-block duration-300">
              {userName}

              <span
                className="absolute hidden group-hover:flex left-1/2 top-full mt-2 z-20 -translate-x-1/2 w-48 px-3 py-2 bg-gray-700 rounded-lg text-center text-white text-sm
    after:content-[''] after:absolute after:left-1/2 after:bottom-full after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-t-transparent after:border-b-gray-700 cursor-pointer"
                onClick={handleLogout}
              >
                Do you want to logout?
              </span>
              <div className="hidden group-hover:block fixed inset-0 bg-black/40 z-10 pointer-events-none"></div>
            </p>
            {isAdmin ? <Link to="/admin">Admin</Link> : null}

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
