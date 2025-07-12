import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";

import UserAuthContext from "../../../../Context/UserAuthContext";
import secureAxios from "../../../../utils/firebaseAxios";

const BlogFormModal = ({ blog, onSuccess }) => {
  const { user } = useContext(UserAuthContext);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (blog) {
      setValue("title", blog.title);
      setValue("content", blog.content);
    } else {
      reset();
    }
  }, [blog, setValue, reset]);

  const onSubmit = async (data) => {
    const blogData = {
      ...data,
      author: user.displayName,
      email: user.email,
      publishDate: new Date(),
    };

    try {
      if (blog) {
        await secureAxios.patch(`/blogs/${blog._id}`, blogData);
      } else {
        await secureAxios.post("/blogs", blogData);
      }
      onSuccess();
      reset();
    } catch (error) {
      console.error("Blog save error:", error);
    }
  };

  return (
    <DialogContent className="max-h-[90vh] max-w-2xl w-full overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-1">
        <div>
          <Input
            placeholder="Blog Title"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">Title is required</span>
          )}
        </div>

        <div>
          <Textarea
            rows={8}
            placeholder="Write your blog content here..."
            {...register("content", { required: true })}
            className="resize-y"
          />
          {errors.content && (
            <span className="text-red-500 text-sm">Content is required</span>
          )}
        </div>

        {/* ✅ Read-only Author Name */}
        <div>
          <Input value={user?.displayName || ""} readOnly />
        </div>

        {/* ✅ Read-only Email */}
        <div>
          <Input value={user?.email || ""} readOnly />
        </div>

        <div className="flex justify-end">
          <Button type="submit">{blog ? "Update Blog" : "Publish Blog"}</Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default BlogFormModal;
