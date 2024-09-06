"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<string[]>([]);
  const [popularProducts, setPopularProducts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getProducts = async (): Promise<void> => {
    try {
      const res = await fetch("https://game-voucher-api.vercel.app/product");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const response = await res.json();
      setProducts(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const getPopular = async (): Promise<void> => {
    try {
      const res = await fetch("https://game-voucher-api.vercel.app/popular");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const response = await res.json();
      setPopularProducts(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getPopular();
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      console.log("products =>", products);
      console.log("popularProducts =>", popularProducts);
    }
  }, [products, popularProducts, error]);

  return (
    <div>
      <main>
        <div>Hello Beranda</div>
      </main>
    </div>
  );
}
