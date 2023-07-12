import React, { useState } from "react";

function Form(props) {
  const optionList = Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
    return (
      <option key={num} value={num}>
        {num}
      </option>
    );
  });

  const [item, setItem] = useState("");
  const [select, setSelect] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      description: item,
      quantity: select,
      packed: false,
    };
    setItem("");
    setSelect(1);
    props.addItem(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={select}
        onChange={(e) => {
          setSelect(+e.target.value);
        }}
      >
        {optionList}
      </select>
      <input
        type="text"
        placeholder="Items..."
        value={item}
        onChange={(e) => {
          setItem(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

export default Form;
