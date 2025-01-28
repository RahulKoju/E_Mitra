"use client";
import { CartItemViewModel } from "@/lib/type";
import crypto from "crypto";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface EsewaPaymentProps {
  totalAmount: number;
  cartItems: CartItemViewModel[];
}

function generateTransactionUUID(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const datePart = `${year}${month}${day}-${hours}${minutes}${seconds}`;
  const randomPart = Math.random().toString(36).slice(-6).toUpperCase();

  return `${datePart}-${randomPart}`;
}

interface PaymentData {
  amount: number;
  tax_amount: number;
  product_service_charge: number;
  product_delivery_charge: number;
  total_amount: number;
  product_code: string;
  transaction_uuid: string;
  success_url: string;
  failure_url: string;
  signed_field_names: string;
  signature: string;
}

export default function EsewaPayment({
  totalAmount,
  cartItems,
}: EsewaPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleEsewaPayment = async () => {
    setIsLoading(true);

    try {
      // Check authentication before proceeding
      const storedToken = sessionStorage.getItem("token");
      const storedUserString = sessionStorage.getItem("user");

      if (!storedToken || !storedUserString) {
        toast.error("Please log in to proceed with payment");
        router.push("/sign-in");
        return;
      }

      const transactionUuid = generateTransactionUUID();

      const dataToSign = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=EPAYTEST`;
      const secretKey = "8gBm/:&EnhH.1/q";

      const hmac = crypto.createHmac("sha256", secretKey);
      hmac.update(dataToSign);
      const signature = hmac.digest("base64");

      const paymentData: PaymentData = {
        amount: totalAmount,
        tax_amount: 0,
        product_service_charge: 0,
        product_delivery_charge: 0,
        total_amount: totalAmount,
        product_code: "EPAYTEST",
        transaction_uuid: transactionUuid,
        success_url: `${window.location.origin}/payment/success?transaction_uuid=${transactionUuid}`,
        failure_url: `${window.location.origin}/payment/failure`,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: signature,
      };

      const esewaUrl = `https://rc-epay.esewa.com.np/api/epay/main/v2/form`;
      const form = document.createElement("form");
      form.method = "POST";
      form.action = esewaUrl;

      Object.keys(paymentData).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = paymentData[key as keyof PaymentData].toString();
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleEsewaPayment}
      disabled={isLoading || cartItems.length === 0}
      className="w-full bg-green-600 text-white font-semibold py-4 rounded-lg hover:bg-green-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
    >
      {isLoading ? <span className="animate-spin">🔄</span> : "Pay via eSewa"}
    </button>
  );
}
