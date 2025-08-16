import React, { useState } from "react";
import "../../index.css";
import { Link } from "react-router";
type Props = {
  id: number;
  images: string[];
  price: number;
  discount: number;
  description: string;
  title: string;
};
export default function Product({
  id,
  images,
  price,
  title,
  description,
  discount,
}: Props) {
  const [displayedImage, setDisplayedImage] = useState(0);

  // const [randomDescription] = useState(() =>
  //   Math.floor(Math.random() * clothingDescriptions.length)
  // );

  const [discountedPrice] = useState(
    (((100 - discount) / 100) * price).toFixed(2)
  );

  return (
    <Link
      onMouseOver={() => setDisplayedImage(1)}
      onMouseOut={() => setDisplayedImage(0)}
      className="bg-white rounded-lg ring ring-teal-900 hover:shadow-lg transition w-full max-w-sm mx-auto overflow-hidden cursor-pointer"
      to={`/products/${id}`}
    >
      <div className="h-72 w-full overflow-hidden relative">
        <img
          src={images[0]}
          alt={title}
          className={`absolute top-0 left-0 w-full h-full object-cover object-[center_20%] transition-opacity duration-500 ${
            displayedImage === 0 ? "opacity-100" : "opacity-0"
          }`}
        />
        <img
          src={images[1]}
          alt={title}
          className={`absolute top-0 left-0 w-full h-full object-cover object-[center_20%] transition-opacity duration-500 ${
            displayedImage === 1 ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <p className="font-festina">{title}</p>
        <p className="font-instrument">{description}</p>
        <div className="font-instrument flex gap-4 items-center">
          <p className="text-lg">$ {discountedPrice}</p>
          <p>
            <del className="text-slate-900/50 text-sm">$ {price}</del>
          </p>
        </div>
      </div>
    </Link>
  );
}
const clothingDescriptions = [
  // ✨ Timeless & Elegant
  "Timeless elegance for every day.",
  "Style that never fades.",
  "Classic details with a modern twist.",
  "Elegance reimagined for today.",
  "Where tradition meets trend.",
  "Refined, relaxed, and ready to wear.",
  "Tailored to stand the test of time.",
  "Grace in every line.",
  "A refined staple for any wardrobe.",
  "Clean cuts, quiet luxury.",

  // 🧵 Craftsmanship & Quality
  "Crafted for comfort, styled for impact.",
  "Where form meets function.",
  "Every stitch tells a story.",
  "Precision tailoring meets modern wear.",
  "Quality you can feel.",
  "Built to be your favorite.",
  "From thread to finish: excellence.",
  "Made to be lived in—and noticed.",
  "A classic redefined for the modern you.",
  "Stitched with intention.",

  // 🌿 Minimal & Modern
  "Minimal effort. Maximum effect.",
  "Elevated basics for elevated days.",
  "Subtle design. Bold impression.",
  "Understated, overdelivering.",
  "Simple, stylish, and essential.",
  "Clean design for busy lives.",
  "Effortless form, everyday function.",
  "Made to fit your life beautifully.",
  "Pure style with nothing extra.",
  "Beauty in the bare essentials.",

  // 💫 Confident & Edgy
  "Confidence in every thread.",
  "Style that speaks volumes—quietly.",
  "Look sharp. Feel unstoppable.",
  "Not just worn—owned.",
  "Attitude stitched in.",
  "For the bold, not the boring.",
  "Edge meets elegance.",
  "Your statement, simplified.",
  "Dare to wear different.",
  "Stand out, even in stillness.",

  // ☁️ Soft, Cozy & Inviting
  "Soft on the skin. Strong on style.",
  "Feels like a hug. Looks like a flex.",
  "Cozy never looked so cool.",
  "Wrapped in comfort, styled for life.",
  "All-day comfort, all-time style.",
  "Everyday wear, exceptionally done.",
  "Luxe softness you’ll reach for daily.",
  "So soft, it’s a second skin.",
  "Casual, but make it iconic.",
  "Designed to move with you.",
];
