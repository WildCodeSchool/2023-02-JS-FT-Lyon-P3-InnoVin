import APIService from "./APIService";

const getTypes = () => {
  return APIService.get(`/types`);
};

const getTypeById = (id) => {
  return APIService.get(`/types/${id}`);
};

export default {
  getTypes,
  getTypeById,
};
