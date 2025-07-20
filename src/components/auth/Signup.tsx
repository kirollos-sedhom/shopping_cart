import React, { useEffect, useRef, useState, type FormEvent } from "react";

import { supabase } from "../../lib/supabaseClient";
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
    <div className="flex flex-col items-center gap-4 p-2">
      <h1 className="text-2xl">CarloClub</h1>
      <p>create an account</p>
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
        sign up
      </button>

      {showToast && <div>{toastMessage}</div>}
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
