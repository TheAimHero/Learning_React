import React from "react";

export default function Navbar(props) {
  const { children } = props;

  return <nav className="nav-bar">{children}</nav>;
}
