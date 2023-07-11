import APIService from "./APIService";

const getCountries = () => {
  return APIService.get(`/countries`);
};

const getCountryById = (id) => {
  return APIService.get(`/countries/${id}`);
};

export default {
  getCountries,
  getCountryById,
};
