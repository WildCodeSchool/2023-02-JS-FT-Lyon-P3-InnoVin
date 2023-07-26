import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const SessionContext = createContext();

export default SessionContext;

export function SessionContextProvider({ children }) {
  // on utilise un hook personnalisé
  const [sessionId, setSessionId] = useState(
    JSON.parse(localStorage.getItem("sessionId") || "{}")
  );
  const [sessionWines, setSessionWines] = useState([]);
  const [sessionGrapes, setSessionGrapes] = useState([]);
  const [recipeId, setRecipeId] = useState();

  const memo = useMemo(() => {
    return {
      sessionId,
      setSessionId,
      sessionWines,
      setSessionWines,
      sessionGrapes,
      setSessionGrapes,
      recipeId,
      setRecipeId,
    };
  }, [sessionId, sessionWines, sessionGrapes, recipeId]);

  return (
    <SessionContext.Provider value={memo}>{children}</SessionContext.Provider>
  );
}

SessionContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSessionContext = () => useContext(SessionContext);
