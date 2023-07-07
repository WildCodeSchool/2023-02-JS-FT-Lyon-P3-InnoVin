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

  findGrapesBySessionId(sessionId) {
    return this.database.query(
      `SELECT grape_variety.name, grape_variety.picture
    FROM ${this.table} 
    JOIN wine as w ON grape_variety.id = w.grape_variety_id
    JOIN session_has_wine AS shw ON w.id = shw.wine_id
    WHERE shw.session_id = ?`,
      [sessionId]
    );
  }
}

module.exports = GrapeManager;
