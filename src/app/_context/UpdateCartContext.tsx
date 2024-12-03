"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

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
  useEffect(() => {
    const storedUpdateCart = localStorage.getItem("updateCart");
    if (storedUpdateCart) {
      setUpdateCart(parseInt(storedUpdateCart, 10));
    }
  }, []);

  // Method to increment cart update counter
  const incrementCart = () => {
    const newUpdateCount = updateCart + 1;
    setUpdateCart(newUpdateCount);
  };
  // Method to decrement cart update counter
  const decrementCart = () => {
    const newUpdateCount = updateCart - 1;
    setUpdateCart(newUpdateCount);
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
