import React, { useEffect, useState } from "react";
import Product from "./Product/Product";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router";
import { FaRegStar } from "react-icons/fa";
import { PiTreeEvergreenBold } from "react-icons/pi";
import { IoIosColorPalette } from "react-icons/io";

type ClothingItem = {
  id: number;
  images: string[];
  price: number;
  description: string;
  title: string;
  discount: number;
};
export default function Home() {
  return (
    <div className="p-4">
      <section className="w-full relative">
        <img
          className="w-full h-[60vh] object-cover md:h-[80vh] rounded-lg"
          src="/images/login_bg9.jpg"
          alt="hero image"
        />

        <div className="absolute bottom-1/8 left-1/8 flex flex-col gap-2">
          <h1 className="text-4xl p-2 text-white bg-slate-800/50">
            Unmatched Elegance
          </h1>

          <Link to={"/shop"} className="bg-white px-4 py-2 rounded-md w-fit">
            Shop now
          </Link>
        </div>
      </section>

      {/* 
      //todo: add featured items
      <section className="featured">
        <p>featured items here</p>
      </section> */}
      <section className="Quote my-10">
        <h2 className="font-Libertinus text-2xl my-8 text-center max-w-8/10 md:max-w-1/2 mx-auto">
          Our Purpose is to inspire a better way of living by creating conscious
          products that last through time.
        </h2>
        <p className="text-center">
          By combining innovation with eco-friendly porcesses, we strive to help
          shape a cleaner, healthier, and more mindful world where human
          progress is in harmony wiht the planet's well-being.
        </p>

        <div className="benefits flex flex-col items-center justify-center my-4 gap-4 md:flex-row">
          <div className="flex gap-2">
            <FaRegStar className="fill-yellow-800 size-6" />
            <p>atelier-grade materials</p>
          </div>

          <div className="flex flex gap-2">
            <PiTreeEvergreenBold className="fill-yellow-800 size-6" />
            <p>sustainable and luxury</p>
          </div>

          <div className="flex flex gap-2">
            <IoIosColorPalette className="fill-yellow-800 size-6" />
            <p>design in-house values</p>
          </div>
        </div>
      </section>
    </div>
  );
}
