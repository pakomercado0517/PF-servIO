import { useEffect } from "react";

import { setToGlobalStorage } from '../redux/actions'

import { useSelector, useDispatch } from "react-redux";

function getStorageValue(key, defaultValue) {
  // getting stored value
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

export const useGlobalStorage = (key, defaultValue) => {
    const actualValue = getStorageValue(key + "GlobalStorage", defaultValue);
    const state = useSelector( state => state )
    const dispatch=useDispatch()

    if(actualValue===defaultValue) localStorage.setItem(key + "GlobalStorage", JSON.stringify(actualValue))
    // If value doesn't exist on store, dispatch value
    if (!state.hasOwnProperty(key + "GlobalStorage")) {
        dispatch(setToGlobalStorage({[key + "GlobalStorage"]: actualValue}))
    }
  
    useEffect(() => {
        if (state[key + "GlobalStorage"]) {
            localStorage.setItem(key + "GlobalStorage", JSON.stringify(state[key + "GlobalStorage"]));
        }
    }, [key, state]);
  
    const setValue = (value) => {
    return dispatch(setToGlobalStorage({[key + "GlobalStorage"]: value}))
    }
    if (state[key + "GlobalStorage"] && state[key + "GlobalStorage"][0]) return [state[key + "GlobalStorage"], setValue]
    return [actualValue, setValue];
};