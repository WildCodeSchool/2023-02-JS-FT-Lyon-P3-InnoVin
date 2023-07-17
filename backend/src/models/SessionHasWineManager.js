const AbstractManager = require("./AbstractManager");

class SessionHasWineManager extends AbstractManager {
  constructor() {
    super({ table: "session_has_wine" });
  }

  // Override
  findAll() {
    return this.database.query(
      `select session_has_wine.session_id, session_has_wine.wine_id, wine.name
          from  ${this.table} 
          inner join wine on wine.id = session_has_wine.wine_id`
    );
  }

  insert(sessionHasWine) {
    return this.database.query(
      `insert into ${this.table} (session_id, wine_id) values (?, ?), (?, ?), (?, ?), (?, ?)`,
      [
        sessionHasWine.id,
        sessionHasWine.wine1,
        sessionHasWine.id,
        sessionHasWine.wine2,
        sessionHasWine.id,
        sessionHasWine.wine3,
        sessionHasWine.id,
        sessionHasWine.wine4,
      ]
    );
  }

  // Override
  delete(sessionId) {
    return this.database.query(
      `delete from ${this.table} where session_id = ?`,
      [sessionId]
    );
  }
}

module.exports = SessionHasWineManager;
