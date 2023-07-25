import React, {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const url = "http://localhost:5000/";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "loading":
      return { ...state, loading: true };

    case "cities/loaded":
      return { ...state, loading: false, cities: payload };

    case "city/loaded":
      return { ...state, loading: false, currentCity: payload };

    case "cities/created":
      return { ...state, loading: false, cities: [...state.cities, payload] };

    case "city/created":
      return {
        ...state,
        loading: false,
        cities: [...state.cities, payload],
        currentCity: payload,
      };

    case "cities/deleted":
      return { ...state, loading: false, cities: payload };

    case "rejected":
      return { ...state, loading: false, error: payload };

    default:
      throw new Error("Unknown action type");
  }
}

export function CitiesProvider(props) {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  const { cities, loading, currentCity } = state;

  useEffect(() => {
    dispatch({ type: "loading" });
    async function fetchCities() {
      try {
        const response = await fetch(url + "cities").catch((err) => {
          dispatch({ type: "rejected", payload: err.message });
        });
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err.message });
        console.log(err.message);
      }
    }
    fetchCities();
  }, []);

  async function removeCity(id) {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        await fetch(url + `cities/${id}`, {
          method: "DELETE",
        }).catch((err) => {
          dispatch({
            type: "rejected",
            payload: "There was a error deleting the city",
          });
        });
        const updateCitites = cities.filter((city) => city.id !== id);
        dispatch({ type: "cities/deleted", payload: updateCitites });
      } catch (err) {
        dispatch({ type: "rejected", payload: err.message });
      }
    }
    fetchCities();
  }

  async function createCity(city) {
    try {
      dispatch({ type: "loading" });
      const response = await fetch(url + "cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      }).catch((err) => {
        dispatch({
          type: "rejected",
          payload: "There was a error creating the city",
        });
      });
      const data = await response.json();
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  const getCity = useCallback(async (id) => {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(url + `cities/${id}`).catch((err) => {
        throw new Error("Fetch Error");
      });
      const data = await response.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return (
    <CitiesContext.Provider
      value={{ cities, removeCity, createCity, loading, currentCity, getCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}
