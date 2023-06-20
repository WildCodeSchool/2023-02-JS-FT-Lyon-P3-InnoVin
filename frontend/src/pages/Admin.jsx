import { Box } from "@mui/system";
import { ListItem, List, ListItemButton } from "@mui/material";
import logo from "../assets/logo.svg";
import users from "../assets/users.svg";
import wine from "../assets/wine.svg";
import session from "../assets/session.svg";
import grape from "../assets/grape.svg";

export default function Admin() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <header
        style={{
          width: "95%",
          minHeight: "15%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginInline: "auto",
        }}
      >
        <img src={logo} alt="logo" style={{ width: "20%" }} />
        <nav style={{ width: "80%" }}>
          <List sx={{ width: 1, display: "flex" }}>
            {[users, wine, grape, session].map((icon, index) => (
              <ListItem key={icon} sx={{ width: 0.25 }}>
                <ListItemButton sx={{ width: 1 }}>
                  <img
                    src={icon}
                    alt={`navigation logo ${index + 1}`}
                    style={{ width: "100%" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </header>
      <Box>searchbar + add button</Box>
      <Box>tables</Box>
    </div>
  );
}
