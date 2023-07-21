import React from "react";

export default function StartScreen(props) {
  const { numQuestions, onClick } = props;

  return (
    <div className="start">
      <h2>Welcome to React Quiz</h2>
      <h3>{numQuestions} questions to text your React Mastery</h3>
      <button className="btn btn-ui" onClick={onClick}>
        Let's Start
      </button>
    </div>
  );
}
