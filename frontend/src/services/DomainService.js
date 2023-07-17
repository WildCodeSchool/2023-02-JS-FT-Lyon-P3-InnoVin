import * as yup from "yup";
import APIService from "./APIService";

const getDomains = () => {
  return APIService.get(`/domains`);
};

const getDomainById = (id) => {
  return APIService.get(`/domains/${id}`);
};

const addDomain = (domain) => {
  return APIService.post(`/domains`, domain);
};

const updateDomain = (domain) => {
  return APIService.put(`/domains/${domain.id}`, domain);
};

const deleteDomain = (id) => {
  return APIService.delete(`/domains/${id}`);
};

const domainSchema = yup.object({
  name: yup
    .string()
    .typeError("Le nom du domaine ne doit contenir que des lettres")
    .max(80, "Le nom du domaine est trop long")
    .required("Veuillez entrer le nom d'un domaine"),
  region_id: yup
    .number()
    .positive()
    .integer()
    .typeError("Veuillez sélectionner une région dans la liste")
    .required("Veuillez sélectionner une région"),
});

export default {
  getDomains,
  getDomainById,
  addDomain,
  updateDomain,
  deleteDomain,
  domainSchema,
};
