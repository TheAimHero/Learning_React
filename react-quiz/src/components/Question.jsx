import React from "react";

export default function Question(props) {
  const { question, children } = props;

  return (
    <div>
      <h4>{question.question}</h4>
      {children}
    </div>
  );
}
