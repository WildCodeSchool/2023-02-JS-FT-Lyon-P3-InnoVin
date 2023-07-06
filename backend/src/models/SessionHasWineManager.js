const AbstractManager = require("./AbstractManager");

class SessionHasWineManager extends AbstractManager {
  constructor() {
    super({ table: "Session_has_Wine" });
  }

  // Override
  find(id) {
    return this.database.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  // Override
  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }

  insert(sessionHasWine) {
    return this.database.query(
      `insert into ${this.table} (session_id, wine_id) values (?, ?)`,
      [sessionHasWine.session_id, sessionHasWine.wine_id]
    );
  }
}

module.exports = SessionHasWineManager;
