const AbstractManager = require("./AbstractManager");

class RegionManager extends AbstractManager {
  constructor() {
    super({ table: "region" });
  }

  insert(region) {
    return this.database.query(
      `insert into ${this.table} (name, country_id) values (?, ?)`,
      [region.name, region.country_id]
    );
  }

  update(region) {
    return this.database.query(
      `update ${this.table} set name = ?, country_id = ? where id = ?`,
      [region.name, region.country_id, region.id]
    );
  }
}

module.exports = RegionManager;
