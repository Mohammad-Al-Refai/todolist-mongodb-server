const { MONGODB_URL, DB_NAME, TABLE } = require("./db_config");
const client = require("mongodb").MongoClient;

const mongo = client.connect(MONGODB_URL,{ useNewUrlParser: true });

function getAll(callback) {
  mongo.then((db) => {
    db.db(DB_NAME)
      .collection(TABLE)
      .find({})
      .toArray((err,result) => {
        var resultArr=[];
        result.map((v)=>resultArr.push(v.text))
        callback(resultArr)
      });
  })
}

function addOne(value, callback) {
  mongo.then((db) => {
    db.db(DB_NAME)
      .collection(TABLE)
      .insertOne({ text: value })
      .then((v) => {
        callback(v);
      });
  });
}

function editOne(old_value, value, callback) {
  mongo.then((db) => {
    db.db(DB_NAME)
      .collection(TABLE)
      .updateOne({ text: `${old_value}` }, { $set: { text: `${value}` } })
      .then((v) => {
        callback(v);
      });
  });
}

function deleteOne(target, callback) {
    mongo.then((db) => {
      db.db(DB_NAME)
        .collection(TABLE)
        .deleteOne({ text: `${target}` })
        .then((v) => {
          callback(v);
        });
    });
  }
module.exports={addOne,getAll,editOne,deleteOne}