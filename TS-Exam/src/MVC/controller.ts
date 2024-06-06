import { ProductModel } from "./model";
import { ProductView } from "./view";

export class ProductController {
  model: ProductModel;
  view: ProductView;

  constructor(model: ProductModel, view: ProductView) {
    this.model = model;
    this.view = view;

    this.view.bindGetProductsByType(this.getProductsByType.bind(this));
    this.view.bindFilterProductsBy(this.filterProductsBy.bind(this));

    this.initialize();
  }

  private async initialize() {
    await this.model.initializeProducts();
    await this.view.writeElementsToSubscribeSection(this.model.products);
  }

  private async getProductsByType(type: string): Promise<void> {
    const filteredProducts = await this.model.getProductsByType(type);
    await this.view.writeElementsToSubscribeSection(filteredProducts);
  }

  private async filterProductsBy(filterParam: string): Promise<void> {
    const filteredProducts = this.model.filterProductsBy(filterParam);
    await this.view.writeElementsToSubscribeSection(filteredProducts);
  }
}
