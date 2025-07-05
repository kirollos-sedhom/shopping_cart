import React, { useEffect, useState } from "react";
import Product from "./Product/Product";
/*

✅ Day 2: Product Listing Page
Goal: Create the product list page with static or dummy data.

Build ProductCard component

Map over 4–6 dummy products and render them

Style with Tailwind (hover effects, grid layout, etc.)

Deliverable: Homepage shows grid of clothes/products.
[GET] https://api.escuelajs.co/api/v1/categories/1/products


fonts: festina lente
instrumentsans
*/
type ClothingItem = {
  id: number;
  images: string[];
  price: number;
  description: string;
  title: string;
};
export default function Home() {
  const [clothes, setClothes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAll() {
      setIsLoading(true);
      try {
        const categoryRes = await fetch(
          "https://api.escuelajs.co/api/v1/categories/slug/clothes"
        );
        const categoryJson = await categoryRes.json();
        const categoryId = categoryJson.id;

        const productRes = await fetch(
          `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
        );
        const productJson = await productRes.json();
        console.log(productJson);

        setClothes(productJson);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAll();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8 max-w-screen-xl mx-auto">
      {isLoading && <p>loading.....</p>}
      {error && <p>{error}</p>}
      {clothes.length &&
        clothes.map((item: ClothingItem) => {
          if (!item.images) {
            return;
          }
          return (
            <Product
              key={item.id}
              title={item.title}
              price={item.price}
              images={item.images}
              id={item.id}
              description={item.description}
            />
          );
        })}
    </div>
  );
}
