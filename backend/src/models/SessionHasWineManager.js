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
        sessionHasWine.session_id,
        sessionHasWine.wine1,
        sessionHasWine.session_id,
        sessionHasWine.wine2,
        sessionHasWine.session_id,
        sessionHasWine.wine3,
        sessionHasWine.session_id,
        sessionHasWine.wine4,
      ]
    );
  }
}

module.exports = SessionHasWineManager;
