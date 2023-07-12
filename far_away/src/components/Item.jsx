import React from "react";


function Item(props) {
  const { item } = props;
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onClick={() => props.packItem(item.id)}
      />
      <span className={`${item.packed ? "packed" : ""}`}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => props.deleteItem(item.id)}>❌</button>
    </li>
  );
}

export default Item;
