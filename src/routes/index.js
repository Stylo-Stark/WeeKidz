const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', {
    title: 'WeeKidz Wholesale',
    dbConnected: req.app.locals.dbConnected,
  });
});

module.exports = router;
