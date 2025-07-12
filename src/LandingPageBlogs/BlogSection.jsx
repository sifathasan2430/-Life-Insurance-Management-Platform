// components/LandingBlogSection.js
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import secureAxios from '../utils/firebaseAxios';
import BlogCard from '../Blogs/BlogCard/BlogCard';

const fetchLatestBlogs = async () => {
  const response = await secureAxios.get('/blogs/latest');
  return response.data;
};

const BlogSection = () => {
  const { data: blogs, isLoading, isError } = useQuery({
    queryKey: ['latestBlogs'],
    queryFn: fetchLatestBlogs,
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#ff8c00] mx-auto"></div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-500 text-lg font-medium">
          Failed to load latest blog posts.
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
            <span className="text-[#ff8c00]">Latest</span> Insurance Insights
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most recent articles on insurance, finance, and personal protection.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs?.length > 0 ? (
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          ) : (
            <div className="text-center col-span-full text-gray-500">
              No blog posts found.
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="/blog"
            className="inline-block px-6 py-3 rounded-full font-semibold text-white bg-[#ff8c00] hover:bg-[#e67a00] focus:ring-4 focus:ring-[#ff8c0050] transition duration-300 shadow-md"
          >
            View All Articles →
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
