import classNames from "classnames/bind";
import styles from "./AddProductPopup.module.scss";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
const cx = classNames.bind(styles);

function AddProductPopup(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  const [brand, setBrand] = useState(-1);
  const [category, setCategory] = useState(-1);

  const handleSubmit = () => {
    const form = {
      name,
      price: +price,
      desc,
      brand,
      category,
    };
    setName("");
    setPrice("");
    setDesc("");
    setBrand(-1);
    setCategory(-1);
    props?.handleSubmit(form);
  };

  const handleClose = () => {
    setName("");
    setPrice("");
    setDesc("");
    setBrand(-1);
    setCategory(-1);
    props?.handleClose();
  };

  const handleChangeBrand = (e) => {
    setBrand(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <Dialog open={props?.openPopup} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">
        <div>
          <h2 className={cx("title_popup")}>Add product</h2>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className={cx("body_popup")}>
          <div className={cx("list-input")}>
            <TextField
              id="Name"
              label="Name"
              type="text"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                fontSize: "1.6rem",
                width: "200px",
                "& .MuiInputBase-input": {
                  fontSize: "1.3rem",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1.3rem",
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
            <TextField
              id="Price"
              label="Price"
              type="text"
              autoComplete="off"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              sx={{
                fontSize: "1.6rem",
                width: "50px",
                "& .MuiInputBase-input": {
                  fontSize: "1.3rem",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1.3rem",
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </div>
          <div className={cx("text-area")}>
            <TextField
              id="Desc"
              label="Desc"
              type="text"
              autoComplete="off"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              sx={{
                fontSize: "1.6rem",
                width: "100%",
                "& .MuiInputBase-input": {
                  fontSize: "1.3rem",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1.3rem",
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
          </div>
          <div className={cx("row")}>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={brand}
              label="Age"
              sx={{ marginTop: 3 }}
              onChange={handleChangeBrand}
            >
              <MenuItem value={-1}>
                <em>Brand</em>
              </MenuItem>
              {props?.listBrands?.map((item, index) => {
                return (
                  <MenuItem key={index} value={item?.id}>
                    {item?.name}
                  </MenuItem>
                );
              })}
            </Select>

            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={category}
              label="Age"
              sx={{ marginTop: 3 }}
              onChange={handleChangeCategory}
            >
              <MenuItem value={-1}>
                <em>Category</em>
              </MenuItem>
              {props?.listCategories?.map((item, index) => {
                return (
                  <MenuItem key={index} value={item?.id}>
                    {item?.name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancle</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProductPopup;
