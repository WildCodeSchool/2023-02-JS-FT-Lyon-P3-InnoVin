const AbstractManager = require("./AbstractManager");

class  TypeManager extends AbstractManager {
  constructor() {
    super({ table: "Type" });
  }

  insert(type) { 
    return this.database.query(
      `INSERT INTO ${this.table} (name) VALUES (?)`,
      [ 
        type.name, 
      ]
    );
  }

  update(type) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [
        type.name
       ]
    );
  }
}

module.exports = TypeManager;