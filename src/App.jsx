
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
  const { dispatch, actions } = useWeatherDispatch();

  const handleSearch = (newCity) => {
    actions.setCity(dispatch, newCity);
    actions.loadWeather(dispatch, newCity, units, language);
  };

  const handleUnitsChange = (newUnits) => {
    actions.setUnits(dispatch, newUnits);
    if (city) actions.loadWeather(dispatch, city, newUnits, language);
  };

  const handleLanguageChange = (newLanguage) => {
    actions.setLanguage(dispatch, newLanguage);
    if (city) actions.loadWeather(dispatch, city, units, newLanguage);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper elevation={6} sx={{ p: 3, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid>
              <Typography variant="h4" gutterBottom>{translation.title}</Typography>
              <SearchBar onSearch={handleSearch} />
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "flex-end", gap: 2, alignItems: "center" }}>
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
