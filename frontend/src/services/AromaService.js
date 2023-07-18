import APIService from "./APIService";

const getAromas = () => {
  return APIService.get(`/aromas`);
};

const getAromaById = (id) => {
  return APIService.get(`/aromas/${id}`);
};

export default {
  getAromas,
  getAromaById,
};
