"use client";
import { IoGameController } from "react-icons/io5";
import { HiBars3 } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineHome } from "react-icons/hi2";
import { AiFillSignal } from "react-icons/ai";
import { CgSearch } from "react-icons/cg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { AmericaFlag, IndonesiaFlag } from "./Flag";

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

const languageMenu = [
  {
    title: "Indonesia",
    href: "/",
    component: <IndonesiaFlag />,
  },
  {
    title: "English",
    href: "/",
    component: <AmericaFlag />,
  },
];

const SearchIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
      className="h-5 w-5 sm:h-4 sm:w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      ></path>
    </svg>
  );
};

export default function Navbar() {
  const pathname = usePathname();
  // console.log("Current path:", pathname);

  return (
    <nav className="sticky top-0 z-40 w-full flex-none font-sans font-semibold text-sm bg-[#141414]/[0.81] border-b border-[#535353]/50 backdrop-blur">
      <div className="container mx-auto px-4 xl:max-w-7xl ">
        <div className="flex h-[60px] justify-between items-center ">
          <div className="flex">
            <Menu>
              <MenuButton className="p-2 lg:hidden active:scale-90 transition-all duration-300 ease-out">
                {" "}
                <HiBars3 className="h-6 w-6" />
              </MenuButton>
              <MenuItems
                transition
                modal={false}
                anchor="bottom"
                className="fixed w-[180px] mt-2 ml-2 z-10 rounded-xl border border-[#212121] bg-[#1C1C1C] p-1 text-sm/6 text-white transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                {navbarMenu.map((d) => {
                  return (
                    <MenuItem key={d.title}>
                      <Link
                        href={d.href}
                        className={`${
                          pathname === d.href ? "bg-white/10" : ""
                        } group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10`}
                      >
                        {d.title}
                      </Link>
                    </MenuItem>
                  );
                })}
                <div className="my-1 h-px bg-white/5" />
                <MenuItem>
                  <Link
                    href={`https://www.vygaming.id/id/sign-in`}
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                  >
                    Masuk
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
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
          <div className="flex space-x-6 flex-grow justify-end">
            <div className="flex gap-x-2">
              <button className="flex justify-center items-center px-2 sm:px-3 py-2 lg:pl-3 lg:pr-4 gap-x-2 border border-[#535353]/50 bg-transparent hover:bg-[#1C1C1C]/50 rounded-lg transition-all duration-300 ease-in-out">
                <SearchIcon />
                <h1 className="hidden lg:flex">Search</h1>
              </button>
              <Menu>
                {({ open }) => (
                  <>
                    <MenuButton className="flex justify-center items-center px-4 py-2 gap-x-2 border border-[#535353]/50 bg-transparent hover:bg-[#1C1C1C]/50 rounded-lg transition-all duration-300 ease-in-out">
                      <h1>ID</h1>
                      <IoIosArrowDown
                        className={`transition-transform duration-300 ease-in-out ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </MenuButton>
                    <MenuItems
                      transition
                      modal={false}
                      anchor="bottom end"
                      className="fixed w-48 mt-2 z-50 rounded-xl border border-[#212121] bg-[#1C1C1C] p-1 text-sm text-white transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                      {languageMenu?.map((d) => (
                        <MenuItem key={d.title}>
                          <Link
                            href={d.href}
                            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white/10"
                          >
                            <div>{d.component}</div>
                            <span className="ml-2">{d.title}</span>
                          </Link>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </>
                )}
              </Menu>
            </div>
            <div className="hidden lg:flex">
              <Link
                href={`https://www.vygaming.id/id/sign-in`}
                className="flex justify-center items-center px-4 py-2 gap-x-2 border border-[#535353]/50 bg-transparent hover:bg-[#1C1C1C]/50 rounded-lg transition-all duration-300 ease-in-out"
              >
                <h1>Masuk</h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
