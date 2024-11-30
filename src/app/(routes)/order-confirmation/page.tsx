import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

function OrderConfirmation() {
  return (
    <div className="flex justify-center my-20">
      <div className="border shadow-md flex flex-col justify-center p-20 rounded-md items-center gap-3 pax-32">
        <CheckCircle2 className="text-green-600 h-24 w-24" />
        <h2 className="font-semibold text-3xl text-green-600">
          Order placed sucessfully
        </h2>
        <h2 className="font-semibold">Thank you so much for order</h2>
        <Button className="mt-8 font-medium">Track your order</Button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
