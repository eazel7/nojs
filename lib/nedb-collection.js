function NedbCollection(options) {
  var DataStore = require('nedb');
  
  this.collection = new DataStore(options);
}

NedbCollection.prototype.find = function (predicate, callback) {
  var cursor = this.collection.find(predicate, callback);
  var NedbCursor = require('./nedb-cursor');
  
  return new NedbCursor(cursor);
};

NedbCollection.prototype.insert = function (objects, callback) {
  return this.collection.insert(objects, callback);
};

NedbCollection.prototype.count = function (predicate, callback) {
  return this.collection.count(predicate, callback);
};

NedbCollection.prototype.update = function (predicate, replacement, callback) {
  return this.collection.update(predicate, replacement, callback);
};

NedbCollection.prototype.remove = function (predicate, callback) {
  return this.collection.remove(predicate, callback);
};

module.exports = NedbCollection;