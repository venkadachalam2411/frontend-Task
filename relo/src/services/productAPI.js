const API_URL = "https://dummyjson.com/c/1a1a-ba82-4210-b7eb";

export const fetchProductsAPI = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data.products;
};

export const fetchProductByIdAPI = async (id) => {
  const products = await fetchProductsAPI();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};