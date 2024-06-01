import axiosInstance from "~/Configs/axios";

export const getProducts = () => {
  return axiosInstance.get("/Product");
};

export const createProduct = (brand, category, form) => {
  return axiosInstance.post(
    `/Product/createproduct?brandId=${brand}&categoryId=${category}`,
    form
  );
};

export const editProduct = (brandId, categoryId, form) => {
  return axiosInstance.put(
    `/Product/updateproduct?brandId=${brandId}&categoryId=${categoryId}`,
    form
  );
};

export const removeProduct = (form) => {
  return axiosInstance.delete(`/Product/removeproductbyid?id=${form?.id}`);
};
