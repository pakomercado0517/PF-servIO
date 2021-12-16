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
    const actualValue = getStorageValue(key, defaultValue);
    const state = useSelector( state => state )
    const dispatch=useDispatch()

    if(actualValue===defaultValue) localStorage.setItem(key, JSON.stringify(actualValue))
    // If value doesn't exist on store, dispatch value
    if (!state.hasOwnProperty(key)) {
        dispatch(setToGlobalStorage({[key]: actualValue}))
    }
  
    useEffect(() => {
        if (state[key]) {
            localStorage.setItem(key, JSON.stringify(state[key]));
        }
    }, [key, state]);
  
    const setValue = (value) => {
    return dispatch(setToGlobalStorage({[key]: value}))
    }
  
    return [state[key] || actualValue, setValue];
};