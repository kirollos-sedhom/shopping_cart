import React from "react";
import { useDispatch } from "react-redux";
import {
  decrementCount,
  incrementCount,
  removeFromCart,
} from "../../redux/features/cart/cartSlice";
import { div } from "framer-motion/client";
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
    <div className="flex shadow-sm rounded-sm items-center justify-between p-2 hover:shadow-xl gap-2">
      <img
        className="w-32 h-32 object-cover"
        src={props.images[0]}
        alt={props.description}
      />
      <p>{props.title}</p>
      <p>$ {props.price}</p>
      <div className="controls flex items-center p-2 gap-2">
        <p className="text-4xl cursor-pointer" onClick={handleDecrement}>
          -
        </p>
        <p className="text-xl">{props.quantity}</p>
        <p className="text-4xl cursor-pointer" onClick={handleIncrement}>
          +
        </p>
      </div>

      <p
        className="font-bold text-red-500 cursor-pointer"
        onClick={handleDeleteItem}
      >
        X
      </p>
    </div>
    // <div className="flex shadow-sm rounded-sm items-center gap-2">
    //   <img className="h-32" src={props.images[0]} alt={props.description} />
    //   <div>
    //     <p>{props.title}</p>
    //     <p>$ {props.price}</p>
    //     <div>
    //       <button onClick={handleDecrement}>decrease</button>
    //       <p>x{props.quantity}</p>

    //       <button onClick={handleIncrement}>increase</button>
    //     </div>

    //     <button className="bg-red-300 p-2" onClick={handleDeleteItem}>
    //       delete
    //     </button>
    //   </div>
    // </div>
  );
}
