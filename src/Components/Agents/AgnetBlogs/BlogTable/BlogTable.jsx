import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import BlogFormModal from "../BlogModal/BlogFormModal";
import secureAxios from "../../../../utils/firebaseAxios";

const BlogTable = ({ blogs = [], refetch }) => {
  const [editBlog, setEditBlog] = useState(null);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This blog will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await secureAxios.delete(`/blogs/${id}`);
        refetch();
        Swal.fire("Deleted!", "The blog has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error!", "Failed to delete blog.", "error");
      }
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog._id}>
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.author}</TableCell>
              <TableCell>{new Date(blog.publishDate).toLocaleDateString()}</TableCell>
              <TableCell className="text-right space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setEditBlog(blog)}
                    >
                      <Pencil size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <BlogFormModal blog={editBlog} onSuccess={refetch} />
                  </DialogContent>
                </Dialog>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(blog._id)}
                >
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BlogTable;
