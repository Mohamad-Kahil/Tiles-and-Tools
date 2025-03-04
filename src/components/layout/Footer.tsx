import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps = {}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("w-full bg-slate-900 text-white", className)}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Tiles & Tools</h3>
            <p className="text-slate-300 mb-4">
              Your premier destination for high-quality home decoration and
              finishing products in Egypt.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-slate-300 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/category/flooring"
                  className="text-slate-300 hover:text-primary transition-colors"
                >
                  Flooring
                </Link>
              </li>
              <li>
                <Link
                  to="/category/wall-products"
                  className="text-slate-300 hover:text-primary transition-colors"
                >
                  Wall Products
                </Link>
              </li>
              <li>
                <Link
                  to="/category/lighting"
                  className="text-slate-300 hover:text-primary transition-colors"
                >
                  Lighting
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-300 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-300 hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-slate-300">
                  123 Tahrir Square, Cairo, Egypt
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-slate-300">+20 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-slate-300">info@tilesandtools.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-slate-300 mb-4">
              Subscribe to our newsletter for the latest products and
              promotions.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-slate-800 border-slate-700 text-white"
              />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        {/* Payment Methods */}
        <div className="mb-8">
          <h4 className="text-lg font-medium mb-4">Payment Methods</h4>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white rounded p-2 h-8 w-12 flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
                alt="Mastercard"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="bg-white rounded p-2 h-8 w-12 flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
                alt="Visa"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="bg-white rounded p-2 h-8 w-12 flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Fawry_logo.svg/200px-Fawry_logo.svg.png"
                alt="Fawry"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="bg-white rounded p-2 h-8 w-12 flex items-center justify-center">
              <span className="text-xs font-bold text-slate-900">
                Cash on Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-slate-400 text-sm">
          <p>© {currentYear} Tiles & Tools. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link
              to="/privacy-policy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
