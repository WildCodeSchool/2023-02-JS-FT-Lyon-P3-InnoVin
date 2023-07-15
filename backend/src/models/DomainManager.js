const AbstractManager = require("./AbstractManager");

class DomainManager extends AbstractManager {
  constructor() {
    super({ table: "domain" });
  }

  insert(domain) {
    return this.database.query(
      `insert into ${this.table} (name, region_id) values (?, ?)`,
      [domain.name, domain.region_id]
    );
  }

  update(domain) {
    return this.database.query(
      `update ${this.table} set name = ?, region_id = ? where id = ?`,
      [domain.name, domain.region_id, domain.id]
    );
  }
}

module.exports = DomainManager;
