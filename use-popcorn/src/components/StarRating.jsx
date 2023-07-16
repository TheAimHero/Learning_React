import React, { useState } from "react";

const containerStyle = {
  display: "flex",
  width: "fit-content",
  marginInline: "auto",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
};

const starStyle = { cursor: "pointer" };

export default function StarRating(props) {
  const { starNums = 10, size = "2", onSetRating, defaultRating = 1 } = props;
  const [rating, setRating] = useState(defaultRating);
  const [hover, setHover] = useState(null);

  function handleClick(rating) {
    setRating(rating);
    if (onSetRating) onSetRating(rating);
  }

  return (
    <div style={containerStyle}>
      <div
        style={{
          display: "flex",
          gap: "15px",
          fontSize: `${size}rem`,
          color: "gold",
        }}
      >
        <div>
          {[...Array(starNums)].map((star, index) => (
            <span
              key={index}
              onClick={() => handleClick(index + 1)}
              onMouseEnter={() => setHover(index + 1)}
              onMouseLeave={() => setHover(0)}
              style={starStyle}
            >
              {hover
                ? hover >= index + 1
                  ? "🌟"
                  : "⭐"
                : rating >= index + 1
                ? "🌟"
                : "⭐"}
            </span>
          ))}
        </div>
        <span>{hover ? hover : rating}</span>
      </div>
    </div>
  );
}
