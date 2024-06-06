import { Product } from "./../ts/types/product";
import { getAllProducts, getProductsByTypeRequest } from "../ts/JsonHelper.ts";

export class ProductModel {
  public products: Product[] = [];

  constructor() {
    this.initializeProducts();
  }

  public async initializeProducts() {
    try {
      const products = await getAllProducts();
      this.products = products;
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  public async getProductsByType(type: string): Promise<Product[]> {
    try {
      if (type.trim() === "All Products") {
        this.products = await getAllProducts();
      } else {
        this.products = await getProductsByTypeRequest(type);
      }
    } catch (error) {
      console.error(`Failed to fetch products by type: ${type}`, error);
    }
    return this.products;
  }

  public filterProductsBy(filterParam: string): Product[] {
    const sortedProducts = [...this.products];
    sortedProducts.forEach((sorted) => {
      sorted.price.replace("$", "");
    });
    if (filterParam === "price") {
      sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (filterParam === "fullname") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sortedProducts;
  }
}
