"use client";
import Divider from "@/app/components/Divider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgSearch } from "react-icons/cg";

export default function Invoices() {
  const [invoice, setInvoice] = useState<string>("");
  const router = useRouter();

  return (
    <>
      <div className="container flex flex-col mx-auto px-4 py-12 space-y-5 xl:max-w-7xl justify-center items-center">
        <div className="flex flex-col w-full gap-y-3">
          <h1 className="font-bold text-3xl sm:text-4xl">Cari pesanan kamu!</h1>
          <p>
            Lacak transaksi kamu dengan cara memasukkan Nomor Invoice dibawah
            ini:
          </p>
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <h1 className="font-medium text-xs">Nomor Invoice Kamu</h1>
          <input
            onChange={(e) => setInvoice(e.target.value)}
            value={invoice}
            maxLength={20}
            id="invoice"
            name="invoice"
            placeholder="VGXXXXXXXXXXXXXX"
            className=" max-w-[576px] px-3 py-2 placeholder-white text-xs text-white bg-[#535353] rounded-md"
          />
        </div>
        <div className="w-full flex justify-start font-medium text-sm">
          <button
            onClick={() =>
              router.push(`https://www.vygaming.id/id/invoices/${invoice}`)
            }
            className="flex items-center gap-2 pl-3 pr-4 py-2 bg-[#0563FC] hover:bg-[#0563FC]/75 active:scale-95 rounded-lg transition-all duration-300 "
          >
            <CgSearch className="h-5 w-5" />
            <h1>Cari Transaksi</h1>
          </button>
        </div>
      </div>
      <Divider />
    </>
  );
}
