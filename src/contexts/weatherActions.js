import { getWeatherByCity, getForecastByCity, getWeatherByCoords, getForecastByCoords } from "../api/weatherApi";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || process.env.REACT_APP_WEATHER_API_KEY;

const actionCreators =  {
  // Simple state setters
  setCity: (dispatch, city) => dispatch({ type: "SET_CITY", payload: city }),
  setUnits: (dispatch, units) => dispatch({ type: "SET_UNITS", payload: units }),
  setLanguage: (dispatch, language) => dispatch({ type: "SET_LANGUAGE", payload: language }),

  // Weather loading workflow
  loadWeather: async (dispatch, city, units, language) => {
    if (!city) return;
    dispatch({ type: "SET_LOADING" });
    try {
      const [current, forecast] = await Promise.all([
        getWeatherByCity(city, units, language, API_KEY),
        getForecastByCity(city, units, language, API_KEY),
      ]);
      dispatch({ type: "SET_WEATHER", payload: { currentWeather: current, forecast }});
    } catch (err) {
      const msg = parseWeatherError(err);
      dispatch({ type: "SET_ERROR", payload: msg });
    }
  },
  loadWeatherByCoords: async (dispatch, lat, lon, units, language) => {
    if (!lat || !lon) return;
    dispatch({ type: "SET_LOADING" });
    try {
      const [current, forecast] = await Promise.all([
        getWeatherByCoords(lat, lon, units, language, API_KEY),
        getForecastByCoords(lat, lon, units, language, API_KEY),
      ]);
      dispatch({ type: "SET_WEATHER", payload: { currentWeather: current, forecast }});
    } catch (err) {
      const msg = parseWeatherError(err);
      dispatch({ type: "SET_ERROR", payload: msg });
    }
  },

  // Clear error state
  clearError: (dispatch) => dispatch({ type: "SET_ERROR", error: "" }),
};

// HTTP-aware error parsing for OpenWeather free tier
const parseWeatherError = (err) => {
  if (err.status === 404) return "City not found";
  if (err.status === 401) return "Invalid API key";
  if (err.status === 429) return "Rate limit exceeded, try again later";
  return err.message || "Failed to load weather data";
};

export { actionCreators };