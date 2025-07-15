import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import UserAuthContext from "../../Context/UserAuthContext";
import secureAxios from "../../utils/firebaseAxios";
import { toast } from "sonner";

const ClaimRequestForm = () => {
  const { user } = useContext(UserAuthContext);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [openDialogId, setOpenDialogId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: policies = [], isLoading: loadingPolicies, refetch: refetchPolicies } = useQuery({
    queryKey: ["approvedApplications", user?.email],
    queryFn: async () => {
      const res = await secureAxios.get(`/applications?email=${user?.email}`);
      return res.data.filter((app) => app.status === "Approved");
    },
    enabled: !!user?.email,
  });

  const { data: claims = [], isLoading: loadingClaims, refetch: refetchClaims } = useQuery({
    queryKey: ["userClaims", user?.email],
    queryFn: async () => {
      const res = await secureAxios.get(`/claims?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

const onSubmit = async (data) => {
  const claimData = {
    policyId: selectedPolicy.policyId,
    policyTitle: selectedPolicy.policyTitle,
    userEmail: user.email,
    userName: user.displayName,
    // From form inputs
    reason: data.reason,
    documentLink: data.documentLink,
    // Hidden policy data
    baseRate: selectedPolicy.baseRate,
    nomineeName: selectedPolicy.nomineeName,
    nomineeRelation: selectedPolicy.nomineeRelation,
    paymentFrequency: selectedPolicy.paymentFrequency,
    // System fields
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  try {
    await secureAxios.post("/claims", claimData);
    await secureAxios.patch(`/applications/${selectedPolicy._id}`, {
      hasClaimed: true
    });

    reset();
    setSelectedPolicy(null);
    setOpenDialogId(null);
    await refetchPolicies();
    await refetchClaims();
    
    toast.success("Claim submitted successfully");
  } catch (err) {
    toast.error("Something went wrong while submitting your claim.");
  }
};

  const handleClaimClick = (policy) => {
    setSelectedPolicy(policy);
    setValue("reason", "");
    setValue("documentLink", "");
    setOpenDialogId(policy._id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#ff8c00]">
        Your Approved Policies
      </h2>

      {(loadingPolicies || loadingClaims) && <p>Loading...</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Claim Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {policies.map((policy) => {
              const claim = claims.find((c) => c.policyId === policy.policyId);
              const isClaimed = policy.hasClaimed || Boolean(claim);

              return (
                <tr key={policy._id}>
                  <td className="px-6 py-4 text-sm text-gray-700">{policy.policyTitle}</td>

                  <td className="px-6 py-4 text-sm">
                    {claim ? (
                      <span
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          claim.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : claim.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {claim.status}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">
                        {isClaimed ? "Claim Submitted" : "Not Claimed"}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Dialog 
                      open={openDialogId === policy._id} 
                      onOpenChange={(open) => {
                        if (!open) setOpenDialogId(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          disabled={isClaimed}
                          onClick={() => handleClaimClick(policy)}
                          className="bg-[#ff8c00] hover:bg-[#e67c00] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isClaimed ? "Already Claimed" : "Claim"}
                        </Button>
                      </DialogTrigger>

                    
                         <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Policy Title</label>
                            <Input
                              value={selectedPolicy?.policyTitle || ""}
                              readOnly
                              className="bg-gray-100 text-gray-700 mt-1"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-700">Reason for Claim</label>
                            <Textarea
                              {...register("reason", { required: "Reason is required" })}
                              placeholder="Explain your reason for submitting a claim"
                              rows={5}
                              className="mt-1"
                            />
                            {errors.reason && (
                              <p className="text-red-500 text-sm">{errors.reason.message}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-700">Document Link</label>
                            <Input
                              {...register("documentLink", {
                                required: "Document link is required",
                                pattern: {
                                  value: /^https?:\/\/[\w\-\.]+[\w\-\/\?%&=]+$/,
                                  message: "Enter a valid URL (http/https)",
                                },
                              })}
                              placeholder="https://your-file-link.com/file.pdf"
                              className="mt-1"
                            />
                            {errors.documentLink && (
                              <p className="text-red-500 text-sm">{errors.documentLink.message}</p>
                            )}
                          </div>

                          <Button
                            type="submit"
                            className="bg-[#ff8c00] hover:bg-[#e67c00] text-white w-full"
                          >
                            Submit Claim
                          </Button>
                        </form>
                      </DialogContent>
                      
                    </Dialog>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimRequestForm;