const AbstractManager = require("./AbstractManager");

class  TastingNoteManager extends AbstractManager {
  constructor() {
    super({ table: "Tasting_note" });
  }

  insert(tasting_note) { 
    return this.database.query(
      `INSERT INTO ${this.table} (user_id, wine_id, session_id, note) VALUES (?, ?, ?, ?)`,
      [
        tasting_note.user_id, 
        tasting_note.wine_id, 
        tasting_note.session_id,
        tasting_note.note,
      ]
    );
  }

  update(tasting_note) {
    return this.database.query(
      `update ${this.table} set user_id = ?, wine_id = ?, session_id = ?, note = ? where id = ?`,
      [
        tasting_note.user_id, 
        tasting_note.wine_id,
        tasting_note.session_id, 
        tasting_note.note,
       ]
    );
  }
}

module.exports = TastingNoteManager;