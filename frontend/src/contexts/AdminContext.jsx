import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const AdminContext = createContext();

export default AdminContext;

export function AdminContextProvider({ children }) {
  const [nav, setNav] = useState("users");
  const [usersData, setUsersData] = useState([]);
  const [winesData, setWinesData] = useState([]);
  const [grapesData, setGrapesData] = useState([]);
  const [typesData, setTypesData] = useState([]);
  const [aromasData, setAromasData] = useState([]);
  const [flavoursData, setFlavoursData] = useState([]);
  const [domainsData, setDomainsData] = useState([]);
  const [regionsData, setRegionsData] = useState([]);
  const [countriesData, setCountriesData] = useState([]);

  const memo = useMemo(() => {
    return {
      nav,
      setNav,
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
    };
  }, [
    nav,
    usersData,
    winesData,
    grapesData,
    typesData,
    aromasData,
    flavoursData,
    domainsData,
    regionsData,
    countriesData,
  ]);

  return <AdminContext.Provider value={memo}>{children}</AdminContext.Provider>;
}

AdminContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook
export const useAdminContext = () => useContext(AdminContext);
