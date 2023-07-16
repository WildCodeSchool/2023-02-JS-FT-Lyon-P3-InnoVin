import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../contexts/AdminContext";
import styles from "./AdminNav.module.css";
/* --- pictures --- */
import logo from "../assets/logo.svg";
import users from "../assets/users.svg";
import wine from "../assets/wine.svg";
import session from "../assets/session.svg";
import recipe from "../assets/recipe.svg";

export default function AdminNav() {
  const { nav, setNav, setQuery } = useAdminContext();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/admin/${nav}`);
  }, [nav]);

  const handleClick = (e) => {
    setNav(e.target.id);
    setQuery("");
  };

  const navIcons = [
    {
      img: logo,
      alt: "home",
    },
    {
      img: users,
      alt: "users",
    },
    {
      img: wine,
      alt: "wines",
    },
    {
      img: session,
      alt: "sessions",
    },
    {
      img: recipe,
      alt: "recipes",
    },
  ];

  return (
    <header className={styles.navbox}>
      <nav>
        <ul>
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
