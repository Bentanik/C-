import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import {
  Dialog,
  Slide,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "@emotion/styled";
import { toast } from "sonner";
import ToastNotify from "~/Components/ToastNotify";

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
    case false:
      return toast.custom(
        () => <ToastNotify type="success" title="Success" desc={mess} />,
        { duration: 2000 }
      );
    case true:
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

function Home() {
  const dispatch = useDispatch();

  const [listProduct, setListProduct] = useState(null);

  return <div className={cx("home-wrapper")}>Home</div>;
}

export default Home;
