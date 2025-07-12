import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import secureAxios from "@/utils/firebaseAxios";
import { toast } from "sonner";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const ActiveAgents = () => {
  const queryClient = useQueryClient();
  const [userData, setUserData] = useState({});

  // Fetch approved agent applications
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["approvedAgents"],
    queryFn: async () => {
      const res = await secureAxios.get("/agent-applications?status=approved");
      return res.data;
    },
  });

  // Fetch individual user info by email and store in userData state
  const fetchUserByEmail = async (email) => {
    if (userData[email]) return; // already fetched
    try {
      const res = await secureAxios.get(`/users?email=${email}`);
      setUserData((prev) => ({ ...prev, [email]: res.data }));
    } catch (err) {
      console.error("User not found", err);
    }
  };

  // On agents load, fetch all users' roles
  useEffect(() => {
    agents.forEach((a) => fetchUserByEmail(a.email));
  }, [agents]);

  // Update role by calling PATCH
  const handleRoleUpdate = async (email, newRole) => {
    try {
      const res = await secureAxios.patch(`/users/role?email=${email}`, { role: newRole });
      if (res.status === 200) {
        toast.success(`Role updated to ${newRole}`);
        fetchUserByEmail(email); // refresh role
        queryClient.invalidateQueries(["approvedAgents"]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update role");
    }
  };

  if (isLoading) return <div>Loading agents...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Active Agents</h2>
      <Table>
        <TableHeader>
          <TableRow className="text-center">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents.map((agent) => {
            const role = userData[agent.email]?.role || "customer";
            return (
              <TableRow key={agent._id}>
                <TableCell>{agent.name}</TableCell>
                <TableCell>{agent.email}</TableCell>
                <TableCell>{agent.status}</TableCell>
                <TableCell>{new Date(agent.
appliedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {userData[agent.email] ? (
                    <Select
                      defaultValue={agent.role || role}
                      onValueChange={(val) => handleRoleUpdate(agent.email, val)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                    
                      </SelectContent>
                    </Select>
                  ) : (
                    <span className="text-gray-400 text-sm">Loading...</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActiveAgents;
