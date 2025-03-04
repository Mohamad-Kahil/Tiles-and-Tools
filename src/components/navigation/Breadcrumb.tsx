import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  homeHref?: string;
  className?: string;
}

const Breadcrumb = ({
  items = [],
  homeHref = "/",
  className = "",
}: BreadcrumbProps) => {
  return (
    <nav
      className={`flex items-center text-sm text-muted-foreground ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {/* Home link */}
        <li>
          <Link
            to={homeHref}
            className="flex items-center hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {/* Separator after home */}
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4" />
        </li>

        {/* Breadcrumb items */}
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              {index === items.length - 1 || !item.href ? (
                <span className="font-medium text-foreground">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>

            {/* Separator between items */}
            {index < items.length - 1 && (
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4" />
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
