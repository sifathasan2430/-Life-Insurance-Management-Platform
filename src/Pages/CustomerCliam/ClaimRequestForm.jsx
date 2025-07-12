import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import UserAuthContext from "../../Context/UserAuthContext";
import secureAxios from "../../utils/firebaseAxios";
import Swal from "sweetalert2";

const ClaimRequestForm = () => {
  const { user } = useContext(UserAuthContext);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [open, setOpen] = useState(false); // Modal control

  const { data: policies = [], isLoading, error } = useQuery({
    queryKey: ["activePolicies", user?.email],
    queryFn: async () => {
      const res = await secureAxios.get(`/policies?email=${user?.email}`);
      return res.data.filter((p) => p.isActive === true);
    },
    enabled: !!user?.email,
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const claimData = {
      policyId: selectedPolicy._id,
      policyTitle: selectedPolicy.title,
      userEmail: user.email,
      userName: user.displayName,
      reason: data.reason,
      status: "Pending",
      createdAt: new Date(),
    };

    try {
      await secureAxios.post("/claims", claimData);
      reset();
      setSelectedPolicy(null);
      setOpen(false); // ✅ Close modal

      Swal.fire({
        title: "Claim Submitted!",
        text: "Your claim is under review.",
        icon: "success",
        confirmButtonColor: "#ff8c00",
      });
    } catch (err) {
      console.error("Claim submission failed:", err);
      Swal.fire({
        title: "Error",
        text: "Something went wrong while submitting your claim.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#ff8c00]">Your Active Policies</h2>

      {isLoading && <p>Loading policies...</p>}
      {error && <p className="text-red-500">Failed to load policies.</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Policy Title</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {policies.map((policy) => (
              <tr key={policy._id}>
                <td className="px-6 py-4 text-sm text-gray-700">{policy.title}</td>
                <td className="px-6 py-4 text-right">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setSelectedPolicy(policy);
                          setValue("reason", "");
                          setOpen(true);
                        }}
                        className="bg-[#ff8c00] hover:bg-[#e67c00] text-white"
                      >
                        Claim
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Policy Title</label>
                          <Input
                            value={selectedPolicy?.title || ""}
                            readOnly
                            className="bg-gray-100 text-gray-700 mt-1"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700">Reason for Claim</label>
                          <Textarea
                            {...register("reason", { required: "Reason is required" })}
                            placeholder="Explain why you're submitting a claim"
                            rows={6}
                            className="mt-1"
                          />
                          {errors.reason && (
                            <p className="text-red-500 text-sm">{errors.reason.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700">Upload Document (Optional)</label>
                          <Input type="file" disabled className="mt-1 bg-gray-100 text-gray-400" />
                          <p className="text-xs text-gray-400 mt-1">This field is for view only.</p>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimRequestForm;
