const AbstractManager = require("./AbstractManager");

class AromaManager extends AbstractManager {
  constructor() {
    super({ table: "Aroma" });
  }

  insert(aroma) {
    return this.database.query(
      `INSERT INTO ${this.table} (name) VALUES (?)`,
      [
        aroma.name, 
      ]
    );
  }

  update(aroma) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [
        aroma.name
       ]
    );
  }
}

module.exports = AromaManager;