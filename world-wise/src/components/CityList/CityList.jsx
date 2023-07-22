import React from "react";

import styles from "./CityList.module.css";
import Spinner from "../utils/Spinner/Spinner";
import CityItem from "../CityItem/CityItem";
import Message from "../utils/Message/Message";
import { useCities } from "../../context/CitiesContext";

export default function CityList() {
  const { cities, loading } = useCities();

  if (loading) return <Spinner />;

  if (cities.length === 0) {
    return <Message message="Add your first city by clikcing on the map" />;
  }

  const cityEle = cities.map((city) => <CityItem key={city.id} city={city} />);

  return <ul className={styles.cityList}>{cityEle}</ul>;
}
