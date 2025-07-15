import React, { useState, useContext } from "react";
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
import { toast } from "sonner";
import jsPDF from "jspdf";
import UserAuthContext from "../../Context/UserAuthContext";
import secureAxios from "../../utils/firebaseAxios";

const MyPoliciesPage = () => {
  const { user, loading } = useContext(UserAuthContext);
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const { data: applications = [] } = useQuery({
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
    return res.data;
  };

  const openDetails = async (app) => {
    setSelectedApp(app);
    const policy = await fetchPolicy(app.policyId);
    setSelectedPolicy(policy);
  };

  const submitReview = async () => {
    if (!rating || !feedback) {
      toast.error("Rating and feedback are required");
      return;
    }

    const reviewData = {
      policyId: selectedApp?.policyId,
      userEmail: user.email,
      rating,
      comment: feedback,
      profileImage: user.photoURL,
      name: user.displayName,
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

  const generatePDF = (app, policy) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Insurance Policy Document", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${app.name}`, 20, 40);
    doc.text(`Email: ${app.email}`, 20, 50);
    doc.text(`Policy Title: ${app.policyTitle}`, 20, 60);
    doc.text(`Coverage: ${policy.coverage}`, 20, 70);
    doc.text(`Duration: ${policy.duration}`, 20, 80);
    doc.text(`Premium: $${policy.baseRate}`, 20, 90);
    doc.text(`Nominee: ${app.nomineeName} (${app.nomineeRelation})`, 20, 100);
    doc.text(`Status: ${app.status}`, 20, 110);
    doc.text(`Approved Date: ${new Date(app.updatedAt || app.createdAt).toLocaleDateString()}`, 20, 120);

    doc.save(`Policy_${app.policyTitle.replace(/\s+/g, "_")}.pdf`);
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">Loading your policies...</div>
    );
  }

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
                <td className="p-3 flex flex-wrap items-center justify-center gap-2">
                  {/* View Details */}
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
                          <p><strong>Premium:</strong> ${selectedPolicy.baseRate}</p>
                          <p><strong>Nominee:</strong> {app.nomineeName} ({app.nomineeRelation})</p>
                          <p><strong>Address:</strong> {app.address}</p>
                          <p><strong>Health Conditions:</strong> {app.healthConditions?.join(", ")}</p>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  {/* Download PDF (Only if approved) */}
                  { (
                   <Button
  size="sm"
  className={`${
    app.status === "Approved"
      ? "bg-[#ff9a68] text-white hover:bg-[#f28754]"
      : "bg-gray-200 text-gray-500 cursor-not-allowed"
  }`}
  disabled={app.status !== "Approved"}
  onClick={async () => {
    if (app.status === "Approved") {
      const policy = await fetchPolicy(app.policyId);
      generatePDF(app, policy);
    }
  }}
>
  Download Policy
</Button>
                  )}

                  {/* Give Review */}
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
                        <DialogTitle className="text-xl text-gray-800 font-semibold">
                          Submit Your Review
                        </DialogTitle>
                      </DialogHeader>

                      {/* User Info */}
                      <div className="flex items-center gap-3 mt-3">
                        <img
                          src={user?.photoURL}
                          alt={user?.displayName}
                          className="w-10 h-10 rounded-full border-2 border-[#ff8c00]"
                        />
                        <div>
                          <p className="font-medium text-gray-800 text-sm">
                            {user?.displayName || "User"}
                          </p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-1 mt-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
                              star <= rating
                                ? "fill-[#ff8c00] text-[#ff8c00]"
                                : "text-gray-300"
                            }`}
                            onClick={() => setRating(star)}
                          />
                        ))}
                      </div>

                      {/* Feedback */}
                      <Textarea
                        placeholder="Write your feedback..."
                        className="mt-4"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />

                      {/* Submit */}
                      <Button
                        onClick={submitReview}
                        className="w-full mt-4 bg-[#ff8c00] hover:bg-[#e57900] text-white"
                      >
                        Submit Review
                      </Button>
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
