import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export default UserContext;

export function UserContextProvider({ children }) {
  // on utilise un hook personnalisé
  const [user, setUser] = useState({});

  const logout = async () => {
    try {
      setUser({});
    } catch (error) {
      console.error(error);
    }
  };

  const login = (_user) => {
    setUser(_user);
  };

  const memo = useMemo(() => {
    return {
      user,
      logout,
      login,
    };
  }, [user]);

  return <UserContext.Provider value={memo}>{children}</UserContext.Provider>;
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUserContext = () => useContext(UserContext);
