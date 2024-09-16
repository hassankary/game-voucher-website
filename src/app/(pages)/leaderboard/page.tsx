"use client";
import Divider from "@/app/components/Divider";
import Link from "next/link";
import { useEffect, useState } from "react";

interface List {
  fullname: string;
  id: number;
  total: number;
  totalAmount: number;
  username: string;
}

export default function Leaderboard() {
  const [listToday, setListToday] = useState<List[]>([]);
  const [listWeek, setListWeek] = useState<List[]>([]);
  const [listMonth, setListMonth] = useState<List[]>([]);
  const [error, setError] = useState<string | null>(null);

  const listDataCard = [
    { title: "Hari", state: listToday },
    { title: "Minggu", state: listWeek },
    { title: "Bulan", state: listMonth },
  ];

  const getListToday = async (): Promise<void> => {
    try {
      const res = await fetch("https://game-voucher-api.vercel.app/today");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const response = await res.json();
      setListToday(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const getListWeek = async (): Promise<void> => {
    try {
      const res = await fetch("https://game-voucher-api.vercel.app/week");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const response = await res.json();
      setListWeek(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const getListMonth = async (): Promise<void> => {
    try {
      const res = await fetch("https://game-voucher-api.vercel.app/month");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const response = await res.json();
      setListMonth(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    getListToday();
  }, []);

  useEffect(() => {
    getListWeek();
  }, []);

  useEffect(() => {
    getListMonth();
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Error fetching leaderboard:", error);
    }
  }, [error]);

  return (
    <>
      <div className="container flex flex-col mx-auto px-4 pt-14 sm:pt-24 pb-12 space-y-5 xl:max-w-7xl justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex flex-col text-center gap-y-2">
            <h1 className=" text-[#0563FC] font-semibold leading-7">
              Leaderboard
            </h1>
            <h1 className=" text-3xl sm:text-4xl font-bold">
              Top 10 Pembelian Terbanyak di VYGAMING STORE
            </h1>
            <p className="max-w-3xl mt-4 text-center text-lg leading-8">
              Berikut ini adalah daftar 10 pembelian terbanyak yang dilakukan
              oleh pelanggan kami. Data ini diambil dari sistem kami dan selalu
              diperbaharui.{" "}
              <span className=" text-pink-600">
                (This website was last updated on September 11, 2024. Check the
                latest updates directly on{" "}
                <Link
                  href={"https://www.vygaming.id/id/leaderboard"}
                  className="underline font-bold hover:text-pink-500 transition-all"
                >
                  vygaming.id/id/leaderboard)
                </Link>
              </span>
            </p>
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-14 sm:mt-24 text-sm">
            {listDataCard?.map((d) => {
              return (
                <div
                  key={d.title}
                  className="w-full flex flex-col items-center mx-auto max-w-md lg:max-w-none"
                >
                  <div className="flex w-full">
                    <div className="px-4 py-1.5 ml-3 bg-[#212121] ring-1 ring-[#535353] text-xs rounded-t-md">
                      Top 10 - {d.title} Ini
                    </div>
                  </div>
                  <div className="w-full h-full p-6 bg-[#1E1E1E] rounded-lg ring-1 ring-[#212121]">
                    <ul className=" space-y-3">
                      {d.state?.map((d, i) => {
                        return (
                          <li key={i} className="flex justify-between">
                            <div>
                              {i + 1}. {d.fullname}
                              {i === 0
                                ? " 🥇"
                                : i === 1
                                ? " 🥈"
                                : i === 2
                                ? " 🥉"
                                : null}
                            </div>
                            <div>
                              Rp{" "}
                              {d.totalAmount
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
}
