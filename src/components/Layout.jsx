import { Outlet } from "react-router-dom";
import Header from "./Header";
// import "./componentsStyles.scss";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
