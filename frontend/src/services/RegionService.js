import APIService from "./APIService";

const getRegions = () => {
  return APIService.get(`/regions`);
};

const getRegionById = (id) => {
  return APIService.get(`/regions/${id}`);
};

export default {
  getRegions,
  getRegionById,
};
