const cwd = process.cwd();
const MongoClient = require('mongodb').MongoClient;
const log = require(`${cwd}/utils/logger.js`).logUtil('mongoConnection');

const con = new Promise((resolve, reject) => {
  MongoClient.connect('mongodb://192.168.200.197:27017/player-gallery', (err, db) => {
    if (err) {
      log(`Error connecting to mongo: ${JSON.stringify(err)}`);
      reject(err);
    } else {
      log(`Connection successful!`);
      resolve(db);
    }
  });
});

exports.con = (fn, collection) => {
  return new Promise((resolve, reject) => {
    con.then(db => {
      fn(db.collection(collection), resolve, reject);
    }, err => reject(err));
  });
};