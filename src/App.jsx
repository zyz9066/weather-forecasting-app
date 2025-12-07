import { useCallback } from "react";
import { Box, CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";
import { useWeatherState, useWeatherDispatch } from "./contexts/WeatherContext";
import SearchBar from "./components/SearchBar";
import UnitToggle from "./components/UnitToggle"
import LanguageToggle from "./components/LanguageToggle";
import WeatherCard from "./components/WeatherCard";
import ForecastGrid from "./components/ForecastGrid";
import ErrorBanner from "./components/ErrorBanner";

const App = () => {
  const { city, units, weather, forecast, loading, language, translation } = useWeatherState();
  const { dispatch, actions } = useWeatherDispatch();

  const handleUnitsChange = useCallback((newUnits) => {
    actions.setUnits(dispatch, newUnits);
    if (city) actions.loadWeatherByCity(dispatch, city, newUnits, language);
  }, [actions, city]);

  const handleLanguageChange = useCallback((newLanguage) => {
    actions.setLanguage(dispatch, newLanguage);
    if (city) actions.loadWeatherByCity(dispatch, city, units, newLanguage);
  }, [actions, city]);

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper elevation={6} sx={{ p: 3, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid>
              <Typography variant="h4" gutterBottom>
                {translation.title}
              </Typography>
              <SearchBar />
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "flex-end", gap: 2, alignItems: "center" }}>
              <UnitToggle onChange={handleUnitsChange} />
              <LanguageToggle onChange={handleLanguageChange} />
            </Grid>
          </Grid>

          <ErrorBanner />

          {!loading && !weather && !forecast && city === "" && (
            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Typography variant="body1" color="text.secondary">
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
              {weather && (
                <Box sx={{ mt: 3 }}>
                  <WeatherCard />
                </Box>
              )}
              {forecast && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    5-Day Forecast
                  </Typography>
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
