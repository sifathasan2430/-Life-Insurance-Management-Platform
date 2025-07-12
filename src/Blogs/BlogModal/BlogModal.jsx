import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Using ShadCN
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BlogModal = ({ blog, open, onClose }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    onClose();
    navigate(`/blog/${blog._id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            {blog.title}
          </DialogTitle>
        </DialogHeader>
        <div className="text-gray-600 text-sm mt-2 line-clamp-5">
          {blog.content}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-[#ff8c00] hover:bg-[#e67a00] text-white"
            onClick={handleContinue}
          >
            Continue to Full Blog
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;