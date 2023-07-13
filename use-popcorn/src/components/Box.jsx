import React, { useState } from "react";
import ToggleButton from "./ToggleButton";

export default function Box(props) {
  const { children } = props;

  const [isOpen, setisOpen] = useState(true);

  return (
    <div className="box">
      <ToggleButton className="btn-toggle" onClick={() => setisOpen(!isOpen)}>
        {isOpen ? "–" : "+"}
      </ToggleButton>
      {isOpen && children}
    </div>
  );
}
