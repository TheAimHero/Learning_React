import { useReducer } from "react";

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "inc":
      return { ...state, count: state.count + payload.step };
    case "dec":
      return { ...state, count: state.count - payload.step };
    case "setCount":
      return { ...state, count: payload };
    case "reset":
      return { count: 0, step: 1 };
    case "setStep":
      return { ...state, step: payload.step };
    default:
      return state;
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec", payload: { count, step } });
  };

  const inc = function () {
    dispatch({ type: "inc", payload: { count, step } });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: { step: Number(e.target.value) } });
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
