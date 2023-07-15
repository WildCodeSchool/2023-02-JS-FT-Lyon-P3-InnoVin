import APIService from "./APIService";

const getCountries = () => {
  return APIService.get(`/countries`);
};

const getCountryById = (id) => {
  return APIService.get(`/countries/${id}`);
};

const addCountry = (country) => {
  return APIService.post(`/countries`, country);
};

const updateCountry = (country) => {
  return APIService.put(`/countries/${country.id}`, country);
};

const deleteCountry = (id) => {
  return APIService.delete(`/countries/${id}`);
};

export default {
  getCountries,
  getCountryById,
  addCountry,
  updateCountry,
  deleteCountry,
};
