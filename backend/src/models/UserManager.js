const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "User" });
  }

  // Override
  find(id) {
    return this.database.query(
      `select id, firstname, lastname, email, birthdate, address, postcode, city, role, aroma_id, flavour_id, type_id from  ${this.table} where id = ?`,
      [id]
    );
  }

  // Override
  findAll() {
    return this.database.query(
      `select id, firstname, lastname, email, birthdate, address, postcode,  city, role, aroma_id, flavour_id, type_id  from  ${this.table}`
    );
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, email, birthdate, address, postcode, city, hashed_password, aroma_id, flavour_id, type_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.birthdate,
        user.address,
        user.postcode,
        user.city,
        user.hashed_password,
        user.aroma_id,
        user.flavour_id,
        user.type_id,
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
