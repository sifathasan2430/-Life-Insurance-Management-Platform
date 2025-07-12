import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import secureAxios from "../../../utils/firebaseAxios";
import UserAuthContext from "../../../Context/UserAuthContext";

const CreateBlogModal = ({ refetchBlogs }) => {
  const { user } = useContext(UserAuthContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      email: user?.email,
      author: user?.displayName || "Anonymous",
      publishDate: new Date().toISOString(),
      totalViews: 0,
    };

    try {
      const res = await secureAxios.post("/blogs", payload);
           toast.success("Blog published successfully!");
      refetchBlogs?.(); // Optional: only if passed from parent
      reset();
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to publish blog.");
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#ff8c00] hover:bg-[#e67c00] text-white font-semibold">
          + Add Blog
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Create New Blog</DialogTitle>
          </DialogHeader>

          <Input
            {...register("title", { required: true })}
            placeholder="Blog Title"
            className="w-full"
          />

          <Textarea
            {...register("content", { required: true })}
            placeholder="Write your blog content here..."
            rows={10}
            className="w-full resize-none"
          />

          <DialogFooter className="flex justify-between pt-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-[#ff8c00] hover:bg-[#e67c00] text-white">
              Publish Blog
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlogModal;