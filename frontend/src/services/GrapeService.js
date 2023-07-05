import APIService from "./APIService";

const getGrapes = () => {
  return APIService.get(`/grapes`);
};

const getGrapeById = (id) => {
  return APIService.get(`/grapes/${id}`);
};

export default {
  getGrapes,
  getGrapeById,
};
