// components/LandingBlogSection.js
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import secureAxios from '../utils/firebaseAxios';
import BlogCard from '../Blogs/BlogCard/BlogCard';
import Container from '../Components/Container/Container';
import Section from '../Components/Section/Section';
import SectionHeader from '../SectionHeader/SectionHeader';

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
      <Section >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#ff8c00] mx-auto"></div>
        </div>
      </Section>
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
    <Container className="py-10 md:py-20 ">
     
        {/* Heading */}
        <SectionHeader subtitle={' Discover our most recent articles on insurance, finance, and personal protection.'} title={'Insurance Insights'}/>

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
    
    </Container>
  );
};

export default BlogSection;
