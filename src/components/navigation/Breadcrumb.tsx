import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-sm text-muted-foreground mb-6">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center">
              {index === 0 ? (
                <Link
                  to={item.href}
                  className="flex items-center hover:text-foreground transition-colors"
                >
                  <Home className="h-4 w-4 mr-1" />
                  <span className="sr-only sm:not-sr-only">{item.label}</span>
                </Link>
              ) : (
                <>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  {isLast ? (
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
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export { Breadcrumb };
