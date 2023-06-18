const AbstractManager = require("./AbstractManager");

class SessionManager extends AbstractManager {
  constructor() {
    super({ table: "Session" });
  }

  insert(session) {
    return this.database.query(
      `INSERT INTO ${this.table} (date) VALUES (?)`,
      [
        session.date, 
      ]
    );
  }

  update(session) {
    return this.database.query(
      `update ${this.table} set date = ?, where id = ?`,
      [
        session.date,
       ]
    );
  }
}

module.exports = SessionManager;