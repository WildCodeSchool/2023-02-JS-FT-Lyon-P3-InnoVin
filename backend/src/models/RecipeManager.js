const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }

  insert(recipe) {
    return this.database.query(
      `insert into ${this.table} (user_id, session_id, name) values (?, ?, ?)`,
      [recipe.user_id, recipe.session_id, recipe.name]
    );
  }

  update(recipe) {
    return this.database.query(
      `update ${this.table} set user_id = ?, session_id = ?, name = ? where id = ?`,
      [recipe.user_id, recipe.session_id, recipe.name, recipe.id]
    );
  }
}
module.exports = RecipeManager;
