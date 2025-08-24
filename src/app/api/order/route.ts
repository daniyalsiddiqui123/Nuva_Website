import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type CartItem = {
  name: string;
  qty: number;
  price: number;
};

type OrderData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  cart: CartItem[];
};

export async function POST(req: Request) {
  const data: OrderData = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.MY_ORDER_EMAIL,
    subject: `New COD Order from ${data.name}`,
    text: `
New Order Received 🚨

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address}

Cart:
${data.cart.map((item) => `${item.name} x${item.qty} - Rs.${item.price}`).join("\n")}
    `,
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: "Order Confirmation",
    html: `
      <h2>Hi ${data.name},</h2>
      <p>Your order has been placed and will proceed to shipping with <b>Cash on Delivery</b>.</p>
      <p>Order Summary:</p>
      <ul>
        ${data.cart.map((item) => `<li>${item.name} x${item.qty} — Rs.${item.price}</li>`).join("")}
      </ul>
      <p><b>Total:</b> Rs.${data.cart.reduce((t, i) => t + i.price * i.qty, 0)}</p>
    `,
  });

  return NextResponse.json({ success: true });
}
