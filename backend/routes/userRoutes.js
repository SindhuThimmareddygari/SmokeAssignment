const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to register a user
router.post('/register', (req, res) => {
  const { name, address } = req.body;
  console.log(req.body);

  db.run('INSERT INTO User (name) VALUES (?)', [name], function (err) {
    if (err) {
      return res.status(400).send(err.message);
    }

    const userId = this.lastID;

    db.run('INSERT INTO Address (userId, address) VALUES (?, ?)', [userId, address], function (err) {
      if (err) {
        return res.status(400).send(err.message);
      }
      res.status(201).json({ message: 'User and address saved successfully' });
    });
  });
});

module.exports = router;
