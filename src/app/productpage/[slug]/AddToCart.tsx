'use client';

import { addToCart } from "@/app/actions/actions";


import Swal from "sweetalert2";
import { Product } from "../../../../sanity.types";

type Props = {
  product: Product;
};

export default function AddToCart({ product }: Props) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
      title: `${product.name ?? "Product"} added to cart`,
      showConfirmButton: false,
      timer: 3000
    });

    addToCart(product);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="border-2 p-2 bg-amber-600 rounded-2xl w-72 cursor-pointer hover:bg-amber-500 my-10"
    >
      <h1>Add To Cart</h1>
    </button>
  );
}
