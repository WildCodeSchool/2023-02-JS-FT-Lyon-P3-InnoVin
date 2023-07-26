import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import APIService from "../services/APIService";

const UserContext = createContext();

export default UserContext;

export function UserContextProvider({ children }) {
  // on utilise un hook personnalisé
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [userWines, setUserWines] = useState(
    JSON.parse(localStorage.getItem("userWines") || "[]")
  );
  const [userPick, setUserPick] = useState(null);
  const [preferredWines, setPreferredWines] = useState(
    JSON.parse(localStorage.getItem("preferredWines") || "[]")
  );

  const logout = async () => {
    try {
      await APIService.get("/logout");
      setUser({});
      localStorage.removeItem("user");
      setUserWines([]);
      localStorage.removeItem("userWines");
      setPreferredWines([]);
      localStorage.removeItem("preferredWines");
      localStorage.removeItem("sessionId");
    } catch (error) {
      console.error(error);
    }
  };

  const login = (_user) => {
    setUser(_user);
    localStorage.setItem("user", JSON.stringify(_user));
  };

  const memo = useMemo(() => {
    return {
      user,
      userWines,
      userPick,
      preferredWines,
      setUser,
      setUserPick,
      setUserWines,
      setPreferredWines,
      logout,
      login,
    };
  }, [user, userWines, userPick, preferredWines]);

  return <UserContext.Provider value={memo}>{children}</UserContext.Provider>;
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUserContext = () => useContext(UserContext);
