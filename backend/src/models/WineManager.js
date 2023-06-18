const AbstractManager = require("./AbstractManager");

class WineManager extends AbstractManager {
  constructor() {
    super({ table: "Wine" });
  }

  insert(wine) {
    return this.database.query(
      `INSERT INTO ${this.table} (name, vintage, country_id, region_id, type_id, domain_id, grape_variety_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        wine.name, 
        wine.vintage, 
        wine.country_id, 
        wine.region_id, 
        wine.type_id, 
        wine.domain_id, 
        wine.grape_variety_id, 
      ]
    );
  }

  update(wine) {
    return this.database.query(
      `update ${this.table} set name = ?, vintage = ?, country_id = ?, region_id = ?, type_id = ?, domain_id = ?,  grape_variety = ?  where id = ?`,
      [
        wine.name, 
        wine.vintage, 
        wine.country_id, 
        wine.region_id, 
        wine.type_id, 
        wine.domain_id, 
        wine.grape_variety_id,
       ]
    );
  }
}

module.exports = WineManager;