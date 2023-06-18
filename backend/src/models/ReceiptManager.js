const AbstractManager = require("./AbstractManager");

class ReceiptManager extends AbstractManager {
  constructor() {
    super({ table: "Receipt" });
  }

  insert(receipt) {
    return this.database.query(
      `INSERT INTO ${this.table} (user_id, name, session_id) VALUES (?, ?)`,
      [
        receipt.user_id, 
        receipt.name, 
        receipt.session_id,
      ]
    );
  }

  update(receipt) {
    return this.database.query(
      `update ${this.table} set user.id = ?, name = ?, session_id = ? where id = ?`,
      [
        receipt.user_id, 
        receipt.name, 
        receipt.session_id,
       ]
    );
  }
}

module.exports = ReceiptManager;