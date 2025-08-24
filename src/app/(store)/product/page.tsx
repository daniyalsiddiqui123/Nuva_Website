import Footer from "@/app/(store)/components/footer";
import Navbar from "@/app/(store)/components/navbar";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { topTenProductsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";

type SanityImage = {
  asset: {
    _ref: string;
  };
};

type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  price_before: number;
  image: SanityImage[];
  available: boolean;
};

export default async function Product() {
  const products: Product[] = await client.fetch(topTenProductsQuery);

  return (
    <div className="bg-black min-h-screen w-full flex flex-col">
      <Navbar />
      <h1 className="text-center mt-16 text-3xl sm:text-4xl text-amber-600 font-bold">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6 sm:px-10 lg:px-20 mt-10">
        {products.map((product) => {
          const productCard = (
            <div className="relative flex flex-col items-center text-center">
              <Image
                src={urlFor(product.image[0]).url()}
                alt={product.name}
                width={240}
                height={240}
                className={`object-cover rounded-xl transition duration-300 ease-in-out ${
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
              <p className="font-semibold text-white">
                Rs. {product.price} PKR
              </p>
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

      <div className="flex justify-center mt-10">
        <Link href={"/productTwo"}>
          <button className="rounded-xl border-2 border-amber-600 px-6 py-2 bg-amber-600 hover:bg-amber-500 transition">
            Next Page
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
