import classNames from "classnames/bind";
import styles from "./Home.module.scss";
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "@emotion/styled";
import { toast } from "sonner";
import ToastNotify from "~/Components/ToastNotify";
import { createBrand, editBrand, getBrands, removeBrand } from "~/Controllers";
import AddBrandPopup from "~/Components/Popups/AddBrandPopup";
import EditPopupProduct from "~/Components/Popups/EditProductPopup";
import EditBrandPopup from "~/Components/Popups/EditBrandPopup";
import RemoveBrandPopup from "~/Components/Popups/RemoveBrandPopup";

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

function Brand() {
  const [addBrandPopup, setAddBrandPopup] = useState(false);
  const [editBrandPopup, setEditBrandPopup] = useState(false);
  const [removeBrandPopup, setRemoveBrandPopup] = useState(false);

  const [listBrand, setListBrand] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    getListBrands();
  }, []);

  const getListBrands = async () => {
    try {
      const listBrand = await getBrands();
      setListBrand(listBrand);
    } catch (err) {
      console.log(err);
    }
  };

  // Create brand popup

  const handleOpenAddBrandPopup = () => {
    setAddBrandPopup(true);
  };

  const handleCloseAddBrandPopup = () => {
    setAddBrandPopup(false);
  };

  const handleCreateBrand = async (form) => {
    try {
      const res = await createBrand(form);
      if (res?.err === 0) {
        Toast({ err: res?.err, mess: res?.mess });
      }
      getListBrands();
    } catch (err) {
      Toast(err);
    }
    handleCloseAddBrandPopup();
  };

  // Edit brand popup

  const handleOpenEditBrandPopup = (formEdit) => {
    setForm(formEdit);
    setEditBrandPopup(true);
  };

  const handleCloseEditBrandPopup = () => {
    setForm(null);
    setEditBrandPopup(false);
  };

  const handleSubmitEditBrand = async (formEdit) => {
    try {
      const res = await editBrand(formEdit);
      if (res?.err === 0) {
        Toast({ err: res?.err, mess: res?.mess });
      }
      getListBrands();
    } catch (err) {
      Toast(err);
    }
    handleCloseEditBrandPopup();
  };

  // Remove brand popup

  const handleOpenRemoveBrandPopup = (formRemove) => {
    setForm(formRemove);
    setRemoveBrandPopup(true);
  };

  const handleCloseRemoveBrandPopup = () => {
    setForm(null);
    setRemoveBrandPopup(false);
  };

  const handleSubmitRemoveBrandPopup = async (formRemove) => {
    try {
      const res = await removeBrand(formRemove);
      if (res?.err === 0) {
        Toast({ err: res?.err, mess: res?.mess });
      }
      getListBrands();
    } catch (err) {
      console.log(err);
    }
    handleCloseRemoveBrandPopup();
  };

  return (
    <div className={cx("home-wrapper")}>
      <Button
        variant="contained"
        sx={{ fontSize: 12, fontWeight: 600 }}
        onClick={handleOpenAddBrandPopup}
      >
        Create brand
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "1.6rem" }} width={"5%"} align="left">
                Index
              </TableCell>
              <TableCell sx={{ fontSize: "1.6rem" }} width={"12%"} align="left">
                Id
              </TableCell>
              <TableCell sx={{ fontSize: "1.6rem" }} width={"20%"} align="left">
                Name
              </TableCell>
              <TableCell sx={{ fontSize: "1.6rem" }} align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listBrand?.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
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
                  width={"20%"}
                  align="left"
                >
                  {row?.name}
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
                    onClick={() => handleOpenEditBrandPopup(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleOpenRemoveBrandPopup(row)}
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
          <AddBrandPopup
            openPopup={addBrandPopup}
            handleClose={handleCloseAddBrandPopup}
            handleSubmit={handleCreateBrand}
          />
        </div>

        {/* Del popup product */}
        <div className={cx("del_popup-product")}>
          <Dialog
            fullWidth={true}
            maxWidth={"xs"}
            open={removeBrandPopup}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseRemoveBrandPopup}
            aria-describedby="alert-dialog-slide-description"
          >
            <RemoveBrandPopup
              form={form}
              handleClose={handleCloseRemoveBrandPopup}
              handleSubmit={handleSubmitRemoveBrandPopup}
            />
          </Dialog>
        </div>
        {/* Edit popup product */}
        <div className={cx("edit_popup-product")}>
          <EditBrandPopup
            form={form}
            openPopup={editBrandPopup}
            handleClose={handleCloseEditBrandPopup}
            handleSubmit={handleSubmitEditBrand}
          />
        </div>
      </div>
    </div>
  );
}

export default Brand;
