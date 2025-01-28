"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PaymentFailure() {
  const router = useRouter();

  useEffect(() => {
    toast.error("Payment failed or was cancelled.");
    router.replace("/checkout");
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Payment failed. Redirecting back to checkout...</p>
    </div>
  );
}
