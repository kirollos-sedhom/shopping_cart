import React from "react";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="p-4 flex justify-between">
      <Link to={"./"}>CarloClub</Link>

      <div className="flex gap-2">
        <p>Home</p>
        <p>About</p>
        <p>Shop</p>
        <p>Contact</p>
      </div>

      <Link to={"./cart"}>Cart</Link>
    </div>
  );
}
