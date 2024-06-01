import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Dialog,
  Slide,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styled from "@emotion/styled";
import { toast } from "sonner";
import ToastNotify from "~/Components/ToastNotify";
import { useEffect } from "react";
import {
  createProduct,
  editProduct,
  getBrands,
  getCategories,
  getProducts,
  removeProduct,
} from "~/Controllers";
import AddProductPopup from "~/Components/Popups/AddProductPopup";
import RemoveProductPopup from "~/Components/Popups/RemoveProductPopup";
import EditProductPopup from "~/Components/Popups/EditProductPopup";

const cx = classNames.bind(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Toast = ({ err, mess }) => {
  switch (err) {
    case 0:
      return toast.custom(
        () => <ToastNotify type="success" title="Success" desc={mess} />,
        { duration: 2000 }
      );
    case 1:
      return toast.custom(
        () => <ToastNotify type="error" title="Error" desc={mess} />,
        { duration: 2000 }
      );
    default:
      return toast.custom(
        () => (
          <ToastNotify
            type="warning"
            title="Warning"
            desc="Please reload the website"
          />
        ),
        { duration: 2000 }
      );
  }
};

function Product() {
  const dispatch = useDispatch();
  const [addProductPopup, setAddProductPopup] = useState(false);
  const [editProductPopup, setEditProductPopup] = useState(false);
  const [removeProductPopup, setRemoveProductPopup] = useState(false);

  const [listProduct, setListProduct] = useState(null);
  const [listBrands, setListBrands] = useState(null);
  const [listCategories, setListCategories] = useState(null);

  const [form, setForm] = useState(null);

  useEffect(() => {
    getListProducts();
    getListCategories();
    getListBrands();
  }, []);

  const handleOpenAddProductPopup = () => {
    setAddProductPopup(true);
  };

  const handleCloseAddProductPopup = () => {
    setAddProductPopup(false);
  };

  const getListBrands = async () => {
    try {
      const listBrand = await getBrands();
      setListBrands(listBrand);
    } catch (err) {
      console.log(err);
    }
  };

  const getListCategories = async () => {
    try {
      const list = await getCategories();
      setListCategories(list);
    } catch (err) {
      console.log(err);
    }
  };

  const getListProducts = async () => {
    try {
      const list = await getProducts();
      setListProduct(list);
    } catch (err) {
      console.log(err);
    }
  };

  // Create product
  const handleCreateProduct = async (form) => {
    try {
      const { brand, category, ...rest } = form;
      const res = await createProduct(brand, category, rest);
      if (res?.err === 0) {
        Toast({ err: res?.err, mess: res?.mess });
      }
      getListProducts();
    } catch (err) {
      console.log(err);
    }
    handleCloseAddProductPopup();
  };

  // Edit product
  const handleOpenEditProductPopup = (formEdit) => {
    setForm(formEdit);
    setEditProductPopup(true);
  };

  const handleCloseEditProductPopup = () => {
    setForm(null);
    setEditProductPopup(false);
  };

  const handleSubmitEditProduct = async (formEdit) => {
    try {
      const {brand, category, ...rest} = formEdit;
      const res = await editProduct(brand, category, rest);
      Toast({ err: res?.err, mess: res?.mess });
      getListProducts();
    } catch (err) {
      Toast(err);
    }
    handleCloseEditProductPopup();
  };
  // Remove Product
  const handleOpenRemoveProductPopup = (formRemove) => {
    setForm(formRemove);
    setRemoveProductPopup(true);
  };

  const handleCloseRemoveProductPopup = () => {
    setForm(null);
    setRemoveProductPopup(false);
  };

  const handleSubmitRemoveProductPopup = async (formRemove) => {
    try {
      const res = await removeProduct(formRemove);
      if (res?.err === 0) {
        Toast({ err: res?.err, mess: res?.mess });
      }
      getListProducts();
    } catch (err) {
      console.log(err);
    }
    handleCloseRemoveProductPopup();
  };

  return (
    <div className={cx("home-wrapper")}>
      <Button
        variant="contained"
        sx={{ fontSize: 12, fontWeight: 600 }}
        onClick={handleOpenAddProductPopup}
      >
        Create Product
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontSize: "1.6rem" }}
                width={"5%"}
                align="left"
              ></TableCell>
              <TableCell sx={{ fontSize: "1.6rem" }} width={"12%"} align="left">
                Id
              </TableCell>
              <TableCell sx={{ fontSize: "1.6rem" }} width={"13%"} align="left">
                Name
              </TableCell>
              <TableCell sx={{ fontSize: "1.6rem" }} width={"28%"} align="left">
                Description
              </TableCell>
              <TableCell sx={{ fontSize: "1.6rem" }} width={"13%"} align="left">
                Price
              </TableCell>
              <TableCell sx={{ fontSize: "1.6rem" }} width={"13%"} align="left">
                Brand Name
              </TableCell>
              <TableCell sx={{ fontSize: "1.6rem" }} width={"13%"} align="left">
                Category Name
              </TableCell>
              <TableCell sx={{ fontSize: "1.6rem" }} align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listProduct?.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  userSelect: "none",
                }}
              >
                <TableCell
                  sx={{ fontSize: "1.6rem" }}
                  component="th"
                  scope="row"
                  align="center"
                  width={"5%"}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.6rem" }}
                  component="th"
                  scope="row"
                  align="left"
                  width={"12%"}
                >
                  {row?.id}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.6rem" }}
                  width={"13%"}
                  align="left"
                >
                  {row?.name}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.6rem" }}
                  width={"28%"}
                  align="left"
                >
                  {row?.desc}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.6rem" }}
                  width={"13%"}
                  align="left"
                >
                  {row?.price}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.6rem" }}
                  width={"13%"}
                  align="left"
                >
                  {row?.brand?.name}
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.6rem" }}
                  width={"13%"}
                  align="left"
                >
                  {row?.category?.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1.6rem",
                    display: "flex",
                    columnGap: "10px",
                  }}
                  align="center"
                >
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleOpenEditProductPopup(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleOpenRemoveProductPopup(row)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={cx("popups")}>
        <div className={cx("add-product")}>
          <AddProductPopup
            openPopup={addProductPopup}
            listBrands={listBrands}
            listCategories={listCategories}
            handleClose={handleCloseAddProductPopup}
            handleSubmit={handleCreateProduct}
          />
        </div>

        {/* Del popup product */}
        <div className={cx("del_popup-product")}>
          <Dialog
            fullWidth={true}
            maxWidth={"xs"}
            open={removeProductPopup}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseRemoveProductPopup}
            aria-describedby="alert-dialog-slide-description"
          >
            <RemoveProductPopup
              form={form}
              handleClose={handleCloseRemoveProductPopup}
              handleSubmit={handleSubmitRemoveProductPopup}
            />
          </Dialog>
        </div>
        {/* Edit popup product */}
        <div className={cx("edit_popup-product")}>
          <EditProductPopup
            form={form}
            openPopup={editProductPopup}
            handleClose={handleCloseEditProductPopup}
            handleSubmit={handleSubmitEditProduct}
            listBrands={listBrands}
            listCategories={listCategories}
          />
        </div>
      </div>
    </div>
  );
}

export default Product;
