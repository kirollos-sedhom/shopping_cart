import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import ToastComponent from "../ToastComponent";

export const ReusableToast = (props) => {
  const [backGroundColor, setBackGroundColor] = useState(() => {
    if (props.type === "error") {
      return "bg-red-100";
    } else if (props.type === "success") {
      return "bg-green-100";
    } else {
      return "bg-blue-100";
    }
  });
  const [borderColor, setBorderColor] = useState(() => {
    if (props.type === "error") {
      return "border-red-500";
    } else if (props.type === "success") {
      return "border-green-500";
    } else {
      return "border-blue-500";
    }
  });

  return (
    <AnimatePresence>
      {props.showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
          className="fixed bottom-4 w-full z-50"
        >
          <div
            className={`border-1 ${borderColor} ${backGroundColor} w-fit p-2 rounded-md m-auto`}
          >
            {props.message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
