import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import NextTopLoader from "nextjs-toploader";
import Footer from "./components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "VYGAMING Clone by Hassankary",
  description:
    "Top up game & voucher terlaris, murah, aman legal 100% buka 24 Jam dengan payment terlengkap se-Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#171717] font-sans text-white`}
      >
        <NextTopLoader
          height={2}
          color="linear-gradient(to right, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))"
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
