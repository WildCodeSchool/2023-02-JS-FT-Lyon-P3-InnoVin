const AbstractManager = require("./AbstractManager");

class AromaManager extends AbstractManager {
  constructor() {
    super({ table: "aroma" });
  }

  insert(aroma) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      aroma.name,
    ]);
  }

  update(aroma) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [aroma.name, aroma.id]
    );
  }
}

module.exports = AromaManager;
