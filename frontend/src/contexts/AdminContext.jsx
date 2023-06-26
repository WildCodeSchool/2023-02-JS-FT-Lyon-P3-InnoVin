import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const AdminContext = createContext();

export default AdminContext;

export function AdminContextProvider({ children }) {
  const [nav, setNav] = useState("users");
  const [usersData, setUsersData] = useState([]);
  const [winesData, setWinesData] = useState([]);

  const memo = useMemo(() => {
    return {
      nav,
      setNav,
      usersData,
      setUsersData,
      winesData,
      setWinesData,
    };
  }, [nav, usersData, winesData]);

  return <AdminContext.Provider value={memo}>{children}</AdminContext.Provider>;
}

AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook
export const useAdminContext = () => useContext(AdminContext);
