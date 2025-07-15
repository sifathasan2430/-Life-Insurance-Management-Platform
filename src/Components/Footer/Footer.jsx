import { NavLink } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import secureAxios from "@/utils/firebaseAxios";
import { toast } from "sonner";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";
import { useContext } from "react";
import UserAuthContext from "@/Context/UserAuthContext";

const Footer = () => {
//   const { userRole } = useContext(UserAuthContext); // Must include role logic in context
const userRole='customer'
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await secureAxios.post("/newsletter", data);
      toast.success("Subscribed successfully!");
      reset();
    } catch (err) {
      console.error("Newsletter subscription failed", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 sm:grid-cols-2 gap-10">
        {/* About */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-3">LifeSure</h2>
          <p className="text-sm text-gray-400">
            Your trusted partner for life, health, and retirement insurance.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <a href="#"><Facebook className="w-5 h-5 hover:text-orange-400" /></a>
            <a href="#"><Instagram className="w-5 h-5 hover:text-orange-400" /></a>
            <a href="#"><Twitter className="w-5 h-5 hover:text-orange-400" /></a>
            <a href="#"><Linkedin className="w-5 h-5 hover:text-orange-400" /></a>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          {
            userRole === 'customer' && ( <nav className="flex flex-col gap-2 text-sm">
            <NavLink to="/" className="hover:text-orange-400">Home</NavLink>
            <NavLink to="/all-policies" className="hover:text-orange-400">All Policies</NavLink>
            <NavLink to="/agent-form" className="hover:text-orange-400">Be A Agent</NavLink>
            <NavLink to="/faqs" className="hover:text-orange-400">FAQs</NavLink>
            <NavLink to="/blog" className="hover:text-orange-400">Blogs</NavLink>
            <NavLink to="/claimRequest" className="hover:text-orange-400">Claim Request</NavLink>
          </nav>
            )
          }
        </div>

        {/* Role-based Dashboard */}


        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-3">Stay updated with our latest news.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input
              type="text"
              placeholder="Your Name"
              {...register("name", { required: "Name is required" })}
              className="bg-gray-800 text-gray-100 border-gray-600"
            />
            <Input
              type="email"
              placeholder="Your Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="bg-gray-800 text-gray-100 border-gray-600"
            />
            <Button type="submit" className="bg-[#ff8c00] hover:bg-[#e67c00] text-white w-full">
              <Mail className="w-4 h-4 mr-2" /> Subscribe
            </Button>
          </form>
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-800 pt-4">
        &copy; {new Date().getFullYear()} LifeSure Insurance. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
