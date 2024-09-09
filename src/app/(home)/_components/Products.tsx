"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  // const mockData = ["", "", "", "", "", "", "", "", "", ""];

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
    <div className="container flex flex-col mx-auto px-4 space-y-5 xl:max-w-7xl">
      <div className="flex items-center space-x-5">
        {products?.map((d, i) => {
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
        })}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 py-4 gap-4 sm:gap-x-6 sm:gap-y-8">
        {menu === "Top Up"
          ? products[0]?.products.slice(0, more.topup).map((d, i) => {
              return (
                <div
                  key={i}
                  className="group relative h-full w-full flex flex-col bg-[#212121] rounded-2xl overflow-hidden hover:scale-105 hover:ring-2 hover:ring-offset-2 hover:ring-offset-[#141414] hover:ring-[#0563FC] transition-all duration-300 ease-in-out"
                >
                  <Image
                    src={d.thumbnail}
                    alt={d.title}
                    height={192}
                    width={288}
                    unoptimized
                    className="object-cover aspect-[4/6]"
                  />
                  <div className="absolute h-full w-full bg-gradient-to-t from-transparent group-hover:from-[#141414] transition-all duration-300 ease-out"></div>
                  <article className="absolute -bottom-10 group-hover:bottom-3 w-full flex flex-col px-3 sm:px-4 transition-all duration-300 ease-in-out">
                    <h1 className="font-semibold text-[0.625rem] md:text-[1rem]">
                      {d.title}
                    </h1>
                    <p className="text-[0.625rem] md:text-sm">{d.publisher}</p>
                  </article>
                </div>
              );
            })
          : products[1]?.products.slice(0, more.voucher).map((d, i) => {
              return (
                <div
                  key={i}
                  className="group relative h-full w-full flex flex-col bg-[#212121] rounded-2xl overflow-hidden hover:scale-105 hover:ring-2 hover:ring-offset-2 hover:ring-offset-[#141414] hover:ring-[#0563FC] transition-all duration-300 ease-in-out"
                >
                  <Image
                    src={d.thumbnail}
                    alt={d.title}
                    height={192}
                    width={288}
                    unoptimized
                    className="object-cover aspect-[4/6]"
                  />
                  <div className="absolute h-full w-full bg-gradient-to-t from-transparent group-hover:from-[#141414] transition-all duration-300 ease-out"></div>
                  <article className="absolute -bottom-10 group-hover:bottom-3 w-full flex flex-col px-3 sm:px-4 transition-all duration-300 ease-in-out">
                    <h1 className="font-semibold text-[0.625rem] md:text-[1rem]">
                      {d.title}
                    </h1>
                    <p className="text-[0.625rem] md:text-sm">{d.publisher}</p>
                  </article>
                </div>
              );
            })}
      </div>
      <div className="flex justify-center items-center">
        {menu === "Top Up" && more.topup < products[0]?.products.length ? (
          <button
            onClick={() => setMore({ ...more, topup: more.topup + 12 })}
            className={`bg-[#212121] active:bg-[#212121]/70 md:hover:bg-[#212121]/75 px-4 py-2 font-semibold text-xs rounded-md transition-all duration-300 ease-out`}
          >
            Tampilkan Lainnya...
          </button>
        ) : menu === "Voucher" &&
          more.voucher < products[1]?.products.length ? (
          <button
            onClick={() => setMore({ ...more, voucher: more.voucher + 12 })}
            className={`bg-[#212121] active:bg-[#212121]/70 md:hover:bg-[#212121]/75 px-4 py-2 font-semibold text-xs rounded-md transition-all duration-300 ease-out`}
          >
            Tampilkan Lainnya...
          </button>
        ) : null}
      </div>
    </div>
  );
}
