import React from "react";

export default function CartItem(props) {
  return (
    <div className="flex shadow-sm rounded-sm items-center gap-2">
      <img className="h-32" src={props.images[0]} alt={props.description} />
      <div>
        <p>{props.title}</p>
        <p>$ {props.price}</p>
        <p>x{props.quantity}</p>
      </div>
    </div>
  );
}
