const AbstractManager = require("./AbstractManager");

class SessionManager extends AbstractManager {
  constructor() {
    super({ table: "Session" });
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

  insert(session) {
    return this.database.query(`insert into ${this.table} (date) values (?)`, [
      session.date,
    ]);
  }

  findSessionIdByDate(date) {
    return this.database.query(`SELECT id FROM ${this.table} WHERE date = ?`, [
      date,
    ]);
  }
}

module.exports = SessionManager;
