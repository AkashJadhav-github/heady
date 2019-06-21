var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var url = "mongodb://localhost:27017/";
var config = require('../config/configuration');
var productHelper = require('../helpers/productHelpers');


// ADD Product to a category
/*
  URL - localhost:3000/products/
  Method - POST
  body -  [
    { 
    "id": 1,
    "name": "Jeans",
    "categories": ["5d0ba3187b399464cd7861e3", "5d0ba31c7b399464cd7861e4"],
    "price": 200,
    "colors": ["RED", "BLUE"]
    },
    ... (if you want to add multiple products at the same time)
  ]
*/
const addProduct = async (req, res) => {
  try {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      let myobj = req.body;
      myobj.forEach(myobj_element => {
        let prod_catog = myobj_element.categories;
        var dbo = db.db(config.db_name);
        prod_catog.forEach(element => {
          dbo.collection(config.collection_name).updateOne(
            { _id: ObjectID(element) },
            { $addToSet: { products: { $each: [myobj_element] } } }
          )
        });
      });
    });
    let resp = { code: 201, msg: "Product successfully added!" }
    res.send(resp)
  } catch (error) {
    let resp = { code: 400, msg: "error - " + error }
    res.send(resp)
  }
}

module.exports.addProduct = addProduct;


// GET Products of particular category
/*
  URL - localhost:3000/products/getbycategory?category_name=Mens&category_id=5d0ba21dc99ff363fb03390d (here, either)
  Method - GET
*/
const getProducts = async (req, res) => {
  try {
    let name = req.query.category_name;
    let id = req.query.category_id;
    if (name != null || id != null) {
      let conditional_param = {};
      if (name) {
        conditional_param = { name: name };
      } else {
        conditional_param = { _id: ObjectID(id) };
      }
      MongoClient.connect(url, { useNewUrlParser: true }, async (err, db) => {
        var dbo = db.db(config.db_name);
        let result = await dbo.collection(config.collection_name).findOne(conditional_param, { projection: { _id: 1, products: 1 } });
        res.send(result);
      });

    } else {
      let resp = { code: 400, msg: "Fail to pass either category name or category id to which product belong" }
      res.send(resp)
    }
  } catch (error) {

  }
}

module.exports.getProducts = getProducts;


// UPDATE Product
/*
  URL -> localhost:3000/products/:id (here :id is the product id which we want to update)
  Method - PUT
  Body - {
	"name": "Jeanzzzz",
  "category_id": "5d0ba3187b399464cd7861e3",
  ....... (any number of params you want to update)
}
*/
const updateDetails = async (req, res) => {
  try {
    let productId = req.params.id;
    let updateData = req.body;
    MongoClient.connect(url, { useNewUrlParser: true }, async (err, db) => {
      var dbo = db.db(config.db_name);
      // fetch the details of product to update
      let result = await dbo.collection(config.collection_name).findOne({ _id: ObjectID(updateData.category_id) }, { projection: { _id: 1, products: 1 } });
      let products = result.products;
      for (i = 0; i < products.length; i++) {
        if (products[i].id == productId) {
          let keys = Object.keys(updateData);
          keys.forEach(key => {
            products[i][key] = updateData[key];
          });
        }
      }
      result.products = products;
      // updating the product
      let resp = await dbo.collection(config.collection_name).updateOne({ _id: ObjectID(updateData.category_id) }, { $set: result });
      if (resp.modifiedCount) {
        let resp = { code: 201, msg: "Data successfully updated!" }
        res.send(resp);
      } else {
        let resp = { code: 200, msg: "Data not updated." }
        res.send(resp);
      }
    });
  } catch (error) {
    let resp = { code: 400, msg: "Error - "+error}
  }
}

module.exports.updateDetails = updateDetails;
