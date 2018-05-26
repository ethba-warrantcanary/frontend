const express = require('express');
const router = express.Router();

router.get('/home', (req, res, next)=>{
  res.send('Retrieving home.');
});

module.exports = router;
