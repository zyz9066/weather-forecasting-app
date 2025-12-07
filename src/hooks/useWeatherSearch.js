import { useCallback, useState, useEffect } from "react";
import { useWeatherDispatch, useWeatherState } from "../contexts/WeatherContext";

export const useWeatherSearch = () => {
  const { units, language } = useWeatherState();
  const { dispatch, actions } = useWeatherDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        actions.setCity(dispatch, searchTerm);
        actions.loadWeatherByCity(dispatch, searchTerm, units, language);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, actions]);

  const searchCity = useCallback((city) => setSearchTerm(city), []);

  const useCurrentLocation = useCallback(async () => {
    if (!navigator.geolocation) return actions.clearError("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      actions.loadWeatherByCoords(dispatch, latitude, longitude, units, language);
    });
  }, [actions]);

  return { searchCity, useCurrentLocation };
};
