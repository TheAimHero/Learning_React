import React from "react";

export default function Button(props) {
  const { children, onClick } = props;

  return (
    <button className="btn-toggle" onClick={() => onClick()}>
      {children}
    </button>
  );
}
