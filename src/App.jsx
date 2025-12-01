import { useState } from "react";
import { Box, Container, Paper, Grid, Typography, CircularProgress } from "@mui/material";
import SearchBar from "./components/SearchBar";
import UnitToggle from "./components/UnitToggle"
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastGrid from "./components/ForecastGrid";
import ErrorBanner from "./components/ErrorBanner";
import LanguageToggle from "./components/LanguageToggle";
import { getCurrentWeather, getForecast } from "./api/weatherApi";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const TRANSLATIONS = {
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

const App = () => {
  const [city, setCity] = useState("");
  const [units, setUnits] = useState("metric");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("en");

  const translation = TRANSLATIONS[language];

  const fetchWeather = async (targetCity = city, targetUnits = units, targetLanguage = language) => {
    if (!targetCity) return;
    try {
      setLoading(true);
      setError("");
      const [current, forecastData] = await Promise.all([
        getCurrentWeather(targetCity, targetUnits, targetLanguage, API_KEY),
        getForecast(targetCity, targetUnits, targetLanguage, API_KEY),
      ]);
      setCurrentWeather(current);
      setForecast(forecastData);
    } catch (err) {
      setCurrentWeather(null);
      setForecast(null);
      setError(err.message || "Could not load weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newCity) => {
    setCity(newCity);
    fetchWeather(newCity, units, language);
  };

  const handleUnitsChange = (newUnits) => {
    setUnits(newUnits);
    if (city) fetchWeather(city, newUnits, language);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (city) fetchWeather(city, units, newLanguage);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper
          elevation={6}
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Typography variant="h4" gutterBottom>
              {translation.title}
              </Typography>
              <SearchBar onSearch={handleSearch} placeholder={translation.enterCity} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <UnitToggle units={units} onChange={handleUnitsChange} />
            </Grid>
            <Grid item xs={12} sm="auto">
              <LanguageToggle language={language} onChange={handleLanguageChange} />
            </Grid>
          </Grid>

          {error && <ErrorBanner message={error || translation.errorGeneric} />}

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {currentWeather && (
                <Box sx={{ mt: 3 }}>
                  <CurrentWeatherCard data={currentWeather} units={units} translation={translation} />
                </Box>
              )}
              {forecast && (
                <Box sx={{ mt: 3 }}>
                  <ForecastGrid data={forecast} units={units} language={language} />
                </Box>
              )}
            </>
          )}
        </Paper>
      </Box>
    </Container>
  )
}

export default App
