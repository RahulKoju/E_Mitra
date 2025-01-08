import axios from "axios";

import {
  Product,
  Category,
  CartItemViewModel,
  MyOrder,
  Order,
  CartData,
  OrderPayload,
  ProductPayload,
  CartItemResponse,
  MyOrderResponse,
} from "@/lib/type";

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
});

const getCategory = () => axiosClient.get("/categories");

const getCategoryList = () =>
  axiosClient.get("/categories").then((res) => {
    return res.data.data;
  });

const getSlider = () =>
  axiosClient.get("/sliders?populate=*").then((res) => {
    return res.data.data;
  });

const getAllProducts = () =>
  axiosClient.get("/products?populate=*").then((res) => {
    return res.data.data;
  });

const getProductsByCategory = (category: string) =>
  axiosClient
    .get(`/products?filters[categories][slug][$in]=${category}&populate=*`)
    .then((res) => {
      return res.data.data;
    });

const registerUser = (username: string, email: string, password: string) =>
  axiosClient.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });

const loginUser = (email: string, password: string) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password: password,
  });

const addToCart = (data: CartData, jwt: string) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

const getUserCartItems = (
  userId: number,
  jwt: string
): Promise<CartItemViewModel[]> =>
  axiosClient
    .get<{ data: CartItemResponse[] }>(
      `/user-carts?filters[userId][$eq]=${userId}&populate[products][populate]=images`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((res) => {
      const data = res.data.data;
      return data.map(
        (item): CartItemViewModel => ({
          name: item.products[0].name,
          quantity: item.quantity,
          amount: item.amount,
          image: item.products[0].images[0]?.url || "",
          actualPrice: item.products[0].price,
          id: item.documentId,
          product: item.products[0].documentId,
        })
      );
    });

const deleteCartItem = (id: string, jwt: string | null) => {
  if (!jwt) {
    return Promise.reject(new Error("No JWT token available"));
  }
  return axiosClient.delete(`/user-carts/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

const createOrder = (data: OrderPayload, jwt: string) =>
  axiosClient.post("/orders", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

const getMyOrders = (userId: number, jwt: string): Promise<MyOrder[]> =>
  axiosClient
    .get<{ data: MyOrderResponse[] }>(
      `/orders?filters[userId][$eq]=${userId}&populate[orderItemList][populate][product][populate]=images`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((res) => {
      const data = res.data.data;
      const orderList = data.map(
        (item): MyOrder => ({
          id: item.documentId,
          totalOrderAmount: item.totalOrderAmount,
          createdAt: item.createdAt,
          orderItemList: item.orderItemList,
          orderStatus: item.orderStatus,
        })
      );
      return orderList;
    });

const getAllOrders = (jwt: string): Promise<Order[]> =>
  axiosClient
    .get<{ data: Order[] }>(
      "/orders?populate[orderItemList][populate][product][populate]=images",
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((res) => res.data.data);

const deleteProduct = (productId: string, jwt: string | null) =>
  axiosClient.delete(`/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

const createProduct = (data: ProductPayload, jwt: string | null) =>
  axiosClient.post("/products", data, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

const updateProduct = (
  productId: string,
  data: ProductPayload,
  jwt: string | null
) =>
  axiosClient.put(`/products/${productId}`, data, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

const uploadImage = async (file: File[], jwt: string | null) => {
  const formData = new FormData();
  formData.append("files", file[0]);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

const fetchSearchProducts = async (searchQuery: string): Promise<Product[]> => {
<<<<<<< Updated upstream
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/products?filters[$or][0][name][$containsi]=${searchQuery}&filters[$or][1][description][$containsi]=${searchQuery}&populate=images`
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Failed to fetch results");
  }
=======
  if (!searchQuery.trim()) {
    return [];
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/products?filters[$or][0][name][$containsi]=${searchQuery}&filters[$or][1][description][$containsi]=${searchQuery}&filters[$or][2][categories][name][$containsi]=${searchQuery}&populate[0]=images&populate[1]=categories`
    );
>>>>>>> Stashed changes

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData?.error?.message ||
          errorData?.message ||
          "Failed to fetch results"
      );
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};

export default {
  getCategory,
  getCategoryList,
  getSlider,
  getAllProducts,
  getProductsByCategory,
  registerUser,
  loginUser,
  addToCart,
  getUserCartItems,
  deleteCartItem,
  createOrder,
  getMyOrders,
  getAllOrders,
  deleteProduct,
  createProduct,
  updateProduct,
  uploadImage,
  fetchSearchProducts,
};
