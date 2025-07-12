import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useContext } from "react";

import secureAxios from "../../../utils/firebaseAxios";
import UserAuthContext from "../../../Context/UserAuthContext";

const AgentAssignedCustomers = () => {
  const { user } = useContext(UserAuthContext);
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["assignedApplications", user?.email],
    queryFn: async () => {
      const res = await secureAxios.get(`/applications?assigned=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleStatusChange = async (app) => {
    try {
      const res = await secureAxios.patch(`/applications/${app._id}`, {
        status: app.status,
      });

      if (app.status === "Approved") {
        await secureAxios.patch(`/policies/increment/${app.policyId}`);
      }

      toast.success("Status updated successfully");
      queryClient.invalidateQueries(["assignedApplications", user?.email]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  if (isLoading) return <p>Loading assigned customers...</p>;
console.log("this is the applications", applications);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Assigned Customers</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Policy</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.map((app) => (
            <TableRow key={app._id}>
              <TableCell>{app.name}</TableCell>
              <TableCell>{app.email}</TableCell>
              <TableCell>{app.policyTitle}</TableCell>
              <TableCell>
                <Select
                  defaultValue={app.status}
                  onValueChange={(val) =>
                    handleStatusChange({ ...app, status: val })
                  }
                >
                  <SelectTrigger className="w-32 border-[#ff8c00] text-[#ff8c00] focus:ring-[#ff8c00]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  className="bg-[#ff8c00] text-white hover:bg-[#e67c00]"
                  onClick={() => {
                    setSelected(app);
                    setOpen(true);
                  }}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Details Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selected.name}</p>
              <p><strong>Email:</strong> {selected.email}</p>
              <p><strong>Phone:</strong> {selected.phone || "N/A"}</p>
              <p><strong>Address:</strong> {selected.address}</p>
              <p><strong>Policy Interested:</strong> {selected.policyTitle}</p>
              <p><strong>Nominee:</strong> {selected.nomineeName} ({selected.nomineeRelation})</p>
              <p><strong>NID/SSN:</strong> {selected.nid}</p>
              <p><strong>Health Conditions:</strong> {selected.healthConditions?.join(", ") || "None"}</p>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-[#ff8c00] text-white hover:bg-[#e67c00]">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgentAssignedCustomers;
