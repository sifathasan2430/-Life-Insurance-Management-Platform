import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import secureAxios from "../../utils/firebaseAxios";

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const [loadingAction, setLoadingAction] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await secureAxios.get("/users");
      return res.data;
    },
  });

  const handleRoleChange = async (userId, newRole) => {
    try {
      setLoadingAction(true);
      await secureAxios.patch(`/users/${userId}/role`, { role: newRole });
      queryClient.invalidateQueries(["users"]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      setLoadingAction(true);
      await secureAxios.delete(`/users/${userId}`);
      queryClient.invalidateQueries(["users"]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAction(false);
      setSelectedUserId(null);
    }
  };

  if (isLoading) return <p className="text-center">Loading users...</p>;

  return (
    <Card className="overflow-x-auto shadow-md p-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Registered</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
               {new Date(user?.created_at).toLocaleDateString(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
})}
              </TableCell>
              <TableCell>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  disabled={loadingAction}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="customer">Customer</option>
                  <option value="agent">Agent</option>
                  <option value="admin">Admin</option>
                </select>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={loadingAction}
                      className="ml-2"
                      onClick={() => setSelectedUserId(user._id)}
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this user?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteUser(selectedUserId)}
                        disabled={loadingAction}
                      >
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ManageUsers;
