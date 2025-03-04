import React from "react";
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: boolean;
}

/**
 * A responsive container component that adapts to different screen sizes
 */
const ResponsiveContainer = ({
  children,
  className,
  as: Component = "div",
  maxWidth = "xl",
  padding = true,
}: ResponsiveContainerProps) => {
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
  };

  return (
    <Component
      className={cn(
        "mx-auto w-full",
        maxWidthClasses[maxWidth],
        padding && "px-4 sm:px-6 md:px-8",
        className,
      )}
    >
      {children}
    </Component>
  );
};

export { ResponsiveContainer };
