import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import secureAxios from "../../utils/firebaseAxios";

const ManagePolicies = () => {
  const queryClient = useQueryClient();
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    minAge: "",
    maxAge: "",
    coverage: "",
    duration: "",
    baseRate: "",
    image: "",
  });

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["policies"],
    queryFn: async () => {
      const res = await secureAxios.get("/policies");
      return res.data;
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (editingPolicy) {
        const res = await secureAxios.patch(`/policies/${editingPolicy._id}`, formData);
        if (res.data?.modifiedCount > 0) {
          toast.success("Policy updated successfully");
        } else {
          toast.info("No changes made");
        }
      } else {
        const res = await secureAxios.post("/policies", formData);
        toast.success(res.data.message || "Policy created successfully");
      }
      queryClient.invalidateQueries(["policies"]);
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setEditingPolicy(null);
      setFormData({
        title: "",
        category: "",
        description: "",
        minAge: "",
        maxAge: "",
        coverage: "",
        duration: "",
        baseRate: "",
        image: "",
      });
    }
  };

  const handleEdit = (policy) => {
    setEditingPolicy(policy);
    setFormData({
      title: policy.title,
      category: policy.category,
      description: policy.description,
      minAge: policy.minAge,
      maxAge: policy.maxAge,
      coverage: policy.coverage,
      duration: policy.duration,
      baseRate: policy.baseRate,
      image: policy.image,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await secureAxios.delete(`/policies/${id}`);
      toast.success(res.data.message || "Policy deleted successfully");
      queryClient.invalidateQueries(["policies"]);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete policy");
    }
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Policies</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingPolicy(null);
              setFormData({
                title: "",
                category: "",
                description: "",
                minAge: "",
                maxAge: "",
                coverage: "",
                duration: "",
                baseRate: "",
                image: "",
              });
              setDialogOpen(true);
            }}>
              Add New Policy
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>{editingPolicy ? "Edit Policy" : "Add Policy"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3 py-2">
              <Input name="title" value={formData.title} onChange={handleChange} placeholder="Policy Title" />
              <Input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
              <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
              <div className="grid grid-cols-2 gap-2">
                <Input name="minAge" value={formData.minAge} onChange={handleChange} placeholder="Min Age" type="number" />
                <Input name="maxAge" value={formData.maxAge} onChange={handleChange} placeholder="Max Age" type="number" />
              </div>
              <Input name="coverage" value={formData.coverage} onChange={handleChange} placeholder="Coverage Range" />
              <Input name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration Options" />
              <Input name="baseRate" value={formData.baseRate} onChange={handleChange} placeholder="Base Premium Rate" />
              <Input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSubmit}>{editingPolicy ? "Update" : "Create"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Age</TableHead>
         
            <TableHead>Duration</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {policies.map((policy) => (
            <TableRow key={policy._id}>
              <TableCell>{policy.title}</TableCell>
              <TableCell>{policy.category}</TableCell>
              <TableCell>{policy.minAge} - {policy.maxAge}</TableCell>
              
              <TableCell>{policy.duration}</TableCell>
              <TableCell>{policy.baseRate}</TableCell>
              <TableCell className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(policy)}>
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to delete this policy?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(policy._id)}>
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

export default ManagePolicies;
