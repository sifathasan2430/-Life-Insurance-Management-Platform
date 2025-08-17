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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import secureAxios from "../../utils/firebaseAxios";
import EditPolices from "./editPolices/EditPolices";

const ManagePolicies = () => {
  const queryClient = useQueryClient();
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subtitle:"",
    category: "",
    description: "",
    minAge: "",
    maxAge: "",
    coverage: "",
    duration: "",
    baseRate: "",
    image: "",
    currency: "",
    paymentFrequency: "",
  });

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["policies"],
    queryFn: async () => {
      const res = await secureAxios.get("/allpolicy");
      return res.data;
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      minAge: parseInt(formData.minAge),
      maxAge: parseInt(formData.maxAge),
      baseRate: parseFloat(formData.baseRate),
    };

    try {
      if (editingPolicy) {
        const res = await secureAxios.patch(`/policies/${editingPolicy._id}`, payload);
        if (res.data?.modifiedCount > 0) {
          toast.success("Policy updated successfully");
        } else {
          toast.info("No changes made");
        }
      } else {
        const res = await secureAxios.post("/policies", payload);
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
        subtitle:'',
        description: "",
        minAge: "",
        maxAge: "",
        coverage: "",
        duration: "",
        baseRate: "",
        image: "",
        currency: "",
        paymentFrequency: "",
      });
    }
  };

  const handleEdit = (policy) => {
    setEditingPolicy(policy);
    setFormData({
      title: policy.title,
      subtitle:policy.subtitle,
      category: policy.category,
      description: policy.description,
      minAge: policy.minAge,
      maxAge: policy.maxAge,
      coverage: policy.coverage,
      duration: policy.duration,
      baseRate: policy.baseRate,
      image: policy.image,
      currency: policy.currency || "",
      paymentFrequency: policy.paymentFrequency || "",
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
    <>
    <EditPolices edit={true}/>
    <EditPolices edit={false}/>
    </>
//     <Card className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Manage Policies</h2>
//         <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//           <DialogTrigger asChild>
//             <Button onClick={() => {
//               setEditingPolicy(null);
//               setFormData({
//                 title: "",
                
//                 category: "",
//                 subtitle:"",
//                 description: "",
//                 minAge: "",
//                 maxAge: "",
//                 coverage: "",
//                 duration: "",
//                 baseRate: "",
//                 image: "",
//                 currency: "",
//                 paymentFrequency: "",
//               });
//               setDialogOpen(true);
//             }}>
//               Add New Policy
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="max-w-xl max-h-[80vh] overflow-hidden flex flex-col">
//   <DialogHeader>
//     <DialogTitle>{editingPolicy ? "Edit Policy" : "Add Policy"}</DialogTitle>
//   </DialogHeader>

//   {/* Scrollable form container */}
//   <div className="flex-1 overflow-y-auto grid gap-3 py-2">
//     <Input
//       name="title"
//       value={formData.title}
//       onChange={handleChange}
//       placeholder="Policy Title"
//     />
//      <Input
//       name="subtitle"
//       value={formData.subtitle}
//       onChange={handleChange}
//       placeholder="Policy Subtitle"
//     />
//     <Input
//       name="category"
//       value={formData.category}
//       onChange={handleChange}
//       placeholder="Category"
//     />
//     <Textarea
//       name="description"
//       value={formData.description}
//       onChange={handleChange}
//       placeholder="Description"
//     />
//     <div className="grid grid-cols-2 gap-2">
//       <Input
//         name="minAge"
//         value={formData.minAge}
//         onChange={handleChange}
//         placeholder="Min Age"
//         type="number"
//       />
//       <Input
//         name="maxAge"
//         value={formData.maxAge}
//         onChange={handleChange}
//         placeholder="Max Age"
//         type="number"
//       />
//     </div>
//     <Input
//       name="coverage"
//       value={formData.coverage}
//       onChange={handleChange}
//       placeholder="Coverage Range"
//     />
//     <Input
//       name="duration"
//       value={formData.duration}
//       onChange={handleChange}
//       placeholder="Duration Options"
//     />
//     <Input
//       name="baseRate"
//       value={formData.baseRate}
//       onChange={handleChange}
//       placeholder="Base Premium Rate"
//     />
//     <Input
//       name="currency"
//       value={formData.currency}
//       onChange={handleChange}
//       placeholder="Currency (e.g., USD)"
//     />

//     {/* Controlled Select component */}
//     <Select
//       value={formData.paymentFrequency || ""}
//       onValueChange={(val) => setFormData({ ...formData, paymentFrequency: val })}
//     >
//       <SelectTrigger>
//         <SelectValue placeholder="Select Payment Frequency" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectItem value="monthly">Monthly</SelectItem>
//         <SelectItem value="yearly">Yearly</SelectItem>
//       </SelectContent>
//     </Select>

//     <Input
//       name="image"
//       value={formData.image}
//       onChange={handleChange}
//       placeholder="Image URL"
//     />
//   </div>

//   <DialogFooter>
//     <DialogClose asChild>
//       <Button variant="outline">Cancel</Button>
//     </DialogClose>
//     <Button onClick={handleSubmit}>
//       {editingPolicy ? "Update" : "Create"}
//     </Button>
//   </DialogFooter>
// </DialogContent>
//         </Dialog>
//       </div>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Title</TableHead>
//             <TableHead>Category</TableHead>
//             <TableHead>Age</TableHead>
//             <TableHead>Duration</TableHead>
//             <TableHead>Rate</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {policies.map((policy) => (
//             <TableRow key={policy._id}>
//               <TableCell>{policy.title}</TableCell>
//               <TableCell>{policy.category}</TableCell>
//               <TableCell>{policy.minAge} - {policy.maxAge}</TableCell>
//               <TableCell>{policy.duration}</TableCell>
//               <TableCell>{policy.baseRate} {policy.currency || ""}</TableCell>
//               <TableCell className="flex gap-2">
//                 <Button variant="outline" size="sm" onClick={() => handleEdit(policy)}>Edit</Button>
//                 <AlertDialog>
//                   <AlertDialogTrigger asChild>
//                     <Button variant="destructive" size="sm">Delete</Button>
//                   </AlertDialogTrigger>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>Are you sure you want to delete this policy?</AlertDialogTitle>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel>Cancel</AlertDialogCancel>
//                       <AlertDialogAction onClick={() => handleDelete(policy._id)}>Confirm</AlertDialogAction>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Card>
  );
};

export default ManagePolicies;
