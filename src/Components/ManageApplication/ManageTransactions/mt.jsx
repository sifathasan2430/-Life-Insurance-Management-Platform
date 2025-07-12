import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { format } from "date-fns";
import secureAxios from "../../../utils/firebaseAxios";
import { Button } from "@/components/ui/button";

const AdminTransactions = () => {
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["admin-transactions"],
    queryFn: async () => {
      const res = await secureAxios.get("/admin/transactions");
      return res.data;
    },
  });

  const totalIncome = transactions.reduce((sum, tx) => sum + (tx.amount || 0), 0);

  if (isLoading) return <div className="text-center py-10">Loading transactions...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#ff8c00]">Manage Transactions</h2>

      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-gray-700">
          Total Income: <span className="text-green-600">${totalIncome.toFixed(2)}</span>
        </h4>

        <div className="space-x-2">
          <Button variant="outline">Filter by Date</Button>
          <Button variant="outline">Filter by User</Button>
          <Button variant="outline">Filter by Policy</Button>
        </div>
      </div>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Txn ID</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>Policy Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx._id}>
               <TableCell className="text-xs text-gray-500">{tx.stripePaymentId?.slice(0, 10)}...</TableCell>
                <TableCell>{tx.userEmail}</TableCell>
                <TableCell>{tx.policyTitle}</TableCell>
                <TableCell>{tx.amount} {tx.currency?.toUpperCase()}</TableCell>
                <TableCell>{format(new Date(tx.paidAt || tx.createdAt), "PPpp")}</TableCell>
                <TableCell>
                  <span className="text-green-600 font-medium">{tx.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminTransactions;
