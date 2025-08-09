import { useEffect, useRef, useState } from "react";

import { supabase } from "../../lib/supabaseClient";
import { Link } from "react-router";
export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showToast]);
  return (
    <div className="flex flex-col h-screen bg-[url(/public/images/login_bg5.jpg)] bg-cover bg-center lg:flex-row lg:bg-none">
      <img
        src="/public/images/login_bg5.jpg"
        alt="fashion model"
        className="h-1/2 opacity-0 lg:opacity-100 lg:h-full lg:w-1/2 lg:object-cover"
      />
      <div className="flex flex-col items-center gap-4 p-2 backdrop-blur-sm rounded-md p-8 justify-center items-center w-full h-full lg:bg-red-200">
        <div className="loginform p-8 flex flex-col gap-4 items-center transition-all duration-500 lg:bg-red-400 lg:rounded-xl lg:gap-8">
          <h1 className="text-2xl">CarloClub</h1>
          <p>Create an account</p>
          <input
            className="placeholder:p-2 p-1 mt-4 w-64 bg-white rounded-md"
            placeholder="Email"
            ref={emailRef}
            type="email"
          />
          <input
            className="placeholder:p-2 p-1  w-64 bg-white rounded-md"
            placeholder="password"
            ref={passwordRef}
            type="password"
          />
          <button
            onClick={handleSubmit}
            className="px-8 py-2 bg-white rounded-full cursor-pointer hover:bg-slate-200 active:bg-slate-300"
            type="submit"
          >
            sign up
          </button>
          <p>
            already have an account?{" "}
            <Link className="font-bold" to={"/login"}>
              Login now
            </Link>
          </p>
        </div>

        {showToast && <div>{toastMessage}</div>}
      </div>
    </div>
  );

  async function handleSubmit() {
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    try {
      if (email && password) {
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
          console.error("signup failed", error.message, error);
          setToastMessage("signup failed");
          setShowToast(true);
        } else {
          console.log("signup successfull", data);
          setToastMessage("signup successfull");
          setShowToast(true);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setToastMessage("signup failed");
        setShowToast(true);
      }
    }
  }
}

/*
todo: change toast color based on success/fail 

todo: handle early submission, maybe disable button

todo: add animation, maybe using framer motion

? maybe loading state
? maybe keyboard accessibility

*/
