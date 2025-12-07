import { Card, CardContent, Typography, Box } from "@mui/material";
import { useWeatherState } from "../contexts/WeatherContext";

const ForecastCard = ({ day }) => {
  const { units, language } = useWeatherState();

  const tempUnit = units === "metric" ? "°C" : "°F";

  return (
    <Card
      sx={{
        borderRadius: 3,
        textAlign: "center",
        bgcolor: "rgba(255,255,255,0.04)",
      }}
    >
      <CardContent>
        <Typography variant="subtitle2">
          {new Date(day.date).toLocaleDateString(language, {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </Typography>
        <Box sx={{ my: 1 }}>
          <img
            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
            alt={day.desc}
          />
        </Box>
        <Typography variant="body2">
          {Math.round(day.min)} / {Math.round(day.max)} {tempUnit}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ForecastCard;