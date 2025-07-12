import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { format } from "date-fns";
import secureAxios from "../../utils/firebaseAxios";

// Fetch blog by ID
const fetchBlogById = async (id) => {
  const { data } = await secureAxios.get(`/blogs/${id}`);
  return data;
};

const fetchBlogAndIncrement = async (id) => {
  // Fetch the blog
  const { data: blog } = await secureAxios.get(`/blogs/${id}`);

  // Increment visit count
  await secureAxios.patch(`/blogs/${id}/increment-visit`);

  // Return updated view count
  return { ...blog, totalViews: (blog.totalViews || 0) + 1 };
};

const BlogDetailsPage = () => {
  const { id } = useParams();

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogAndIncrement(id),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96 text-gray-500 text-lg font-medium">
        Loading blog...
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="flex justify-center items-center h-96 text-red-500 text-lg font-medium">
        Failed to load blog. {error?.message}
      </div>
    );
  }
console.log(blog);
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Cover Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-64 sm:h-80 object-cover rounded-xl mb-8 shadow"
      />

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {blog.title}
      </h1>

      {/* Meta Info */}
      <div className="text-sm text-gray-500 mb-8 flex flex-wrap items-center gap-2">
        <span>
          Posted by{" "}
          <span className="font-medium text-gray-700">
            {blog.author || "Admin"}
          </span>
        </span>
        <span>·</span>
        <span>{format(new Date(blog.publishDate), "dd MMM yyyy")}</span>
        <span>·</span>
        <span className="inline-flex items-center text-[#ff8c00] font-semibold">
          👁️ {blog.totalViews || 0} views
        </span>
      </div>

      {/* Content */}
      <div className="prose prose-lg prose-orange max-w-none text-gray-800 leading-relaxed">
        {blog.content}
      </div>
    </section>
  );
};

export default BlogDetailsPage;
