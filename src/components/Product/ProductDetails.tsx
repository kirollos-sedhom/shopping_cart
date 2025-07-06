import React from "react";
import { useParams } from "react-router";

export default function ProductDetails() {
  const { id } = useParams();
  return <div>ProductDetails for {id}</div>;
}
