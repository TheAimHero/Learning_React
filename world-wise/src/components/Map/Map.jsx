import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useCities } from "../../context/CitiesContext";
import useGeolocation from "../../hooks/useGeoLocation";
import Button from "../utils/Button/Button";
import useUrlPosition from "../../hooks/useUrlPosition";

function ChangeCenter(props) {
  const { position } = props;

  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick(props) {
  const { setGeoLocationPosition } = props;
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      setGeoLocationPosition(null);
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });

  return null;
}

export default function Map() {
  const [searchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
    setPosition: setGeoLocationPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  const citiesMarker = cities.map((city) => {
    return (
      <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
        <Popup>
          <span>{city.emoji}</span>
          <span>{city.cityName}</span>
        </Popup>
      </Marker>
    );
  });

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use Your Positon"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={7}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {citiesMarker}
        <ChangeCenter position={mapPosition} />
        <DetectClick setGeoLocationPosition={setGeoLocationPosition} />
      </MapContainer>
    </div>
  );
}
