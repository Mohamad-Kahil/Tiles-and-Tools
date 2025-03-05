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
  FolderTree,
  ChevronRight,
  ChevronDown,
  ImagePlus,
  Eye,
  Move,
  ArrowUpDown,
  Search,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parent: string | null;
  image: string | null;
  productCount: number;
  featured: boolean;
  children?: Category[];
  expanded?: boolean;
}

const ProductCategoriesManager = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "cat1",
      name: "Flooring",
      slug: "flooring",
      description: "All types of flooring products",
      parent: null,
      image:
        "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=200&q=80",
      productCount: 45,
      featured: true,
      expanded: true,
      children: [
        {
          id: "cat1-1",
          name: "Marble Flooring",
          slug: "marble-flooring",
          description: "Luxury marble flooring options",
          parent: "cat1",
          image:
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=200&q=80",
          productCount: 18,
          featured: true,
        },
        {
          id: "cat1-2",
          name: "Ceramic Tiles",
          slug: "ceramic-tiles",
          description: "Durable ceramic tile options",
          parent: "cat1",
          image:
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200&q=80",
          productCount: 15,
          featured: false,
        },
        {
          id: "cat1-3",
          name: "Wooden Flooring",
          slug: "wooden-flooring",
          description: "Elegant wooden flooring solutions",
          parent: "cat1",
          image:
            "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?w=200&q=80",
          productCount: 12,
          featured: true,
        },
      ],
    },
    {
      id: "cat2",
      name: "Lighting",
      slug: "lighting",
      description: "Indoor and outdoor lighting solutions",
      parent: null,
      image:
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=200&q=80",
      productCount: 32,
      featured: true,
      expanded: false,
      children: [
        {
          id: "cat2-1",
          name: "Ceiling Lights",
          slug: "ceiling-lights",
          description: "Chandeliers and ceiling fixtures",
          parent: "cat2",
          image:
            "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=200&q=80",
          productCount: 14,
          featured: true,
        },
        {
          id: "cat2-2",
          name: "Wall Lights",
          slug: "wall-lights",
          description: "Sconces and wall-mounted fixtures",
          parent: "cat2",
          image:
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&q=80",
          productCount: 10,
          featured: false,
        },
        {
          id: "cat2-3",
          name: "Floor Lamps",
          slug: "floor-lamps",
          description: "Standing and floor lamps",
          parent: "cat2",
          image:
            "https://images.unsplash.com/photo-1507919909716-c8262e491cde?w=200&q=80",
          productCount: 8,
          featured: false,
        },
      ],
    },
    {
      id: "cat3",
      name: "Wall Products",
      slug: "wall-products",
      description: "Wallpapers, paints, and wall decorations",
      parent: null,
      image:
        "https://images.unsplash.com/photo-1594285047677-3bf8d5eeba1c?w=200&q=80",
      productCount: 28,
      featured: false,
      expanded: false,
      children: [
        {
          id: "cat3-1",
          name: "Wallpapers",
          slug: "wallpapers",
          description: "Decorative wallpapers for all rooms",
          parent: "cat3",
          image:
            "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=200&q=80",
          productCount: 15,
          featured: false,
        },
        {
          id: "cat3-2",
          name: "Wall Panels",
          slug: "wall-panels",
          description: "Textured and 3D wall panels",
          parent: "cat3",
          image:
            "https://images.unsplash.com/photo-1620626576474-aad9a5a3e854?w=200&q=80",
          productCount: 8,
          featured: true,
        },
        {
          id: "cat3-3",
          name: "Wall Paints",
          slug: "wall-paints",
          description: "Premium interior and exterior paints",
          parent: "cat3",
          image:
            "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=200&q=80",
          productCount: 5,
          featured: false,
        },
      ],
    },
    {
      id: "cat4",
      name: "Furniture",
      slug: "furniture",
      description: "Home and office furniture",
      parent: null,
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80",
      productCount: 40,
      featured: true,
      expanded: false,
      children: [
        {
          id: "cat4-1",
          name: "Living Room",
          slug: "living-room",
          description: "Sofas, coffee tables, and entertainment units",
          parent: "cat4",
          image:
            "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=200&q=80",
          productCount: 18,
          featured: true,
        },
        {
          id: "cat4-2",
          name: "Bedroom",
          slug: "bedroom",
          description: "Beds, wardrobes, and nightstands",
          parent: "cat4",
          image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200&q=80",
          productCount: 12,
          featured: false,
        },
        {
          id: "cat4-3",
          name: "Dining Room",
          slug: "dining-room",
          description: "Dining tables and chairs",
          parent: "cat4",
          image:
            "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=200&q=80",
          productCount: 10,
          featured: true,
        },
      ],
    },
    {
      id: "cat5",
      name: "Bathroom",
      slug: "bathroom",
      description: "Bathroom fixtures and accessories",
      parent: null,
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&q=80",
      productCount: 25,
      featured: false,
      expanded: false,
      children: [
        {
          id: "cat5-1",
          name: "Vanities",
          slug: "vanities",
          description: "Bathroom vanities and cabinets",
          parent: "cat5",
          image:
            "https://images.unsplash.com/photo-1631735237350-3e4e6e2c5b13?w=200&q=80",
          productCount: 10,
          featured: false,
        },
        {
          id: "cat5-2",
          name: "Fixtures",
          slug: "fixtures",
          description: "Faucets, showers, and bathtubs",
          parent: "cat5",
          image:
            "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=200&q=80",
          productCount: 8,
          featured: false,
        },
        {
          id: "cat5-3",
          name: "Accessories",
          slug: "accessories",
          description: "Towel racks, mirrors, and other accessories",
          parent: "cat5",
          image:
            "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=200&q=80",
          productCount: 7,
          featured: false,
        },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: "",
    slug: "",
    description: "",
    parent: null,
    featured: false,
  });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.slug) {
      const category: Category = {
        id: `cat${categories.length + 1}`,
        name: newCategory.name,
        slug: newCategory.slug,
        description: newCategory.description || "",
        parent: newCategory.parent,
        image: null,
        productCount: 0,
        featured: newCategory.featured || false,
      };

      if (category.parent) {
        // Add as child to parent category
        setCategories(
          categories.map((cat) => {
            if (cat.id === category.parent) {
              return {
                ...cat,
                children: [...(cat.children || []), category],
              };
            }
            return cat;
          }),
        );
      } else {
        // Add as top-level category
        setCategories([...categories, { ...category, children: [] }]);
      }

      setNewCategory({
        name: "",
        slug: "",
        description: "",
        parent: null,
        featured: false,
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleUpdateCategory = () => {
    if (editingCategory) {
      if (editingCategory.parent) {
        // Update child category
        setCategories(
          categories.map((cat) => {
            if (cat.id === editingCategory.parent) {
              return {
                ...cat,
                children: cat.children?.map((child) =>
                  child.id === editingCategory.id ? editingCategory : child,
                ),
              };
            }
            return cat;
          }),
        );
      } else {
        // Update top-level category
        setCategories(
          categories.map((cat) =>
            cat.id === editingCategory.id
              ? { ...editingCategory, children: cat.children }
              : cat,
          ),
        );
      }

      setEditingCategory(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteCategory = (id: string, parentId: string | null) => {
    if (parentId) {
      // Delete child category
      setCategories(
        categories.map((cat) => {
          if (cat.id === parentId) {
            return {
              ...cat,
              children: cat.children?.filter((child) => child.id !== id),
            };
          }
          return cat;
        }),
      );
    } else {
      // Delete top-level category
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  const handleToggleExpand = (id: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, expanded: !cat.expanded } : cat,
      ),
    );
  };

  const handleGenerateSlug = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    if (editingCategory) {
      setEditingCategory({ ...editingCategory, slug });
    } else {
      setNewCategory({ ...newCategory, slug });
    }
  };

  // Filter categories based on search term
  const filteredCategories = searchTerm
    ? categories.flatMap((cat) => [
        ...(cat.name.toLowerCase().includes(searchTerm.toLowerCase())
          ? [cat]
          : []),
        ...(cat.children || []).filter((child) =>
          child.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      ])
    : categories;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Product Categories
        </h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new product category
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => {
                    setNewCategory({ ...newCategory, name: e.target.value });
                    if (!newCategory.slug) {
                      handleGenerateSlug(e.target.value);
                    }
                  }}
                  placeholder="e.g., Kitchen Fixtures"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <div className="flex gap-2">
                  <Input
                    id="slug"
                    value={newCategory.slug}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, slug: e.target.value })
                    }
                    placeholder="e.g., kitchen-fixtures"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleGenerateSlug(newCategory.name || "")}
                  >
                    Generate
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  This will be used in the URL: /category/
                  {newCategory.slug || "example-slug"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="parent">Parent Category (Optional)</Label>
                <select
                  id="parent"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newCategory.parent || ""}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      parent: e.target.value || null,
                    })
                  }
                >
                  <option value="">None (Top Level)</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCategory.description || ""}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe this category..."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  className="rounded"
                  checked={newCategory.featured || false}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      featured: e.target.checked,
                    })
                  }
                />
                <label htmlFor="featured" className="text-sm">
                  Feature this category on the homepage
                </label>
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
                onClick={handleAddCategory}
                disabled={!newCategory.name || !newCategory.slug}
              >
                Add Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>Update the category details</DialogDescription>
            </DialogHeader>

            {editingCategory && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Category Name</Label>
                  <Input
                    id="edit-name"
                    value={editingCategory.name}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-slug">URL Slug</Label>
                  <div className="flex gap-2">
                    <Input
                      id="edit-slug"
                      value={editingCategory.slug}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          slug: e.target.value,
                        })
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleGenerateSlug(editingCategory.name)}
                    >
                      Generate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This will be used in the URL: /category/
                    {editingCategory.slug}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingCategory.description}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-featured"
                    className="rounded"
                    checked={editingCategory.featured}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        featured: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="edit-featured" className="text-sm">
                    Feature this category on the homepage
                  </label>
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
                onClick={handleUpdateCategory}
                disabled={
                  !editingCategory ||
                  !editingCategory.name ||
                  !editingCategory.slug
                }
              >
                Update Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search categories..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderTree className="h-5 w-5" /> Category Hierarchy
          </CardTitle>
          <CardDescription>
            Organize your product categories in a hierarchical structure
          </CardDescription>
        </CardHeader>
        <CardContent>
          {searchTerm ? (
            // Flat list for search results
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-4 text-muted-foreground"
                    >
                      No categories found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {category.slug}
                      </TableCell>
                      <TableCell>{category.productCount}</TableCell>
                      <TableCell>
                        {category.featured && (
                          <Badge
                            variant="outline"
                            className="bg-yellow-100 text-yellow-800"
                          >
                            Featured
                          </Badge>
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
                                setEditingCategory(category);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" /> View Products
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
          ) : (
            // Hierarchical view for normal mode
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-4 text-muted-foreground"
                    >
                      No categories defined yet
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.flatMap((category) => [
                    // Parent category
                    <TableRow key={category.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 p-0 mr-1"
                            onClick={() => handleToggleExpand(category.id)}
                          >
                            {category.expanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                          <div className="flex items-center gap-2 font-medium">
                            {category.image ? (
                              <div className="h-8 w-8 rounded-md overflow-hidden bg-muted">
                                <img
                                  src={category.image}
                                  alt={category.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                                <ImagePlus className="h-4 w-4 text-muted-foreground" />
                              </div>
                            )}
                            {category.name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {category.slug}
                      </TableCell>
                      <TableCell>{category.productCount}</TableCell>
                      <TableCell>
                        {category.featured && (
                          <Badge
                            variant="outline"
                            className="bg-yellow-100 text-yellow-800"
                          >
                            Featured
                          </Badge>
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
                                setEditingCategory(category);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" /> View Products
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Move className="mr-2 h-4 w-4" /> Reorder
                              Subcategories
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>,
                    // Child categories (if expanded)
                    ...(category.expanded && category.children
                      ? category.children.map((child) => (
                          <TableRow key={child.id}>
                            <TableCell>
                              <div className="flex items-center pl-8">
                                <div className="flex items-center gap-2">
                                  {child.image ? (
                                    <div className="h-6 w-6 rounded-md overflow-hidden bg-muted">
                                      <img
                                        src={child.image}
                                        alt={child.name}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <div className="h-6 w-6 rounded-md bg-muted flex items-center justify-center">
                                      <ImagePlus className="h-3 w-3 text-muted-foreground" />
                                    </div>
                                  )}
                                  {child.name}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-xs">
                              {child.slug}
                            </TableCell>
                            <TableCell>{child.productCount}</TableCell>
                            <TableCell>
                              {child.featured && (
                                <Badge
                                  variant="outline"
                                  className="bg-yellow-100 text-yellow-800"
                                >
                                  Featured
                                </Badge>
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
                                      setEditingCategory(child);
                                      setIsEditDialogOpen(true);
                                    }}
                                  >
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" /> View
                                    Products
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      : []),
                  ])
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            {categories.reduce(
              (total, cat) => total + 1 + (cat.children?.length || 0),
              0,
            )}{" "}
            categories total
          </div>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="mr-2 h-4 w-4" /> Reorder Categories
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCategoriesManager;
