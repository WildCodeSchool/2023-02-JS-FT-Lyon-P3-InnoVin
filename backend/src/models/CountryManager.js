const AbstractManager = require("./AbstractManager");

class CountryManager extends AbstractManager {
  constructor() {
    super({ table: "Country" });
  }

  insert(country) {
    return this.database.query(
      `INSERT INTO ${this.table} (name) VALUES (?)`,
      [
        country.name, 
      ]
    );
  }

  update(country) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [
        country.name
       ]
    );
  }
}

module.exports = CountryManager;