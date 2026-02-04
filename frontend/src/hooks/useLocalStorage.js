import { useEffect, useState } from "react";

/** Persist React state to localStorage (JSON). */
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota errors
    }
  }, [key, value]);

  /** remove key (and reset state) */
  const remove = () => {
    try {
      localStorage.removeItem(key);
    } finally {
      setValue(initial);
    }
  };

  return [value, setValue, remove];
}
