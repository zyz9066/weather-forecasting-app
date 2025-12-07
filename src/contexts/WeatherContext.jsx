import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { getCurrentWeather, getForecast } from "../api/weatherApi";
import { weatherReducer, initialState } from "./weatherReducer";
import { translations } from "./weatherTranslations";

const WeatherStateContext = createContext(null);
const WeatherDispatchContext = createContext(null);

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState, (init) => {
    try {
      const stored = JSON.parse(localStorage.getItem("weather-settings"));
      if (!stored) return init;
      return { ...init, ...stored };
    } catch {
      return init;
    }
  });

  const translation = useMemo(
    () => translations[state.language] || translations.en,
    [state.language]
  );

  useEffect(() => {
    const { city, units, language } = state;
    localStorage.setItem(
      "weather-settings",
      JSON.stringify({ city, units, language })
    );
  }, [state.city, state.units, state.language]);

  const fetchWeather = async (targetCity, targetUnits, targetLanguage) => {
    if (!targetCity) return;
    dispatch({ type: "SET_LOADING" });
    try {
      const [current, forecast] = await Promise.all([
        getCurrentWeather(targetCity, targetUnits, targetLanguage, API_KEY),
        getForecast(targetCity, targetUnits, targetLanguage, API_KEY),
      ]);
      dispatch({ type: "SET_WEATHER", payload: { currentWeather: current, forecast } });
    } catch (err) {
      const msg = parseWeatherError(err);
      dispatch({ type: "SET_ERROR", payload: msg || translation.errorGeneric });
    }
  };

  const valueState = useMemo(
    () => ({ ...state, translation }),
    [state.city, state.units, state.currentWeather, state.forecast, state.loading, state.error, state.language, translation]
  );

  const valueDispatch = useMemo(
    () => ({ dispatch, fetchWeather }),
    [dispatch]
  );

  return (
    <WeatherStateContext.Provider value={valueState}>
      <WeatherDispatchContext.Provider value={valueDispatch}>
        {children}
      </WeatherDispatchContext.Provider>
    </WeatherStateContext.Provider>
  );
};

const parseWeatherError = (err) => {
  if (err.status === 404) return "City not found";
  if (err.status === 401) return "Invalid API key";
  if (err.status === 429) return "API rate limit exceeded";
  return err.message || null;
};

const useWeatherState = () => {
  const ctx = useContext(WeatherStateContext);
  if (!ctx) throw new Error("useWeatherState must be used within WeatherProvider");
  return ctx;
};

const useWeatherDispatch = () => {
  const ctx = useContext(WeatherDispatchContext);
  if (!ctx)
    throw new Error("useWeatherDispatch must be used within WeatherProvider");
  return ctx;
};

export { WeatherProvider, useWeatherState, useWeatherDispatch };
