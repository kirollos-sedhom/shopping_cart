import React from "react";
import { Link } from "react-router";
import { selectCartItemCount } from "../redux/features/cart/cartSlice";
import { useSelector } from "react-redux";

export default function Navbar() {
  const cartSize = useSelector(selectCartItemCount);
  return (
    <div className="p-4 flex justify-between">
      <Link to={"./"}>CarloClub</Link>

      <div className="flex gap-2">
        <p>Home</p>
        <p>About</p>
        <p>Shop</p>
        <p>Contact</p>
      </div>

      <Link to={"./cart"}>Cart: {cartSize}</Link>
    </div>
  );
}
