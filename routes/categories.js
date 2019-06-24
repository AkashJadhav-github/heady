var express = require('express');
var router = express.Router();
var categoriesService = require('../services/categoriesService');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all', categoriesService.fetchAll);

router.post('/', categoriesService.addCategory);

module.exports = router;
