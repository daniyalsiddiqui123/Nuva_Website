import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ProductDetailClient from "./ProductDetailClient";

const query = groq`*[_type == "product" && slug.current == $slug][0]{
  _id, name, price, price_before, image, details, length, chest, slug, inventory
}`;

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: any) {
  const product = await client.fetch(query, { slug: params.slug });

  if (!product) {
    return (
      <div className="p-10 text-center text-red-500">
        Product not found
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
