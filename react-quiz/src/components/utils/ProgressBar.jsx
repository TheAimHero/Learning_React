import React from "react";
import PropTypes from "prop-types";

ProgressBar.propTypes = {
  index: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  totalPoints: PropTypes.number.isRequired,
  answer: PropTypes.number,
};

export default function ProgressBar(props) {
  const { index, totalQuestions, points, totalPoints, answer } = props;

  return (
    <header className="progress">
      <progress
        max={totalQuestions}
        min={0}
        value={index + Number(answer !== null)}
      />
      <p>
        Question <strong>{index + Number(answer !== null)}</strong> /{" "}
        {totalQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints} Points
      </p>
    </header>
  );
}
