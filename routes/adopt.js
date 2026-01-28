const express = require('express');
const db = require('../modules/db');
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
const isAuthenticated = require('../middleware/isAuthenticated');


app.get('/adopt', isAuthenticated, (req, res) => {
  res.render('adopt', { user: req.session.user });
});

app.post('/adopt', isAuthenticated, (req, res) => {
  const petName = "Beyonce"; 
  const username = req.session.user;

  const query = `INSERT INTO pets (name, adopted_by) VALUES (?, ?)`;
  db.run(query, [petName, username], function(err) {
      if (err) {
          console.error(err);
          res.send("Error adopting pet");
      } else {
          res.redirect('/'); 
      }
  });
});
module.exports = router;
