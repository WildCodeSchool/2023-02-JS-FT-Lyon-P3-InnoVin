import APIService from "./APIService";

const getWinesOfSessions = () => {
  return APIService.get(`/sessionhaswines`);
};

const addSessionWines = (session) => {
  return APIService.post(`/sessionhaswines`, session);
};

export default {
  getWinesOfSessions,
  addSessionWines,
};
