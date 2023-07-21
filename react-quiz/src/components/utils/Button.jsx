import React from "react";

export default function Button(props) {
  const { children, onClick, ...rest } = props;

  return (
    <button
      onClick={(e) => {
        onClick(e);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
