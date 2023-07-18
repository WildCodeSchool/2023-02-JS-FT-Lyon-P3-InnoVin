const AbstractManager = require("./AbstractManager");

class SessionManager extends AbstractManager {
  constructor() {
    super({ table: "session" });
  }

  // Override
  find(id) {
    return this.database.query(
      `select DATE_FORMAT(date, "%d/%m/%Y") as date, TIME_FORMAT(time, "%H:%i") as time from  ${this.table} where id = ?`,
      [id]
    );
  }

  // Override
  findAll() {
    return this.database.query(
      `select id , DATE_FORMAT(date, "%d/%m/%Y") as date, TIME_FORMAT(time, "%H:%i") as time from  ${this.table}`
    );
  }

  insert(session) {
    return this.database.query(
      `insert into ${this.table} (date, time) values (STR_TO_DATE(?, "%d/%m/%Y"), ?)`,
      [session.date, session.time]
    );
  }

  update(session) {
    return this.database.query(
      `update ${this.table} set date = STR_TO_DATE(?, "%d/%m/%Y"), time = ? where id = ?`,
      [session.date, session.time, session.id]
    );
  }
}

module.exports = SessionManager;
