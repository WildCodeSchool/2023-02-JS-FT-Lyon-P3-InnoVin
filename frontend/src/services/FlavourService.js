import APIService from "./APIService";

const getFlavours = () => {
  return APIService.get(`/flavours`);
};

const getFlavourById = (id) => {
  return APIService.get(`/flavours/${id}`);
};

export default {
  getFlavours,
  getFlavourById,
};
