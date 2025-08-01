import { Link, NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Pencil,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const AgentDashboardLayout = () => {
  const navLinks = [
    {
      to: "/agent/dashboard/agent-claims-management",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Claims Management  ",
    },
    {
      to: "/agent/dashboard/assigned-customers",
      icon: <Users className="w-5 h-5" />,
      label: "Assigned Customers",
    },
    {
      to: "/agent/dashboard/manage-blogs",
      icon: <FileText className="w-5 h-5" />,
      label: "Manage Blogs",
    },
    {
      to: "/agent/dashboard/blog-posts",
      icon: <Pencil className="w-5 h-5" />,
      label: "My Blog Posts",
    },
    {
      to: "/agent/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Feedback Overview",
    }
  ];

  const baseClass =
    "flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-orange-100 transition";
  const activeClass = "bg-orange-100 text-orange-600 font-semibold";

  const SidebarNav = () => (
    <nav className="flex flex-col space-y-1">
      {navLinks.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/agent/dashboard"}
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : "text-gray-700"}`
          }
        >
          {icon} {label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile Topbar */}
      <div className="flex items-center justify-between md:hidden bg-white h-16 px-4 shadow-md">
        <Link to="/" className="text-xl font-bold text-orange-600">
          LifeSure Agent
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <SidebarNav />
          </SheetContent>
        </Sheet>
      </div>

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex md:flex-col">
        <div className="h-16 flex items-center justify-center border-b">
          <Link to="/" className="text-xl font-bold text-orange-600">
            LifeSure Agent
          </Link>
        </div>
        <div className="flex-1 px-2 py-4">
          <SidebarNav />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AgentDashboardLayout