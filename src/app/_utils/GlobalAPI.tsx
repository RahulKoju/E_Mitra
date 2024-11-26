import axios from "axios";
import { string } from "zod";

type CartData = {
  data: {
    quantity: number;
    amount: number;
    products: string;
    users_permissions_user: number;
    userId: number;
  };
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

const getUserCartItems = (userId: number, jwt: string) =>
  axiosClient
    .get(`/user-carts?filters[userId][$eq]=${userId}&populate=*`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => {
      return res.data.data;
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
};
