import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type ClothingItem = {
  id: number;
  images: string[];
  title: string;
  price: number;
};
export default function AdminDashboard() {
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
    <div>
      <h1>hello mr admin</h1>
      <table className="w-full border rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-gray-100 text-left text-sm font-semibold">
          <tr>
            <th>Title</th>
            <th>Price</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {" "}
          {clothes.map((p) => (
            <tr key={p.id}>
              <td className="flex">
                <img src={p.images[0]} width={20} height={20} /> {p.title}
              </td>
              <td>${p.price}</td>

              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
