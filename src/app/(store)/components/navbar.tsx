"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCartShopping } from "react-icons/fa6";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 w-full h-[80px] rounded-md bg-amber-900/40 backdrop-blur-lg backdrop-saturate-150 border border-white/20 shadow-lg text-white p-3 z-50">
      <div className="flex items-center justify-between">
        <Link href="/" className="-mx-40"><Image alt="Nuva" src="/NUVA.png" width={300} height={300} className="mx-20 sm:mx-44 -my-14"></Image></Link>

        <ul className="hidden md:flex gap-6 mx-[800px] md:mx-[450px] lg:mx-20 text-xl">
          <li><Link href="/product" className="hover:text-amber-600">Product</Link></li>
          <li><Link href="/checkout" className="hover:text-amber-600">Checkout</Link></li>
          <li><Link href="/cart" className="hover:text-amber-600"><FaCartShopping className="my-1" /></Link></li>
        </ul>
        </div>

        <div className="flex items-center justify-between mx-[280px] -my-10">
        <button
          onClick={() => setOpen(true)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
        </div>

      <div
        className={`fixed top-0 left-0 h-[600px] w-full bg-amber-950/95 backdrop-blur-3xl backdrop-saturate-200 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-6 text-3xl"
        >
          ✕
        </button>

        <ul className="flex flex-col items-center justify-center h-full gap-8 text-2xl my-10">
          <li><Link href="/product" onClick={() => setOpen(false)}>Product</Link></li>
          <li><Link href="/checkout" onClick={() => setOpen(false)}>Checkout</Link></li>
          <li><Link href="/cart" onClick={() => setOpen(false)}><FaCartShopping /></Link></li>
        </ul>
      </div>
    </nav>
  );
}
