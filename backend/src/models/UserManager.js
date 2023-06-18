const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "User" });
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (aroma_id, flavour_id, grape_variety_type_id, firstname, lastname, birthdate, e-mail, hashed_password, address, city, role ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.aroma_id, 
        user.flavour_id,
        user.grape_variety_type_id,
        user.firstname,
        user.lastname,
        user.birthdate,
        user.e-mail,
        user.hashed_password,
        user.address,
        user.city,
        user.role,
      ]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set aroma_id = ?, flavour_id = ?, grape_variety_type_id = ?, firstname = ?, lastname = ?, birthdate = ?, e-mail = ?, hashed_password = ?, address = ?, city = ?, role = ? where id = ?`,
      [
        user.aroma_id, 
        user.flavour_id,
        user.grape_variety_type_id,
        user.firstname,
        user.lastname,
        user.birthdate,
        user.e-mail,
        user.hashed_password,
        user.address,
        user.city,
        user.role,
       ]
    );
  }
}

module.exports = UserManager;