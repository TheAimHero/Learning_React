import React, { useEffect } from "react";

export default function Timer(props) {
  const { dispatch, secondsRemaining } = props;

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return <div className="timer">{secondsRemaining}</div>;
}
