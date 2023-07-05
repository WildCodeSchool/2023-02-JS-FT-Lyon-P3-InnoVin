const AbstractManager = require("./AbstractManager");

class TypeManager extends AbstractManager {
  constructor() {
    super({ table: "type" });
  }

  insert(type) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      type.name,
    ]);
  }

  update(type) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [type.name, type.id]
    );
  }
}

module.exports = TypeManager;
