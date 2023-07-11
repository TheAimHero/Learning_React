import React, { useState } from "react";

export default function Form(props) {
  const { friend, handleSubmit } = props;

  const [billValue, setbillValue] = useState("");
  const [myExpense, setmyExpense] = useState("");
  const [whoPays, setwhoPays] = useState("You");

  return (
    <form
      className="form-split-bill"
      onSubmit={(e) => {
        e.preventDefault();
        const updateObj = {
          whoPays,
          friend: friend.id,
          myExpense,
        };
        handleSubmit(updateObj);
      }}
    >
      <h2>Split Bill With {friend.name}</h2>
      <label htmlFor="bill-value">💰 Bill Value</label>
      <input
        type="number"
        min="0"
        id="bill-value"
        value={billValue}
        onChange={(e) => setbillValue(e.target.value)}
      />
      <label htmlFor="your-expense">👨 Your Expense</label>
      <input
        type="number"
        min="0"
        max={billValue}
        id="your-expense"
        value={myExpense}
        onChange={(e) => setmyExpense(e.target.value)}
      />
      <label htmlFor="friend-expense">👬 {friend.name}'s Expense</label>
      <input
        type="text"
        id="friend-expense"
        value={billValue - myExpense}
        readOnly
      />
      <label htmlFor="who-pays">🤑 Who's Paying</label>
      <select
        value={whoPays}
        onChange={(e) => setwhoPays(e.target.value)}
        id="who-pays"
      >
        <option>You</option>
        <option>{friend.name}</option>
      </select>
      <button className="button">Split Bill</button>
    </form>
  );
}
