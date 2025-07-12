import React, { useState } from "react";

import { Eye, CalendarDays, UserRound } from "lucide-react";
import BlogModal from "../Blogs/BlogModal/BlogModal";

const BlogPageCard = ({ blog }) => {
  const [open, setOpen] = useState(false);

  // Limit content to 30 words
  const summary = blog.content
    .split(" ")
    .slice(0, 30)
    .join(" ") + (blog.content.split(" ").length > 30 ? "..." : "");

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-5 p-5">
        {/* Image */}
        {blog.image && (
          <div className="w-full md:w-1/3 h-44 md:h-auto overflow-hidden rounded-lg">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-1">
          {/* Title */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-2 line-clamp-2">
            {blog.title}
          </h3>

          {/* Summary */}
          <p className="text-gray-600 text-sm mb-4 flex-grow">{summary}</p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 mb-3">
            {/* Author */}
            <div className="flex items-center gap-2">
              <img
                src={
                  blog.authorImage ||
                  `https://ui-avatars.com/api/?name=${blog.author || "Admin"}`
                }
                alt="author"
                className="w-8 h-8 rounded-full border"
              />
              <span className="text-gray-700 font-medium flex items-center gap-1">
                <UserRound className="w-4 h-4" /> {blog.author || "Admin"}
              </span>
              <span className="bg-[#ff8c00] text-white text-xs px-2 py-0.5 rounded-md ml-1">
                Author
              </span>
            </div>

            {/* Date + Views */}
            <div className="flex items-center gap-4 mt-2 md:mt-0">
              <span className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1 text-[#ff8c00] font-semibold">
                <Eye className="w-4 h-4" /> {blog.totalViews || 0}
              </span>
            </div>
          </div>

          {/* Read More Button */}
          <div className="mt-auto">
            <button
              onClick={() => setOpen(true)}
              className="text-[#ff8c00] hover:text-[#e67a00] text-sm font-semibold inline-flex items-center transition-colors duration-300"
            >
              Read More
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Blog Modal */}
      {open && <BlogModal blog={blog} open={open} onClose={() => setOpen(false)} />}
    </>
  );
};

export default BlogPageCard;
