import React, { useMemo } from "react";
import dayjs from "dayjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order } from "@/lib/type";

// Helper function to calculate metrics
const calculateTotalMetrics = (processedOrderData: any[]) => {
  const totalRevenue = processedOrderData.reduce(
    (sum, data) => sum + data.totalRevenue,
    0
  );
  const totalOrders = processedOrderData.reduce(
    (sum, data) => sum + data.totalOrders,
    0
  );
  const averageOrderValue =
    totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : "0.00";

  return { totalRevenue, totalOrders, averageOrderValue };
};

function Analytics({ orders }: { orders: Order[] }) {
  const [timePeriod, setTimePeriod] = React.useState<"day" | "month" | "year">(
    "month"
  );

  const processedOrderData = useMemo(() => {
    // Group orders by time period
    const groupedOrders = orders.reduce((acc, order) => {
      let key: string;
      const orderDate = dayjs(order.createdAt);

      switch (timePeriod) {
        case "day":
          key = orderDate.format("YYYY-MM-DD");
          break;
        case "year":
          key = orderDate.format("YYYY");
          break;
        case "month":
        default:
          key = orderDate.format("YYYY-MMM");
      }

      if (!acc[key]) {
        acc[key] = {
          period: key,
          totalRevenue: 0,
          totalOrders: 0,
          averageOrderValue: 0,
        };
      }

      acc[key].totalRevenue += order.totalOrderAmount;
      acc[key].totalOrders += 1;
      acc[key].averageOrderValue = acc[key].totalRevenue / acc[key].totalOrders;

      return acc;
    }, {} as Record<string, { period: string; totalRevenue: number; totalOrders: number; averageOrderValue: number }>);

    // Convert to array and sort
    return Object.values(groupedOrders).sort((a, b) =>
      a.period.localeCompare(b.period)
    );
  }, [orders, timePeriod]);

  const { totalRevenue, totalOrders, averageOrderValue } =
    calculateTotalMetrics(processedOrderData);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Order Analytics</CardTitle>
        <Select
          value={timePeriod}
          onValueChange={(value) =>
            setTimePeriod(value as "day" | "month" | "year")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Daily</SelectItem>
            <SelectItem value="month">Monthly</SelectItem>
            <SelectItem value="year">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={processedOrderData}
            margin={{
              top: 10,
              right: 10,
              left: 40,
              bottom: 40,
            }}
          >
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalRevenue" fill="#8884d8" name="Total Revenue" />
            <Bar dataKey="totalOrders" fill="#82ca9d" name="Total Orders" />
            <Bar
              dataKey="averageOrderValue"
              fill="#ffc658"
              name="Avg Order Value"
            />
          </BarChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rs.{totalRevenue.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Order Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rs.{averageOrderValue}</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

export default Analytics;
