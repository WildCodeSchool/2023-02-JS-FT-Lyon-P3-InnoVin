const AbstractManager = require("./AbstractManager");

class SessionHasWineManager extends AbstractManager {
  constructor() {
    super({ table: "session_has_wine" });
  }

  insert(sessionHasWine) {
    return this.database.query(
      `insert into ${this.table} (session_id, wine_id) values (?, ?)`,
      [sessionHasWine.session_id, sessionHasWine.wine_id]
    );
  }
}

module.exports = SessionHasWineManager;
