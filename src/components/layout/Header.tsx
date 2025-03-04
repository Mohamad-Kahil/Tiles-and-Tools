import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Globe,
  ShoppingCart,
  Home,
  Package,
  ShoppingBag,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import CategoryMenu from "@/components/navigation/CategoryMenu";
import SearchBar from "@/components/search/SearchBar";
import CartPreview from "@/components/cart/CartPreview";

interface HeaderProps {
  language?: "en" | "ar";
  onLanguageChange?: (language: "en" | "ar") => void;
}

const Header = ({
  language = "en",
  onLanguageChange = () => {},
}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isRtl = language === "ar";
  const navigate = useNavigate();

  const toggleLanguage = () => {
    onLanguageChange(language === "en" ? "ar" : "en");
  };

  const navigationLinks = [
    {
      name: language === "en" ? "Home" : "الرئيسية",
      href: "/",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      name: language === "en" ? "Products" : "المنتجات",
      href: "/products",
      icon: <Package className="h-4 w-4 mr-2" />,
    },
    {
      name: language === "en" ? "Cart" : "عربة التسوق",
      href: "/cart",
      icon: <ShoppingBag className="h-4 w-4 mr-2" />,
    },
    {
      name: language === "en" ? "Account" : "الحساب",
      href: "/account",
      icon: <User className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background border-b",
        isRtl ? "rtl" : "ltr",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl hidden sm:inline-block">
              {language === "en" ? "Tiles&Tools" : "Tiles&Tools"}
            </span>
          </Link>

          {/* Main Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {navigationLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                className="flex items-center"
                onClick={() => navigate(link.href)}
              >
                {link.icon}
                <span>{link.name}</span>
              </Button>
            ))}
          </div>

          {/* Category Links in a single row */}
          <div className="hidden lg:flex items-center space-x-6">
            <CategoryMenu language={language} />
          </div>

          {/* Search, Language, Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block w-full max-w-sm">
              <SearchBar
                placeholder={
                  language === "en"
                    ? "Search products..."
                    : "البحث عن منتجات..."
                }
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="hidden sm:flex"
            >
              <Globe className="h-5 w-5" />
              <span className="sr-only">Toggle Language</span>
            </Button>

            <CartPreview />

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full py-6">
                  <div className="px-4 mb-6">
                    <SearchBar
                      placeholder={
                        language === "en"
                          ? "Search products..."
                          : "البحث عن منتجات..."
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="flex-1 overflow-auto">
                    <nav className="flex flex-col space-y-6">
                      {/* Main Navigation Links (Mobile) */}
                      <div className="px-6">
                        <h3 className="mb-2 text-lg font-semibold">
                          {language === "en" ? "Navigation" : "التنقل"}
                        </h3>
                        <div className="space-y-3">
                          {navigationLinks.map((link) => (
                            <Link
                              key={link.href}
                              to={link.href}
                              className="flex items-center py-2 text-base hover:text-primary"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {link.icon}
                              <span>{link.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="px-6">
                        <h3 className="mb-2 text-lg font-semibold">
                          {language === "en" ? "Categories" : "الفئات"}
                        </h3>
                        <div className="space-y-3">
                          {/* Mobile category links */}
                          {[
                            {
                              name: language === "en" ? "Flooring" : "الأرضيات",
                              href: "/category/flooring",
                            },
                            {
                              name:
                                language === "en"
                                  ? "Wall Products"
                                  : "منتجات الحائط",
                              href: "/category/wall-products",
                            },
                            {
                              name: language === "en" ? "Lighting" : "الإضاءة",
                              href: "/category/lighting",
                            },
                            {
                              name: language === "en" ? "Furniture" : "الأثاث",
                              href: "/category/furniture",
                            },
                          ].map((category) => (
                            <Link
                              key={category.href}
                              to={category.href}
                              className="block py-2 text-base hover:text-primary"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </nav>
                  </div>

                  <div className="mt-auto border-t pt-4 px-6">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={toggleLanguage}
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      {language === "en"
                        ? "Switch to Arabic"
                        : "التبديل إلى الإنجليزية"}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile Search (visible only on small screens) */}
      <div className="md:hidden border-t py-2 px-4">
        <SearchBar
          placeholder={
            language === "en" ? "Search products..." : "البحث عن منتجات..."
          }
          className="w-full"
        />
      </div>
    </header>
  );
};

export default Header;
