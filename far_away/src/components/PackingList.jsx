import React, { useState } from "react";

import Item from "./Item";

function PackingList(props) {
  const { items } = props;

  const [sortBy, setSortBy] = useState("packed");

  let sortItems;
  if (sortBy === "packed") {
    sortItems = items.slice().sort((a, b) => a.packed - b.packed);
  } else if (sortBy === "description") {
    sortItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else {
    sortItems = items;
  }

  const itemArr = sortItems.map((item) => {
    return (
      <Item
        deleteItem={props.deleteItem}
        packItem={props.packItem}
        key={item.id}
        item={item}
      />
    );
  });

  return (
    <div className="list">
      <ul>{itemArr}</ul>
      <div className="actions">
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="input">Input Order</option>
          <option value="description">Description</option>
          <option value="packed">Packed State</option>
        </select>
        <button onClick={props.deleteAll}>Delete All</button>
      </div>
    </div>
  );
}

export default PackingList;
