import { ToggleButtonGroup, ToggleButton } from "@mui/material";

 const UnitToggle = ({ units, onChange }) => {
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