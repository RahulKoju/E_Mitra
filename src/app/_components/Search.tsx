import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => {
        const inputElement = document.getElementById("search-input");
        inputElement?.focus();
      }, 100);
    }
  };

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchExpanded(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="flex-1 max-w-xl px-4 relative">
      {/* Mobile search trigger */}
      <button
        onClick={toggleSearch}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
      >
        <SearchIcon className="h-5 w-5 text-gray-600" />
      </button>

      {/* Search form */}
      <form
        onSubmit={handleSearch}
        className={`
          absolute md:relative left-0 right-0 z-50
          transition-all duration-300 ease-in-out
          ${
            isSearchExpanded
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none md:scale-100 md:opacity-100 md:pointer-events-auto"
          }
        `}
      >
        <div className="relative">
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            placeholder="Search for dishes..."
            className={`
              w-full px-4 py-2 pl-10 pr-10
              rounded-lg border border-gray-300
              bg-white md:bg-gray-50
              focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20
              transition-all duration-300
              ${isSearchFocused ? "md:shadow-lg md:bg-white" : ""}
            `}
          />

          <SearchIcon
            className={`
            absolute left-3 top-1/2 transform -translate-y-1/2
            text-gray-400 h-5 w-5
            transition-colors duration-300
            ${isSearchFocused ? "text-green-500" : ""}
          `}
          />

          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 
                text-gray-400 hover:text-gray-600
                transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Mobile close button */}
        {isSearchExpanded && (
          <button
            onClick={() => setIsSearchExpanded(false)}
            className="md:hidden absolute right-3 -bottom-12 
              px-4 py-2 text-sm text-gray-600
              bg-white rounded-md shadow-lg
              hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        )}
      </form>

      {/* Overlay for mobile */}
      {isSearchExpanded && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSearchExpanded(false)}
        />
      )}
    </div>
  );
};

export default Search;
