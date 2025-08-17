import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import secureAxios from "../../utils/firebaseAxios";

export default function EarningsChart() {
  const { data: payments, isLoading, isError } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const response = await secureAxios.get("/admin/transactions");
      return response.data;
    },
  });

  // Show loading state
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Monthly Earnings</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex justify-center items-center">
          Loading...
        </CardContent>
      </Card>
    );
  }

  // Show error state
  if (isError) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Monthly Earnings</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex justify-center items-center">
          Failed to load data
        </CardContent>
      </Card>
    );
  }

  // Safely reduce only if payments exist
  const monthlyTotals = payments?.reduce((acc, payment) => {
    const date = new Date(payment.createdAt);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const key = `${month}-${year}`;
    if (!acc[key]) acc[key] = { month: key, total: 0, date: new Date(year, date.getMonth()) };
    acc[key].total += payment.amount;
    return acc;
  }, {}) || {};

  const chartData = Object.values(monthlyTotals).sort((a, b) => a.date - b.date);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Monthly Earnings</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", borderRadius: 8, border: "1px solid #ddd" }}
              formatter={(value) => `$${value}`}
            />
            <Legend verticalAlign="top" />
            <Bar
              dataKey="total"
              fill="#FE9A00"
              radius={[10, 10, 0, 0]}
              barSize={40}
              label={{ position: "top", formatter: (value) => `$${value}` }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
