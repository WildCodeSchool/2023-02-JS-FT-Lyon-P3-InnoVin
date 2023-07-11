const AbstractManager = require("./AbstractManager");

class DomainManager extends AbstractManager {
  constructor() {
    super({ table: "domain" });
  }

  insert(domain) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      domain.name,
    ]);
  }

  update(domain) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [domain.name, domain.id]
    );
  }
}

module.exports = DomainManager;
