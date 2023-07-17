import APIService from "./APIService";

const getWinesOfSessions = () => {
  return APIService.get(`/sessionhaswines`);
};

const addSessionWines = (session) => {
  return APIService.post(`/sessionhaswines`, session);
};

const deleteCurrentSessionWines = (id) => {
  return APIService.delete(`/sessionhaswines/${id}`);
};

export default {
  getWinesOfSessions,
  addSessionWines,
  deleteCurrentSessionWines,
};
