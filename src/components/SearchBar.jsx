import { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchIcon from "@mui/icons-material/Search";
import { useWeatherState } from "../contexts/WeatherContext";
import { useWeatherSearch } from "../hooks/useWeatherSearch";

const SearchBar = () => {
  const { translation } = useWeatherState();
  const { searchCity, useCurrentLocation } = useWeatherSearch();
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    searchCity(value.trim());
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
      <IconButton type="submit" color="primary">
        <SearchIcon />
      </IconButton>
      <IconButton onClick={useCurrentLocation} color="secondary">
        <MyLocationIcon />
      </IconButton>
    </Box>
  );
}

export default SearchBar;