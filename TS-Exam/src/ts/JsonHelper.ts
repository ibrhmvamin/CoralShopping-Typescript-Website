import axios from "axios";
import { Product } from "./types/product.ts";

export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await axios.get("http://localhost:3000/all-products");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

export async function getProductsByTypeRequest(
  type: string
): Promise<Product[]> {
  const response = await axios.get("http://localhost:3000/all-products");
  return response.data.filter(
    (product: Product) =>
      product.type.toLocaleLowerCase() == type.toLocaleLowerCase()
  );
}
