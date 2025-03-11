import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash, Home, Building, MapPin } from "lucide-react";
import AddressForm from "./AddressForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export interface Address {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  governorate: string;
  postalCode?: string;
  isDefault: boolean;
  type: "home" | "work" | "other";
}

const mockAddresses: Address[] = [
  {
    id: "addr-1",
    name: "Home Address",
    addressLine1: "123 Main Street, Apt 4B",
    city: "Cairo",
    governorate: "Cairo",
    postalCode: "12345",
    isDefault: true,
    type: "home",
  },
  {
    id: "addr-2",
    name: "Work Address",
    addressLine1: "456 Business Avenue",
    addressLine2: "Floor 3, Office 302",
    city: "Giza",
    governorate: "Giza",
    isDefault: false,
    type: "work",
  },
];

export default function AddressBook() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddAddress = (address: Omit<Address, "id">) => {
    const newAddress = {
      ...address,
      id: `addr-${Date.now()}`,
    };

    // If this is the first address or marked as default, update other addresses
    if (address.isDefault || addresses.length === 0) {
      setAddresses((prev) =>
        prev.map((addr) => ({ ...addr, isDefault: false })),
      );
    }

    setAddresses((prev) => [...prev, newAddress]);
    setIsAddDialogOpen(false);
  };

  const handleEditAddress = (address: Address) => {
    // If setting as default, update other addresses
    if (address.isDefault) {
      setAddresses((prev) =>
        prev.map((addr) => ({
          ...addr,
          isDefault: addr.id === address.id,
        })),
      );
    } else {
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === address.id ? address : addr)),
      );
    }

    setIsEditDialogOpen(false);
    setEditingAddress(null);
  };

  const handleDeleteAddress = (id: string) => {
    const addressToDelete = addresses.find((addr) => addr.id === id);
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));

    // If we're deleting the default address, make the first remaining address the default
    if (addressToDelete?.isDefault && addresses.length > 1) {
      setAddresses((prev) => {
        const filtered = prev.filter((addr) => addr.id !== id);
        if (filtered.length > 0) {
          filtered[0].isDefault = true;
        }
        return filtered;
      });
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    );
  };

  const getAddressIcon = (type: Address["type"]) => {
    switch (type) {
      case "home":
        return <Home className="h-5 w-5" />;
      case "work":
        return <Building className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Address Book</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>
                Add a new shipping or billing address to your account.
              </DialogDescription>
            </DialogHeader>
            <AddressForm
              onSubmit={handleAddAddress}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Separator />

      {addresses.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No addresses found</h3>
          <p className="text-muted-foreground mb-6">
            You haven't added any addresses to your account yet.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Address
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      {getAddressIcon(address.type)}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{address.name}</h3>
                      {address.isDefault && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                          Default Address
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog
                      open={
                        isEditDialogOpen && editingAddress?.id === address.id
                      }
                      onOpenChange={(open) => {
                        setIsEditDialogOpen(open);
                        if (!open) setEditingAddress(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingAddress(address)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader>
                          <DialogTitle>Edit Address</DialogTitle>
                          <DialogDescription>
                            Update your address information.
                          </DialogDescription>
                        </DialogHeader>
                        {editingAddress && (
                          <AddressForm
                            address={editingAddress}
                            onSubmit={handleEditAddress}
                            onCancel={() => {
                              setIsEditDialogOpen(false);
                              setEditingAddress(null);
                            }}
                          />
                        )}
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Address</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this address? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteAddress(address.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                <div className="space-y-1 text-sm mb-4">
                  <p>{address.addressLine1}</p>
                  {address.addressLine2 && <p>{address.addressLine2}</p>}
                  <p>
                    {address.city}, {address.governorate}{" "}
                    {address.postalCode && `${address.postalCode}`}
                  </p>
                </div>

                {!address.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Set as Default
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
