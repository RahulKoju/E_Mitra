"use client";
import React from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import { UpdateCartProvider } from "./_context/UpdateCartContext";
import { AuthProvider } from "./_context/AuthContext";
import Providers from "./Providers";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showHeaderFooter = pathname !== "/sign-in" && pathname !== "/sign-up";

  return (
    <Providers>
      <AuthProvider>
        <UpdateCartProvider>
          {showHeaderFooter && <Header />}
          <main>{children}</main>
          {showHeaderFooter && <Footer />}
          <Toaster />
        </UpdateCartProvider>
      </AuthProvider>
    </Providers>
  );
}
