import React, { useEffect, useState } from "react";
import Product from "./Product";
import { supabase } from "../../lib/supabaseClient";
import LoadingSpinner from "../custom_components/LoadingSpinner";

type ClothingItem = {
  id: number;
  images: string[];
  price: number;
  description: string;
  title: string;
  discount: number;
};
export default function Home() {
  const [clothes, setClothes] = useState<ClothingItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    async function fetchAllProducts() {
      const { data, error } = await supabase.from("products").select("*");
      console.log("data is:", data);
      if (error) {
        // if (error instanceof Error)
        throw new Error("failed to fetch data:", error);
      }

      return data;
    }

    fetchAllProducts()
      .then((data) => setClothes(data))
      .catch((error) => console.error("error fetching products", error))
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8 max-w-screen-xl mx-auto">
      {isLoading && <LoadingSpinner />}
      {error && <p>{error}</p>}
      {clothes.length > 0 &&
        clothes.map((item: ClothingItem) => {
          if (!item.images) {
            return;
          }
          return (
            <Product
              key={item.id}
              title={item.title}
              price={item.price}
              discount={item.discount}
              images={item.images}
              id={item.id}
              description={item.description}
            />
          );
        })}
    </div>
  );
}
