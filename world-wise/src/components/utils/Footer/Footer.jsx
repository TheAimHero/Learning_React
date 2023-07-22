import React from "react";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright 2023 by World Wise Inc.
      </p>
    </footer>
  );
}
