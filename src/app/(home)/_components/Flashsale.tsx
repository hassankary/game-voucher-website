import CountdownTimer from "@/app/components/CountdownTimer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

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

export default function FlashSale() {
  const [flashSale, setFlashSale] = useState<FlashSale[]>([]);
  const [error, setError] = useState<string | null>(null);
  const mockData = ["", "", "", "", "", "", "", ""];

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

  useEffect(() => {
    getFlashSale();
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Error fetching flashsale:", error);
    }
  }, [error]);

  return (
    <div className="container flex flex-col mx-auto px-4 xl:max-w-7xl">
      <div className="flex flex-col w-full bg-[#1E1E1E] rounded-2xl overflow-hidden">
        <div className="flex flex-col px-4 pb-3 pt-4">
          <div className="flex gap-x-5 text-lg leading-relaxed ">
            <span className="uppercase font-semibold leading-relaxed tracking-wider">
              ⚡️ Flash Sale
            </span>
            <CountdownTimer />
          </div>
          <p className="pl-8 text-xs">Pesan sekarang! Persediaan terbatas.</p>
        </div>
        <Marquee pauseOnHover autoFill className="flex">
          <div className="flex flex-row px-2 py-3 gap-x-4">
            {flashSale.length === 0
              ? mockData.map((d, i) => {
                  return (
                    <Link
                      href={`/`}
                      key={i}
                      className="w-[265px] h-[112px] flex flex-col flex-shrink-0 p-4 bg-[#202020] font-semibold gap-y-2 rounded-xl transition-all duration-300 ease-in-out animate-pulse"
                    >
                      {d}
                    </Link>
                  );
                })
              : flashSale?.map((d, i) => {
                  return (
                    <Link
                      href={`https://www.vygaming.id/id/${d.productHandle}`}
                      key={i}
                      className="w-[265px] flex flex-col flex-shrink-0 p-4 bg-[#202020] border border-[#212121] font-semibold gap-y-2 rounded-xl overflow-hidden"
                    >
                      <div className="flex items-center space-x-3 animate-duration-500 animate-fade-right">
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
                      <div className="text-sm animate-duration-[650ms] animate-fade-right">
                        {d.productVariantName}
                      </div>
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
    </div>
  );
}
