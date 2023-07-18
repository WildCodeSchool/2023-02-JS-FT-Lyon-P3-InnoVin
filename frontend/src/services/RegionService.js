import * as yup from "yup";
import APIService from "./APIService";

const getRegions = () => {
  return APIService.get(`/regions`);
};

const getRegionById = (id) => {
  return APIService.get(`/regions/${id}`);
};

const addRegion = (region) => {
  return APIService.post(`/regions`, region);
};

const updateRegion = (region) => {
  return APIService.put(`/regions/${region.id}`, region);
};

const deleteRegion = (id) => {
  return APIService.delete(`/regions/${id}`);
};

const regionSchema = yup.object({
  name: yup
    .string()
    .typeError("Le nom de la région ne doit contenir que des lettres")
    .max(80, "Le nom de la région est trop long")
    .required("Veuillez entrer un nom de région"),
  country_id: yup
    .number()
    .positive()
    .integer()
    .typeError("Veuillez sélectionner un pays dans la liste")
    .required("Veuillez sélectionner un pays"),
});

export default {
  getRegions,
  getRegionById,
  addRegion,
  updateRegion,
  deleteRegion,
  regionSchema,
};
