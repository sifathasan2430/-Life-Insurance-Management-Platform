import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { toast } from "sonner";
import secureAxios from "../../../../utils/firebaseAxios";

const AgentClaimsManagement = () => {
  const [selectedClaim, setSelectedClaim] = useState(null);
  const queryClient = useQueryClient();

  // Fetch all claims
  const { data: claims = [], isLoading } = useQuery({
    queryKey: ["allClaims"],
    queryFn: async () => {
      const res = await secureAxios.get("/claims");
      return res.data;
    },
  });

  // Mutation for updating claim status
  const updateClaimStatus = useMutation({
    mutationFn: async ({ claimId, status }) => {
      await secureAxios.patch(`/claims/${claimId}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allClaims"]);
      toast.success("Claim status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update claim status");
    },
  });

  const handleApprove = (claimId) => {
    updateClaimStatus.mutate({ claimId, status: "Approved" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Claims Management</h2>

      {isLoading ? (
        <p>Loading claims...</p>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy</TableHead>
                <TableHead>Claimant</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.map((claim) => (
                <TableRow key={claim._id}>
                  <TableCell className="font-medium">
                    {claim.policyTitle}
                  </TableCell>
                  <TableCell>{claim.userName}</TableCell>
                  <TableCell>
                    {claim.baseRate} {claim.currency}
                  </TableCell>
                  <TableCell>
                    {new Date(claim.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        claim.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : claim.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {claim.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedClaim(claim)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        {selectedClaim && (
                          <div className="space-y-4">
                            <h3 className="text-lg font-bold">
                              Claim Details: {selectedClaim.policyTitle}
                            </h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium">Policy Information</h4>
                                <p>Title: {selectedClaim.policyTitle}</p>
                                <p>Amount: {selectedClaim.baseRate} {selectedClaim.currency}</p>
                                <p>Frequency: {selectedClaim.paymentFrequency}</p>
                              </div>
                              
                              <div>
                                <h4 className="font-medium">Claimant Details</h4>
                                <p>Name: {selectedClaim.userName}</p>
                                <p>Email: {selectedClaim.userEmail}</p>
                                <p>NID: {selectedClaim.userNid}</p>
                              </div>
                              
                              <div>
                                <h4 className="font-medium">Nominee Information</h4>
                                <p>Name: {selectedClaim.nomineeName}</p>
                                <p>Relation: {selectedClaim.nomineeRelation}</p>
                              </div>
                              
                              <div>
                                <h4 className="font-medium">Claim Details</h4>
                                <p>Status: {selectedClaim.status}</p>
                                <p>Submitted: {new Date(selectedClaim.createdAt).toLocaleString()}</p>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium">Reason for Claim</h4>
                              <p className="bg-gray-50 p-3 rounded">
                                {selectedClaim.reason}
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium">Document Links</h4>
                              <a 
                                href={selectedClaim.documentLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                View Document
                              </a>
                            </div>
                            
                            {selectedClaim.status === "Pending" && (
                              <div className="flex justify-end space-x-2 pt-4">
                                <Button
                                  variant="destructive"
                                  onClick={() => updateClaimStatus.mutate({
                                    claimId: selectedClaim._id,
                                    status: "Rejected"
                                  })}
                                >
                                  Reject
                                </Button>
                                <Button
                                  onClick={() => handleApprove(selectedClaim._id)}
                                >
                                  Approve
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AgentClaimsManagement;