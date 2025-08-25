"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../../sanity.types";
import {
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} from "../actions/actions";
import Swal from "sweetalert2";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const placeholderImg = "/placeholder.png";

type CartItem = Product & { quantity: number };

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire("Removed!", "Item has been removed", "success");
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) handleQuantityChange(id, product.quantity + 1);
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product && product.quantity > 1)
      handleQuantityChange(id, product.quantity - 1);
  };

  const calculateTotal = () =>
    cartItems.reduce(
      (total, item) => total + (item.price ?? 0) * item.quantity,
      0
    );

  const handleProceed = () => {
    Swal.fire({
      title: "Proceed to Checkout",
      text: "Please review your cart before Checkout",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    })
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-black text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">
        Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty 🛒</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center bg-amber-950 shadow-md rounded-2xl p-4 gap-4"
              >
                <Image
                  src={
                    item.image && Array.isArray(item.image) && item.image.length > 0
                      ? urlFor(item.image[0]).url()
                      : placeholderImg
                  }
                  alt={item.name ?? "Product image"}
                  className="w-20 h-20 object-cover rounded-xl"
                  width={80}
                  height={80}
                />

                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-500">PKR {item.price}</p>
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => handleDecrement(item._id)}
                      className="px-3 py-1 bg-black rounded-md cursor-pointer text-white"
                    >
                      -
                    </button>
                    <span className="px-2 text-white">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item._id)}
                      className="px-3 py-1 bg-black rounded-md cursor-pointer text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-amber-950 shadow-lg rounded-2xl p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Total Items</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Total Price</span>
              <span className="font-bold">PKR {calculateTotal()}</span>
            </div>
            <Link href={"/checkout"}><button
              onClick={handleProceed}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
