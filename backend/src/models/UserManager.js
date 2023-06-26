const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "User" });
  }

  // Override
  find(id) {
    return this.database.query(
      `select id, aroma_id, flavour_id, type_id, firstname, lastname, birthdate, email, hashed_password, street, postcode, city from  ${this.table} where id = ?`,
      [id]
    );
  }

  // Override
  findAll() {
    return this.database.query(
      `select id, aroma_id, flavour_id, type_id, firstname, lastname, birthdate, email, hashed_password, street, postcode, city from  ${this.table}`
    );
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (aroma_id, flavour_id, type_id, firstname, lastname, birthdate, email, hashed_password, street, postcode, city) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.aromaId,
        user.flavourId,
        user.typeId,
        user.firstname,
        user.lastname,
        user.birthdate,
        user.email,
        user.password,
        user.street,
        user.postcode,
        user.city,
      ]
    );
  }

  findByEmailWithPassword(email) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ]);
  }
}

module.exports = UserManager;
