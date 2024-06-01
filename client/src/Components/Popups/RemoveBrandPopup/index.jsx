import classNames from "classnames/bind";
import styles from "./RemoveBrandPopup.module.scss";

const cx = classNames.bind(styles);

function RemoveBrandPopup(props) {
  const handleRemovePopup = () => {
    props?.handleClose();
  };

  const handleSubmit = () => {
    props?.handleSubmit(props?.form);
  };

  return (
    <div className={cx("remove-wrapper")}>
      <div className={cx("themeLoginPopup")}>
        <h2 className={cx("heading_popup")}>Delete Brand</h2>
        <p className={cx("desc_popup")}>
          Are you sure delete brand:{" "}
          <span className={cx("bold")}>{props?.form?.name}</span>
        </p>

        <div className={cx("list-act_popup")}>
          <div
            className={cx("act_popup", "cancle_popup")}
            onClick={handleRemovePopup}
          >
            Cancle
          </div>
          <div
            className={cx("act_popup", "submit_popup")}
            onClick={handleSubmit}
          >
            Remove
          </div>
        </div>
      </div>
    </div>
  );
}

export default RemoveBrandPopup;
