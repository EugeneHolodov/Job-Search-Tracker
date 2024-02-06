import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { setCleaneState } from "../../redux/slices/cards";

const HeaderCustom = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { data } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.confirm("Are you sure you want to exit?")) {
      dispatch(logout());
      dispatch(setCleaneState())
      window.localStorage.removeItem("token");
      navigate("/");
    }
  };
  const userLabel = isAuth ? data.nickname.charAt(0).toUpperCase() : "";

  console.log("Ayth data", userLabel);
  return (
    <div className={styles.header}>
      {isAuth ? (
        <>
          <LogoutOutlined
            className={styles.icon}
            onClick={() => handleClick()}
          />

          <div className={styles.icon}>{userLabel}</div>
        </>
      ) : (
        <Link to="/login">
          <LoginOutlined className={styles.icon} />
        </Link>
      )}
    </div>
  );
};

export default HeaderCustom;
