import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "../utils/Button/Button";
import Spinner from "../utils/Spinner/Spinner";
import Message from "../utils/Message/Message";
import { useCities } from "../../context/CitiesContext";
import { useNavigate } from "react-router-dom";
import useUrlPosition from "../../hooks/useUrlPosition";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [mapLat, mapLng] = useUrlPosition();
  const [loadingGeoCoding, setLoadingGeoCoding] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const { createCity, loading } = useCities();

  useEffect(() => {
    async function fetchCityData() {
      setGeoCodingError("");
      setLoadingGeoCoding(true);
      try {
        const response = await fetch(
          BASE_URL + `?latitude=${mapLat}&longitude=${mapLng}`
        );
        const data = await response.json();
        if (data.countryCode === "") {
          throw new Error("That is not a city. Click somewhere else...");
        }

        setCityName(data.city || data.location);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeoCodingError(error.message);
        console.log(error.message);
      } finally {
        setLoadingGeoCoding(false);
      }
    }
    if (!mapLat && !mapLng) {
      setGeoCodingError("Start By Clicking On The Map...");
      return;
    }
    fetchCityData();
  }, [emoji, mapLat, mapLng]);

  const navigate = useNavigate();

  function handleBack(e) {
    e.preventDefault();
    navigate("/app/cities");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      notes,
      date,
      position: { lat: mapLat, lng: mapLng },
    };

    createCity(newCity);
    navigate("/app/cities");
  }

  if (loadingGeoCoding) {
    return <Spinner />;
  }

  if (geoCodingError !== "") {
    return <Message message={geoCodingError} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${loading ? styles.loading : ""}`}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <ReactDatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat={"dd/MM/yyyy"}
          locale={"en"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="back" onClick={handleBack}>
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
