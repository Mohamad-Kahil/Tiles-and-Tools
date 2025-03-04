import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  image: string;
  href: string;
  description?: string;
}

interface CategoryShowcaseProps {
  categories?: Category[];
  title?: string;
  subtitle?: string;
}

const defaultCategories: Category[] = [
  {
    id: "1",
    name: "Flooring",
    image:
      "https://images.unsplash.com/photo-1581430872221-d2a064b92e17?w=800&q=80",
    href: "/category/flooring",
    description: "Tiles, wood, vinyl, and other flooring solutions",
  },
  {
    id: "2",
    name: "Wall Products",
    image:
      "https://images.unsplash.com/photo-1562184552-997c461abbe6?w=800&q=80",
    href: "/category/wall-products",
    description: "Paints, wallpapers, and decorative wall solutions",
  },
  {
    id: "3",
    name: "Lighting",
    image:
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80",
    href: "/category/lighting",
    description: "Indoor and outdoor lighting fixtures and solutions",
  },
  {
    id: "4",
    name: "Furniture",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    href: "/category/furniture",
    description: "Living room, bedroom, and outdoor furniture",
  },
  {
    id: "5",
    name: "Bathroom",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    href: "/category/bathroom",
    description: "Fixtures, fittings, and accessories for bathrooms",
  },
  {
    id: "6",
    name: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=800&q=80",
    href: "/category/kitchen",
    description: "Cabinets, countertops, and kitchen accessories",
  },
];

const CategoryShowcase = ({
  categories = defaultCategories,
  title = "Browse Our Categories",
  subtitle = "Explore our wide range of Egyptian home decor and finishing products",
}: CategoryShowcaseProps) => {
  const navigate = useNavigate();
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer"
              onClick={() => navigate(category.href)}
            >
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className={cn(
                    "h-full w-full object-cover transition-transform duration-500",
                    "group-hover:scale-110",
                  )}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-1">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-white/80 text-sm line-clamp-2">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
