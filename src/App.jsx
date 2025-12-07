
import { Box, Container, Paper, Grid, Typography, CircularProgress } from "@mui/material";
import { useWeatherState, useWeatherDispatch } from "./contexts/WeatherContext";
import SearchBar from "./components/SearchBar";
import UnitToggle from "./components/UnitToggle"
import LanguageToggle from "./components/LanguageToggle";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastGrid from "./components/ForecastGrid";
import ErrorBanner from "./components/ErrorBanner";


const App = () => {
  const { city, units, currentWeather, forecast, loading, error, language, translation } = useWeatherState();
  const { dispatch, fetchWeather } = useWeatherDispatch();

  const handleSearch = (newCity) => {
    dispatch({ type: "SET_CITY", city: newCity });
    fetchWeather(newCity, units, language);
  };

  const handleUnitsChange = (newUnits) => {
    dispatch({ type: "SET_UNITS", units: newUnits });
    if (city) fetchWeather(city, newUnits, language);
  };

  const handleLanguageChange = (newLanguage) => {
    dispatch({ type: "SET_LANGUAGE", language: newLanguage });
    if (city) fetchWeather(city, units, newLanguage);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper elevation={6} sx={{ p: 3, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" gutterBottom>
              {translation.title}
              </Typography>
              <SearchBar onSearch={handleSearch} />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end", gap: 2, alignItems: "center" }}>
              <UnitToggle onChange={handleUnitsChange} />
              <LanguageToggle onChange={handleLanguageChange} />
            </Grid>
          </Grid>

          {error && <ErrorBanner />}

          {!loading && !currentWeather && !forecast && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                {translation.noData}
              </Typography>
            </Box>
          )}

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {currentWeather && (
                <Box sx={{ mt: 3 }}>
                  <CurrentWeatherCard />
                </Box>
              )}
              {forecast && (
                <Box sx={{ mt: 3 }}>
                  <ForecastGrid />
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
