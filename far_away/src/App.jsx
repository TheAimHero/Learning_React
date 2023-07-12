import React, { useState } from "react";

import "./index.css";
import Logo from "./components/Logo";
import Form from "./components/Form";
import Stats from "./components/Stats";
import PackingList from "./components/PackingList";

function App() {
  const [items, setItems] = useState([]);

  function addItem(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function deleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function packItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function deleteAll() {
    const confirm = window.confirm("Are you sure you want to delete all?");
    if (confirm) {
      setItems([]);
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form addItem={addItem} />
      <PackingList
        deleteItem={deleteItem}
        packItem={packItem}
        deleteAll={deleteAll}
        items={items}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
