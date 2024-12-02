import axios from "axios";

type CartData = {
  data: {
    quantity: number;
    amount: number;
    products: string;
    users_permissions_user: number;
    userId: number;
  };
};

type ProductImage = {
  url: string;
};

type Product = {
  id: number;
  documentId: string;
  name: string;
  price: number;
  images: ProductImage[];
};

type CartItemResponse = {
  id: number;
  documentId: string;
  quantity: number;
  amount: number;
  products: Product[];
};

type CartItemViewModel = {
  name: string;
  quantity: number;
  amount: number;
  image: string;
  actualPrice: number;
  id: string;
  product: string;
};

type OrderItem = {
  amount: number;
  quantity: number;
  product: string;
};

type OrderPayload = {
  data: {
    username: string;
    email: string;
    address: string;
    phone_no: number;
    totalOrderAmount: number;
    userId: number;
    orderItemList: OrderItem[];
  };
};

type OrderItemDetails = {
  id: number;
  quantity: number;
  amount: number;
  product: Product;
};

type MyOrder = {
  id: string;
  totalOrderAmount: number;
  createdAt: string;
  orderItemList: OrderItemDetails[];
};

type MyOrderResponse = {
  documentId: string;
  totalOrderAmount: number;
  createdAt: string;
  orderItemList: OrderItemDetails[];
};

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
        })
      );
      return orderList;
    });

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
};
