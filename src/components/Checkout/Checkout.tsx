import React, {
  useEffect,
  useRef,
  useState,
  type MouseEventHandler,
} from "react";
import type { MouseEvent } from "react";
import emailjs from "emailjs-com";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import type { RootState } from "../../redux/app/store";
import { clearCart } from "../../redux/features/cart/cartSlice";
import ModalComponent from "../ModalComponent";
import ToastComponent from "../ToastComponent";

import { motion, AnimatePresence } from "framer-motion";

export default function Checkout() {
  const cart = useSelector((state: RootState) => state.cart);
  const formRef = useRef<HTMLFormElement>(null);
  const [userEmail, setUserEmail] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowToast(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [showToast]);
  console.log(cart);

  return (
    <>
      {cart.items.length ? (
        <form
          ref={formRef}
          className="flex flex-col"
          onSubmit={handleOrderPlaced}
        >
          <div className="flex flex-col gap-2 p-2">
            <h1 className="text-xl font-bold mb-4">Billing information</h1>

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="to_email"
              value={userEmail}
              onChange={(val) => setUserEmail(val.target.value)}
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

            <label htmlFor="address">Adress</label>
            <textarea
              id="address"
              className="border-1 rounded-md p-1"
              placeholder="be as detailed as possible"
            ></textarea>
          </div>

          <div className="order-summary flex flex-col gap-2 p-4">
            <h2 className="text-xl font-bold mb-4">Order summary</h2>
            {cart.items.map((item, index) => {
              return (
                <div key={index} className="flex justify-between">
                  <p>
                    {item.title} x{item.quantity}
                  </p>

                  <p>{(item.price * item.quantity).toFixed(2)}</p>
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
              type="submit"
              className="border-1 rounded-md p-2 mt-8 bg-slate-300 hover:bg-slate-400 active:bg-slate-500 cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h1>your cart is empty</h1>
        </div>
      )}

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            className="fixed bottom-4 w-full z-50"
          >
            <ToastComponent message="Thanks for your order!" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  function handleOrderPlaced(e: React.FormEvent) {
    // todo : fix emailjs logic
    e.preventDefault();
    dispatch(clearCart());
    setShowToast(true);
    console.log("user email", userEmail);
    const params = {
      subject: "CarloCart Receipt",
      customer: "customer name",
      to_email: userEmail,
      name: "CarloCart",
      email: userEmail,
    };
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        params,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log("email sent", response.status, response.text);
        },
        (error) => {
          console.log("failed", error);
        }
      );
    // e.preventDefault();
    // if (!formRef.current) return;
    // emailjs
    //   .sendForm(
    //     import.meta.env.VITE_EMAILJS_SERVICE_ID,
    //     import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    //     formRef.current,
    //     import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    //   )
    //   .then(() => {
    //     console.log("email sent");
    //   })
    //   .catch((error) => {
    //     console.log("email not sent", error);
    //   });
  }
}
