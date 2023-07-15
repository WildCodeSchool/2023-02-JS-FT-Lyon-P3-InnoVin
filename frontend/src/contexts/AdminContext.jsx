import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const AdminContext = createContext();

export default AdminContext;

export function AdminContextProvider({ children }) {
  // Nav
  const [nav, setNav] = useState("users");
  // Search
  const [query, setQuery] = useState("");
  // Users
  const [usersData, setUsersData] = useState([]);
  // Wines
  const [winesData, setWinesData] = useState([]);
  const [grapesData, setGrapesData] = useState([]);
  const [typesData, setTypesData] = useState([]);
  const [aromasData, setAromasData] = useState([]);
  const [flavoursData, setFlavoursData] = useState([]);
  const [domainsData, setDomainsData] = useState([]);
  const [regionsData, setRegionsData] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [sessionsData, setSessionsData] = useState([]);

  const memo = useMemo(() => {
    return {
      nav,
      setNav,
      query,
      setQuery,
      usersData,
      setUsersData,
      winesData,
      setWinesData,
      grapesData,
      setGrapesData,
      typesData,
      setTypesData,
      aromasData,
      setAromasData,
      flavoursData,
      setFlavoursData,
      domainsData,
      setDomainsData,
      regionsData,
      setRegionsData,
      countriesData,
      setCountriesData,
      sessionsData,
      setSessionsData,
    };
  }, [
    nav,
    query,
    usersData,
    winesData,
    grapesData,
    typesData,
    aromasData,
    flavoursData,
    domainsData,
    regionsData,
    countriesData,
    sessionsData,
  ]);

  return <AdminContext.Provider value={memo}>{children}</AdminContext.Provider>;
}

AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook
export const useAdminContext = () => useContext(AdminContext);
