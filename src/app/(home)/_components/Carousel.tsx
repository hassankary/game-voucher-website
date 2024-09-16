"use client";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Banner {
  description: string;
  href: string;
  id: number;
  src: string;
  title: string;
}

export default function CarouselHomePage() {
  const [banner, setBanner] = useState<Banner[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getBanner = async (): Promise<void> => {
    try {
      const res = await fetch("https://game-voucher-api.vercel.app/banner");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const response = await res.json();
      setBanner(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Error fetching banner:", error);
    }
  }, [error]);

  return (
    <div className="container flex flex-col mx-auto px-4 space-y-5 xl:max-w-7xl">
      <div className="h-44 xs:h-56 md:h-[320px] lg:min-h-[521.96px] py-4 flex items-center">
        <Carousel indicators={false} className="rounded-3xl overflow-hidden">
          {banner?.map((d, i) => {
            return (
              <Link
                key={i}
                href={
                  i === banner.length - 1
                    ? d.href
                    : `https://vygaming.id/${d.href}`
                }
              >
                <Image
                  src={d.src}
                  alt={d.title}
                  width={300}
                  height={300}
                  unoptimized
                  className="w-full rounded-3xl"
                />
              </Link>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
