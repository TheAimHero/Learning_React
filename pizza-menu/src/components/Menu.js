import React from "react";

import Pizza from "./Pizza";
import pizzaData from "../dev_data/data";

function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {pizzaData.length > 0 && <Pizza pizzaData={pizzaData} />}
      {pizzaData.length === 0 && <p>No pizzas found</p>}
    </main>
  );
}

export default Menu;
