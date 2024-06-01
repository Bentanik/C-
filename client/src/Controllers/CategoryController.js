import * as services from "~/Services";

export const getCategories = async () => {
  try {
    const res = await services.getCategories();
    return res;
  } catch (err) {
    return err;
  }
};

export const createCategory = async (form) => {
  try {
    const res = await services.createCategory(form);
    return res;
  } catch (err) {
    return err;
  }
};

export const editCategory = async (form) => {
  try {
    const res = await services.editCategory(form);
    return res;
  } catch (err) {
    return err;
  }
};

export const removeCategory = async (form) => {
  try {
    const res = await services.removeCategory(form);
    return res;
  } catch (err) {
    return err;
  }
};
