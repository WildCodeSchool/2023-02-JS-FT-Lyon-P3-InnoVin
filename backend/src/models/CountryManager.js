const AbstractManager = require("./AbstractManager");

class CountryManager extends AbstractManager {
  constructor() {
    super({ table: "country" });
  }

  insert(country) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      country.name,
    ]);
  }

  update(country) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [country.name, country.id]
    );
  }
}

module.exports = CountryManager;
