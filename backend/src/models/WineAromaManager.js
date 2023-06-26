const AbstractManager = require("./AbstractManager");

class WineAromaManager extends AbstractManager {
  constructor() {
    super({ table: "wine_has_aroma" });
  }

  findByWine(wineId) {
    return this.database.query(
      `SELECT GROUP_CONCAT(DISTINCT a.name ORDER BY a.id SEPARATOR ', ') AS aromas
      FROM ${this.table} AS wha
      INNER JOIN wine AS w ON w.id = wha.wine_id
      INNER JOIN aroma AS a ON wha.aroma_id = a.id
      WHERE wine_id = ?`,
      [wineId]
    );
  }

  insert(wineAroma) {
    return this.database.query(
      `insert into ${this.table} (wine_id, aroma_id) values (?, ?)`,
      [wineAroma.wine_id, wineAroma.aroma_id]
    );
  }

  update(wineAroma) {
    return this.database.query(
      `update ${this.table} set wine_id = ?, aroma_id = ? where wine_id = ? AND aroma_id = ?`,
      [
        wineAroma.wine_id,
        wineAroma.aroma_id,
        wineAroma.wine_id,
        wineAroma.aroma_id,
      ]
    );
  }
}

module.exports = WineAromaManager;
