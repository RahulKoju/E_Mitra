import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useSearchProducts } from "../_utils/tanstackQuery";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const {
    data: results = [],
    isLoading,
    isError,
    error,
  } = useSearchProducts(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleResultClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  // Handle clicks outside of the search container
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const shouldShowResults = isSearchFocused && searchQuery.trim().length > 0;

  return (
    <div className="w-full relative" ref={searchContainerRef}>
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Search products by name, category..."
            className="w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-gray-300
              bg-white focus:outline-none focus:border-green-500 focus:ring-2 
              focus:ring-green-500/20 transition-all duration-300
              md:max-w-md md:py-1.5 md:pl-8 md:pr-8"
          />

          <SearchIcon
            className={`absolute left-3 top-1/2 transform -translate-y-1/2
              text-gray-400 h-4 w-4 transition-colors duration-300
              ${isSearchFocused ? "text-green-500" : ""}
              md:h-4 md:w-4`}
          />

          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 
                text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {shouldShowResults && (
        <Card className="absolute w-full mt-2 z-50 max-h-96 overflow-y-auto shadow-lg transition-opacity duration-200">
          <CardContent className="p-2">
            {isLoading && (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isError && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error instanceof Error
                    ? error.message
                    : "Failed to fetch results"}
                </AlertDescription>
              </Alert>
            )}

            {!isLoading && !error && results.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No products found matching "{searchQuery}"
              </div>
            )}

            {!isLoading &&
              !error &&
              results.map((product) => (
                <div
                  key={product.id}
                  className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200"
                  onClick={() => handleResultClick(product.id)}
                >
                  <div className="flex items-center space-x-4">
                    {product.images && (
                      <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.images[0].url}`}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{product.name}</h3>
                        <span className="text-green-600 font-medium">
                          Rs.{product.price}
                        </span>
                      </div>
                      {/* {product.category?.data && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          {product.category.data.name}
                        </Badge>
                      )} */}
                      <p className="text-sm text-gray-500 mt-1">
                        {product.description?.substring(0, 60)}...
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Search;
