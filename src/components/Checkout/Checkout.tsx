import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/app/store";
export default function Checkout() {
  const cart = useSelector((state: RootState) => state.cart);

  console.log(cart);
  return cart.items.length ? (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 p-2">
        <h1 className="text-xl font-bold mb-4">Billing information</h1>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="example@mail.com"
          className="border-1 rounded-md p-1"
        />

        <label htmlFor="phone">phone number</label>
        <input
          type="text"
          id="phone"
          placeholder="+20123456789"
          className="border-1 rounded-md p-1"
        />

        <label htmlFor="adress">Adress</label>
        <textarea
          id="adress"
          className="border-1 rounded-md p-1"
          placeholder="be as detailed as possible"
        ></textarea>
      </div>

      <div className="order-summary flex flex-col gap-2 p-4">
        <h2 className="text-xl font-bold mb-4">Order summary</h2>
        {cart.items.map((item) => {
          return (
            <div className="flex justify-between">
              <p>
                {item.title} x{item.quantity}
              </p>

              <p>{item.price * item.quantity}</p>
            </div>
          );
        })}

        <div className="flex justify-between">
          <p>shipping</p>
          <p>20</p>
        </div>

        <hr className="" />
        <div className="flex justify-between">
          <p>Due Amount</p>
          <p>{(cart.subtotal + 20).toFixed(2)}</p>
        </div>

        <button
          onClick={handleOrderPlaced}
          className="border-1 rounded-md p-2 mt-8 bg-slate-300 hover:bg-slate-400 active:bg-slate-500 cursor-pointer"
        >
          Place Order
        </button>
      </div>
    </div>
  ) : (
    <div>your cart is empty</div>
  );

  function handleOrderPlaced() {}
}
