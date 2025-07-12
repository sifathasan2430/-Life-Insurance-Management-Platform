import React from "react";
import { useQuery } from "@tanstack/react-query";


import secureAxios from "../../utils/firebaseAxios";

import BlogPageCard from "../../BlogPageCard/BlogPageCard";

const fetchBlogs = async () => {
  const { data } = await secureAxios.get("/blogs");
  return data;
};

const BlogPage = () => {
  const {
    data: blogs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: fetchBlogs,
    refetchOnWindowFocus: false,
  });

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Explore Our Latest Blogs
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Discover insights, tips, and trends in the world of insurance and finance written by our experts.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-60 text-gray-500 text-lg">
            Loading blogs...
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center h-60 text-red-500 text-lg">
            Failed to load blogs: {error?.message}
          </div>
        ) : blogs?.length === 0 ? (
          <div className="text-center text-gray-500">No blogs available right now.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {blogs.map((blog) => (
              <BlogPageCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
