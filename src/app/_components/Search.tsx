<<<<<<< Updated upstream
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useAddToCart, useSearchProducts } from "../_utils/tanstackQuery";
import { useUpdateCart } from "../_context/UpdateCartContext";
import { CartData, Product } from "@/lib/type";
import { toast } from "sonner";
import ProductItemDetail from "./ProductItemDetail";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
=======
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUpdateCart } from "../_context/UpdateCartContext";
import { useAddToCart, useSearchProducts } from "../_utils/tanstackQuery";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import { CartData } from "@/lib/type";
>>>>>>> Stashed changes

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const {
    data: results = [],
    isLoading,
    isError,
    error,
  } = useSearchProducts(searchQuery);

  const { incrementCart } = useUpdateCart();
  const { mutate: addToCartMutation, isPending } = useAddToCart();

  const onAddToCart = (data: CartData, jwt: string) => {
    addToCartMutation(
      { data, jwt },
      {
        onSuccess: () => {
<<<<<<< Updated upstream
          toast.success(`Added to cart sucessfuly`);
=======
          toast.success(`Added to cart successfully`);
>>>>>>> Stashed changes
          incrementCart();
        },
        onError: (error: unknown) => {
          if (error instanceof Error) {
            toast.error(error.message || "Failed to add item to cart");
          } else if (typeof error === "string") {
            toast.error(error);
          } else {
            toast.error("Failed to add item to cart");
          }
        },
      }
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
<<<<<<< Updated upstream
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  // Handle clicks outside of the search container
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        !dialogIsOpen
      ) {
        setIsSearchFocused(false);
=======
      setIsSearchFocused(false);
      if (searchInputRef.current) {
        searchInputRef.current.blur();
>>>>>>> Stashed changes
      }
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchFocused(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target as Node)
    ) {
      setIsSearchFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const shouldShowResults = isSearchFocused && searchQuery.trim().length > 0;

  return (
    <div className="w-full relative" ref={searchContainerRef}>
      <SearchInput
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchFocus={() => setIsSearchFocused(true)}
        onClearSearch={clearSearch}
        onSubmit={handleSearch}
        isSearchFocused={isSearchFocused}
        inputRef={searchInputRef}
      />

      {shouldShowResults && (
<<<<<<< Updated upstream
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
                <Dialog
                  key={product.id}
                  onOpenChange={(isOpen) => setDialogIsOpen(isOpen)}
                >
                  <DialogTrigger asChild>
                    <div className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200">
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
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="sr-only">
                        {product.name}
                      </DialogTitle>
                      <DialogDescription className="sr-only">
                        {/* Description */}
                      </DialogDescription>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">
                        <ProductItemDetail
                          product={product}
                          isPending={isPending}
                          onAddToCart={onAddToCart}
                        />
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ))}
          </CardContent>
        </Card>
=======
        <SearchResults
          results={results}
          isLoading={isLoading}
          isError={isError}
          error={error}
          searchQuery={searchQuery}
          onAddToCart={onAddToCart}
          isPending={isPending}
        />
>>>>>>> Stashed changes
      )}
    </div>
  );
};

export default Search;
