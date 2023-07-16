import React, {  useRef } from "react";
import useKey from "../custom_hooks/useKey";

export default function SearchBox(props) {
  const { query, setQuery } = props;

  const inputEle = useRef(null);

  function setQueryAndFocus() {
    if (document.activeElement === inputEle.current) return;
    setQuery("");
    inputEle.current.focus();
  }

  useKey("Enter", setQueryAndFocus);

  return (
    <input
      className="search"
      type="text"
      ref={inputEle}
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
