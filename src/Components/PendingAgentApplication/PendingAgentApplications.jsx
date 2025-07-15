import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import secureAxios from "../../utils/firebaseAxios";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const PendingAgentApplications = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["pendingAgentApplications"],
    queryFn: async () => {
      const res = await secureAxios.get("/agent-applications?status=pending");
      return res.data;
    },
  });

  const handleRejectSubmit = async () => {
    try {
      const res = await secureAxios.patch(`/agent-applications/${selectedApp._id}`, {
        status: "rejected",
        rejectionMessage: feedback,
      });

      if (res.data.modifiedCount > 0) {
        toast.success("Application rejected with feedback");
        setFeedback("");
        setSelectedApp(null);
        setOpen(false);
        queryClient.invalidateQueries(["pendingAgentApplications"]);
      } else {
        toast.error("Failed to reject or no changes made");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error rejecting application");
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await secureAxios.patch(`/agent-applications/${id}`, {
        status: "approved",
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Application approved");
        queryClient.invalidateQueries(["pendingAgentApplications"]);
      } else {
        toast.error("Approval failed");
      }
    } catch (err) {
      toast.error("Error approving application");
    }
  };

  if (isLoading) return <p className="text-center">Loading pending applications...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pending Agent Applications</h2>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app._id} className="text-center hover:bg-gray-50">
              <TableCell>{app.name}</TableCell>
              <TableCell>{app.email}</TableCell>
              <TableCell>{app.status}</TableCell>
              <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  size="sm"
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={() => handleApprove(app._id)}
                >
                  Approve
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setSelectedApp(app);
                    setOpen(true);
                  }}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Single Dialog controlled by state */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Agent Application</DialogTitle>
          </DialogHeader>

          <Textarea
            placeholder="Write rejection reason"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[100px]"
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={!feedback.trim()}
              onClick={handleRejectSubmit}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Submit Rejection
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PendingAgentApplications;
