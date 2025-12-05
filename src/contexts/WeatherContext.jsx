import { createContext, useContext, useReducer } from "react";
import { getCurrentWeather, getForecast } from "../api/weatherApi";

const WeatherContext = createContext(null);

const translations = {
  en: {
    title: "Weather Forecast",
    enterCity: "Enter city",
    errorGeneric: "Could not load weather data",
    feelsLike: "Feels like",
    humidity: "Humidity",
    wind: "Wind",
    unitC: "°C",
    unitF: "°F",
  },
  fr: {
    title: "Prévisions météo",
    enterCity: "Entrez une ville",
    errorGeneric: "Impossible de charger les données météo",
    feelsLike: "Ressenti",
    humidity: "Humidité",
    wind: "Vent",
    unitC: "°C",
    unitF: "°F",
  },
};

const initialState = {
  city: "",
  units: "metric",
  currentWeather: null,
  forecast: null,
  loading: false,
  error: "",
  language: "en",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: "" };
    case "SET_WEATHER":
      return {
        ...state,
        loading: false,
        currentWeather: action.currentWeather,
        forecast: action.forecast,
        error: "",
      };
    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        currentWeather: null,
        forecast: null,
        error: action.error,
      };
    case "SET_CITY":
      return { ...state, city: action.city };
    case "SET_UNITS":
      return { ...state, units: action.units };
    case "SET_LANGUAGE":
      return { ...state, language: action.language };
    default:
      return state;
  }
};

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const translation = translations[state.language];

  const fetchWeather = async (targetCity, targetUnits, targetLanguage) => {
    if (!targetCity) return;
    dispatch({ type: "SET_LOADING" });
    try {
      const [current, forecast] = await Promise.all([
        getCurrentWeather(targetCity, targetUnits, targetLanguage, API_KEY),
        getForecast(targetCity, targetUnits, targetLanguage, API_KEY),
      ]);
      dispatch({ type: "SET_WEATHER", currentWeather: current, forecast });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        error: err.message || translation.errorGeneric,
      });
    }
  };

  const value = {
    state,
    dispatch,
    translation,
    fetchWeather,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

const useWeather = () => {
  const ctx = useContext(WeatherContext);
  if (!ctx) {
    throw new Error("useWeather must be used within WeatherProvider");
  }
  return ctx;
};

export { WeatherProvider, useWeather };
