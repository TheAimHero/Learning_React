import React from "react";

import styles from "./Button.module.css";

export default function Button(props) {
  const { children, onClick, type } = props;

  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
