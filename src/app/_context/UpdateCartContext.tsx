"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

type UpdateCartContextType = {
  updateCart: number;
  incrementCart: () => void;
  decrementCart: () => void;
  resetCart: () => void;
};

const UpdateCartContext = createContext<UpdateCartContextType | undefined>(
  undefined
);

export const UpdateCartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [updateCart, setUpdateCart] = useState(0);

  // Method to increment cart update counter
  const incrementCart = () => {
    setUpdateCart((prev) => prev + 1);
  };

  // Method to decrement cart update counter and prevents negative values
  const decrementCart = () => {
    setUpdateCart((prev) => Math.max(0, prev - 1));
  };

  // Method to reset cart update counter
  const resetCart = () => {
    setUpdateCart(0);
  };

  // Context value
  const contextValue = {
    updateCart,
    incrementCart,
    decrementCart,
    resetCart,
  };

  return (
    <UpdateCartContext.Provider value={contextValue}>
      {children}
    </UpdateCartContext.Provider>
  );
};

export const useUpdateCart = () => {
  const context = useContext(UpdateCartContext);
  if (context === undefined) {
    throw new Error("useUpdateCart must be used within an UpdateCartProvider");
  }

  return context;
};
