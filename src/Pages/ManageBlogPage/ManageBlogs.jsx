import React, { use, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BlogTable from "../../Components/Agents/AgnetBlogs/BlogTable/BlogTable";
import BlogFormModal from "../../Components/Agents/AgnetBlogs/BlogModal/BlogFormModal";
import UserAuthContext from "../../Context/UserAuthContext";
import secureAxios from "../../utils/firebaseAxios";


const fetchBlogs = async (email) => {
  const res = await secureAxios.get(`/blogs?email=${email}`);
  return res.data;
};

const ManageBlogs = () => {
  const { user } = useContext(UserAuthContext);

  const {
    data: blogs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs", user?.email],
    queryFn: () => fetchBlogs(user?.email),
    enabled: !!user?.email,
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Your Blogs</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={18} />
              Create Blog
            </Button>
          </DialogTrigger>
          <DialogContent>
            <BlogFormModal onSuccess={refetch} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <BlogTable blogs={blogs} refetch={refetch} />
      )}
    </div>
  );
};

export default ManageBlogs;