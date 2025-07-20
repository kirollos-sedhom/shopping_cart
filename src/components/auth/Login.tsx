import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
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
    <div className="flex flex-col items-center gap-4 p-2">
      <h1 className="text-2xl">CarloClub</h1>
      <p>Login</p>
      <input
        className="border-1 placeholder:p-2"
        placeholder="email"
        ref={emailRef}
        type="email"
      />
      <input
        className="border-1 placeholder:p-2"
        placeholder="password"
        ref={passwordRef}
        type="password"
      />
      <button
        onClick={handleSubmit}
        className="border-1 p-2 cursor-pointer hover:bg-slate-200 active:bg-slate-300"
        type="submit"
      >
        Login
      </button>
      <p>
        don't have an account? <Link to={"/signup"}>Sign up now</Link>
      </p>
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
