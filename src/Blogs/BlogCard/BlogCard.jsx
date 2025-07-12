import React, { useState } from "react";
 // Adjust path

import BlogModal from "../BlogModal/BlogModal";

const BlogCard = ({ blog }) => {
  const [open, setOpen] = useState(false);
  const summary = blog.content.substring(0, 100) + (blog.content.length > 100 ? "..." : "");

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 flex flex-col h-full">
        {blog.image && (
          <div className="relative w-full aspect-video overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{blog.title}</h3>
          <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{summary}</p>

          <button
            onClick={() => setOpen(true)}
            className="text-[#ff8c00] hover:text-[#e67a00] text-sm font-semibold inline-flex items-center mt-auto transition-colors duration-300"
          >
            Read More
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {open && <BlogModal blog={blog} open={open} onClose={() => setOpen(false)} />}
    </>
  );
};

export default BlogCard;