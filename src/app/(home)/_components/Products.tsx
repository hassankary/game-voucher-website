"use client";
import { useEffect, useState } from "react";
import styles from "./animate.module.css";
import ProductsCard from "./ProductsCard";

interface Product {
  name: string;
  products: ProductDetail[];
}

interface ProductDetail {
  categoryName: string;
  code: string;
  handle: string;
  inputs: string[];
  isPopular: boolean;
  publisher: string;
  subtitle: string;
  thumbnail: string;
  title: string;
}

interface More {
  topup: number;
  voucher: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [menu, setMenu] = useState<string>("Top Up");
  const [more, setMore] = useState<More>({ topup: 12, voucher: 12 });
  const mockData = ["", "", "", "", "", "", "", "", "", "", "", ""];

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
    }
  }, [error]);

  return (
    <div className="container flex flex-col mx-auto px-4 gap-y-5 xl:max-w-7xl">
      <div className="flex items-center space-x-5">
        {products.length !== 0
          ? products?.map((d, i) => {
              return (
                <button
                  key={i}
                  onClick={() => setMenu(d.name)}
                  className={`${
                    menu === d.name
                      ? `bg-[#0563FC] active:bg-[#0563FC]/75 md:hover:bg-[#0563FC]/75`
                      : `bg-[#212121] active:bg-[#212121]/75 md:hover:bg-[#212121]/75`
                  } px-4 py-2 font-semibold text-sm rounded-lg transition-all duration-300 ease-out`}
                >
                  {d.name}
                </button>
              );
            })
          : ["Top Up", "Voucher"].map((d, i) => (
              <button
                key={i}
                className={`${
                  d === "Top Up"
                    ? `bg-[#0563FC] active:bg-[#0563FC]/75 md:hover:bg-[#0563FC]/75`
                    : `bg-[#212121] active:bg-[#212121]/75 md:hover:bg-[#212121]/75`
                } px-4 py-2 font-semibold text-sm rounded-lg transition-all duration-300 ease-out`}
              >
                {d}
              </button>
            ))}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-4 gap-4 sm:gap-x-6 sm:gap-y-8">
        {products.length === 0
          ? mockData?.map((d, i) => {
              return (
                <div
                  key={i}
                  className={`${styles.slideR}flex aspect-[4/6] bg-[#212121] rounded-2xl overflow-hidden transition-all duration-300 ease-in-out animate-pulse`}
                >
                  {d}
                </div>
              );
            })
          : menu === "Top Up"
          ? products[0]?.products.slice(0, more.topup).map((d) => {
              return <ProductsCard key={d.title} d={d} />;
            })
          : products[1]?.products.slice(0, more.voucher).map((d) => {
              return <ProductsCard key={d.title} d={d} />;
            })}
      </div>
      <div className="flex justify-center items-center">
        {menu === "Top Up" && more.topup < products[0]?.products.length ? (
          <button
            onClick={() => setMore({ ...more, topup: more.topup + 12 })}
            className={`h-10 px-4 py-2 bg-[#121212] active:bg-[#121212]/70 md:hover:bg-[#121212]/80 font-medium text-xs rounded-md active:scale-95 transition-all duration-300 ease-out`}
          >
            Tampilkan Lainnya...
          </button>
        ) : menu === "Voucher" &&
          more.voucher < products[1]?.products.length ? (
          <button
            onClick={() => setMore({ ...more, voucher: more.voucher + 12 })}
            className={`h-10 px-4 py-2 bg-[#121212] active:bg-[#121212]/70 md:hover:bg-[#121212]/80 font-medium text-xs rounded-md active:scale-95 transition-all duration-300 ease-out`}
          >
            Tampilkan Lainnya...
          </button>
        ) : null}
      </div>
    </div>
  );
}
