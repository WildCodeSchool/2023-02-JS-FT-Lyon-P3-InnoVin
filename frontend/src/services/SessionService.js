import APIService from "./APIService";

const getSessions = () => {
  return APIService.get(`/sessions`);
};

const getSessionsById = (id) => {
  return APIService.get(`/sessions/${id}`);
};

export default {
  getSessions,
  getSessionsById,
};
