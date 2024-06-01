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

import styled from "@emotion/styled";
import { toast } from "sonner";
import ToastNotify from "~/Components/ToastNotify";
import {
  createCategory,
  editCategory,
  getCategories,
  removeCategory,
} from "~/Controllers";
import AddCategoryPopup from "~/Components/Popups/AddCategoryPopup";
import RemoveCategoryPopup from "~/Components/Popups/RemoveCategoryPopup";
import EditCategoryPopup from "~/Components/Popups/EditCategoryPopup";

const cx = classNames.bind(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

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

function Category() {
  const [addCategoryPopup, setAddCategoryPopup] = useState(false);
  const [editCategoryPopup, setEditCategoryPopup] = useState(false);
  const [removeCategoryPopup, setRemoveCategoryPopup] = useState(false);

  const [listCategories, setListCategories] = useState(null);
  const [form, setForm] = useState(null);

  useEffect(() => {
    getListCategories();
  }, []);

  const getListCategories = async () => {
    try {
      const list = await getCategories();
      setListCategories(list);
    } catch (err) {
      console.log(err);
    }
  };

  // Create category popup

  const handleOpenAddCategoryPopup = () => {
    setAddCategoryPopup(true);
  };

  const handleCloseAddCategoryPopup = () => {
    setAddCategoryPopup(false);
  };

  const handleCreateCategory = async (form) => {
    try {
      const res = await createCategory(form);
      if (res?.err === 0) {
        Toast({ err: res?.err, mess: res?.mess });
      }
      getListCategories();
    } catch (err) {
      Toast(err);
    }
    handleCloseAddCategoryPopup();
  };

  // Edit category popup

  const handleOpenEditCategoryPopup = (formEdit) => {
    setForm(formEdit);
    setEditCategoryPopup(true);
  };

  const handleCloseEditCategoryPopup = () => {
    setForm(null);
    setEditCategoryPopup(false);
  };

  const handleSubmitEditCategory = async (formEdit) => {
    try {
      const res = await editCategory(formEdit);
      if (res?.err === 0) {
        Toast({ err: res?.err, mess: res?.mess });
      }
      getListCategories();
    } catch (err) {
      Toast(err);
    }
    handleCloseEditCategoryPopup();
  };

  // Remove category popup

  const handleOpenRemoveCategoryPopup = (formRemove) => {
    setForm(formRemove);
    setRemoveCategoryPopup(true);
  };

  const handleCloseRemoveCategoryPopup = () => {
    setForm(null);
    setRemoveCategoryPopup(false);
  };

  const handleSubmitRemoveCategoryPopup = async (formRemove) => {
    try {
      const res = await removeCategory(formRemove);
      if (res?.err === 0) {
        Toast({ err: res?.err, mess: res?.mess });
      }
      getListCategories();
    } catch (err) {
      console.log(err);
    }
    handleCloseRemoveCategoryPopup();
  };

  return (
    <div className={cx("home-wrapper")}>
      <Button
        variant="contained"
        sx={{ fontSize: 12, fontWeight: 600 }}
        onClick={handleOpenAddCategoryPopup}
      >
        Create Category
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
            {listCategories?.map((row, index) => (
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
                    onClick={() => handleOpenEditCategoryPopup(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleOpenRemoveCategoryPopup(row)}
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
          <AddCategoryPopup
            openPopup={addCategoryPopup}
            handleClose={handleCloseAddCategoryPopup}
            handleSubmit={handleCreateCategory}
          />
        </div>

        {/* Del popup product */}
        <div className={cx("del_popup-product")}>
          <Dialog
            fullWidth={true}
            maxWidth={"xs"}
            open={removeCategoryPopup}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseRemoveCategoryPopup}
            aria-describedby="alert-dialog-slide-description"
          >
            <RemoveCategoryPopup
              form={form}
              handleClose={handleCloseRemoveCategoryPopup}
              handleSubmit={handleSubmitRemoveCategoryPopup}
            />
          </Dialog>
        </div>
        {/* Edit popup product */}
        <div className={cx("edit_popup-product")}>
          <EditCategoryPopup
            form={form}
            openPopup={editCategoryPopup}
            handleClose={handleCloseEditCategoryPopup}
            handleSubmit={handleSubmitEditCategory}
          />
        </div>
      </div>
    </div>
  );
}

export default Category;
