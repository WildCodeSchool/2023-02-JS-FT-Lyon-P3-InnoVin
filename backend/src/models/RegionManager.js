const AbstractManager = require("./AbstractManager");

class RegionManager extends AbstractManager {
  constructor() {
    super({ table: "region" });
  }

  insert(region) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      region.name,
    ]);
  }

  update(region) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [region.name, region.id]
    );
  }
}

module.exports = RegionManager;
