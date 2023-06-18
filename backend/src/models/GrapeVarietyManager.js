const AbstractManager = require("./AbstractManager");

class GrapeVarietyManager extends AbstractManager {
  constructor() {
    super({ table: "Grape_variety" });
  }

  insert(grape_variety) {
    return this.database.query(
      `INSERT INTO ${this.table} (name, picture) VALUES (?, ?)`,
      [
        grape_variety.name, 
        grape_variety.picture, 
      ]
    );
  }

  update(grape_variety) {
    return this.database.query(
      `update ${this.table} set name = ?, set picture = ? where id = ?`,
      [
        grape_variety.name,
        grape_variety.picture,
       ]
    );
  }
}

module.exports = GrapeVarietyManager;