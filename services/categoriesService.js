var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var config = require('../config/configuration');

// ADDING new category
/*
  URL - localhost:3000/categories/
  Method - POST
  Body - { 
    "name": "Womens",
    "child_categories": [],
    "products": []
  }
*/
const addCategory = async (req, res) => {
  console.log("Add Category !!!!!!!");

  MongoClient.connect(url, { useNewUrlParser: true }, async (err, db) => {
    let myobj = req.body;
    var dbo = db.db(config.db_name);
    try {
      let result = await dbo.collection(config.collection_name).insert(myobj);
    } catch (e) {
      console.log(e);
    }
  });
  res.sendStatus(201)
}

module.exports.addCategory = addCategory;


// FETCH all the Categories
/*
  URL - localhost:3000/categories/all
  Method - GET
*/
const fetchAll = async (req, res) => {
  try {
    MongoClient.connect(url, { useNewUrlParser: true }, async (err, db) => {

      let dbo = db.db(config.db_name);
      let result = await dbo.collection(config.collection_name).find();
      let categories = await getAllCategories(result);
      res.send(categories)
    });
  } catch (error) {
    let resp = { code: 400, msg: "Error - " + error }
    res.send(resp)
  }
}

module.exports.fetchAll = fetchAll;


const getAllCategories = async (result) => {
  return new Promise(async (resolve, reject) => {
    let data = []
    for (i = 0; i < result.length; i++) {
      data.push(element)
      if (i == (result.length - 1)) {
        resolve(data)
      }
    }
  })
}
