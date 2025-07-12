import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
export type ProductType = {
  id: string;
  price: number;
  discount: number;
  category: string;
  description: string;
  detailedDescription: string;
  images: string[];
  source: string;
  title: string;
};
export default function ProductDetails() {
  const { id } = useParams();
  const [productData, setProductData] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const existsInCart = state.items.find((item) => item.id === id);
  console.log("State is:", state);

  async function getData() {
    const url = `http://localhost:4000/products/${id}`;
    try {
      setIsLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`response status ${response.status}`);
      }
      const json = await response.json();
      console.log("product data:", json);
      setProductData(json);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // add to cart logic
  function handleAddToCart() {
    if (productData) dispatch(addToCart(productData));
  }
  if (isLoading) return <p>loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!productData) return <p>Item not found</p>;
  const discountedPrice = productData.price * (1 - productData.discount / 100);
  return (
    <div className="m-auto p-6 grid grid-cols-1 sm:grid-cols-2 sm:w-3/4 gap-4">
      <img
        className="h-96 object-cover object-[center_20%] w-full rounded-md"
        src={productData.images[0]}
        alt={productData.description}
      />
      <div className="flex flex-col gap-2">
        <h1 className="font-festina text-xl">{productData.title}</h1>
        <div className="font-instrument flex gap-2 items-center">
          <p className="text-xl">{discountedPrice.toFixed(2)}</p>

          <del className="text-slate-900/50 text-sm">
            {productData.price.toFixed(2)}
          </del>
        </div>

        <p>{productData.detailedDescription}</p>
        <button
          onClick={handleAddToCart}
          className="border-1 w-fit p-2 cursor-pointer hover:bg-slate-200 active:bg-slate-300"
        >
          {existsInCart ? "add one more?" : "add to cart"}
        </button>
      </div>
    </div>
  );
}
