import APIService from "./APIService";

const getDomains = () => {
  return APIService.get(`/domains`);
};

const getDomainById = (id) => {
  return APIService.get(`/domains/${id}`);
};

const addDomain = (domain) => {
  return APIService.post(`/domains`, domain);
};

const updateDomain = (domain) => {
  return APIService.put(`/domains/${domain.id}`, domain);
};

const deleteDomain = (id) => {
  return APIService.delete(`/domains/${id}`);
};

export default {
  getDomains,
  getDomainById,
  addDomain,
  updateDomain,
  deleteDomain,
};
