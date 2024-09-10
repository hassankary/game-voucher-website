"use client";
import { IoGameController } from "react-icons/io5";
import { HiBars3 } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineHome } from "react-icons/hi2";
import { AiFillSignal } from "react-icons/ai";
import { CgSearch } from "react-icons/cg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navbarMenu = [
  {
    title: "Beranda",
    href: "/",
    component: <HiOutlineHome className="h-4 w-4" />,
  },
  {
    title: "Cek Transaksi",
    href: "/invoices",
    component: <CgSearch className="h-4 w-4" />,
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
    component: <AiFillSignal className="h-4 w-4" />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  // console.log("Current path:", pathname);

  return (
    <nav className="sticky top-0 z-40 w-full flex-none font-sans font-semibold text-sm bg-[#141414]/80 border-b border-[#343434] bg-secondary/80 backdrop-blur">
      <div className="container mx-auto px-4 xl:max-w-7xl ">
        <div className="flex h-[60px] justify-between items-center ">
          <div className="flex">
            <button className="p-2 lg:hidden">
              <HiBars3 className="h-6 w-6" />
            </button>
            <Link href={"/"} className="p-2">
              <IoGameController className="h-10 w-10 text-blue-500" />
            </Link>
          </div>
          <div className="hidden lg:ml-4 lg:block lg:self-stretch">
            <div className="flex h-full space-x-6">
              {navbarMenu?.map((d, i) => {
                return (
                  <Link
                    key={i}
                    href={d.href}
                    className={`${
                      pathname === d.href
                        ? "font-medium text-[#0563FC] border-[#0563FC]"
                        : "border-transparent hover:border-[#0563FC]"
                    } relative flex items-center pt-px -mb-px gap-x-2 border-b-2 transition-all duration-200 ease-out`}
                  >
                    {d.component}
                    <h1>{d.title}</h1>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex space-x-2 flex-grow justify-end">
            <div className="flex gap-x-2">
              <button className="flex justify-center items-center px-3 py-2 lg:pl-3 lg:pr-4 gap-x-2 border border-[#343434] bg-transparent hover:bg-[#1C1C1C] rounded-lg transition-all duration-300">
                <CgSearch className="h-4 w-4" />
                <h1 className="hidden lg:flex">Search</h1>
              </button>
              <button className="flex justify-center items-center px-4 py-2 gap-x-2 border border-[#343434] bg-transparent hover:bg-[#1C1C1C] rounded-lg transition-all duration-300">
                <h1>ID</h1>
                <IoIosArrowDown />
              </button>
            </div>
            <div className="hidden lg:flex">
              <Link href={`https://www.vygaming.id/id/sign-in`} className="flex justify-center items-center px-4 py-2 gap-x-2 border border-[#343434] bg-transparent hover:bg-[#1C1C1C] rounded-lg transition-all duration-300">
                <h1>Masuk</h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
