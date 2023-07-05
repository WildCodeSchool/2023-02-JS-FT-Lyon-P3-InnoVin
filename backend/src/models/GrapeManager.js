const AbstractManager = require("./AbstractManager");

class GrapeManager extends AbstractManager {
  constructor() {
    super({ table: "grape_variety" });
  }

  insert(grape) {
    return this.database.query(
      `insert into ${this.table} (name, picture) values (?, ?)`,
      [grape.name, grape.picture]
    );
  }

  update(grape) {
    return this.database.query(
      `update ${this.table} set name = ?, picture = ? where id = ?`,
      [grape.name, grape.picture, grape.id]
    );
  }
}

module.exports = GrapeManager;
