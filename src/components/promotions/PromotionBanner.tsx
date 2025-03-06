import React, { useState } from "react";
import { X, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PromotionBannerProps {
  promotion: {
    id: string;
    title: string;
    description: string;
    code?: string;
    expiresAt?: string;
    backgroundColor?: string;
    textColor?: string;
    dismissible?: boolean;
  };
  onDismiss?: (id: string) => void;
  className?: string;
}

const PromotionBanner: React.FC<PromotionBannerProps> = ({
  promotion,
  onDismiss,
  className = "",
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) {
      onDismiss(promotion.id);
    }
  };

  const backgroundColor = promotion.backgroundColor || "bg-primary";
  const textColor = promotion.textColor || "text-primary-foreground";

  // Calculate remaining time if expiration date is provided
  const getRemainingTime = () => {
    if (!promotion.expiresAt) return null;

    const now = new Date();
    const expiresAt = new Date(promotion.expiresAt);
    const diffMs = expiresAt.getTime() - now.getTime();

    if (diffMs <= 0) return "Expired";

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    if (diffDays > 0) {
      return `${diffDays}d ${diffHours}h remaining`;
    } else {
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${diffHours}h ${diffMinutes}m remaining`;
    }
  };

  const remainingTime = getRemainingTime();

  return (
    <div
      className={`w-full ${backgroundColor} ${textColor} py-3 px-4 ${className}`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Tag className="h-5 w-5" />
          <div>
            <span className="font-medium">{promotion.title}</span>
            {promotion.code && (
              <span className="ml-2">
                Use code: <span className="font-bold">{promotion.code}</span>
              </span>
            )}
            {promotion.description && (
              <span className="hidden md:inline ml-2">
                {promotion.description}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {remainingTime && (
            <div className="hidden sm:flex items-center text-sm">
              <Clock className="mr-1 h-4 w-4" />
              <span>{remainingTime}</span>
            </div>
          )}

          {promotion.dismissible && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full hover:bg-primary-foreground/10"
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromotionBanner;
