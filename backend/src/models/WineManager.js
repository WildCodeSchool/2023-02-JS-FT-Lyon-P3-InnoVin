const AbstractManager = require("./AbstractManager");

class WineManager extends AbstractManager {
  constructor() {
    super({ table: "wine" });
  }

  // Override
  find(id) {
    return this.database.query(
      `SELECT w.name AS wine, c.name AS country, r.name AS region, d.name AS domain, t.name AS type, gv.name AS grape_variety, w.vintage, 
      a.name AS aroma, f.name AS flavour
      FROM ${this.table} AS w
      INNER JOIN country AS c ON c.id = w.country_id
      INNER JOIN region AS r ON r.id = w.region_id
      INNER JOIN type AS t ON t.id = w.type_id
      INNER JOIN domain AS d ON d.id = w.domain_id
      INNER JOIN grape_variety AS gv ON gv.id = w.grape_variety_id
      INNER JOIN aroma AS a ON w.aroma_id = a.id
      INNER JOIN flavour AS f ON w.flavour_id = f.id
      WHERE w.id = ?`,
      [id]
    );
  }

  // Override
  findAll() {
    return this.database.query(
      `SELECT w.id, w.name AS wine, w.country_id AS country, w.region_id AS region, w.domain_id AS domain, w.type_id AS type, w.grape_variety_id as grape_variety, w.vintage, 
      w.aroma_id AS aroma, w.flavour_id AS flavour
      FROM ${this.table} AS w`
    );
  }

  insert(wine) {
    return this.database.query(
      `insert into ${this.table} (country_id, region_id, type_id, domain_id, grape_variety_id, name, vintage) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        wine.country_id,
        wine.region_id,
        wine.type_id,
        wine.domain_id,
        wine.grape_variety_id,
        wine.name,
        wine.vintage,
      ]
    );
  }

  update(wine) {
    return this.database.query(
      `update ${this.table} set country_id = ?, region_id = ?, type_id = ?, domain_id = ?, grape_variety_id = ?, name = ?, vintage = ? where id = ?`,
      [
        wine.country_id,
        wine.region_id,
        wine.type_id,
        wine.domain_id,
        wine.grape_variety_id,
        wine.name,
        wine.vintage,
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
