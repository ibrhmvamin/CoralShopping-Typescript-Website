import { Product } from "./../ts/types/product";

export class ProductView {
  public app: HTMLDivElement;
  public getProductsByType: (type: string) => Promise<void>;
  public filterProductsBy: (filterParam: string) => Promise<void>;

  constructor() {
    this.getProductsByType = async () => {};
    this.filterProductsBy = async () => {};
    this.addEventsToSubscribeSection();
    this.app = document.querySelector("#app") as HTMLDivElement;
  }

  public async writeElementsToSubscribeSection(
    products: Product[]
  ): Promise<void> {
    const subscribeList: HTMLElement = document.querySelector(
      ".subscribe__products"
    ) as HTMLElement;
    subscribeList.innerHTML = "";
    products.forEach((product) => {
      const item: string = `
        <li class='product'>
          <img class='product__image' src='${product.imgPath}' alt='${product.name}'>
          <h4 class='product__fullname'>${product.name}</h4>
          <div class='product__type-price'>
            <p class='product__type'>${product.type}</p>
            <p class='product__price'>${product.price}</p>
          </div>
        </li>
      `;
      subscribeList.insertAdjacentHTML("beforeend", item);
    });
  }

  public bindGetProductsByType(handler: (type: string) => Promise<void>): void {
    this.getProductsByType = handler;
  }

  public bindFilterProductsBy(
    handler: (filterParam: string) => Promise<void>
  ): void {
    this.filterProductsBy = handler;
  }

  private addEventsToSubscribeSection(): void {
    const list: HTMLUListElement = document.querySelector(
      ".subscribe__links"
    ) as HTMLUListElement;
    const links = Array.from(list.querySelectorAll("li a"));
    links.forEach((link) => {
      link.addEventListener("click", async (e) => {
        e.preventDefault();
        const element = link as HTMLAnchorElement;
        await this.getProductsByType(element.textContent as string);
      });
    });

    const filterButton: HTMLSelectElement = document.querySelector(
      ".subscribe__filter"
    ) as HTMLSelectElement;
    filterButton.addEventListener("change", async (e) => {
      const select: HTMLSelectElement = e.currentTarget as HTMLSelectElement;
      const selectedItemText: string =
        select.options[select.selectedIndex].textContent?.toLowerCase() ?? "";
      await this.filterProductsBy(selectedItemText);
    });
  }
}
