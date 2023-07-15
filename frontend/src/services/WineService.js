import APIService from "./APIService";

const getWines = () => {
  return APIService.get(`/wines`);
};

const getWineById = (id) => {
  return APIService.get(`/wines/${id}`);
};

const addWine = (wine) => {
  return APIService.post(`/wines`, wine);
};

const updateWine = (wine) => {
  return APIService.put(`/wines/${wine.id}`, wine);
};

const deleteWine = (id) => {
  return APIService.delete(`/wines/${id}`);
};

export default {
  getWines,
  getWineById,
  addWine,
  updateWine,
  deleteWine,
};
