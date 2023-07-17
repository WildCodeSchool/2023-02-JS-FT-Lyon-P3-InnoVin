import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export default UserContext;

export function UserContextProvider({ children }) {
  // on utilise un hook personnalisé
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [userWines, setUserWines] = useState([]);
  const [userPick, setUserPick] = useState(null);
  const [preferredWines, setPreferredWines] = useState();

  const logout = () => {
    setUser({});
    localStorage.removeItem("user");
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
