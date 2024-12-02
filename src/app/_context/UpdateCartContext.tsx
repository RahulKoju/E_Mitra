import { createContext, Dispatch, SetStateAction, useContext } from "react";

// Context type definition
type UpdateCartContextType = {
  updateCart: number; // Change to number for more granular updates
  setUpdateCart: Dispatch<SetStateAction<number>>;
};

// Create a default context value that matches the type
const defaultContextValue: UpdateCartContextType = {
  updateCart: 0,
  setUpdateCart: () => {},
};

// Create the context with a non-null default value
export const UpdateCartContext =
  createContext<UpdateCartContextType>(defaultContextValue);

// Optional: Create a custom hook for easier context usage
export const useUpdateCartContext = () => {
  const context = useContext(UpdateCartContext);

  // Optional: Add a runtime check if you want to ensure the context is used within a provider
  if (context === defaultContextValue) {
    throw new Error(
      "useUpdateCartContext must be used within an UpdateCartProvider"
    );
  }

  return context;
};
