import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/i18n";
import {
  Menu,
  ShoppingCart,
  Home,
  Package,
  ShoppingBag,
  User,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import CategoryMenu from "@/components/navigation/CategoryMenu";
import SearchBar from "@/components/search/SearchBar";
import CartPreview from "@/components/cart/CartPreview";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage, direction } = useLanguage();
  const isRtl = direction === "rtl";

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const navigationLinks = [
    {
      name: getTranslation("home", language),
      href: "/",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      name: getTranslation("products", language),
      href: "/products",
      icon: <Package className="h-4 w-4 mr-2" />,
    },
    {
      name: getTranslation("cart", language),
      href: "/cart",
      icon: <ShoppingBag className="h-4 w-4 mr-2" />,
    },
    {
      name: getTranslation("wishlist", language),
      href: "/wishlist",
      icon: <Heart className="h-4 w-4 mr-2" />,
    },
    ...(!isAuthenticated
      ? [
          {
            name: getTranslation("signIn", language),
            href: "/login",
            icon: <User className="h-4 w-4 mr-2" />,
          },
        ]
      : [
          {
            name: getTranslation("account", language),
            href: "/account",
            icon: <User className="h-4 w-4 mr-2" />,
          },
          {
            name: getTranslation("logout", language),
            href: "#",
            icon: <User className="h-4 w-4 mr-2" />,
            onClick: () => {
              logout();
              navigate("/");
            },
          },
        ]),
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background border-b",
        direction,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl static mx-10">Tiles&Tools</span>
          </Link>

          {/* Category Links in a single row */}
          <div className="hidden lg:flex items-center space-x-6">
            <CategoryMenu />
          </div>

          {/* Search, Language, Cart */}
          <div className="flex items-center space-x-4 ml-auto">
            <div className="hidden md:block w-full max-w-sm">
              <SearchBar placeholder={getTranslation("search", language)} />
            </div>

            <LanguageSwitcher
              currentLanguage={language}
              onLanguageChange={handleLanguageChange}
              variant="icon"
              className="hidden sm:flex"
            />

            {/* Cart and Sign In */}
            <div className="hidden md:flex items-center space-x-4">
              {navigationLinks.slice(2).map((link) => (
                <Button
                  key={link.href || link.name}
                  variant="ghost"
                  className="flex items-center"
                  onClick={() =>
                    link.onClick ? link.onClick() : navigate(link.href)
                  }
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Button>
              ))}
            </div>

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
                      placeholder={getTranslation("search", language)}
                      className="w-full"
                    />
                  </div>

                  <div className="flex-1 overflow-auto">
                    <nav className="flex flex-col space-y-6">
                      {/* Main Navigation Links (Mobile) */}
                      <div className="px-6">
                        <h3 className="mb-2 text-lg font-semibold">
                          {getTranslation("navigation", language)}
                        </h3>
                        <div className="space-y-3">
                          {navigationLinks.map((link) =>
                            link.onClick ? (
                              <button
                                key={link.name}
                                className="flex items-center py-2 text-base hover:text-primary w-full text-left"
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  link.onClick && link.onClick();
                                }}
                              >
                                {link.icon}
                                <span>{link.name}</span>
                              </button>
                            ) : (
                              <Link
                                key={link.href}
                                to={link.href}
                                className="flex items-center py-2 text-base hover:text-primary"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {link.icon}
                                <span>{link.name}</span>
                              </Link>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="px-6">
                        <h3 className="mb-2 text-lg font-semibold">
                          {getTranslation("categories", language)}
                        </h3>
                        <div className="space-y-3">
                          {/* Mobile category links */}
                          {[
                            {
                              name: getTranslation("flooring", language),
                              href: "/category/flooring",
                            },
                            {
                              name: getTranslation("wallProducts", language),
                              href: "/category/wall-products",
                            },
                            {
                              name: getTranslation("lighting", language),
                              href: "/category/lighting",
                            },
                            {
                              name: getTranslation("furniture", language),
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
                    <LanguageSwitcher
                      currentLanguage={language}
                      onLanguageChange={handleLanguageChange}
                      variant="full"
                      className="w-full"
                    />
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
          placeholder={getTranslation("search", language)}
          className="w-full"
        />
      </div>
    </header>
  );
};

export default Header;
