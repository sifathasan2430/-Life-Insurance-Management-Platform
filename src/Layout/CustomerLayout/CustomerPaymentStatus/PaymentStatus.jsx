import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";


import { useNavigate } from "react-router-dom";
import secureAxios from "../../../utils/firebaseAxios";
import UserAuthContext from "../../../Context/UserAuthContext";

const PaymentStatus = () => {
  const { user } = useContext(UserAuthContext);
  const navigate = useNavigate();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await secureAxios.get(`/payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <div>Loading payment status...</div>;

  if (payments.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No payment records found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#ff8c00]">Payment Status</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Policy</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((pay) => (
            <TableRow key={pay._id}>
              <TableCell>{pay.policyTitle}</TableCell>
              <TableCell>{`${pay.amount} ${pay.currency.toUpperCase()}`}</TableCell>
              <TableCell className="capitalize">{pay.paymentFrequency}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    pay.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {pay.status}
                </span>
              </TableCell>
              <TableCell>
                {pay.status === "Due" ? (
                  <Button
                    size="sm"
                    className="bg-[#ff8c00] text-white hover:bg-[#e67c00]"
                    onClick={() => navigate( `/customer/dashboard/make-payment/${pay._id}`, { state: pay })}
                  >
                    Pay Now
                  </Button>
                ) : (
                  <span className="text-green-500 font-medium">Completed</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentStatus;
