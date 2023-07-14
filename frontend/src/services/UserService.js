import APIService from "./APIService";

const getUsers = () => {
  return APIService.get(`/users`);
};

const getUserById = (id) => {
  return APIService.get(`/users/${id}`);
};

const deleteUser = (id) => {
  return APIService.delete(`/users/${id}`);
};

export default {
  getUsers,
  getUserById,
  deleteUser,
};
