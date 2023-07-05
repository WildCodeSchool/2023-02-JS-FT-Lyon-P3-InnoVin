const AbstractManager = require("./AbstractManager");

class TastingNoteManager extends AbstractManager {
  constructor() {
    super({ table: "Tasting_Note" });
  }

  // Override
  find(id) {
    return this.database.query(
      `select id, user_id, wine_id, session_id, note from  ${this.table} where id = ?`,
      [id]
    );
  }

  // Override
  findAll() {
    return this.database.query(
      `select id, user_id, wine_id, session_id, note from  ${this.table}`
    );
  }

  insert(tastingNote) {
    return this.database.query(
      `insert into ${this.table} (user_id, wine_id, session_id, note) values (?, ?, ?, ?)`,
      [
        tastingNote.user_id,
        tastingNote.wine_id,
        tastingNote.session_id,
        tastingNote.note,
      ]
    );
  }
}

module.exports = TastingNoteManager;
