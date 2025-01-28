import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/app/_context/AuthContext";
import { toast } from "sonner";
import { OrderStatus } from "@/lib/type";

const ORDER_STATUSES: OrderStatus[] = ["pending", "completed", "cancelled"];

interface StatusChangeProps {
  currentStatus: string;
  orderId: string;
  onStatusChange: (newStatus: OrderStatus) => Promise<void>;
}

export function OrderStatusManagement({
  currentStatus,
  orderId,
  onStatusChange,
}: StatusChangeProps) {
  const { user } = useAuth();

  if (!user?.admin) return null;

  const handleStatusChange = async (newStatus: OrderStatus) => {
    try {
      await onStatusChange(newStatus);
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update order status");
      console.error("Error updating order status:", error);
    }
  };

  return (
    <Select
      onValueChange={handleStatusChange}
      defaultValue={currentStatus.toLowerCase()}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Change Status" />
      </SelectTrigger>
      <SelectContent>
        {ORDER_STATUSES.map((status) => (
          <SelectItem key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
