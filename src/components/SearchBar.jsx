import { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useWeatherState } from "../contexts/WeatherContext";

const SearchBar = ({ onSearch }) => {
  const { translation } = useWeatherState();
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value.trim());
    setValue(""); // Clear input after search
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 1 }}>
      <TextField
        fullWidth
        size="small"
        label={translation.enterCity}
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconButton type="submit" color="primary" sx={{ flexShrink: 0 }}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
}

export default SearchBar;