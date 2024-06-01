import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx("header-wrapper")}>
      <h1 className={cx("logo")}>LOGO</h1>
      <div className={cx("list")}>
        <Link to={"/brand"} className={cx("link")}>
          Brand
        </Link>
        <Link to={"/category"} className={cx("link")}>
          Category
        </Link>
        <Link to={"/product"} className={cx("link")}>
          Product
        </Link>
      </div>
    </div>
  );
}

export default Header;
