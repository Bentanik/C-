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

function AddBrandPopup(props) {
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
          <h2 className={cx("title_popup")}>Add Brand</h2>
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
                fontSize: "1.8rem",
                width: "200px",
                "& .MuiInputBase-input": {
                  fontSize: "1.3rem",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "1.7rem",
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
        <Button onClick={handleClose} sx={{ fontSize: 13 }}>
          Cancle
        </Button>
        <Button onClick={handleSubmit} sx={{ fontSize: 13 }}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddBrandPopup;
