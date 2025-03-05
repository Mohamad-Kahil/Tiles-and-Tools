import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash,
  MoreVertical,
  Tag,
  Layers,
  Check,
  X,
  Move,
  GripVertical,
} from "lucide-react";

interface Attribute {
  id: string;
  name: string;
  type: "select" | "color" | "text" | "number";
  values: string[];
  isVariant: boolean;
  isFilter: boolean;
  isRequired: boolean;
}

const ProductAttributesManager = () => {
  const [attributes, setAttributes] = useState<Attribute[]>([
    {
      id: "attr1",
      name: "Color",
      type: "color",
      values: ["Red", "Blue", "Green", "Black", "White"],
      isVariant: true,
      isFilter: true,
      isRequired: true,
    },
    {
      id: "attr2",
      name: "Size",
      type: "select",
      values: ["Small", "Medium", "Large", "Extra Large"],
      isVariant: true,
      isFilter: true,
      isRequired: true,
    },
    {
      id: "attr3",
      name: "Material",
      type: "select",
      values: ["Cotton", "Polyester", "Wool", "Silk", "Linen"],
      isVariant: false,
      isFilter: true,
      isRequired: false,
    },
    {
      id: "attr4",
      name: "Pattern",
      type: "select",
      values: ["Solid", "Striped", "Checkered", "Floral", "Geometric"],
      isVariant: false,
      isFilter: true,
      isRequired: false,
    },
    {
      id: "attr5",
      name: "Finish",
      type: "select",
      values: ["Matte", "Glossy", "Semi-Gloss", "Satin", "Textured"],
      isVariant: true,
      isFilter: true,
      isRequired: false,
    },
  ]);

  const [newAttribute, setNewAttribute] = useState<Partial<Attribute>>({
    name: "",
    type: "select",
    values: [],
    isVariant: false,
    isFilter: true,
    isRequired: false,
  });

  const [newValue, setNewValue] = useState("");
  const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(
    null,
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddAttribute = () => {
    if (
      newAttribute.name &&
      newAttribute.values &&
      newAttribute.values.length > 0
    ) {
      const attribute: Attribute = {
        id: `attr${attributes.length + 1}`,
        name: newAttribute.name,
        type: newAttribute.type as "select" | "color" | "text" | "number",
        values: newAttribute.values,
        isVariant: newAttribute.isVariant || false,
        isFilter: newAttribute.isFilter || false,
        isRequired: newAttribute.isRequired || false,
      };

      setAttributes([...attributes, attribute]);
      setNewAttribute({
        name: "",
        type: "select",
        values: [],
        isVariant: false,
        isFilter: true,
        isRequired: false,
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleUpdateAttribute = () => {
    if (editingAttribute) {
      setAttributes(
        attributes.map((attr) =>
          attr.id === editingAttribute.id ? editingAttribute : attr,
        ),
      );
      setEditingAttribute(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteAttribute = (id: string) => {
    setAttributes(attributes.filter((attr) => attr.id !== id));
  };

  const handleAddValue = () => {
    if (newValue.trim()) {
      if (editingAttribute) {
        setEditingAttribute({
          ...editingAttribute,
          values: [...editingAttribute.values, newValue.trim()],
        });
      } else {
        setNewAttribute({
          ...newAttribute,
          values: [...(newAttribute.values || []), newValue.trim()],
        });
      }
      setNewValue("");
    }
  };

  const handleRemoveValue = (value: string) => {
    if (editingAttribute) {
      setEditingAttribute({
        ...editingAttribute,
        values: editingAttribute.values.filter((v) => v !== value),
      });
    } else {
      setNewAttribute({
        ...newAttribute,
        values: (newAttribute.values || []).filter((v) => v !== value),
      });
    }
  };

  const getAttributeTypeLabel = (type: string) => {
    switch (type) {
      case "select":
        return "Dropdown";
      case "color":
        return "Color Swatch";
      case "text":
        return "Text Input";
      case "number":
        return "Number Input";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Product Attributes
        </h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Attribute
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Attribute</DialogTitle>
              <DialogDescription>
                Create a new attribute for your products
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Attribute Name</Label>
                  <Input
                    id="name"
                    value={newAttribute.name}
                    onChange={(e) =>
                      setNewAttribute({ ...newAttribute, name: e.target.value })
                    }
                    placeholder="e.g., Color, Size, Material"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Attribute Type</Label>
                  <select
                    id="type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newAttribute.type}
                    onChange={(e) =>
                      setNewAttribute({
                        ...newAttribute,
                        type: e.target.value as any,
                      })
                    }
                  >
                    <option value="select">Dropdown</option>
                    <option value="color">Color Swatch</option>
                    <option value="text">Text Input</option>
                    <option value="number">Number Input</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Attribute Values</Label>
                <div className="flex gap-2">
                  <Input
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="Enter a value"
                    onKeyDown={(e) => e.key === "Enter" && handleAddValue()}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddValue}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {newAttribute.values?.map((value) => (
                    <Badge key={value} variant="outline" className="gap-1">
                      {value}
                      <button
                        type="button"
                        className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring"
                        onClick={() => handleRemoveValue(value)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {newAttribute.values?.length === 0 && (
                    <span className="text-sm text-muted-foreground">
                      No values added yet
                    </span>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Attribute Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isVariant"
                      className="rounded"
                      checked={newAttribute.isVariant}
                      onChange={(e) =>
                        setNewAttribute({
                          ...newAttribute,
                          isVariant: e.target.checked,
                        })
                      }
                    />
                    <label htmlFor="isVariant" className="text-sm">
                      Use for product variants
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isFilter"
                      className="rounded"
                      checked={newAttribute.isFilter}
                      onChange={(e) =>
                        setNewAttribute({
                          ...newAttribute,
                          isFilter: e.target.checked,
                        })
                      }
                    />
                    <label htmlFor="isFilter" className="text-sm">
                      Use for product filtering
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isRequired"
                      className="rounded"
                      checked={newAttribute.isRequired}
                      onChange={(e) =>
                        setNewAttribute({
                          ...newAttribute,
                          isRequired: e.target.checked,
                        })
                      }
                    />
                    <label htmlFor="isRequired" className="text-sm">
                      Required attribute
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleAddAttribute}
                disabled={!newAttribute.name || !newAttribute.values?.length}
              >
                Add Attribute
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Attribute</DialogTitle>
              <DialogDescription>
                Update the attribute details
              </DialogDescription>
            </DialogHeader>

            {editingAttribute && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Attribute Name</Label>
                    <Input
                      id="edit-name"
                      value={editingAttribute.name}
                      onChange={(e) =>
                        setEditingAttribute({
                          ...editingAttribute,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-type">Attribute Type</Label>
                    <select
                      id="edit-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={editingAttribute.type}
                      onChange={(e) =>
                        setEditingAttribute({
                          ...editingAttribute,
                          type: e.target.value as any,
                        })
                      }
                    >
                      <option value="select">Dropdown</option>
                      <option value="color">Color Swatch</option>
                      <option value="text">Text Input</option>
                      <option value="number">Number Input</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Attribute Values</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      placeholder="Enter a value"
                      onKeyDown={(e) => e.key === "Enter" && handleAddValue()}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddValue}
                    >
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {editingAttribute.values.map((value) => (
                      <Badge key={value} variant="outline" className="gap-1">
                        {value}
                        <button
                          type="button"
                          className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring"
                          onClick={() => handleRemoveValue(value)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {editingAttribute.values.length === 0 && (
                      <span className="text-sm text-muted-foreground">
                        No values added yet
                      </span>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Attribute Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="edit-isVariant"
                        className="rounded"
                        checked={editingAttribute.isVariant}
                        onChange={(e) =>
                          setEditingAttribute({
                            ...editingAttribute,
                            isVariant: e.target.checked,
                          })
                        }
                      />
                      <label htmlFor="edit-isVariant" className="text-sm">
                        Use for product variants
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="edit-isFilter"
                        className="rounded"
                        checked={editingAttribute.isFilter}
                        onChange={(e) =>
                          setEditingAttribute({
                            ...editingAttribute,
                            isFilter: e.target.checked,
                          })
                        }
                      />
                      <label htmlFor="edit-isFilter" className="text-sm">
                        Use for product filtering
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="edit-isRequired"
                        className="rounded"
                        checked={editingAttribute.isRequired}
                        onChange={(e) =>
                          setEditingAttribute({
                            ...editingAttribute,
                            isRequired: e.target.checked,
                          })
                        }
                      />
                      <label htmlFor="edit-isRequired" className="text-sm">
                        Required attribute
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleUpdateAttribute}
                disabled={
                  !editingAttribute ||
                  !editingAttribute.name ||
                  !editingAttribute.values.length
                }
              >
                Update Attribute
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attributes</CardTitle>
          <CardDescription>
            Manage product attributes and their values
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Values</TableHead>
                <TableHead className="text-center">Variant</TableHead>
                <TableHead className="text-center">Filter</TableHead>
                <TableHead className="text-center">Required</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attributes.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-4 text-muted-foreground"
                  >
                    No attributes defined yet
                  </TableCell>
                </TableRow>
              ) : (
                attributes.map((attribute) => (
                  <TableRow key={attribute.id}>
                    <TableCell>
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                    </TableCell>
                    <TableCell className="font-medium">
                      {attribute.name}
                    </TableCell>
                    <TableCell>
                      {getAttributeTypeLabel(attribute.type)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {attribute.values.slice(0, 3).map((value) => (
                          <Badge key={value} variant="outline">
                            {value}
                          </Badge>
                        ))}
                        {attribute.values.length > 3 && (
                          <Badge variant="outline">
                            +{attribute.values.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {attribute.isVariant ? (
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {attribute.isFilter ? (
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {attribute.isRequired ? (
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground mx-auto" />
                      )}
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
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingAttribute(attribute);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteAttribute(attribute.id)}
                          >
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
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            {attributes.length} attributes defined
          </div>
          <Button variant="outline" size="sm">
            <Tag className="mr-2 h-4 w-4" /> Generate Variants
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Variant Preview</CardTitle>
          <CardDescription>
            Preview of product variants based on selected attributes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-muted/20">
              <h3 className="font-medium mb-2">Variant Attributes</h3>
              <div className="flex flex-wrap gap-2">
                {attributes
                  .filter((attr) => attr.isVariant)
                  .map((attr) => (
                    <Badge key={attr.id} variant="secondary">
                      {attr.name}
                    </Badge>
                  ))}
                {attributes.filter((attr) => attr.isVariant).length === 0 && (
                  <span className="text-sm text-muted-foreground">
                    No variant attributes selected
                  </span>
                )}
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  {attributes
                    .filter((attr) => attr.isVariant)
                    .map((attr) => (
                      <TableHead key={attr.id}>{attr.name}</TableHead>
                    ))}
                  <TableHead>SKU</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attributes.filter((attr) => attr.isVariant).length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-4 text-muted-foreground"
                    >
                      Select attributes to use for variants
                    </TableCell>
                  </TableRow>
                ) : (
                  // Example variant combinations
                  [
                    {
                      values: { Color: "Red", Size: "Small", Finish: "Matte" },
                      sku: "FLR-MRB-001-R-S-M",
                      price: "EGP 1,200",
                      stock: 25,
                    },
                    {
                      values: { Color: "Red", Size: "Medium", Finish: "Matte" },
                      sku: "FLR-MRB-001-R-M-M",
                      price: "EGP 1,200",
                      stock: 18,
                    },
                    {
                      values: {
                        Color: "Blue",
                        Size: "Small",
                        Finish: "Glossy",
                      },
                      sku: "FLR-MRB-001-B-S-G",
                      price: "EGP 1,250",
                      stock: 12,
                    },
                    {
                      values: {
                        Color: "Green",
                        Size: "Large",
                        Finish: "Semi-Gloss",
                      },
                      sku: "FLR-MRB-001-G-L-SG",
                      price: "EGP 1,300",
                      stock: 8,
                    },
                    {
                      values: {
                        Color: "Black",
                        Size: "Extra Large",
                        Finish: "Textured",
                      },
                      sku: "FLR-MRB-001-BK-XL-T",
                      price: "EGP 1,350",
                      stock: 5,
                    },
                  ].map((variant, index) => (
                    <TableRow key={index}>
                      {attributes
                        .filter((attr) => attr.isVariant)
                        .map((attr) => (
                          <TableCell key={attr.id}>
                            {variant.values[
                              attr.name as keyof typeof variant.values
                            ] || "-"}
                          </TableCell>
                        ))}
                      <TableCell className="font-mono text-xs">
                        {variant.sku}
                      </TableCell>
                      <TableCell>{variant.price}</TableCell>
                      <TableCell>{variant.stock}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Showing 5 of 24 possible variants
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductAttributesManager;
