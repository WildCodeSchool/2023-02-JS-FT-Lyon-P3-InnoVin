const AbstractManager = require("./AbstractManager");

class RegionManager extends AbstractManager {
  constructor() {
    super({ table: "Region" });
  }

  insert(region) {
    return this.database.query(
      `INSERT INTO ${this.table} (name) VALUES ( ?)`,
      [
        region.name, 
      ]
    );
  }

  update(region) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [
        region.name
       ]
    );
  }
}

module.exports = RegionManager;