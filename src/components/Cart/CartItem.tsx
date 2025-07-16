import React from "react";
import { useDispatch } from "react-redux";
import {
  decrementCount,
  incrementCount,
  removeFromCart,
} from "../../redux/features/cart/cartSlice";
// import {removeFromCart}
export default function CartItem(props) {
  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch(incrementCount(props.id));
  }

  function handleDecrement() {
    dispatch(decrementCount(props.id));
  }
  function handleDeleteItem() {
    console.log("deleting item:", props.id);
    dispatch(removeFromCart(props.id));
  }
  return (
    <div className="flex shadow-sm rounded-sm items-center gap-2">
      <img className="h-32" src={props.images[0]} alt={props.description} />
      <div>
        <p>{props.title}</p>
        <p>$ {props.price}</p>
        <div>
          <button onClick={handleDecrement}>decrease</button>
          <p>x{props.quantity}</p>

          <button onClick={handleIncrement}>increase</button>
        </div>

        <button className="bg-red-300 p-2" onClick={handleDeleteItem}>
          delete
        </button>
      </div>
    </div>
  );
}
