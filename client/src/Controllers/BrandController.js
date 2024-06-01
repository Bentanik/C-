import * as services from "~/Services";

export const getBrands = async () => {
  try {
    const res = await services.getBrands();
    return res;
  } catch (err) {
    return err;
  }
};

export const createBrand = async (form) => {
  try {
    const res = await services.createBrand(form);
    return res;
  } catch (err) {
    return err;
  }
};

export const editBrand = async (form) => {
  try {
    const res = await services.editBrand(form);
    return res;
  } catch (err) {
    return err;
  }
};

export const removeBrand = async (form) => {
  try {
    const res = await services.removeBrand(form);
    return res;
  } catch (err) {
    return err;
  }
};
