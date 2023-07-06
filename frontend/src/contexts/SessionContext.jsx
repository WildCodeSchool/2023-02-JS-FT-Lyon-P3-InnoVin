import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const SessionContext = createContext();

export default SessionContext;

export function SessionContextProvider({ children }) {
  // on utilise un hook personnalisé
  const [sessionWines, setSessionWines] = useState([]);
  const [sessionGrapes, setSessionGrapes] = useState([]);

  const memo = useMemo(() => {
    return {
      sessionWines,
      setSessionWines,
      sessionGrapes,
      setSessionGrapes,
    };
  }, [sessionWines, sessionGrapes]);

  return (
    <SessionContext.Provider value={memo}>{children}</SessionContext.Provider>
  );
}

SessionContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSessionContext = () => useContext(SessionContext);
