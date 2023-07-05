import APIService from "./APIService";

const getDomains = () => {
  return APIService.get(`/domains`);
};

const getDomainById = (id) => {
  return APIService.get(`/domains/${id}`);
};

export default {
  getDomains,
  getDomainById,
};
