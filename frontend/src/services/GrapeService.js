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

export default {
  getGrapes,
  getGrapeById,
  addGrape,
  updateGrape,
  deleteGrape,
};
