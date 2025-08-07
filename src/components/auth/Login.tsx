import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, replace, useNavigate } from "react-router";
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showToast]);
  return (
    <div className="h-screen bg-[url(/public/images/login_bg7.jpg)] bg-cover bg-center lg:bg-none flex flex-col lg:flex-row">
      {/*  */}
      {/* <img src="/public/images/login_bg7.jpg" className="hidden lg:block" /> */}
      <img
        src="/public/images/login_bg7.jpg"
        className="w-full h-1/2 opacity-0 lg:w-1/2 lg:h-full lg:opacity-100 lg:object-cover"
      />
      <div className="second_half h-full backdrop-blur-sm lg:bg-red-100 w-full flex justify-center items-center p-8">
        <div className="loginform p-8 flex flex-col gap-4 p-2  transition-all duration-500 rounded-t-4xl overflow-hidden h-fit lg:gap-12 lg:bg-amber-950 lg:rounded-b-4xl">
          <h1 className="text-white text-center text-2xl">Welcome back!</h1>
          <input
            className="bg-white rounded-md w-64 placeholder:p-2 p-1 mt-4 mx-auto"
            placeholder="Email"
            id="email"
            ref={emailRef}
            type="email"
          />
          <input
            className="bg-white rounded-md w-64 placeholder:p-2 p-1 mx-auto"
            placeholder="Password"
            ref={passwordRef}
            type="password"
          />
          <button
            onClick={handleSubmit}
            className="bg-white w-fit py-2 px-8 mx-auto rounded-full cursor-pointer hover:bg-slate-200 active:bg-slate-300"
            type="submit"
          >
            Login
          </button>
          <p className="mx-auto text-white ">
            don't have an account?{" "}
            <Link to={"/signup"} className="text-slate-300 font-bold">
              Sign up now
            </Link>
          </p>
        </div>
      </div>

      {showToast && <div>{toastMessage}</div>}
    </div>
  );

  async function handleSubmit() {
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();
    try {
      if (email && password) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("login failed", error.message, error);
          setToastMessage("login failed");
          setShowToast(true);
        } else {
          console.log("login successfull", data);
          setToastMessage("login successfull");
          setShowToast(true);

          navigate("/", { replace: true });
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setToastMessage("login failed");
        setShowToast(true);
      }
    }
  }
}
