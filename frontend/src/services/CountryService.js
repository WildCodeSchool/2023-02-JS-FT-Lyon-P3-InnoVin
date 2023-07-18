import * as yup from "yup";
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

const countrySchema = yup.object({
  name: yup
    .string("Le nom du pays ne doit contenir que des lettres")
    .max(45, "Le nom du pays est trop long")
    .required("Veuillez entrer le nom du pays"),
});

export default {
  getCountries,
  getCountryById,
  addCountry,
  updateCountry,
  deleteCountry,
  countrySchema,
};
