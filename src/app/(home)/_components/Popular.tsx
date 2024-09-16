"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./animate.module.css";

interface PopularProducts {
  categoryName: string;
  code: string;
  handle: string;
  input: string[];
  isPopular: boolean;
  publisher: string;
  subtitle: string;
  thumbnail: string;
  title: string;
}

export default function Popular() {
  const [popularProducts, setPopularProducts] = useState<PopularProducts[]>([]);
  const [error, setError] = useState<string | null>(null);
  const mockData = ["", "", "", "", "", "", "", ""];

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
    getPopular();
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Error fetching popular:", error);
    }
  }, [error]);

  return (
    <div className="container flex flex-col mx-auto px-4 space-y-5 xl:max-w-7xl">
      <div className="flex flex-col">
        <h1 className="uppercase font-semibold text-lg leading-relaxed tracking-wider">
          🔥 Populer Sekarang!
        </h1>
        <p className="pl-8 text-xs">
          Berikut adalah beberapa produk yang paling populer saat ini.
        </p>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {popularProducts.length === 0
          ? mockData.map((d, i) => {
              return (
                <li key={i}>
                  <Link
                    href={`/`}
                    className="flex p-2 bg-gradient-to-br from-[#292929] to-[#292929] via-[#3B3B3B] rounded-2xl hover:ring-2 hover:ring-offset-2 hover:ring-offset-[#141414] hover:ring-[#0563FC] transition-all duration-300 ease-in-out animate-pulse"
                  >
                    <div className="h-[56px] md:h-20">{d}</div>
                  </Link>
                </li>
              );
            })
          : popularProducts?.map((d, i) => {
              return (
                <li key={i}>
                  <Link
                    href={`https://www.vygaming.id/id/${d.handle}`}
                    className={`h-full flex p-2 bg-top bg-custom-clamp bg-card-pattern bg-[#202020] rounded-2xl hover:ring-2 hover:ring-offset-2 hover:ring-offset-[#141414] hover:ring-[#0563FC] transition-all duration-300 ease-in-out overflow-hidden`}
                  >
                    <div
                      className={`${styles.slideR} ${
                        styles[`delay-${i}`]
                      } flex justify-center items-center space-x-3`}
                    >
                      <Image
                        src={d.thumbnail}
                        alt={d.title}
                        height={56}
                        width={56}
                        unoptimized
                        className=" h-14 w-14 md:h-20 md:w-20 ring-1 ring-[#141414] rounded-[0.6rem]"
                      />
                      <div className="flex flex-col justify-center">
                        <h1 className="font-semibold text-[0.625rem] md:text-[1rem]">
                          {d.title}
                        </h1>
                        <p className="text-[0.625rem] md:text-sm">
                          {d.publisher}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
      </ul>
    </div>
  );
}
