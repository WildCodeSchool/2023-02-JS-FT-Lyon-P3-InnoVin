import * as yup from "yup";
import APIService from "./APIService";

const getSessions = () => {
  return APIService.get(`/sessions`);
};

const getSessionsById = (id) => {
  return APIService.get(`/sessions/${id}`);
};

const addSession = (session) => {
  return APIService.post(`/sessions`, session);
};

const updateSession = (session) => {
  return APIService.put(`/sessions/${session.id}`, session);
};

const deleteSession = (id) => {
  return APIService.delete(`/sessions/${id}`);
};

const sessionSchema = yup.object({
  date: yup.string().required("Veuillez entrer la date de la session"),
  time: yup.string().required("Veuillez préciser l'heure de la session"),
  wine1: yup.string().required("Veuillez sélectionnez l'ensemble des vins"),
  wine2: yup.string().required("Veuillez sélectionnez l'ensemble des vins"),
  wine3: yup.string().required("Veuillez sélectionnez l'ensemble des vins"),
  wine4: yup.string().required("Veuillez sélectionnez l'ensemble des vins"),
});

export default {
  getSessions,
  getSessionsById,
  deleteSession,
  addSession,
  updateSession,
  sessionSchema,
};
