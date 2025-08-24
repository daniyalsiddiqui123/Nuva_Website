"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";
import { getCartItems } from "@/app/actions/actions";
import { urlFor } from "@/sanity/lib/image";

const placeholderImg = "/placeholder.png";

export default function CheckoutPage() {
  type CartItem = {
  _id: string;
  name?: string;
  price?: number;
  quantity: number;
  image?: any[];
  };
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const calculateTotal = () =>
    cartItems.reduce(
      (total, item) => total + (item.price ?? 0) * item.quantity,
      0
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, address, cart: cartItems }),
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Order Placed 🎉",
        text: "Your order has been placed successfully!",
        confirmButtonColor: "#d97706",
      }).then(() => {
        router.push("/");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400">Your cart is empty 🛒</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6"
        >

          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center bg-amber-950 p-4 rounded-2xl gap-4"
              >
                <Image
                  src={
                    item.image && Array.isArray(item.image) && item.image.length > 0
                      ? urlFor(item.image[0]).url()
                      : placeholderImg
                  }
                  alt={item.name ?? "Product Image"}
                  className="w-20 h-20 object-cover rounded-xl"
                  width={80}
                  height={80}
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-400">
                    {item.quantity} × PKR {item.price}
                  </p>
                </div>
                <p className="font-bold">PKR {(item.price ?? 0) * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-950 p-6 rounded-2xl space-y-4 h-fit">
            <h2 className="text-xl font-semibold">Shipping Info</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-gray-800"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-800"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 rounded bg-gray-800"
              required
            />
            <textarea
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 rounded bg-gray-800"
              required
            />

            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>PKR {calculateTotal()}</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-500 py-2 rounded-lg"
            >
              {loading ? "Placing Order..." : "Place Order (COD)"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
