"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Navbar from "@/app/(store)/components/navbar";
import Footer from "@/app/(store)/components/footer";
import BuyNow from "./BuyNow";
import AddToCart from "./AddToCart";
import { Product } from "../../../../sanity.types";



type Params = { params: { slug: string } };

const query = groq`*[_type == "product" && slug.current == $slug][0]{
  _id, name, price, price_before, image, details, length, chest, slug, inventory
}`;

export default function ProductDetail({ params }: Params) {
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    async function fetchProduct() {
      const fetched: Product = await client.fetch(query, { slug: params.slug });
      setProduct(fetched);
      if (fetched?.image?.length) {
        setMainImage(urlFor(fetched.image[0]).url());
      }
    }
    fetchProduct();
  }, [params.slug]);

  if (!product) return <div className="text-white">Loading...</div>;

  return (
    <div className="text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          {mainImage && (
            <img
              src={mainImage}
              alt={product.name || "Product"}
              className="w-full h-auto rounded-xl transition-all duration-300"
            />
          )}
          <div className="flex gap-3 mt-4 flex-wrap">
            {product.image?.slice(1).map((img, i) => (
              <img
                key={i}
                src={urlFor(img).url()}
                alt={`Thumbnail ${i + 1}`}
                onMouseEnter={() => setMainImage(urlFor(img).url())}
                onMouseLeave={() => setMainImage(urlFor(product.image![0]).url())}
                className="w-20 h-20 rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="line-through text-gray-500">Rs. {product.price_before} PKR</p>
          <p className="text-xl font-semibold">Rs. {product.price} PKR</p>

          <div>
            <h2 className="font-bold text-lg mb-2">Details:</h2>
            <p className="text-base">{product.details}</p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">Size:</h2>
            <p>Length: {product.length}</p>
            <p>Chest: {product.chest}</p>
          </div>

          <div className="flex gap-4">
            <AddToCart product={product} />
            <BuyNow />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
