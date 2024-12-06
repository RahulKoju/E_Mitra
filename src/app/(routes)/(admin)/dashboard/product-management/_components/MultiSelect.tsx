import React, { useState, useRef, useEffect } from "react";
import { XIcon, ChevronDownIcon } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const removeOption = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  const selectedLabels = value.map(
    (v) => options.find((opt) => opt.value === v)?.label
  );

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-wrap gap-2 items-center min-h-[40px] w-full border rounded-md px-3 py-2 cursor-pointer hover:border-gray-400"
      >
        {value.length === 0 ? (
          <span className="text-gray-500">{placeholder}</span>
        ) : (
          selectedLabels.map((label, index) => (
            <div
              key={index}
              className="flex items-center bg-green-100 text-green-800 rounded px-2 py-1 text-sm"
            >
              {label}
              <XIcon
                className="ml-2 h-4 w-4 cursor-pointer hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  removeOption(value[index]);
                }}
              />
            </div>
          ))
        )}
        <ChevronDownIcon className="ml-auto h-4 w-4 text-gray-500" />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={(e) => {
                e.stopPropagation(); // Prevent dropdown from closing
                toggleOption(option.value);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center ${
                value.includes(option.value) ? "bg-green-50" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                readOnly
                className="mr-2 cursor-pointer"
              />
              <span className="flex-grow">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultiSelect;
