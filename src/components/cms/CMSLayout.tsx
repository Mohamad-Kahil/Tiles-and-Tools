import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Image,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Tag,
  Truck,
  CreditCard,
  BarChart2,
  MessageSquare,
  UserCog,
  Settings,
} from "lucide-react";

const CMSLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      title: "Dashboard",
      href: "/cms",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Advertisements",
      href: "/cms/advertisements",
      icon: <Image className="h-5 w-5" />,
    },
    {
      title: "Products",
      href: "/cms/products",
      icon: <Package className="h-5 w-5" />,
      disabled: false,
    },
    {
      title: "Orders",
      href: "/cms/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      disabled: true,
    },
    {
      title: "Customers",
      href: "/cms/customers",
      icon: <Users className="h-5 w-5" />,
      disabled: true,
    },
    {
      title: "Content",
      href: "/cms/content",
      icon: <FileText className="h-5 w-5" />,
      disabled: true,
    },
    {
      title: "Promotions",
      href: "/cms/promotions",
      icon: <Tag className="h-5 w-5" />,
      disabled: true,
    },
    {
      title: "Shipping",
      href: "/cms/shipping",
      icon: <Truck className="h-5 w-5" />,
      disabled: true,
    },
    {
      title: "Payments",
      href: "/cms/payments",
      icon: <CreditCard className="h-5 w-5" />,
      disabled: true,
    },
    {
      title: "Analytics",
      href: "/cms/analytics",
      icon: <BarChart2 className="h-5 w-5" />,
      disabled: true,
    },
    {
      title: "Support",
      href: "/cms/support",
      icon: <MessageSquare className="h-5 w-5" />,
      disabled: true,
    },
    {
      title: "User Roles",
      href: "/cms/roles",
      icon: <UserCog className="h-5 w-5" />,
      disabled: true,
    },
    {
      title: "Settings",
      href: "/cms/settings",
      icon: <Settings className="h-5 w-5" />,
      disabled: true,
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-card">
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/DELogo.png" alt="DecorEgypt Logo" className="h-8" />
            <span className="font-bold text-xl">CMS</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.disabled ? "#" : item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors",
                    currentPath === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted",
                    item.disabled && "opacity-50 cursor-not-allowed",
                  )}
                  onClick={(e) => item.disabled && e.preventDefault()}
                >
                  {item.icon}
                  <span>{item.title}</span>
                  {item.disabled && (
                    <span className="ml-auto text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                      Soon
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/">Back to Store</Link>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b flex items-center px-6 sticky top-0 bg-background z-10">
          <h1 className="text-xl font-semibold">
            {navItems.find((item) => item.href === currentPath)?.title ||
              "Dashboard"}
          </h1>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CMSLayout;
