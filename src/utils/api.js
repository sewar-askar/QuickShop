import axios from "axios";

export const fetchProducts = async (params) => {
  const response = await axios.get("https://fakestoreapi.com/products", {
    params,
  });
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return response.data;
};
