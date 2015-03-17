var MongoDBCursor = require('./mongodb-cursor');

function MongoDBCollection (url, name) {
  this.url = url;
  this.name = name;
}

MongoDBCollection.prototype.open = function (ok, fail) {
  if (this.collection) return ok(this.collection);
  
  require('mongodb').MongoClient.connect(this.url, (function (err, db) {
    if (err) return fail(err);
    
    this.db = db;
    
    ok(db.collection(this.name));
  }).bind(this));
};

MongoDBCollection.prototype.findOne = function (predicate, callback) {
  this.open(function (collection) {
    collection.findOne(predicate, callback);
  }, callback);
};

MongoDBCollection.prototype.find = function (predicate, callback) {
  return new MongoDBCursor(this.url, this.name, predicate, callback);
};

MongoDBCollection.prototype.insert = function (objects, callback) {
  this.open(function (collection) {
    collection.insert(objects, { w: 1}, callback);
  }, callback);
};

MongoDBCollection.prototype.update = function (predicate, replacement, callback) {
  this.open(function (collection) {
    collection.update(predicate, replacement, { w: 1}, callback);
  }, callback);
};

MongoDBCollection.prototype.remove = function (predicate, callback) {
  this.open(function (collection) {
    collection.remove(predicate, { w: 1}, callback);
  }, callback);};

MongoDBCollection.prototype.count = function (predicate, callback) {
  this.open(function (collection) {
    collection.count(predicate, callback);
  }, callback);
};

module.exports = MongoDBCollection;