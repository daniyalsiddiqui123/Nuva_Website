'use client';
import React from "react";
import Navbar from "@/app/(store)/components/navbar";
import Footer from "@/app/(store)/components/footer";
import { Button } from "@/app/(store)/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import SubscribePage from "../subscribe/page";
import { topThreeProductsQuery } from "@/sanity/lib/queries";

type Product = {
  available: boolean;
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  price_before: number;
  image: { asset: { _ref: string } }[];
};

export default async function Home() {
  const products: Product[] = await client.fetch(topThreeProductsQuery);

  return (
    <div className="bg-black w-full min-h-screen flex flex-col">
      <Navbar />

      <div className="relative w-full">
        <Image
          alt="Banner"
          width={1920}
          height={1080}
          src="/Banner_light.png"
          className="w-full h-auto object-cover"
        />
        <div className="absolute top-1/4 left-5 sm:left-20 text-white max-w-lg">
          <p className="text-xs sm:text-sm font-serif">
            SUMMERS 2025 VINTAGE DROP IS LIVE!
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold mt-3">
            Vintage Clothing
          </h2>
          <Link href="/product">
            <Button className="mt-5 text-lg bg-amber-600">Shop Now</Button>
          </Link>
        </div>
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold font-serif text-amber-600 text-center mt-20">
        Best Selling Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-5 sm:px-20 mt-10">
        {products.map((product) => {
          const productCard = (
            <div className="relative flex flex-col items-center text-center">
              <Image
                src={urlFor(product.image[0]).url()}
                alt={product.name}
                width={240}
                height={240}
                className={`object-cover rounded-xl transition-transform duration-300 ${
                  product.available ? "hover:scale-105" : "opacity-50"
                }`}
              />
              {!product.available && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                  <span className="text-white text-xl font-bold">SOLD OUT</span>
                </div>
              )}

              <h2 className="text-lg sm:text-xl text-white font-bold mt-5">
                {product.name}
              </h2>
              <p className="line-through text-gray-500">
                Rs. {product.price_before} PKR
              </p>
              <p className="font-semibold text-white">Rs. {product.price} PKR</p>
            </div>
          );

          return product.available ? (
            <Link
              key={product._id}
              href={`/productpage/${product.slug.current}`}
            >
              {productCard}
            </Link>
          ) : (
            <div key={product._id}>{productCard}</div>
          );
        })}
      </div>

      <div className="text-center px-5 sm:px-40 mt-20">
        <h1 className="font-bold text-4xl text-amber-600">About Us</h1>
        <p className="font-semibold text-white mt-5">
          At Nuva, we bring you handpicked Y2K and vintage fashion, backed by
          over 15 years of experience in the clothing industry. Our team
          understands the styles, colors, and fits people truly love — and we
          use that knowledge to deliver standout pieces that blend retro vibes
          with modern edge. From bold graphic tees to eye-catching shorts, every
          item at Nuva is chosen with purpose. We don&apos;t follow trends — we
          revive them. Welcome to Nuva — where experience meets bold expression.
        </p>
      </div>

      <div className="text-center mt-20 px-5">
        <h1 className="font-bold text-4xl text-amber-700">Our Socials</h1>
        <Link href="https://www.instagram.com/nuvafits/" target="_blank">
          <Button className="mt-10 border-2 border-white bg-black text-white px-6 py-3">
            Join The Community
          </Button>
        </Link>
        <p className="text-gray-400 mt-5 sm:px-40 text-sm sm:text-lg">
          Whenever you do a shoot or take pics in our products, feel free to
          tag/mention us on Instagram. This will help us to build an entrusted
          community.
        </p>
      </div>

      <SubscribePage />

      <Footer />
    </div>
  );
}
