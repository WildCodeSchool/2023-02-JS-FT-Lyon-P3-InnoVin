const AbstractManager = require("./AbstractManager");

class FlavourManager extends AbstractManager {
  constructor() {
    super({ table: "Flavour" });
  }

  insert(flavour) {
    return this.database.query(
      `INSERT INTO ${this.table} (name) VALUES (?)`,
      [
        flavour.name, 
      ]
    );
  }

  update(flavour) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [
        flavour.name
       ]
    );
  }
}

module.exports = FlavourManager;