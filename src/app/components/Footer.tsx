"use client";
import Link from "next/link";

const dataFooter = [
  {
    title: "Peta Situs",
    data: [
      { title: "Beranda", href: "/" },
      { title: "Masuk", href: "/" },
      { title: "Daftar", href: "/" },
      { title: "Cek Transaksi", href: "/" },
      { title: "Hubungi Kami", href: "/" },
      { title: "Ulasan", href: "/" },
    ],
  },
  {
    title: "Dukungan",
    data: [{ title: "WhatsApp", href: "/" }],
  },
  {
    title: "Legalitas",
    data: [
      { title: "Kebijakan Pribadi", href: "/" },
      { title: "Syarat & Ketentuan", href: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <div className="w-full bg-black">
      <div className="container flex flex-col mx-auto px-4 py-12 space-y-16 xl:max-w-7xl items-center">
        <div className="flex flex-col w-full space-y-5">
          <div className="w-full grid grid-cols-4 gap-8 font-semibold text-sm text-[#0563FC]">
            {dataFooter.map((d) => {
              return <div key={d.title}>{d.title}</div>;
            })}
          </div>
          <div className="w-full grid grid-cols-4 gap-8 font-normal text-sm">
            {dataFooter.map((d) => {
              return (
                <div key={d.title} className="flex flex-col space-y-4">
                  {d.data?.map((d) => {
                    return (
                      <Link key={d.title} href={d.href}>
                        <div>{d.title}</div>
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full text-xs text-center space-y-1 pt-10 border-t border-[#343434]">
          <h1>© 2024 VYGAMING STORE. All rights reserved.</h1>
          <h1>
            Built by{" "}
            <Link href={"https://github.com/hassankary"} className=" font-semibold text-[#0563FC]">@hassankary</Link>
          </h1>
        </div>
      </div>
    </div>
  );
}
