import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
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

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Search for dishes..."
            className={`
              w-full px-4 py-2 pl-10 pr-10
              rounded-lg border border-gray-300
              bg-white
              focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20
              transition-all duration-300
              ${isSearchFocused ? "shadow-lg" : ""}
              md:max-w-md md:py-1.5 md:pl-8 md:pr-8 // Adjusted width for desktop
            `}
          />

          <SearchIcon
            className={`
              absolute left-3 top-1/2 transform -translate-y-1/2
              text-gray-400 h-4 w-4
              transition-colors duration-300
              ${isSearchFocused ? "text-green-500" : ""}
              md:h-4 md:w-4
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
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Search;
