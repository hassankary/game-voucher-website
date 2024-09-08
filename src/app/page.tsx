"use client";
import { useEffect, useState } from "react";
import Divider from "./components/Divider";
import Popular from "./(home)/_components/Popular";
import FlashSale from "./(home)/_components/Flashsale";
import CarouselHomePage from "./(home)/_components/Carousel";

export default function Home() {
  const [products, setProducts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  // const mockData = ["", "", "", "", "", "", "", ""];

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

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      console.log("products =>", products);
    }
  }, [products, error]);

  return (
    <div>
      <main className="flex flex-col">
        <CarouselHomePage/>
        <div className="flex flex-col gap-y-8 pt-8">
          <FlashSale />
          <Popular />
          <Divider />
        </div>
      </main>
    </div>
  );
}
