import classNames from "classnames/bind";
import styles from "./AddProductPopup.module.scss";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { useState } from "react";
const cx = classNames.bind(styles);

function AddCategoryPopup(props) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    const form = {
      name,
    };
    setName("");
    props?.handleSubmit(form);
  };

  const handleClose = () => {
    setName("");
    props?.handleClose();
  };

  return (
    <Dialog open={props?.openPopup} onClose={props?.handleClose}>
      <DialogTitle id="alert-dialog-title">
        <div>
          <h2 className={cx("title_popup")}>Add Category</h2>
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

export default AddCategoryPopup;
