"use client";
import { useAuth } from "@/app/_context/AuthContext";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PendingOrderTable from "./_components/PendingOrderTable";

type ProductImage = {
  url: string;
};

type Product = {
  id: number;
  documentId: string;
  name: string;
  price: number;
  images: ProductImage[];
};

type OrderItemDetails = {
  id: number;
  quantity: number;
  amount: number;
  product: Product;
};

type Order = {
  id: number;
  address: string;
  createdAt: string;
  documentId: string;
  email: string;
  orderItemList: OrderItemDetails[];
  phone_no: string;
  totalOrderAmount: number;
  userId: number;
  username: string;
  orderStatus: string;
};

function Dashboard() {
  const { isLoggedIn, user, jwt } = useAuth();
  const router = useRouter();
  const [orderLoading, setOrderLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  const getAllOrders = async () => {
    setOrderLoading(true);
    try {
      if (user?.admin && jwt) {
        const orderList: Order[] = await GlobalAPI.getAllOrders(jwt);
        setOrders(orderList);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setOrderLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!isLoggedIn || !user?.admin) {
        router.push("/");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoggedIn, user, router]);

  useEffect(() => {
    if (user?.admin) {
      getAllOrders();
    }
  }, [user, jwt]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="text-green-500 w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn || !user?.admin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-green-700 text-center">
        Admin Dashboard
      </h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Admin Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> Administrator
            </p>
          </div>
        </CardContent>
      </Card>

      <PendingOrderTable orders={orders} orderLoading={orderLoading} />
    </div>
  );
}

export default Dashboard;
