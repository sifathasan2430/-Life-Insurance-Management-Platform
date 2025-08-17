import { Link, NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BadgeDollarSign,
  CreditCard,
  Menu,
  DeleteIcon,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const CustomerDashboardLayout = () => {
  const navLinks = [
    {
      to: "/customer/dashboard/overview",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Overview",
    },
    {
      to: "/customer/dashboard/my-policies",
      icon: <FileText className="w-5 h-5" />,
      label: "My Policies",
    },
    {
      to: "/customer/dashboard/payment-status",
      icon: <BadgeDollarSign className="w-5 h-5" />,
      label: "Payment Status",
    },
    {
      to: "/customer/dashboard/reject-policies",
      label: "Reject Policies",
      icon: <DeleteIcon className="w-5 h-5" />
    },
    {
      to: "/customer/dashboard/profile",
      label: "Profile",
      icon: <User className="w-5 h-5" />
    },
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

export default CustomerDashboardLayout;