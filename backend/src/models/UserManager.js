const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "User" });
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (aroma, flavour_id, type_id, firstname,lastname, birthdate, email, hashed_password, address,
        city, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.aroma,
        user.flavourId,
        user.typeId,
        user.firstname,
        user.lastname,
        user.birthdate,
        user.email,
        user.hashedPassword,
        user.adress,
        user.city,
        user.role,
      ]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set aroma_id = ?, flavour_id = ?, type_id = ?, firstname = ?, lastname = ?, birthdate = ?, email = ?, hashed_password = ?, address = ?, city = ?, role = ? where id = ?`,
      [
        user.aromaId,
        user.flavourId,
        user.typeId,
        user.firstname,
        user.lastname,
        user.birthdate,
        user.email,
        user.hashedPassword,
        user.address,
        user.city,
        user.role,
      ]
    );
  }
}

module.exports = UserManager;
