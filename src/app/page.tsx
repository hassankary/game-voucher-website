"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

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

interface FlashSale {
  currency: string;
  id: number;
  image: string;
  originalPrice: number;
  price: number;
  productCode: string;
  productHandle: string;
  productName: string;
  productVariantCode: string;
  productVariantName: string;
}

export default function Home() {
  const [products, setProducts] = useState<string[]>([]);
  const [flashSale, setFlashSale] = useState<FlashSale[]>([]);
  const [popularProducts, setPopularProducts] = useState<PopularProducts[]>([]);
  const [error, setError] = useState<string | null>(null);
  const mockPopular = ["", "", "", "", "", "", "", ""];

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

  const getFlashSale = async (): Promise<void> => {
    try {
      const res = await fetch("https://game-voucher-api.vercel.app/flash-sale");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const response = await res.json();
      setFlashSale(response);
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
    getFlashSale();
  }, []);

  useEffect(() => {
    getPopular();
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      console.log("products =>", products);
      console.log("flashSale =>", flashSale);
      console.log("popularProducts =>", popularProducts);
    }
  }, [products, popularProducts, flashSale, error]);

  return (
    <div>
      <main className="flex flex-col">
        <section>Carousel</section>
        <div className="flex flex-col gap-y-8 pt-8">
          <div className="container flex flex-col mx-auto px-4 space-y-5 xl:max-w-7xl">
            <div className="flex flex-col font-semibold">
              <h1 className="uppercase text-lg">⚡️ Flash Sale</h1>
              <p className="text-xs">Pesan sekarang! Persediaan terbatas.</p>
            </div>
            <Marquee pauseOnHover autoFill className="flex">
              <div className="flex flex-row px-2 py-3 gap-x-4">
                {flashSale?.map((d, i) => {
                  return (
                    <Link
                      href={`https://www.vygaming.id/id/${d.productHandle}`}
                      key={i}
                      className="w-[265px] flex flex-col flex-shrink-0 p-4 bg-[#202020] font-semibold gap-y-2 rounded-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <Image
                          src={d.image}
                          alt={d.productName}
                          height={48}
                          width={48}
                          unoptimized
                        />
                        <div className="flex flex-col overflow-hidden">
                          <h1 className="text-sm">{d.productName}</h1>
                          <h1 className="text-xs text-[#B42D6C] line-through">
                            Rp{" "}
                            {d.originalPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                          </h1>
                          <h1 className="text-xs text-[#0563FC]">
                            Rp{" "}
                            {d.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                          </h1>
                        </div>
                      </div>
                      <div className="text-sm">{d.productVariantName}</div>
                      <div className=" w-24 absolute -mt-[24px] ml-[161px] aspect-square rounded overflow-hidden">
                        <div className="absolute h-2 w-2 bg-[#113F8C]"></div>
                        <div className="absolute right-0 bottom-0 h-2 w-2 bg-[#113F8C]"></div>
                        <div className="absolute w-[137px] py-1 rotate-45 top-7 -right-[28px] uppercase text-center text-[10px] bg-[#0563FC]">
                          Hemat Rp{" "}
                          {(d.originalPrice - d.price)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Marquee>
          </div>
          <div className="container flex flex-col mx-auto px-4 space-y-5 xl:max-w-7xl">
            <div className="flex flex-col font-semibold">
              <h1 className="uppercase text-lg">🔥 Populer Sekarang!</h1>
              <p className="text-xs">
                Berikut adalah beberapa produk yang paling populer saat ini.
              </p>
            </div>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {popularProducts.length === 0
                ? mockPopular.map((d, i) => {
                    return (
                      <li key={i}>
                        <Link
                          href={`/`}
                          className="flex p-2 bg-[#202020] rounded-2xl hover:ring-2 hover:ring-offset-2 hover:ring-offset-[#141414] hover:ring-[#0563FC] transition-all duration-300 ease-in-out"
                        >
                          <div className=" h-20">{d}</div>
                        </Link>
                      </li>
                    );
                  })
                : popularProducts?.map((d, i) => {
                    return (
                      <li key={i}>
                        <Link
                          href={`https://www.vygaming.id/id/${d.handle}`}
                          className="flex p-2 bg-gradient-to-br from-[#292929] to-[#292929] via-[#3B3B3B] rounded-2xl hover:ring-2 hover:ring-offset-2 hover:ring-offset-[#141414] hover:ring-[#0563FC] transition-all duration-300 ease-in-out"
                        >
                          <div className="flex justify-center items-center space-x-3">
                            <Image
                              src={d.thumbnail}
                              alt={d.title}
                              height={80}
                              width={80}
                              unoptimized
                              className=" ring-1 ring-[#141414] rounded-[0.6rem]"
                            />
                            <div className="flex flex-col justify-center">
                              <h1 className=" font-semibold">{d.title}</h1>
                              <p className=" text-sm">{d.publisher}</p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
