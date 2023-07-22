import React from "react";
import { Link } from "react-router-dom";

import styles from "./CityItem.module.css";
import { useCities } from "../../context/CitiesContext";

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export default function CityItem(props) {
  const { city } = props;
  const { currentCity, removeCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  const isActive = currentCity.id === id;

  const { lat, lng } = position;

  function handleDelete(event, id) {
    event.preventDefault();
    removeCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          isActive && styles["cityItem--active"]
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{date && formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => handleDelete(e, id)}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}
