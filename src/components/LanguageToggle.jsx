import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useWeatherState } from "../contexts/WeatherContext";

const LanguageToggle = ({ onChange }) => {
  const { language } = useWeatherState();

  const handleChange = (_, newLanguage) => {
    if (newLanguage !== null) onChange(newLanguage);
  };

  return (
    <ToggleButtonGroup
      value={language}
      exclusive
      onChange={handleChange}
      size="small"
      color="primary"
    >
      <ToggleButton value="en">EN</ToggleButton>
      <ToggleButton value="fr">FR</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageToggle;
