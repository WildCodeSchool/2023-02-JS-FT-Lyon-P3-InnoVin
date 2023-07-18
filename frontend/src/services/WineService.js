import * as yup from "yup";
import APIService from "./APIService";

const getWines = () => {
  return APIService.get(`/wines`);
};

const getWineById = (id) => {
  return APIService.get(`/wines/${id}`);
};

const addWine = (wine) => {
  return APIService.post(`/wines`, wine);
};

const updateWine = (wine) => {
  return APIService.put(`/wines/${wine.id}`, wine);
};

const deleteWine = (id) => {
  return APIService.delete(`/wines/${id}`);
};

const wineSchema = yup.object({
  name: yup
    .string()
    .typeError("Le nom du vin ne doit contenir que des lettres")
    .max(45, "Le nom du vin est trop long")
    .required("Veuillez entrer le nom d'un vin"),
  country_id: yup
    .number()
    .positive()
    .integer()
    .typeError("Veuillez sélectionner un pays dans la liste")
    .required("Veuillez sélectionner un pays"),
  region_id: yup
    .number()
    .positive()
    .integer()
    .typeError("Veuillez sélectionner une région dans la liste")
    .required("Veuillez sélectionner une région"),
  domain_id: yup
    .number()
    .positive()
    .integer()
    .typeError("Veuillez sélectionner un domaine dans la liste")
    .required("Veuillez sélectionner un domaine"),
  grape_variety_id: yup
    .number()
    .positive()
    .integer()
    .typeError("Veuillez sélectionner un cépage dans la liste")
    .required("Veuillez sélectionner un cépage"),
  vintage: yup
    .number()
    .positive()
    .integer()
    .typeError("Veuillez entrer une année valide")
    .min(1000, "Vous avez vraiment une bouteille aussi vieille ?")
    .max(9999, "Ce millésime n'existe pas (encore)")
    .required("Veuillez entrer une année"),
  aroma_id: yup
    .number()
    .positive()
    .integer()
    .typeError("Veuillez sélectionner un arôme dans la liste")
    .required("Veuillez sélectionner un arôme"),
  flavour_id: yup
    .number()
    .positive()
    .integer()
    .typeError("Veuillez sélectionner une saveur dans la liste")
    .required("Veuillez sélectionner une saveur"),
  type_id: yup
    .number()
    .positive()
    .integer()
    .typeError("Veuillez sélectionner un type dans la liste")
    .required("Veuillez sélectionner un type"),
});

export default {
  getWines,
  getWineById,
  addWine,
  updateWine,
  deleteWine,
  wineSchema,
};
