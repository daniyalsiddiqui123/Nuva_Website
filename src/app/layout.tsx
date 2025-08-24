import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/app/(store)/components/theme-provider";

export const metadata: Metadata = {
  title: "Store",
  description: "E-Commerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          </body>
    </html>
  );
}
