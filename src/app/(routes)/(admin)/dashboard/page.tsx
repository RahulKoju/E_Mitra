"use client";
import { useAuth } from "@/app/_context/AuthContext";
import { useAllOrders } from "@/app/_utils/tanstackQuery";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderCircle, UserCog } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Analytics from "./_components/Analytics";
import PendingOrderTable from "./_components/PendingOrderTable";

function Dashboard() {
  const { isLoggedIn, user, jwt } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { data: allOrders = [], isLoading: isOrderLoading } = useAllOrders(jwt);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!isLoggedIn || !user?.admin) {
        router.push("/");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoggedIn, user, router]);

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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4 md:mb-0">
          Admin Dashboard
        </h1>
        <div className="flex items-center space-x-2 text-gray-600">
          <Link href={"/dashboard/product-management"} className="mr-5">
            <Button>Manage Products</Button>
          </Link>
          <UserCog className="w-6 h-6" />
          <span className="text-sm font-medium">
            {user.username?.toLocaleUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <UserCog className="w-5 h-5" />
              <span>Admin Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Username:</span>
                <span className="text-gray-800">{user.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="text-gray-800">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Role:</span>
                <span className="text-green-600 font-semibold">
                  Administrator
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full bg-green-50/50">
          <CardHeader>
            <CardTitle className="text-green-800">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">
                  {allOrders.length}
                </div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">
                  {allOrders
                    .reduce((sum, order) => sum + order.totalOrderAmount, 0)
                    .toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <PendingOrderTable orders={allOrders} orderLoading={isOrderLoading} />
        <Analytics orders={allOrders} />
      </div>
    </div>
  );
}

export default Dashboard;
