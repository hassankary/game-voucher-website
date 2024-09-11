"use client";
import Divider from "./components/Divider";
import Popular from "./(home)/_components/Popular";
import FlashSale from "./(home)/_components/Flashsale";
import CarouselHomePage from "./(home)/_components/Carousel";
import Products from "./(home)/_components/Products";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col">
        <CarouselHomePage />
        <div className="flex flex-col gap-y-8 pt-8 bg-[#1C1C1C]">
          <FlashSale />
          <Popular />
          <Products />
          <Divider />
        </div>
      </main>
    </div>
  );
}
