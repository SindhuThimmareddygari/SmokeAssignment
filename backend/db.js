const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    db.run('CREATE TABLE User (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)', (err) => {
      if (err) {
        console.log('Error creating User table:', err);
      }
    });

    db.run('CREATE TABLE Address (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, address TEXT, FOREIGN KEY(userId) REFERENCES User(id))', (err) => {
      if (err) {
        console.log('Error creating Address table:', err);
      }
    });
  }
});

db.all('SELECT * FROM User', [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(rows);
  });

module.exports = db;
