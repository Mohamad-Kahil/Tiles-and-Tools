import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, Tag } from "lucide-react";

interface CouponCodeProps {
  code: string;
  discount: string;
  expiresAt?: string;
  className?: string;
}

const CouponCode: React.FC<CouponCodeProps> = ({
  code,
  discount,
  expiresAt,
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`border rounded-md p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <Tag className="h-4 w-4 text-primary" />
        <span className="font-medium">Special Offer</span>
      </div>

      <div className="text-lg font-bold mb-1">{discount}</div>

      {expiresAt && (
        <div className="text-sm text-muted-foreground mb-3">
          Expires on {new Date(expiresAt).toLocaleDateString()}
        </div>
      )}

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            value={code}
            readOnly
            className="bg-muted font-mono text-center uppercase"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopy}
          className="flex-shrink-0"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">{copied ? "Copied" : "Copy code"}</span>
        </Button>
      </div>
    </div>
  );
};

export default CouponCode;
