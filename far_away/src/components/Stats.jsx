import React from "react";

function Stats(props) {
  const { items } = props;

  const packedItems = items.reduce((packedItems, current) => {
    if (current.packed) {
      return packedItems + 1;
    }
    return packedItems;
  }, 0);

  const percentagePacked = Math.round((packedItems / items.length) * 100) || 0;

  return (
    <footer className="stats">
      <em>
        💼 you have {items.length} items on your list, and you already packed{" "}
        {packedItems} items ({percentagePacked}%)
      </em>
    </footer>
  );
}

export default Stats;
