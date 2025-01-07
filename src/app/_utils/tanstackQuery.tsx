import {
  Product,
  Category,
  CartItemViewModel,
  MyOrder,
  Order,
  CartData,
  OrderPayload,
  ProductPayload,
  SliderItem,
} from "@/lib/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import GlobalAPI from "./GlobalAPI";
import { useEffect, useState } from "react";

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: GlobalAPI.getCategoryList,
  });
};

export const useSliders = () => {
  return useQuery<SliderItem[]>({
    queryKey: ["sliders"],
    queryFn: GlobalAPI.getSlider,
  });
};

export const useAllProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: GlobalAPI.getAllProducts,
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: () => GlobalAPI.getProductsByCategory(category),
    enabled: !!category,
  });
};

export const useSearchProducts = (searchQuery: string, debounceMs = 800) => {
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [searchQuery, debounceMs]);
  return useQuery<Product[]>({
    queryKey: ["searchProducts", debouncedSearchQuery],
    queryFn: () => GlobalAPI.fetchSearchProducts(debouncedSearchQuery),
    enabled: !!debouncedSearchQuery.trim(),
  });
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      username: string;
      email: string;
      password: string;
    }) =>
      GlobalAPI.registerUser(params.username, params.email, params.password),
    onSuccess: (data) => {
      // Invalidate or update relevant queries
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { email: string; password: string }) =>
      GlobalAPI.loginUser(params.email, params.password),
    onSuccess: (data) => {
      // Store JWT or update user state
      queryClient.setQueryData(["user"], data);
    },
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { data: CartData; jwt: string }) =>
      GlobalAPI.addToCart(params.data, params.jwt),
    onSuccess: (_, variables) => {
      // Invalidate cart items query
      queryClient.invalidateQueries({
        queryKey: ["cartItems", variables.data.data.userId],
      });
    },
  });
};

export const useUserCartItems = (userId: number | null, jwt: string | null) => {
  return useQuery<CartItemViewModel[]>({
    queryKey: ["cartItems", userId],
    queryFn: () => {
      if (!userId || !jwt) return Promise.resolve([]);
      return GlobalAPI.getUserCartItems(userId, jwt);
    },
    enabled: !!userId && !!jwt,
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: string; jwt: string | null }) =>
      GlobalAPI.deleteCartItem(params.id, params.jwt),
    onSuccess: (_, variables) => {
      // Invalidate cart items query
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { data: OrderPayload; jwt: string }) =>
      GlobalAPI.createOrder(params.data, params.jwt),
    onSuccess: (_, variables) => {
      // Invalidate orders and cart queries
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });
};

export const useMyOrders = (userId: number | null, jwt: string | null) => {
  return useQuery<MyOrder[]>({
    queryKey: ["myOrders", userId],
    queryFn: () => {
      if (!userId || !jwt) return Promise.resolve([]);
      return GlobalAPI.getMyOrders(userId, jwt);
    },
    enabled: !!userId && !!jwt,
  });
};

export const useAllOrders = (jwt: string | null) => {
  return useQuery<Order[]>({
    queryKey: ["allOrders"],
    queryFn: () => {
      if (!jwt) return Promise.resolve([]);
      return GlobalAPI.getAllOrders(jwt);
    },
    enabled: !!jwt,
  });
};

export const useProductManagement = () => {
  const queryClient = useQueryClient();

  const deleteProduct = useMutation({
    mutationFn: (params: { productId: string; jwt: string | null }) =>
      GlobalAPI.deleteProduct(params.productId, params.jwt),
    onSuccess: () => {
      // Invalidate products query
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const createProduct = useMutation({
    mutationFn: (params: { data: ProductPayload; jwt: string | null }) =>
      GlobalAPI.createProduct(params.data, params.jwt),
    onSuccess: () => {
      // Invalidate products query
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProduct = useMutation({
    mutationFn: (params: {
      productId: string;
      data: ProductPayload;
      jwt: string | null;
    }) => GlobalAPI.updateProduct(params.productId, params.data, params.jwt),
    onSuccess: () => {
      // Invalidate products query
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const uploadImage = useMutation({
    mutationFn: (params: { file: File[]; jwt: string | null }) =>
      GlobalAPI.uploadImage(params.file, params.jwt),
  });

  return {
    deleteProduct,
    createProduct,
    updateProduct,
    uploadImage,
  };
};
