import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  children,
  className,
  variant = "default",
  size = "default",
}) => {
  return (
    <Button variant={variant} size={size} className={className} asChild>
      <Link to={href}>{children}</Link>
    </Button>
  );
};

export default ButtonLink;
