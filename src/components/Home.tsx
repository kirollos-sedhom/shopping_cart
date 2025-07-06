import React, { useEffect, useState } from "react";
import Product from "./Product/Product";
/*

✅ Day 3: Product Details Page + Routing
Goal: View product details on a new route.

Use useParams() from React Router to fetch product ID

Show more details (price, description, image, etc.)

"Add to Cart" button

Deliverable: Clicking on a product shows a detailed view.
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
        const productRes = await fetch(`http://localhost:4000/products`);
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
