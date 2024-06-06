import "../src/scss/main.scss";
import { ProductController } from "./MVC/controller";
import { ProductModel } from "./MVC/model";
import { ProductView } from "./MVC/view";

const controller = new ProductController(new ProductModel(), new ProductView());
