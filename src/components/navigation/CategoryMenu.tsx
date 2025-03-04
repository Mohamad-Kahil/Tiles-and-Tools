import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface Category {
  name: string;
  href: string;
  description?: string;
  subcategories?: {
    name: string;
    href: string;
    description?: string;
  }[];
}

interface CategoryMenuProps {
  categories?: Category[];
  language?: "en" | "ar";
}

const defaultCategories: Category[] = [
  {
    name: "Flooring",
    href: "/category/flooring",
    description: "Tiles, wood, vinyl, and other flooring solutions",
    subcategories: [
      { name: "Ceramic Tiles", href: "/category/flooring/ceramic-tiles" },
      { name: "Porcelain Tiles", href: "/category/flooring/porcelain-tiles" },
      { name: "Wooden Flooring", href: "/category/flooring/wooden-flooring" },
      { name: "Vinyl Flooring", href: "/category/flooring/vinyl-flooring" },
      { name: "Marble Flooring", href: "/category/flooring/marble-flooring" },
    ],
  },
  {
    name: "Wall Products",
    href: "/category/wall-products",
    description: "Paints, wallpapers, and decorative wall solutions",
    subcategories: [
      {
        name: "Interior Paint",
        href: "/category/wall-products/interior-paint",
      },
      {
        name: "Exterior Paint",
        href: "/category/wall-products/exterior-paint",
      },
      { name: "Wallpaper", href: "/category/wall-products/wallpaper" },
      { name: "Wall Tiles", href: "/category/wall-products/wall-tiles" },
      {
        name: "Decorative Panels",
        href: "/category/wall-products/decorative-panels",
      },
    ],
  },
  {
    name: "Lighting",
    href: "/category/lighting",
    description: "Indoor and outdoor lighting fixtures and solutions",
    subcategories: [
      { name: "Ceiling Lights", href: "/category/lighting/ceiling-lights" },
      { name: "Wall Lights", href: "/category/lighting/wall-lights" },
      { name: "Floor Lamps", href: "/category/lighting/floor-lamps" },
      { name: "Table Lamps", href: "/category/lighting/table-lamps" },
      { name: "Outdoor Lighting", href: "/category/lighting/outdoor-lighting" },
    ],
  },
  {
    name: "Furniture",
    href: "/category/furniture",
    description: "Living room, bedroom, and outdoor furniture",
    subcategories: [
      { name: "Living Room", href: "/category/furniture/living-room" },
      { name: "Bedroom", href: "/category/furniture/bedroom" },
      { name: "Dining Room", href: "/category/furniture/dining-room" },
      { name: "Office", href: "/category/furniture/office" },
      { name: "Outdoor", href: "/category/furniture/outdoor" },
    ],
  },
];

const defaultArabicCategories: Category[] = [
  {
    name: "الأرضيات",
    href: "/category/flooring",
    description: "البلاط، الخشب، الفينيل، وحلول الأرضيات الأخرى",
    subcategories: [
      { name: "بلاط سيراميك", href: "/category/flooring/ceramic-tiles" },
      { name: "بلاط بورسلين", href: "/category/flooring/porcelain-tiles" },
      { name: "أرضيات خشبية", href: "/category/flooring/wooden-flooring" },
      { name: "أرضيات فينيل", href: "/category/flooring/vinyl-flooring" },
      { name: "أرضيات رخامية", href: "/category/flooring/marble-flooring" },
    ],
  },
  {
    name: "منتجات الحائط",
    href: "/category/wall-products",
    description: "الدهانات، ورق الحائط، وحلول الحائط الزخرفية",
    subcategories: [
      { name: "دهانات داخلية", href: "/category/wall-products/interior-paint" },
      { name: "دهانات خارجية", href: "/category/wall-products/exterior-paint" },
      { name: "ورق حائط", href: "/category/wall-products/wallpaper" },
      { name: "بلاط حائط", href: "/category/wall-products/wall-tiles" },
      {
        name: "ألواح زخرفية",
        href: "/category/wall-products/decorative-panels",
      },
    ],
  },
  {
    name: "الإضاءة",
    href: "/category/lighting",
    description: "تركيبات وحلول الإضاءة الداخلية والخارجية",
    subcategories: [
      { name: "إضاءة سقف", href: "/category/lighting/ceiling-lights" },
      { name: "إضاءة حائط", href: "/category/lighting/wall-lights" },
      { name: "مصابيح أرضية", href: "/category/lighting/floor-lamps" },
      { name: "مصابيح طاولة", href: "/category/lighting/table-lamps" },
      { name: "إضاءة خارجية", href: "/category/lighting/outdoor-lighting" },
    ],
  },
  {
    name: "الأثاث",
    href: "/category/furniture",
    description: "أثاث غرفة المعيشة، غرفة النوم، والأثاث الخارجي",
    subcategories: [
      { name: "غرفة المعيشة", href: "/category/furniture/living-room" },
      { name: "غرفة النوم", href: "/category/furniture/bedroom" },
      { name: "غرفة الطعام", href: "/category/furniture/dining-room" },
      { name: "المكتب", href: "/category/furniture/office" },
      { name: "الخارجي", href: "/category/furniture/outdoor" },
    ],
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const CategoryMenu = ({
  categories = defaultCategories,
  language = "en",
}: CategoryMenuProps) => {
  const displayCategories =
    language === "ar" ? defaultArabicCategories : categories;
  const isRtl = language === "ar";
  const navigate = useNavigate();

  const handleCategoryClick = (href: string) => {
    navigate(href);
  };

  const handleSubcategoryClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <div className={`w-full bg-background ${isRtl ? "rtl" : "ltr"}`}>
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="flex flex-row space-x-6">
          {displayCategories.map((category) => (
            <NavigationMenuItem key={category.href}>
              <NavigationMenuTrigger
                className="text-base cursor-pointer px-2"
                onClick={() => handleCategoryClick(category.href)}
              >
                {category.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {category.subcategories?.map((subcategory) => (
                    <ListItem
                      key={subcategory.href}
                      title={subcategory.name}
                      href={subcategory.href}
                      onClick={(e) =>
                        handleSubcategoryClick(subcategory.href, e)
                      }
                    >
                      {subcategory.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default CategoryMenu;
