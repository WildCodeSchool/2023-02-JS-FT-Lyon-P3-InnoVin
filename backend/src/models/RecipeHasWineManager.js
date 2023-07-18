const AbstractManager = require("./AbstractManager");

class RecipeHasWineManager extends AbstractManager {
  constructor() {
    super({ table: "recipe_has_wine" });
  }

  insert(recipehaswine) {
    return this.database.query(
      `insert into ${this.table} (recipe_id, wine_id, dosage) values (?, ?, ?), (?, ?, ?),(?, ?, ?)`,
      [
        recipehaswine.recipe_id,
        recipehaswine.wine_id1,
        recipehaswine.dosage1,
        recipehaswine.recipe_id,
        recipehaswine.wine_id2,
        recipehaswine.dosage2,
        recipehaswine.recipe_id,
        recipehaswine.wine_id3,
        recipehaswine.dosage3,
      ]
    );
  }

  update(recipehaswine) {
    return this.database.query(
      `update ${this.table} set recipe_id = ?, wine_id = ?, dosage = ? where id = ?`,
      [
        recipehaswine.recipe_id,
        recipehaswine.wine_id,
        recipehaswine.dosage,
        recipehaswine.id,
      ]
    );
  }
}
module.exports = RecipeHasWineManager;
