import { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch, placeholder }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value.trim());
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 1 }}
    >
      <TextField
        fullWidth
        size="small"
        label={placeholder}
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