"use client";
import Image from "next/image";
import Link from "next/link";

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

interface ProductsCardProps {
  d: ProductDetail;
}

export default function ProductsCard({ d }: ProductsCardProps) {
  return (
    <Link href={`https://www.vygaming.id/id/${d.handle}`} className="hover:scale-105 transition-all duration-300 ease-out">
      <div
        className={`animate-fade-up animate-duration-300 group relative h-full w-full flex flex-col bg-[#212121] rounded-2xl overflow-hidden hover:ring-2 hover:ring-offset-2 hover:ring-offset-[#141414] hover:ring-[#0563FC] transition-all duration-300 ease-in-out`}
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
        <article className="absolute -bottom-10 group-hover:bottom-3 group-hover:sm:bottom-4 w-full flex flex-col px-3 sm:px-4 transition-all duration-300 ease-in-out">
          <h1 className="font-semibold text-[0.625rem] md:text-[1rem] truncate">
            {d.title}
          </h1>
          <p className="text-[0.625rem] md:text-xs truncate">{d.publisher}</p>
        </article>
      </div>
    </Link>
  );
}
