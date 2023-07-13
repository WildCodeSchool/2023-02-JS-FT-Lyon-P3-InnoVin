const AbstractManager = require("./AbstractManager");

class RecipeHasWineManager extends AbstractManager {
  constructor() {
    super({ table: "recipehaswine" });
  }

  insert(recipehaswine) {
    return this.database.query(
      `insert into ${this.table} (recipe_id, wine_id, dosage) values (?, ?, ?)`,
      [recipehaswine.recipe_id, recipehaswine.wine_id, recipehaswine.dosage]
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
