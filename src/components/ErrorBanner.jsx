import { Alert } from "@mui/material";
import { useWeatherState } from "../contexts/WeatherContext";

const ErrorBanner = () => {
  const { error } = useWeatherState();
  if (!error) return null;
  return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
}

export default ErrorBanner;