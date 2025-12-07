import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useWeatherState } from "../contexts/WeatherContext";

 const UnitToggle = ({ onChange }) => {
  const { units } = useWeatherState();

  const handleChange = (_, newUnits) => {
    if (newUnits !== null) onChange(newUnits);
  };

  return (
    <ToggleButtonGroup
      value={units}
      exclusive
      onChange={handleChange}
      fullWidth
      size="small"
      color="secondary"
      sx={{ justifyContent: "center" }}
    >
      <ToggleButton value="metric">°C</ToggleButton>
      <ToggleButton value="imperial">°F</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default UnitToggle;