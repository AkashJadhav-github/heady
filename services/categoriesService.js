var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var config = require('../config/configuration');

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


const fetchAll = async (req, res) => {
  try {
    MongoClient.connect(url, { useNewUrlParser: true }, async (err, db) => {

      let dbo = db.db(config.db_name);
      let result = await dbo.collection(config.collection_name).find();
      let categories = await getAllCategories(result);
      // for (i = 0; i < result.length; i++) {
      //   await categories.push(result[i]);
      // }
      console.log(categories);
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
    await forloop(result);
    // for (i = 0; i < result.length; i++) {
    //   data.push(element)
    //   if (i == (result.length - 1)) {
    //     resolve(data)
    //   }
    // }
  })
}

const forloop = async(result) => {
  return new Promise(async (resolve, reject)=> {
    var arr = []
    result.forEach(element => {
      arr.push(element)
    });
    resolve(arr)
  })
}