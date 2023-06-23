import { useState } from "react";
import { Search } from "@mui/icons-material";
import { InputBase, IconButton, Divider, Paper } from "@mui/material";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Paper
      sx={{
        pl: "10px",
        display: "flex",
        alignItems: "center",
        width: 0.5,
        backgroundColor: "text.primary",
        marginBlock: "10px",
      }}
    >
      <InputBase
        sx={{ flex: 1, color: "background.default" }}
        placeholder="Rechercher"
        value={search}
        onChange={handleChangeSearch}
      />
      <Divider
        sx={{ height: 0.6, m: 0.5, backgroundColor: "background.default" }}
        orientation="vertical"
      />
      <IconButton
        type="button"
        sx={{ color: "background.default", p: "10px" }}
        aria-label="search"
      >
        <Search />
      </IconButton>
    </Paper>
  );
}
