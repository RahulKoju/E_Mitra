"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import { useLoginUser, useRegisterUser } from "../_utils/tanstackQuery";

type User = {
  id: number;
  username?: string;
  email?: string;
  admin: boolean;
};

type AuthContextType = {
  user: User | null;
  jwt: string | null;
  isLoggedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const loginMutation = useLoginUser();
  const registerMutation = useRegisterUser();

  // Load initial auth state from session storage
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userString = sessionStorage.getItem("user");

    if (token) {
      setIsLoggedIn(true);
      setJwt(token);
    }

    if (userString) {
      try {
        const parsedUser = JSON.parse(userString);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data", error);
      }
    }
  }, []);

  // Sign In method
  const signIn = async (email: string, password: string) => {
    try {
      const res = await loginMutation.mutateAsync({ email, password });
      const userData = res.data.user;
      const token = res.data.jwt;

      setUser(userData);
      setJwt(token);
      setIsLoggedIn(true);

      sessionStorage.setItem("user", JSON.stringify(userData));
      sessionStorage.setItem("token", token);

      toast.success("Successfully signed in!");
      router.push("/");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error?.message ||
        "An error occurred while signing in to your account. Please try again.";
      toast.error(errorMessage);
      throw error;
    }
  };

  // Sign Up method
  const signUp = async (username: string, email: string, password: string) => {
    try {
      const res = await registerMutation.mutateAsync({
        username,
        email,
        password,
      });
      const userData = res.data.user;
      const token = res.data.jwt;

      setUser(userData);
      setJwt(token);
      setIsLoggedIn(true);

      sessionStorage.setItem("user", JSON.stringify(userData));
      sessionStorage.setItem("token", token);

      toast.success("Welcome! Your account has been created successfully.");
      router.push("/");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error?.message ||
        "An error occurred while creating your account. Please try again.";
      toast.error(errorMessage);
      throw error;
    }
  };

  // Logout method to clear user data
  const logout = () => {
    setUser(null);
    setJwt(null);
    setIsLoggedIn(false);
    sessionStorage.clear();

    toast.success("Successfully logged out!");
  };

  // Context value
  const contextValue = {
    user,
    jwt,
    isLoggedIn,
    signIn,
    signUp,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
