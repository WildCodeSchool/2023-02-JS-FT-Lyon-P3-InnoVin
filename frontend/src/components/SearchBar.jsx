import { Cancel, Search } from "@mui/icons-material";
import { InputBase, IconButton, Paper } from "@mui/material";
import { useAdminContext } from "../contexts/AdminContext";

export default function SearchBar() {
  const { query, setQuery } = useAdminContext();

  const handleChangeSearch = (e) => {
    setQuery(e.target.value);
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
        value={query}
        onChange={handleChangeSearch}
      />
      {query ? (
        <IconButton
          type="button"
          sx={{ color: "background.default", p: "10px" }}
          aria-label="cancel"
          onClick={() => setQuery("")}
        >
          <Cancel />
        </IconButton>
      ) : (
        <IconButton
          type="button"
          sx={{ color: "background.default", p: "10px" }}
          aria-label="search"
        >
          <Search />
        </IconButton>
      )}
    </Paper>
  );
}
