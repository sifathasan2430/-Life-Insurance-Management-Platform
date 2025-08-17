import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserAuthContext from "@/Context/UserAuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useState } from "react";
import secureAxios from "../../utils/firebaseAxios";

const Navbar = () => {
  const {user,  logout,userRole } = useContext(UserAuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const navigate=useNavigate()
 const navLinks = (
  <>
    <NavLink to="/" className="hover:text-orange-500 transition">Home</NavLink>
    <NavLink to="/all-policies" className="hover:text-orange-500 transition">All Policies</NavLink>
    <NavLink to="/agent-form" className="hover:text-orange-500 transition">Be A Agent</NavLink>
    <NavLink to="/faqs" className="hover:text-orange-500 transition">FAQs</NavLink>
    <NavLink to="/blog" className="hover:text-orange-500 transition">Blogs</NavLink>

    {user && (
      <>
        {userRole === "admin" && (
          <NavLink to="/admin/dashboard" className="hover:text-orange-500 transition">
            Admin Dashboard
          </NavLink>
        )}
        {userRole === "agent" && (
          <NavLink to="/agent/dashboard" className="hover:text-orange-500 transition">
            Agent Dashboard
          </NavLink>
        )}
        {userRole === "customer" && (
          <NavLink to="/customer/dashboard" className="hover:text-orange-500 transition">
            User Dashboard
          </NavLink>
        )}
       
        {userRole === "customer" && (
          <NavLink to="/claimRequest" className="hover:text-orange-500 transition">
            Claim Request
          </NavLink>
        )}
      </>
    )}
  </>
);


  const handleLogout = async () => {
  await secureAxios.post("/logout");
  await logout();
  navigate("/login");
};



  return (
    <header className="bg-gray-300 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4  flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-orange-600">
          LifeSure
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks}
        </nav>

        {/* Auth Buttons or Profile */}
        <div className="hidden md:flex items-center gap-4">
          {!user?.email ? (
            <>
              <Link to="/login">
              <button className="px-6 py-2 rounded-2xl font-medium text-white bg-[#fe9a00] hover:bg-[#e68900] shadow-md transition-all duration-300">
  Login
</button>


              </Link>
              <Link to="/register">
               <button className="px-6 py-2 rounded-2xl font-medium text-[#fe9a00] border border-[#fe9a00] bg-white hover:bg-[#fff4e6] shadow-md transition-all duration-300">
  Logout
</button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.photoURL || ""} />
                  <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <div className="flex flex-col gap-2 text-sm font-medium">
            {navLinks}
          </div>
          <div className="mt-2">
            {!user?.email ? (
              <div className="flex gap-2">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="w-full">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="w-full">Register</Button>
                </Link>
              </div>
            ) : (
              <Button onClick={handleLogout} variant="destructive" size="sm" className="w-full">
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
