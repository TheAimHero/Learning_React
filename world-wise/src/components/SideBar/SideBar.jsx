import React from "react";

import styles from "./Sidebar.module.css";
import Logo from "../Logo/Logo";
import AppNav from "../AppNav/AppNav";
import Footer from "../utils/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet/>
      <Footer />
    </div>
  );
}
