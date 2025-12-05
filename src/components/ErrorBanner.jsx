import { Alert } from "@mui/material";
import { useWeather } from "../contexts/WeatherContext";

const ErrorBanner = () => {
  const { state: { error } } = useWeather();

  if (!error) return null;

  return (
    <Alert severity="error" sx={{ mt: 2 }}>
      {error}
    </Alert>
  );
}

export default ErrorBanner;