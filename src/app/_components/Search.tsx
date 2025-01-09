import { CartData } from "@/lib/type";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useUpdateCart } from "../_context/UpdateCartContext";
import { useAddToCart, useSearchProducts } from "../_utils/tanstackQuery";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
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
    if (!jwt) {
      toast.error("You must be logged in to add items to the cart");
      return;
    }

    addToCartMutation(
      { data, jwt },
      {
        onSuccess: () => {
          toast.success(`Added to cart successfully`);
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
      setIsSearchFocused(false);

      // Blur the search input to remove focus
      if (searchInputRef.current) {
        searchInputRef.current.blur();
      }
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setDialogIsOpen(false);
    setIsSearchFocused(false);
  };

  // Handle clicks outside of the search container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        !dialogIsOpen
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dialogIsOpen]);

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
        <SearchResults
          results={results}
          isLoading={isLoading}
          isError={isError}
          error={error}
          searchQuery={searchQuery}
          onAddToCart={onAddToCart}
          isPending={isPending}
          setDialogIsOpen={setDialogIsOpen}
        />
      )}
    </div>
  );
};

export default Search;
