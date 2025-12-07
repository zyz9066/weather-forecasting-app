import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { weatherReducer, initialState } from "./weatherReducer";
import { translations } from "./weatherTranslations";
import { actionCreators } from "./weatherActions";

const WeatherStateContext = createContext(null);
const WeatherDispatchContext = createContext(null);

const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    weatherReducer,
    initialState,
    (init) => {
      try {
        const stored = JSON.parse(localStorage.getItem("weather-settings"));
        return stored ? { ...init, ...stored } : init;
      } catch {
        return init;
      }
    }
  );

  const translation = useMemo(() => translations[state.language] || translations.en, [state.language]);

  useEffect(
    () => {
      const { city, units, language } = state;
      localStorage.setItem("weather-settings", JSON.stringify({ city, units, language }));
    },
    [state.city, state.units, state.language]
  );

  const valueState = useMemo(
    () => ({ ...state, translation }),
    [state.city, state.units, state.currentWeather, state.forecast, state.loading, state.error, state.language, translation]
  );

  const valueDispatch = useMemo(
    () => ({ dispatch, actions: actionCreators }),
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
