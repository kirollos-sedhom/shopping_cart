import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { type ProductType } from "./Product/ProductDetails";
import Product from "./Product/Product";
export default function Cart() {
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(state.items);
  return (
    <div>
      {state.items.map((item, index) => {
        return (
          <div>
            <img src={item.images[0]} alt={item.description} />

            <p>{item.title}</p>
            <p>{item.price}</p>
            <p>x{item.quantity}</p>
          </div>
        );
      })}
      {/* cart */}
    </div>
  );
}
