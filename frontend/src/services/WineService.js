import APIService from "./APIService";

const getWines = () => {
  return APIService.get(`/wines`);
};

const getWineById = (id) => {
  return APIService.get(`/wines/${id}`);
};

export default {
  getWines,
  getWineById,
};
