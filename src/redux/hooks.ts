import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useEffect, useState } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface IDebounced {
  searchQuery: string;
  delay: number;
}
interface IMinMaxDebounced {
  minMax: number;
  delay: number;
}

export const useDebounced = ({ searchQuery, delay }: IDebounced) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  return debouncedValue;
};
export const useMinMaxDebounced = ({ minMax, delay }: IMinMaxDebounced) => {
  const [debouncedValue, setDebouncedValue] = useState<number>(minMax);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(minMax);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [minMax, delay]);

  return debouncedValue;
};
