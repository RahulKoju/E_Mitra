import React from "react";
import { SearchIcon, X } from "lucide-react";

interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchFocus: () => void;
  onClearSearch: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSearchFocused: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

const SearchInput = ({
  searchQuery,
  onSearchChange,
  onSearchFocus,
  onClearSearch,
  onSubmit,
  isSearchFocused,
  inputRef,
}: SearchInputProps) => {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="relative">
        <input
          id="search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={onSearchFocus}
          placeholder="Search products by name, description..."
          className="w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-gray-300
            bg-white focus:outline-none focus:border-green-500 focus:ring-2 
            focus:ring-green-500/20 transition-all duration-300"
          aria-label="Search products"
          ref={inputRef}
        />

        <SearchIcon
          className={`absolute left-3 top-1/2 transform -translate-y-1/2
            text-gray-400 h-4 w-4 transition-colors duration-300
            ${isSearchFocused ? "text-green-500" : ""}
            md:h-4 md:w-4`}
          aria-hidden="true"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={onClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 
              text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchInput;
