import React, { useState, useEffect } from "react";

import styles from "./AppLayout.module.css";
import SideBar from "../../components/SideBar/SideBar";
import Map from "../../components/Map/Map";
import { useAuth } from "../../context/fakeAuthContext";
import User from "../../components/User/User";

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.app}>
      <SideBar />
      {isAuthenticated && <User />}
      <Map />
    </div>
  );
}
