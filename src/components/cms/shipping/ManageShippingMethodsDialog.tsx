import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Truck, MoreVertical, Edit, Trash, Plus } from "lucide-react";
import AddShippingMethodDialog from "./AddShippingMethodDialog";
import EditShippingMethodDialog from "./EditShippingMethodDialog";

interface ManageShippingMethodsDialogProps {
  children?: React.ReactNode;
  zoneName: string;
}

const ManageShippingMethodsDialog = ({
  children,
  zoneName,
}: ManageShippingMethodsDialogProps) => {
  const [open, setOpen] = React.useState(false);

  // Mock shipping methods for the selected zone
  const methods = [
    {
      name: "Standard Delivery",
      type: "Flat Rate",
      zone: zoneName,
      cost: "EGP 50",
      status: "Active",
    },
    {
      name: "Express Delivery",
      type: "Flat Rate",
      zone: zoneName,
      cost: "EGP 100",
      status: "Active",
    },
  ];

  // Add Free Shipping for Cairo & Giza
  if (zoneName === "Cairo & Giza") {
    methods.push({
      name: "Free Shipping (Orders over EGP 1000)",
      type: "Free Shipping",
      zone: zoneName,
      cost: "EGP 0",
      status: "Active",
    });
  }

  // Add Weight-based for Delta Region
  if (zoneName === "Delta Region") {
    methods.push({
      name: "Weight-based Shipping",
      type: "Weight Based",
      zone: zoneName,
      cost: "Variable",
      status: "Active",
    });
  }

  // Add Carrier Rates for Upper Egypt
  if (zoneName === "Upper Egypt") {
    methods.push({
      name: "Aramex Express",
      type: "Carrier Rates",
      zone: zoneName,
      cost: "Calculated",
      status: "Active",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="sm">
            <Truck className="mr-2 h-4 w-4" /> Manage Methods
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Shipping Methods for {zoneName}</DialogTitle>
          <DialogDescription>
            Manage shipping methods available for this zone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end mb-4">
          <AddShippingMethodDialog />
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Method Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {methods.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-4 text-muted-foreground"
                  >
                    No shipping methods found for this zone
                  </TableCell>
                </TableRow>
              ) : (
                methods.map((method, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{method.name}</TableCell>
                    <TableCell>{method.type}</TableCell>
                    <TableCell>{method.cost}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          method.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {method.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <EditShippingMethodDialog method={method} />
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageShippingMethodsDialog;
