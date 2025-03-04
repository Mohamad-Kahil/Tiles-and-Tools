import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onSelectResult?: (result: SearchResult) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({
  onSearch = () => {},
  onSelectResult = () => {},
  placeholder = "Search for products...",
  className = "",
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock search results - in a real app, this would come from an API call
  useEffect(() => {
    if (query.length > 1) {
      // Simulate API call with mock data
      const mockResults: SearchResult[] = [
        {
          id: "1",
          name: "Marble Flooring Tile",
          image:
            "https://images.unsplash.com/photo-1581430872221-d2a064b92e17?w=200&q=80",
          price: 299.99,
          category: "Flooring",
        },
        {
          id: "2",
          name: "Modern Wall Paint",
          image:
            "https://images.unsplash.com/photo-1562184552-997c461abbe6?w=200&q=80",
          price: 49.99,
          category: "Wall Products",
        },
        {
          id: "3",
          name: "Pendant Light Fixture",
          image:
            "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=200&q=80",
          price: 129.99,
          category: "Lighting",
        },
      ].filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      );

      setResults(mockResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const handleResultClick = (result: SearchResult) => {
    onSelectResult(result);
    setQuery(result.name);
    setIsOpen(false);
  };

  return (
    <div
      ref={searchRef}
      className={cn("relative w-full max-w-md bg-background", className)}
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="pl-10 pr-10 w-full"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full w-9 p-0"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-80 overflow-auto">
          <ul className="py-1">
            {results.map((result) => (
              <li
                key={result.id}
                className="px-4 py-2 hover:bg-accent cursor-pointer flex items-center gap-3"
                onClick={() => handleResultClick(result)}
              >
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{result.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {result.category} •{" "}
                    {result.price.toLocaleString("en-EG", {
                      style: "currency",
                      currency: "EGP",
                    })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && query.length > 1 && results.length === 0 && (
        <div className="absolute top-full left-0 z-10 w-full mt-1 bg-background border rounded-md shadow-lg p-4 text-center">
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
