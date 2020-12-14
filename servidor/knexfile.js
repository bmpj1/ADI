// Update with your config settings.
const path = require('path'); // Necesario para los tests con BBDD

module.exports = {

  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/db.sqlite3"
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done)
      }
    } 
  },
  test: {
    client: "sqlite3",
    connection: {
      filename: "./data/test-db.sqlite3" 
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done)
      }
    },
    migrations: {
      directory: path.join(__dirname, "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "seeds")
    }
  }
};
