import APIService from "./APIService";

const getUsers = () => {
  return APIService.get(`/register`);
};

const getUserById = (id) => {
  return APIService.get(`/register/${id}`);
};

export default {
  getUsers,
  getUserById,
};
