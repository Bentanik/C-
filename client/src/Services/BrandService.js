import axiosInstance from "~/Configs/axios";

export const getBrands = () => {
  return axiosInstance.get("/Brand");
};

export const createBrand = (form) => {
  return axiosInstance.post("/Brand/createbrand", form);
};

export const editBrand = (form) => {
  return axiosInstance.put("/Brand/updatebrandbyid", form);
};

export const removeBrand = (form) => {
  return axiosInstance.delete(`/Brand/removebrandbyid?id=${form?.id}`);
};
