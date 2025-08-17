import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import secureAxios from "../../utils/firebaseAxios";

export default function PoliciesDistribution() {
  const { data: policies, isLoading, isError } = useQuery({
    queryKey: ["policies"],
    queryFn: async () => {
      const response = await secureAxios.get("/policies?allpolicy=true");
      return response.data;
    },
  });

  // Handle loading state
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Policies Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <p>Loading...</p>
        </CardContent>
      </Card>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Policies Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <p>Failed to load data</p>
        </CardContent>
      </Card>
    );
  }

  // Process data only when policies is successfully loaded
  const categoryCount = policies && policies.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = { category: item.category, count: 0 };
    }
    acc[item.category].count += 1;
    return acc;
  }, {});

  // Ensure chartData is an array
  const chartData = Object.values(categoryCount);

  // Return the BarChart component
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Policies Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#FF8C00" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
