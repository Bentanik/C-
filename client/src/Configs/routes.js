import LayoutHome from "~/Pages/LayoutHome";
import Home from "~/Pages/Home";
import Product from "~/Pages/Product";
import Category from "~/Pages/Category";
import Brand from "~/Pages/Brand";

export const public_routes = [
  {
    path: "/",
    component: Home,
    layout: LayoutHome,
  },
  {
    path: "/product",
    component: Product,
    layout: LayoutHome,
  },
  {
    path: "/category",
    component: Category,
    layout: LayoutHome,
  },
  {
    path: "/brand",
    component: Brand,
    layout: LayoutHome,
  },
];
