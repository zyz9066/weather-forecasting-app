import { Card, CardHeader, CardContent, Typography, Stack } from "@mui/material";

const CurrentWeatherCard = ({ data, units, translation }) => {
    const tempUnit = units === "metric" ? translation.unitC : translation.unitF;
    const speedUnit = units === "metric" ? "m/s" : "mph";
    const icon = data.weather?.[0]?.icon;
    const desc = data.weather?.[0]?.description;
  
    return (
      <Card
        sx={{
          borderRadius: 3,
          bgcolor: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(8px)",
        }}
      >
        <CardHeader
          title={`${data.name}, ${data.sys.country}`}
          subheader={desc}
          avatar={
            icon ? (
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={desc}
              />
            ) : null
          }
        />
        <CardContent>
          <Typography variant="h3">
            {Math.round(data.main.temp)} {tempUnit}
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            sx={{ mt: 2, flexWrap: "wrap" }}
          >
            <Typography>
              {translation.feelsLike}: {Math.round(data.main.feels_like)} {tempUnit}
            </Typography>
            <Typography>{translation.humidity}: {data.main.humidity}%</Typography>
            <Typography>
              {translation.wind}: {Math.round(data.wind.speed)} {speedUnit}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    );
  };

export default CurrentWeatherCard;