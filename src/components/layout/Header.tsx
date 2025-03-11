import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import { useWishlist } from "../wishlist/WishlistContext";
import { useAuth } from "../auth/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  LogOut,
  Settings,
  Package,
  Globe,
  LayoutDashboard,
} from "lucide-react";

const Header = () => {
  const { itemCount: cartItemCount } = useCart();
  const { itemCount: wishlistItemCount } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage, direction } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  const handleLanguageChange = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <header className={`bg-white border-b ${direction}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/DELogo.png" alt="DecorEgypt" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/products"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              All Products
            </Link>
            <Link
              to="/category/flooring"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Flooring
            </Link>
            <Link
              to="/category/wall-products"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Wall Products
            </Link>
            <Link
              to="/category/lighting"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Lighting
            </Link>
          </nav>

          {/* Search, Cart, Wishlist, Account */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLanguageChange}
              title={`Switch to ${language === "en" ? "Arabic" : "English"}`}
            >
              <Globe className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                {wishlistItemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {wishlistItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Account */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="font-medium text-sm">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="cursor-pointer w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Account</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/account/orders"
                      className="cursor-pointer w-full"
                    >
                      <Package className="mr-2 h-4 w-4" />
                      <span>My Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/account/settings"
                      className="cursor-pointer w-full"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/cms" className="cursor-pointer w-full">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>CMS Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4">
                    <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                      <img
                        src="/DELogo.png"
                        alt="DecorEgypt"
                        className="h-8 w-auto"
                      />
                    </Link>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Close Menu"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>

                  <div className="py-4">
                    <form
                      onSubmit={handleSearch}
                      className="flex relative mb-6"
                    >
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </form>

                    <div className="space-y-4">
                      <Link
                        to="/products"
                        className="block py-2 text-base font-medium hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        All Products
                      </Link>
                      <Link
                        to="/category/flooring"
                        className="block py-2 text-base font-medium hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Flooring
                      </Link>
                      <Link
                        to="/category/wall-products"
                        className="block py-2 text-base font-medium hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Wall Products
                      </Link>
                      <Link
                        to="/category/lighting"
                        className="block py-2 text-base font-medium hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Lighting
                      </Link>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t">
                    <div className="flex flex-col space-y-4">
                      <Link
                        to="/wishlist"
                        className="flex items-center py-2 hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Heart className="mr-3 h-5 w-5" />
                        <span>Wishlist</span>
                        {wishlistItemCount > 0 && (
                          <Badge className="ml-auto">{wishlistItemCount}</Badge>
                        )}
                      </Link>
                      <Link
                        to="/cart"
                        className="flex items-center py-2 hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <ShoppingCart className="mr-3 h-5 w-5" />
                        <span>Cart</span>
                        {cartItemCount > 0 && (
                          <Badge className="ml-auto">{cartItemCount}</Badge>
                        )}
                      </Link>
                      {isAuthenticated ? (
                        <>
                          <Link
                            to="/account"
                            className="flex items-center py-2 hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <User className="mr-3 h-5 w-5" />
                            <span>My Account</span>
                          </Link>
                          <Link
                            to="/cms"
                            className="flex items-center py-2 hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <LayoutDashboard className="mr-3 h-5 w-5" />
                            <span>CMS Dashboard</span>
                          </Link>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                              logout();
                              setMobileMenuOpen(false);
                            }}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Logout</span>
                          </Button>
                        </>
                      ) : (
                        <Button
                          className="w-full"
                          onClick={() => setMobileMenuOpen(false)}
                          asChild
                        >
                          <Link to="/login">Sign In</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
