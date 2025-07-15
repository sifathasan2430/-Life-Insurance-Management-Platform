import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import secureAxios from "../utils/firebaseAxios";
import UserAuthContext from "../Context/UserAuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserPolicyStatus = () => {
  const { user } = useContext(UserAuthContext);
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["userApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await secureAxios.get(
        `/applications?email=sifatshasan@gmail.com`
      );
      return res.data;
    },
  });

  const rejectedApplications = data.filter((app) => app.status === "Rejected");

  if (isLoading) return <p>Loading rejected applications...</p>;
  if (isError) return <p>Error loading applications.</p>;
  if (!rejectedApplications || rejectedApplications.length === 0)
    return <p>No rejected applications found.</p>;

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md border">
      <h2 className="text-xl font-semibold mb-4">Rejected Applications</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Policy Title</TableHead>
            <TableHead>Your Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rejectedApplications.map((app) => (
            <TableRow key={app._id}>
              <TableCell>{app.policyTitle}</TableCell>
              <TableCell>{app.name}</TableCell>
              <TableCell>{app.email}</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700">
                  {app.status}
                </span>
              </TableCell>
              <TableCell>
                {app.feedback ? (
                  <Button
                    variant="outline"
                    className="text-[#ff9a68] border-[#ff9a68] hover:bg-[#fff1eb]"
                    onClick={() => {
                      setSelectedFeedback(app.feedback);
                      setIsFeedbackOpen(true);
                    }}
                  >
                    View Feedback
                  </Button>
                ) : (
                  <Button disabled className="bg-[#fff1eb] text-[#ff9a68]">
                    Rejected
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Feedback Modal */}
      <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Admin Feedback</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <p className="text-gray-700 whitespace-pre-line">{selectedFeedback}</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserPolicyStatus;
