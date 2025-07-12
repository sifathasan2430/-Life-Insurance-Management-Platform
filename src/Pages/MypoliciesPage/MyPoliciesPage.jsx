import React, { useState,  useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import UserAuthContext from "../../Context/UserAuthContext";
import secureAxios from "../../utils/firebaseAxios";

const MyPoliciesPage = () => {
  const { user } = useContext(UserAuthContext);
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      const res = await secureAxios.get(`/applications?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const fetchPolicy = async (policyId) => {
    const res = await secureAxios.get(`/policy/${policyId}`);
    setSelectedPolicy(res.data);
  };

  const openDetails = async (app) => {
    setSelectedApp(app);
    await fetchPolicy(app.policyId);
  };

  const submitReview = async () => {
    if (!rating || !feedback) {
      toast.error("Rating and feedback are required");
      return;
    }
    const reviewData = {
      policyId: selectedApp?.policyId,
      userEmail: user?.email,
      rating,
      comment: feedback,
      photo: user?.photoURL,
      name: user?.displayName,
      createdAt: new Date(),
    };
    try {
      await secureAxios.post("/reviews", reviewData);
      toast.success("Review submitted successfully");
      setReviewModalOpen(false);
      setFeedback("");
      setRating(0);
    } catch (err) {
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-orange-600">My Applied Policies</h2>
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full bg-white text-sm border">
          <thead className="bg-orange-50 text-left">
            <tr>
              <th className="p-3 font-semibold">Policy Title</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Assigned Agent</th>
              <th className="p-3 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-b hover:bg-orange-50/40">
                <td className="p-3">{app.policyTitle}</td>
                <td className="p-3 capitalize font-medium">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      app.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : app.status === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="p-3">{app.assignedAgent || "Not Assigned"}</td>
                <td className="p-3 flex items-center justify-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => openDetails(app)}
                        size="sm"
                        variant="outline"
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Policy Details</DialogTitle>
                      </DialogHeader>
                      {selectedPolicy && (
                        <div className="space-y-2 text-sm">
                          <p><strong>Coverage:</strong> {selectedPolicy.coverage}</p>
                          <p><strong>Duration:</strong> {selectedPolicy.duration}</p>
                          <p><strong>Premium:</strong> {selectedPolicy.baseRate}$</p>
                          <p><strong>Nominee:</strong> {app.nomineeName} ({app.nomineeRelation})</p>
                          <p><strong>Address:</strong> {app.address}</p>
                          <p><strong>Health Conditions:</strong> {app.healthConditions?.join(", ")}</p>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={reviewModalOpen}
                    onOpenChange={(open) => {
                      setReviewModalOpen(open);
                      if (open) setSelectedApp(app);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setSelectedApp(app)}
                      >
                        Give Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Submit Your Review</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 cursor-pointer ${
                                star <= rating
                                  ? "fill-orange-500 text-orange-500"
                                  : "text-gray-400"
                              }`}
                              onClick={() => setRating(star)}
                            />
                          ))}
                        </div>
                        <Textarea
                          placeholder="Write your feedback..."
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                        />
                        <Button
                          onClick={submitReview}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          Submit Review
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPoliciesPage;
