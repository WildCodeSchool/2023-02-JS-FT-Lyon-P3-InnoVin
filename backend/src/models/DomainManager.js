const AbstractManager = require("./AbstractManager");

class DomainManager extends AbstractManager {
  constructor() {
    super({ table: "Domain" });
  }

  insert(domain) {
    return this.database.query(
      `INSERT INTO ${this.table} (name) VALUES (?)`,
      [
        domain.name, 
      ]
    );
  }

  update(domain) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [
        domain.name
       ]
    );
  }
}

module.exports = DomainManager;