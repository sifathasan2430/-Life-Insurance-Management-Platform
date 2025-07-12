import { useQuery } from "@tanstack/react-query";
import CreateBlogModal from "./CreateBlogModal";
import secureAxios from "../../../utils/firebaseAxios";
import UserAuthContext from "../../../Context/UserAuthContext";
import { useContext } from "react";

const BlogPosts = () => {
  const { user } = useContext(UserAuthContext);

  const { data: blogs = [], isLoading, error, refetch } = useQuery({
    queryKey: ["blogs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await secureAxios.get(`/blogs?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading blogs...</div>;
  if (error) return <div>Failed to load blogs.</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">My Blog Posts</h2>
        <CreateBlogModal refetchBlogs={refetch} />
      </div>

      {blogs.length === 0 ? (
        <div className="text-gray-500 text-center">No blog posts found.</div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border rounded-lg p-4 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-orange-600 mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-700 whitespace-pre-line">
                {blog.content.length > 300
                  ? blog.content.slice(0, 300) + "..."
                  : blog.content}
              </p>
              <div className="text-sm text-gray-500 mt-2">
                <span>Author: {blog.author}</span> |{" "}
                <span>
                  Published: {new Date(blog.publishDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPosts;
