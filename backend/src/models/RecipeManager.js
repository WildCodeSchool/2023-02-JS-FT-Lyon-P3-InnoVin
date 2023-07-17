const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }
  // Override

  // Override
  findAll() {
    return this.database.query(
      `select
      concat(u.firstname, ' ', u.lastname) as user_name, s.date as session_date, r.id as recipe_id, r.name as recipe_name,
      group_concat (distinct concat(w.name, ' (', rw.dosage, ')') separator ', ') as wine_info
    from ${this.table} as r
    join user u on r.user_id = u.id
    join session s on r.session_id = s.id
    join recipe_has_wine rw on r.id = rw.recipe_id
    join wine w on rw.wine_id = w.id
    group by
      user_name, session_date, recipe_id, recipe_name;`
    );
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
