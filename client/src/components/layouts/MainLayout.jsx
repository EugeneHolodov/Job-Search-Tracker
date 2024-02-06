import { Outlet } from "react-router-dom";
import Menu from "../Menu";

const MainLayaut = () => {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
};

export default MainLayaut;
