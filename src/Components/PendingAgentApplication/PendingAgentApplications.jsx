import { useQuery, useQueryClient } from "@tanstack/react-query";
import secureAxios from "../../utils/firebaseAxios";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const PendingAgentApplications = () => {
  const queryClient = useQueryClient();

  // Fetch only pending applications
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["pendingAgentApplications"],
    queryFn: async () => {
      const res = await secureAxios.get("/agent-applications?status=pending");
      return res.data;
    },
  });

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await secureAxios.patch(`/agent-applications/${id}`, { status });
      if (res.data.modifiedCount > 0) {
        toast.success(`Status updated to ${status}`);
        queryClient.invalidateQueries(["pendingAgentApplications"]);
      } else {
        toast.error("Update failed or no changes");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (isLoading) return <p className="text-center">Loading pending applications...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pending Agent Applications</h2>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 ">
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
                  onClick={() => handleStatusUpdate(app._id, "approved")}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleStatusUpdate(app._id, "rejected")}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingAgentApplications;
