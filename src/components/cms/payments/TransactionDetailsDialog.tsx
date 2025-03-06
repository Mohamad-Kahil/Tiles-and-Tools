import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  Download,
  RotateCcw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowUpDown,
  CreditCard,
  Calendar,
  User,
  ShoppingBag,
  FileText,
  Eye,
} from "lucide-react";

interface TransactionDetailsDialogProps {
  transaction: {
    id: string;
    orderId: string;
    customer: string;
    amount: number;
    method: string;
    status: string;
    date: string;
    gatewayReference: string | null;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TransactionDetailsDialog = ({
  transaction,
  open,
  onOpenChange,
}: TransactionDetailsDialogProps) => {
  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-blue-100 text-blue-800";
      default:
        return "";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "refunded":
        return <RotateCcw className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>
            Transaction ID: {transaction.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Banner */}
          <div
            className={`p-4 rounded-md flex items-center gap-3 ${
              transaction.status === "completed"
                ? "bg-green-50"
                : transaction.status === "pending"
                  ? "bg-yellow-50"
                  : transaction.status === "failed"
                    ? "bg-red-50"
                    : "bg-blue-50"
            }`}
          >
            {getStatusIcon(transaction.status)}
            <div>
              <div className="font-medium">
                Transaction{" "}
                {transaction.status.charAt(0).toUpperCase() +
                  transaction.status.slice(1)}
              </div>
              <div className="text-sm">
                {transaction.status === "completed"
                  ? "Payment was successfully processed"
                  : transaction.status === "pending"
                    ? "Payment is being processed"
                    : transaction.status === "failed"
                      ? "Payment failed to process"
                      : "Payment was refunded"}
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Amount
                </div>
                <div className="text-xl font-bold">
                  {formatPrice(transaction.amount)}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Payment Method
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>{transaction.method}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Order ID
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-primary">{transaction.orderId}</span>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Customer
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{transaction.customer}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Date & Time
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div>{new Date(transaction.date).toLocaleDateString()}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>

              {transaction.gatewayReference && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Gateway Reference
                  </div>
                  <div className="font-mono text-xs">
                    {transaction.gatewayReference}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button variant="outline" className="flex-1">
              <Eye className="mr-2 h-4 w-4" /> View Order
            </Button>
            <Button variant="outline" className="flex-1">
              <FileText className="mr-2 h-4 w-4" /> Download Receipt
            </Button>
            {transaction.status === "completed" && (
              <Button variant="outline" className="flex-1">
                <RotateCcw className="mr-2 h-4 w-4" /> Process Refund
              </Button>
            )}
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetailsDialog;
