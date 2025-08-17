import { NavLink } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useContext } from "react";
import UserAuthContext from "@/Context/UserAuthContext";

const Footer = () => {
  // const { userRole } = useContext(UserAuthContext); // Must include role logic in context
  const userRole = 'customer';

  return (
    <footer
      className="bg-gray-200 text-black pt-10 pb-6 mt-10"
      style={{
        "--primary-color": "#ff9a68",
        "--primary-hover-color": "#e67c00",
        "--text-color": "#000000",
        "--heading-color": "#8c4a27",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 sm:grid-cols-1 gap-10">
        {/* About */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-3 text-[var(--heading-color)]">LifeSure</h2>
          <p className="text-sm">
            Your trusted partner for life, health, and retirement insurance.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
            <a href="#"><Facebook className="w-5 h-5 hover:text-[var(--primary-color)]" /></a>
            <a href="#"><Instagram className="w-5 h-5 hover:text-[var(--primary-color)]" /></a>
            <a href="#"><Twitter className="w-5 h-5 hover:text-[var(--primary-color)]" /></a>
            <a href="#"><Linkedin className="w-5 h-5 hover:text-[var(--primary-color)]" /></a>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-3 text-[var(--heading-color)]">Quick Links</h3>
          {userRole === 'customer' && (
            <nav className="flex flex-col gap-2 text-sm">
              <NavLink to="/" className="hover:text-[var(--primary-color)]">Home</NavLink>
              <NavLink to="/all-policies" className="hover:text-[var(--primary-color)]">All Policies</NavLink>
              <NavLink to="/agent-form" className="hover:text-[var(--primary-color)]">Be An Agent</NavLink>
              <NavLink to="/faqs" className="hover:text-[var(--primary-color)]">FAQs</NavLink>
              <NavLink to="/blog" className="hover:text-[var(--primary-color)]">Blogs</NavLink>
              <NavLink to="/claimRequest" className="hover:text-[var(--primary-color)]">Claim Request</NavLink>
            </nav>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-10 border-t border-gray-300 pt-4">
        &copy; {new Date().getFullYear()} LifeSure Insurance. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

