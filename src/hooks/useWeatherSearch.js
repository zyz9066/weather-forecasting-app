import { useCallback, useState, useEffect } from "react";
import { useWeatherDispatch, useWeatherState } from "../contexts/WeatherContext";

export const useWeatherSearch = () => {
  const { city, units, language } = useWeatherState();
  const { dispatch, actions } = useWeatherDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        actions.setCity(dispatch, searchTerm);
        actions.loadWeather(dispatch, searchTerm, units, language);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, units, actions]);

  const searchCity = useCallback((city) => setSearchTerm(city), []);
  const refreshCurrentCity = useCallback(() => city && actions.loadWeather(city, units), [city, units, actions]);

  const useCurrentLocation = useCallback(async () => {
    if (!navigator.geolocation) return actions.clearError("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      actions.loadWeatherByCoords(dispatch, latitude, longitude, units, language);
    });
  }, [units, actions]);

  return { searchCity, refreshCurrentCity, useCurrentLocation };
};
