const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "User" });
  }

  // Override
  find(id) {
    return this.database.query(
      `select u.id, u.firstname, u.lastname, u.email, u.birthdate, u.address, u.city, u.role, a.name as aroma, f.name as flavour, t.name as type
      from  ${this.table} as u
      inner join aroma as a on a.id = u.aroma_id
      inner join flavour as f on f.id = u.flavour_id
      inner join type as t on t.id = u.type_id
      where id = ?`,
      [id]
    );
  }

  // Override
  findAll() {
    return this.database.query(
      `select u.id, u.firstname, u.lastname, u.email, u.birthdate, u.address, u.city, u.role, a.name as aroma, f.name as flavour, t.name as type
      from  ${this.table} as u
      inner join aroma as a on a.id = u.aroma_id
      inner join flavour as f on f.id = u.flavour_id
      inner join type as t on t.id = u.type_id`
    );
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, email, birthdate, address, city, hashed_password, aroma_id, flavour_id, type_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.birthdate,
        user.address,
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
