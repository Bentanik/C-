import axiosInstance from "~/Configs/axios";

export const getCategories = () => {
  return axiosInstance.get("/Category");
};

export const createCategory = (form) => {
  return axiosInstance.post("/Category/createcategory", form);
};

export const editCategory = (form) => {
  return axiosInstance.put("/Category/updatecategorybyid", form);
};

export const removeCategory = (form) => {
  return axiosInstance.delete(`/Category/removecategorybyid?id=${form?.id}`);
};
