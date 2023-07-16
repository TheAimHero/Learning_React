import { useEffect } from "react";

export default function useKey(key, callback) {
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === key) {
        callback();
      }

      return () => document.removeEventListener("keydown", callback);
    });
  }, [key, callback]);
}
