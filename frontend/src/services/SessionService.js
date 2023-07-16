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

const deleteSession = (id) => {
  return APIService.delete(`/sessions/${id}`);
};

export default {
  getSessions,
  getSessionsById,
  deleteSession,
  addSession,
};
