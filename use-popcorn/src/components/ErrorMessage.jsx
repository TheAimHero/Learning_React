import React from "react";

export default function ErrorMessage(props) {
  const { error } = props;

  return <p className="error">{error}</p>;
}
