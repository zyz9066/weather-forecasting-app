import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const LanguageToggle = ({ language, onChange }) => {
  const handleChange = (_, newLang) => {
    if (newLang !== null) onChange(newLang);
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
