import { List, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
/* --- pictures --- */
import logo from "../assets/logo.svg";
import users from "../assets/users.svg";
import wine from "../assets/wine.svg";
import session from "../assets/session.svg";
import grape from "../assets/grape.svg";

export default function AdminNav() {
  const navigate = useNavigate();

  const navIcons = [
    {
      id: 1,
      img: users,
      alt: "users",
    },
    {
      id: 2,
      img: wine,
      alt: "wines",
    },
    {
      id: 3,
      img: grape,
      alt: "grapes",
    },
    {
      id: 4,
      img: session,
      alt: "sessions",
    },
  ];

  return (
    <header
      style={{
        maxWidth: "900px",
        maxHeight: "15%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBlock: "20px",
      }}
    >
      <img src={logo} alt="logo" style={{ width: "15%" }} />
      <nav style={{ width: "80%" }}>
        <List sx={{ width: 1, display: "flex" }}>
          {navIcons.map((icon) => (
            <ListItemButton
              key={icon.id}
              sx={{
                width: 0.25,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={(e) => navigate(`/admin/${e.target.alt}`)}
            >
              <img src={icon.img} alt={icon.alt} style={{ width: "80%" }} />
            </ListItemButton>
          ))}
        </List>
      </nav>
    </header>
  );
}
