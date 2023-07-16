import { useState, useEffect } from "react";

export default function useLocalStorage(initialState, key) {
  const [watched, setWatched] = useState(() => {
    const localData = localStorage.getItem(key);
    if (localData) {
      return JSON.parse(localData);
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(watched));
  }, [watched, key]);

  return [watched, setWatched];
}
