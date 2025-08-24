'use client';
import { useState } from "react";

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setStatus("Subscribed!");
      setEmail("");
    } else {
      setStatus("Something went wrong.");
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-black border border-gray-800 p-6 rounded-2xl shadow-md w-full max-w-md text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-serif text-amber-600">
          Subscribe To Our Email
        </h2>
        <p className="text-gray-300 mb-6 text-sm sm:text-base">
          Be the first to know about new collections and exclusive offers
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-700 bg-black text-white p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-600 w-full sm:w-auto"
          >
            Subscribe
          </button>
        </div>
        {status && <p className="mt-4 text-sm text-gray-400">{status}</p>}
      </form>
    </div>
  );
}
