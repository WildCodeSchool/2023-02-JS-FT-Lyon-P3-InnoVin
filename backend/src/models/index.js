require("dotenv").config();
const mysql = require("mysql2/promise");

// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// try a connection

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

// declare and fill models: that's where you should register your own managers

const models = {};

const ItemManager = require("./ItemManager");

models.item = new ItemManager();
models.item.setDatabase(pool);

const UserManager = require("./UserManager");

models.user = new UserManager();
models.user.setDatabase(pool);

const SessionManager = require("./SessionManager");

models.session = new SessionManager();
models.session.setDatabase(pool);

const SessionHasWineManager = require("./SessionHasWineManager");

models.sessionHasWine = new SessionHasWineManager();
models.sessionHasWine.setDatabase(pool);

const TastingNoteManager = require("./TastingNoteManager");

models.tasting_note = new TastingNoteManager();
models.tasting_note.setDatabase(pool);
const WineManager = require("./WineManager");

models.wine = new WineManager();
models.wine.setDatabase(pool);

const GrapeManager = require("./GrapeManager");

models.grape = new GrapeManager();
models.grape.setDatabase(pool);

const DomainManager = require("./DomainManager");

models.domain = new DomainManager();
models.domain.setDatabase(pool);

const RegionManager = require("./RegionManager");

models.region = new RegionManager();
models.region.setDatabase(pool);

const CountryManager = require("./CountryManager");

models.country = new CountryManager();
models.country.setDatabase(pool);

const TypeManager = require("./TypeManager");

models.type = new TypeManager();
models.type.setDatabase(pool);

const AromaManager = require("./AromaManager");

models.aroma = new AromaManager();
models.aroma.setDatabase(pool);

const FlavourManager = require("./FlavourManager");

models.flavour = new FlavourManager();
models.flavour.setDatabase(pool);

// bonus: use a proxy to personalize error message,
// when asking for a non existing model

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
