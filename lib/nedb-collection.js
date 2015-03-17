function NeDBCollection(path) {
  var DataStore = require('nedb');

  if (path) {
    this.collection = new DataStore({
      filename: path,
      autoload: true
    });
  }
  else {
    this.collection = new DataStore();
  }
}

NeDBCollection.prototype.find = function(predicate, callback) {
  var cursor = this.collection.find(predicate, callback);
  var NedbCursor = require('./nedb-cursor');

  return new NedbCursor(cursor);
};

NeDBCollection.prototype.findOne = function(predicate, callback) {
  return this.collection.findOne(predicate, callback);
};

NeDBCollection.prototype.insert = function(objects, callback) {
  if (!(objects instanceof Array)) objects = [objects];
  
  return this.collection.insert(objects, callback);
};

NeDBCollection.prototype.count = function(predicate, callback) {
  return this.collection.count(predicate, callback);
};

NeDBCollection.prototype.update = function(predicate, replacement, callback) {
  return this.collection.update(predicate, replacement, callback);
};

NeDBCollection.prototype.remove = function(predicate, callback) {
  return this.collection.remove(predicate, callback);
};

NeDBCollection.prototype.count = function(predicate, callback) {
  return this.collection.count(predicate, callback);
};

module.exports = NeDBCollection;