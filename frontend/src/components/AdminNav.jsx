import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminNav.module.css";
/* --- pictures --- */
import logo from "../assets/logo.svg";
import users from "../assets/users.svg";
import wine from "../assets/wine.svg";
import session from "../assets/session.svg";
import grape from "../assets/grape.svg";

export default function AdminNav() {
  const [nav, setNav] = useState("users");
  const navigate = useNavigate();

  const handleClick = (e) => {
    setNav(e.target.id);
    navigate(`/admin/${nav}`);
  };

  const navIcons = [
    {
      img: users,
      alt: "users",
    },
    {
      img: wine,
      alt: "wines",
    },
    {
      img: grape,
      alt: "grapes",
    },
    {
      img: session,
      alt: "sessions",
    },
  ];

  return (
    <header className={styles.navbox}>
      <nav>
        <ul>
          <li>
            <img src={logo} alt="logo" />
          </li>
          {navIcons.map((icon) => (
            <li
              key={icon.alt}
              className={nav === icon.alt ? styles.active : null}
            >
              <button type="button" id={icon.alt} onClick={handleClick}>
                <img src={icon.img} alt={icon.alt} id={icon.alt} />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
