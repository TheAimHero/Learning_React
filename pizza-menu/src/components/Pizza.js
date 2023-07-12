import React from "react";

function Pizza(props) {
  const { pizzaData } = props;

  const pizzaList = pizzaData.map((pizza) => {
    return (
      <li key={pizza.name} className={`pizza ${pizza.soldOut && "sold-out"}`}>
        <img src={pizza.photoName} alt={pizza.name} />
        <div>
          <h3>{pizza.name}</h3>
          <p>{pizza.ingredients}</p>
          <span>{pizza.soldOut ? "Sold Out" : `$${pizza.price}`}</span>
        </div>
      </li>
    );
  });

  return <ul className="pizzas">{pizzaList}</ul>;
}

export default Pizza;
