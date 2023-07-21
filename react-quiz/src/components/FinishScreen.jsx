import React from "react";
import PropTypes from "prop-types";

FinishScreen.propTypes = {
  points: PropTypes.number.isRequired,
  totalPoints: PropTypes.number.isRequired,
};

export default function FinishScreen(props) {
  const { points, totalPoints } = props;

  const percentage = Number((points / totalPoints) * 100).toFixed(1);

  return (
    <p className="result">
      You Scored <strong>{points}</strong> out of {totalPoints} ({percentage}%)
    </p>
  );
}
