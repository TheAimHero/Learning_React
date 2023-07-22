import React from "react";
import { Link } from "react-router-dom";

import styles from "./PageNav.module.css";
import Logo from "../Logo/Logo";

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        {/*prettier-ignore*/}
        <li><Link to="/product">Porduct</Link></li>
        {/*prettier-ignore*/}
        <li><Link to="/pricing">Pricing</Link></li>
        {/*prettier-ignore*/}
        <li><Link to="/login" className={styles.ctaLink}>Login</Link></li>
      </ul>
    </nav>
  );
}
