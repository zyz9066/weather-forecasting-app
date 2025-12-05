
import { Box, Container, Paper, Grid, Typography, CircularProgress } from "@mui/material";
import { useWeather } from "./contexts/WeatherContext";
import SearchBar from "./components/SearchBar";
import UnitToggle from "./components/UnitToggle"
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastGrid from "./components/ForecastGrid";
import ErrorBanner from "./components/ErrorBanner";
import LanguageToggle from "./components/LanguageToggle";


const App = () => {
  const { state, dispatch, translation, fetchWeather } = useWeather();

  const handleSearch = (newCity) => {
    dispatch({ type: "SET_CITY", city: newCity });
    fetchWeather(newCity, state.units, state.language);
  };

  const handleUnitsChange = (newUnits) => {
    dispatch({ type: "SET_UNITS", units: newUnits });
    if (state.city) fetchWeather(state.city, newUnits, state.language);
  };

  const handleLanguageChange = (newLanguage) => {
    dispatch({ type: "SET_LANGUAGE", language: newLanguage });
    if (state.city) fetchWeather(state.city, state.units, newLanguage);
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
              <SearchBar onSearch={handleSearch} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <UnitToggle onChange={handleUnitsChange} />
            </Grid>
            <Grid item xs={12} sm="auto">
              <LanguageToggle onChange={handleLanguageChange} />
            </Grid>
          </Grid>

          {state.error && <ErrorBanner />}

          {state.loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {state.currentWeather && (
                <Box sx={{ mt: 3 }}>
                  <CurrentWeatherCard />
                </Box>
              )}
              {state.forecast && (
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
