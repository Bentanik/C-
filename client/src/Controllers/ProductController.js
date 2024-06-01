import * as services from "~/Services";

export const getProducts = async () => {
  try {
    const res = await services.getProducts();
    return res;
  } catch (err) {
    return err;
  }
};

export const createProduct = async (brand, category, form) => {
  try {
    const res = await services.createProduct(brand, category, form);
    return res;
  } catch (err) {
    return err;
  }
};

export const editProduct = async (brandId, categoryId, form) => {
  try {
    const res = await services.editProduct(brandId, categoryId, form);
    return res;
  } catch (err) {
    return err;
  }
};

export const removeProduct = async (form) => {
  try {
    const res = await services.removeProduct(form);
    return res;
  } catch (err) {
    return err;
  }
};
