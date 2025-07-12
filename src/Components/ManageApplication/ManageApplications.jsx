import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import secureAxios from "../../utils/firebaseAxios";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ManageApplications = () => {
  const queryClient = useQueryClient();

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await secureAxios.get("/applications");
      return res.data;
    },
  });

  const { data: agents = [] } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await secureAxios.get("/users?role=agent");
      return res.data;
    },
  });

  const updateApplication = async (id, updates) => {
    try {
      const res = await secureAxios.patch(`/applications/${id}`, updates);
      if (res.status === 200) {
        toast.success("Application updated successfully!");
        queryClient.invalidateQueries(["applications"]);
      } else {
        toast.error("Failed to update application.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  const handleAssignAgent = (id, agentEmail) => {
    updateApplication(id, { assignedAgent: agentEmail });
  };

  const handleReject = (id, value) => {
    updateApplication(id, { status: value });
  };

  const openDetailsModal = (application) => {
    setSelectedApplication(application);
    setIsDetailsOpen(true);
  };

  const closeDetailsModal = () => {
    setSelectedApplication(null);
    setIsDetailsOpen(false);
  };

  if (isLoading) return <div>Loading applications...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Applications</h2>

      <Table>
        <TableHeader className="text-center">
          <TableRow>
            <TableHead className="text-center">Applicant Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Policy Name</TableHead>
            <TableHead className="text-center">Application Date</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Assign Agent</TableHead>
            <TableHead className="text-center">Actions</TableHead>
            <TableHead className="text-center">Change Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.map((app) => (
            <TableRow key={app._id}>
              <TableCell className="text-center">{app.name}</TableCell>
              <TableCell className="text-center">{app.email}</TableCell>
              <TableCell className="text-center">{app.policyTitle}</TableCell>
              <TableCell className="text-center">{new Date(app.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-center">{app.status}</TableCell>

              <TableCell className="text-center">
                <Select
                  onValueChange={(val) => handleAssignAgent(app._id, val)}
                  defaultValue={app.assignedAgent || ""}
                >
                  <SelectTrigger className="w-40 border-[#ff8c00] text-[#ff8c00] focus:ring-[#ff8c00]">
                    <SelectValue placeholder="Assign Agent" />
                  </SelectTrigger>
                  {/* <SelectContent>
                    {agents.map((agent) => (
                      <SelectItem key={agent._id} value={agent.email}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectContent> */}
                </Select>
              </TableCell>

              <TableCell className="flex gap-2 justify-center">
                <Button
                  size="sm"
                  className="bg-[#ff8c00] text-white hover:bg-[#e67c00]"
                  onClick={() => openDetailsModal(app)}
                >
                  View Details
                </Button>
              </TableCell>

              <TableCell className="text-center">
                <Button onClick={() => handleReject(app._id, "Rejected")} variant="destructive">Reject</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {selectedApplication ? (
              <>
                <p><strong>Name:</strong> {selectedApplication.name}</p>
                <p><strong>Email:</strong> {selectedApplication.email}</p>
                <p><strong>Policy:</strong> {selectedApplication.policyTitle}</p>
                <p><strong>Application Date:</strong> {new Date(selectedApplication.createdAt).toLocaleString()}</p>
                <p><strong>Status:</strong> {selectedApplication.status}</p>
                <p><strong>Assigned Agent:</strong> {selectedApplication.assignedAgent || "None"}</p>
                <p><strong>Address:</strong> {selectedApplication.address}</p>
                <p><strong>NID/SSN:</strong> {selectedApplication.nid}</p>
                <p><strong>Nominee Name:</strong> {selectedApplication.nomineeName}</p>
                <p><strong>Nominee Relationship:</strong> {selectedApplication.nomineeRelation}</p>
                <p><strong>Health Conditions:</strong> {selectedApplication.healthConditions?.join(", ") || "None"}</p>
              </>
            ) : (
              <p>No application selected</p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-[#ff8c00] text-white hover:bg-[#e67c00]">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageApplications;
