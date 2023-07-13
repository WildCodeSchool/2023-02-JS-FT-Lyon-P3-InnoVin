import APIService from "./APIService";

const getRecipes = () => {
  return APIService.get(`/recipes`);
};
const getRecipesById = (id) => {
  return APIService.get(`/recipes/${id}`);
};
export default {
  getRecipes,
  getRecipesById,
};
