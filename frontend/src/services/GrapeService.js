import * as yup from "yup";
import APIService from "./APIService";

const getGrapes = () => {
  return APIService.get(`/grapes`);
};

const getGrapeById = (id) => {
  return APIService.get(`/grapes/${id}`);
};

const addGrape = (grape) => {
  return APIService.post(`/grapes`, grape);
};

const updateGrape = (grape) => {
  return APIService.put(`/grapes/${grape.id}`, grape);
};

const deleteGrape = (id) => {
  return APIService.delete(`/grapes/${id}`);
};

const grapeSchema = yup.object({
  name: yup
    .string()
    .typeError("Le nom du cépage ne doit contenir que des lettres")
    .max(45, "Le nom du cépage est trop long")
    .required("Veuillez entrer le nom d'un cépage"),
  picture: yup
    .string()
    .typeError("L'image doit être sous forme d'URL")
    .url("L'image doit être sous forme d'URL")
    .nullable(),
});

export default {
  getGrapes,
  getGrapeById,
  addGrape,
  updateGrape,
  deleteGrape,
  grapeSchema,
};
