import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { type ProductType } from "../Product/ProductDetails";
import Product from "../Product/Product";
import { IoCartSharp } from "react-icons/io5";

import CartItem from "./CartItem";
import { Link } from "react-router";
export default function Cart() {
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(state.items);
  return (
    <div className="p-4 md:flex md:items-start md:gap-4">
      <div className="flex flex-col gap-4 md:w-3/4">
        {state.items.map((item, index) => {
          return (
            <CartItem
              images={item.images}
              description={item.description}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
              id={item.id}
            />
          );
        })}
      </div>

      <div className="border-1 border-slate-500/50 p-4 md:w-1/4 flex flex-col items-center">
        <p className="mt-4">total price: {state.subtotal.toFixed(2)}</p>
        <Link to={"/checkout"}>
          <p className="bg-slate-400 w-fit px-4 py-2 rounded-md mt-4">
            checkout
          </p>
        </Link>
      </div>
    </div>
  );
}
