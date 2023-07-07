import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export default UserContext;

export function UserContextProvider({ children }) {
  // on utilise un hook personnalisé
  const [user, setUser] = useState({});
  const [userPick, setUserPick] = useState(null);
  const [tastedWines, setTastedWines] = useState({
    wine1: {
      isDisabled: false,
      tastingNote: null,
    },
    wine2: {
      isDisabled: false,
      tastingNote: null,
    },
    wine3: {
      isDisabled: false,
      tastingNote: null,
    },
    wine4: {
      isDisabled: false,
      tastingNote: null,
    },
  });

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
      userPick,
      tastedWines,
      setUserPick,
      setTastedWines,
      logout,
      login,
    };
  }, [user, userPick, tastedWines]);

  return <UserContext.Provider value={memo}>{children}</UserContext.Provider>;
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUserContext = () => useContext(UserContext);
