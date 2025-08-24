import { Product } from "../../../sanity.types";

export type CartItem = Product & { quantity: number };

export const addToCart = (product: Product) => {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const existingIndex = cart.findIndex(item => item._id === product._id);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeFromCart = (productId: string) => {
  let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
  cart = cart.filter(item => item._id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const updateCartQuantity = (productId: string, quantity: number) => {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
  const index = cart.findIndex(item => item._id === productId);

  if (index > -1) {
    cart[index].quantity = quantity;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCartItems = (): CartItem[] => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};
