import axios from "axios";

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

export default {
  getCategory,
  getCategoryList,
  getSlider,
  getAllProducts,
  getProductsByCategory,
};
