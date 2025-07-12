import { Link, NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  BadgeDollarSign,
  UserCheck,
  UserPlus,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const AdminDashboardLayout = () => {
  const [agentMenuOpen, setAgentMenuOpen] = useState(false);

  const navLinks = [
    {
      to: "/admin/dashboard/applications",
      icon: <LayoutDashboard className="w-5 h-5" />, 
      label: "Manage Applications"
    },
    {
      to: "/admin/dashboard/manage-users",
      icon: <Users className="w-5 h-5" />, 
      label: "Manage Users"
    },
    {
      to: "/admin/dashboard/policies",
      icon: <FileText className="w-5 h-5" />, 
      label: "Manage Policies"
    },
    {
      to: "/admin/dashboard/transactions",
      icon: <BadgeDollarSign className="w-5 h-5" />, 
      label: "Manage Transactions"
    },
    
  ];

  const baseClass =
    "flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-orange-100 transition";
  const activeClass =
    "bg-orange-100 text-orange-600 font-semibold";

  const SidebarNav = () => (
    <nav className="flex flex-col space-y-1">
      {navLinks.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : "text-gray-700"}`
          }
        >
          {icon} {label}
        </NavLink>
      ))}

      <Button
        variant="ghost"
        className="w-full justify-start px-4 py-2"
        onClick={() => setAgentMenuOpen(!agentMenuOpen)}
      >
        <UserCheck className="w-5 h-5 mr-2" /> Manage Agents
      </Button>

      {agentMenuOpen && (
        <div className="ml-6 space-y-1">
          <NavLink
            to="/admin/dashboard/agents/pending"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : "text-gray-700"}`
            }
          >
            <UserPlus className="w-4 h-4" /> Pending Agents
          </NavLink>

          <NavLink
            to="/admin/dashboard/active-agents"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : "text-gray-700"}`
            }
          >
            <Users className="w-4 h-4" /> Active Agents
          </NavLink>
        </div>
      )}
    </nav>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile Topbar */}
      <div className="flex items-center justify-between md:hidden bg-white h-16 px-4 shadow-md">
        <Link to="/" className="text-xl font-bold text-orange-600">
          LifeSure
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
            LifeSure
          </Link>
        </div>
        <div className="flex-1 px-2 py-4">
          <SidebarNav />
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
