import APIService from "./APIService";

const getRegions = () => {
  return APIService.get(`/regions`);
};

const getRegionById = (id) => {
  return APIService.get(`/regions/${id}`);
};

const addRegion = (region) => {
  return APIService.post(`/regions`, region);
};

const updateRegion = (region) => {
  return APIService.put(`/regions/${region.id}`, region);
};

const deleteRegion = (id) => {
  return APIService.delete(`/regions/${id}`);
};

export default {
  getRegions,
  getRegionById,
  addRegion,
  updateRegion,
  deleteRegion,
};
