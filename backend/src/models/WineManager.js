const AbstractManager = require("./AbstractManager");

class WineManager extends AbstractManager {
  constructor() {
    super({ table: "wine" });
  }

  insert(wine) {
    return this.database.query(
      `insert into ${this.table} (country_id, region_id, type_id, domain_id, grape_variety_id, name, vintage, flavour_id, aroma_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        wine.country_id,
        wine.region_id,
        wine.type_id,
        wine.domain_id,
        wine.grape_variety_id,
        wine.name,
        wine.vintage,
        wine.flavour_id,
        wine.aroma_id,
      ]
    );
  }

  update(wine) {
    return this.database.query(
      `update ${this.table} set country_id = ?, region_id = ?, type_id = ?, domain_id = ?, grape_variety_id = ?, name = ?, vintage = ?, flavour_id = ?, aroma_id = ? where id = ?`,
      [
        wine.country_id,
        wine.region_id,
        wine.type_id,
        wine.domain_id,
        wine.grape_variety_id,
        wine.name,
        wine.vintage,
        wine.flavour_id,
        wine.aroma_id,
        wine.id,
      ]
    );
  }

  findWinesBySessionId(sessionId) {
    return this.database.query(
      `SELECT w.name AS wineName, w.id AS wineId, vintage, aroma.name AS aroma, flavour.name AS flavour
    FROM ${this.table} AS w
    JOIN session_has_wine AS shw ON w.id = shw.wine_id
    JOIN aroma ON aroma.id = w.aroma_id
    JOIN flavour ON flavour.id = w.flavour_id
    WHERE shw.session_id = ?`,
      [sessionId]
    );
  }
}

module.exports = WineManager;
