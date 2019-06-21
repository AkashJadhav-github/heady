var express = require('express');
var router = express.Router();
var productsService = require('../services/productsService');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// adding the new products
router.post('/', productsService.addProduct);

// fetch all the products belonging to particular categories
router.get('/getbycategory', productsService.getProducts);

// Update the product details
router.put('/:id', productsService.updateDetails);

module.exports = router;
