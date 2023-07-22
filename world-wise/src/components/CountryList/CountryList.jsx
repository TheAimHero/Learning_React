import React from "react";

import styles from "./CountryList.module.css";
import Spinner from "../utils/Spinner/Spinner";
import Message from "../utils/Message/Message";
import CountryItem from "../CountryItem/CountryItem";
import { useCities } from "../../context/CitiesContext";

export default function CityList() {
  const { cities, loading } = useCities();
  if (loading) return <Spinner />;

  if (cities.length === 0) {
    return <Message message="Add your first city by clikcing on the map" />;
  }

  const cityEleSet = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  const cityEle = cityEleSet.map((city) => (
    <CountryItem key={city.country} country={city} />
  ));

  return <ul className={styles.countryList}>{cityEle}</ul>;
}
