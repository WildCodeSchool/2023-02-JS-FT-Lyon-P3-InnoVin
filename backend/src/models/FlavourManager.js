const AbstractManager = require("./AbstractManager");

class FlavourManager extends AbstractManager {
  constructor() {
    super({ table: "flavour" });
  }

  insert(flavour) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      flavour.name,
    ]);
  }

  update(flavour) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [flavour.name, flavour.id]
    );
  }
}

module.exports = FlavourManager;
