import React from "react";

export default function ToastComponent(props) {
  return (
    <div className="absolute bottom-0 w-full">
      <div className="border-1 border-green-500 bg-green-100 w-fit p-2 rounded-md m-auto">
        {props.message}
      </div>
    </div>
  );
}
