"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import { UpdateCartContext } from "./_context/UpdateCartContext";
import { useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Ecommerce",
//   description: "Managing sales product and customer relation in a website",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = usePathname();
  const [updateCart, setUpdateCart] = useState(false);
  const show = params == "/sign-in" || params == "/sign-up" ? false : true;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
          {show && <Header />}
          {children}
          <Toaster />
          {show && <Footer />}
        </UpdateCartContext.Provider>
      </body>
    </html>
  );
}
