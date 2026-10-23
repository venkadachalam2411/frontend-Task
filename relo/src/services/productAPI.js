
const API_URL =
  "https://api.escuelajs.co/api/v1/products?offset=0&limit=40";

export const fetchProductsAPI = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data;
};

export const fetchProductByIdAPI = async (id) => {
  const response = await fetch(
    `https://api.escuelajs.co/api/v1/products/${id}`
  );

  if (!response.ok) {
    throw new Error("Product not found");
  }

  return await response.json();
};
