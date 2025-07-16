import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { type ProductType } from "../Product/ProductDetails";
import Product from "../Product/Product";
import CartItem from "./CartItem";
export default function Cart() {
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(state.items);
  return (
    <div className="p-4 md:flex md:items-end md:gap-4">
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

      <p className="mt-4">total price:{state.subtotal.toFixed(2)}</p>
    </div>
  );
}
