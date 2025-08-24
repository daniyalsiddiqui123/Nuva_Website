import Footer from "@/app/(store)/components/footer";
import Navbar from "@/app/(store)/components/navbar";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { topTwentyProductsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";

type SanityImage = {
  asset: { _ref: string };
};

type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  price_before: number;
  image: SanityImage[];
  available?: boolean;
};

export default async function Product() {
  const products: Product[] = await client.fetch(topTwentyProductsQuery);

  return (
    <div className="bg-black min-h-screen w-full flex flex-col">
      <Navbar />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6 sm:px-10 lg:px-20 mt-12">
        {products.map((product) => (
          <Link key={product._id} href={`/productpage/${product.slug.current}`}>
            <div className="flex flex-col items-center text-center">
              <Image
                src={urlFor(product.image[0]).url()}
                alt={product.name}
                width={240}
                height={240}
                className="object-cover rounded-xl transition-transform duration-300 hover:scale-105"
              />
              <h2 className="text-lg sm:text-xl text-white font-bold mt-5">
                {product.name}
              </h2>
              <p className="line-through text-gray-500">
                Rs. {product.price_before} PKR
              </p>
              <p className="font-semibold text-white">
                Rs. {product.price} PKR
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link href={"/product"}>
          <button className="rounded-xl border-2 border-amber-600 px-6 py-2 bg-amber-600 hover:bg-amber-500 transition">
            Previous Page
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
