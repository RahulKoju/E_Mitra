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
  disabled: boolean;
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled,
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
    if (disabled) return; // Prevent changes when disabled

    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];

    onChange(newValue);
  };

  const removeOption = (optionValue: string) => {
    if (disabled) return; // Prevent changes when disabled

    onChange(value.filter((v) => v !== optionValue));
  };

  const selectedLabels = value.map(
    (v) => options.find((opt) => opt.value === v)?.label
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex flex-wrap gap-2 items-center min-h-[40px] w-full border rounded-md px-3 py-2 
          ${
            disabled
              ? "bg-gray-100 cursor-not-allowed"
              : "cursor-pointer hover:border-gray-400"
          }`}
      >
        {value.length === 0 ? (
          <span className={disabled ? "text-gray-500" : ""}>{placeholder}</span>
        ) : (
          selectedLabels.map((label, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-200 rounded px-2 py-1 m-1"
            >
              {label}
              {!disabled && (
                <XIcon
                  className="ml-2 h-4 w-4 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(value[index]);
                  }}
                />
              )}
            </div>
          ))
        )}

        {!disabled && (
          <ChevronDownIcon
            className={`ml-auto h-4 w-4 ${isOpen ? "rotate-180" : ""}`}
          />
        )}
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 border rounded shadow-lg bg-white max-h-60 overflow-y-auto">
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
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultiSelect;
