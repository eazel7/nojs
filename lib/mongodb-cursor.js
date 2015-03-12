function MongoDBCursor(url, collectionName, predicate, callback) {
  this.url = url;
  this.collectionName = collectionName;
  this.predicate = predicate;
  this.queue = [];

  if (callback) {
    this.toArray(callback);
  }
}

MongoDBCursor.prototype.runQueue = function() {
  if (!this.cursor) {
    require('mongodb').MongoClient.connect(this.url, (function(err, db) {
      if (err) return callback(err);

      this.cursor = db.collection(this.collectionName).find(this.predicate);

      var fn = this.queue.shift();

      while (fn) {
        fn();
        fn = this.queue.shift();
      }
    }).bind(this));
  }
  else {
    var fn = this.queue.shift();

    while (fn) {
      fn();
    }
  }
};

MongoDBCursor.prototype.sort = function(sort) {
  this.queue.push((function() {
    this.cursor.sort(sort);
  }).bind(this));

  return this;
};

MongoDBCursor.prototype.limit = function(limit) {
  this.queue.push((function() {
    this.cursor.limit(limit);
  }).bind(this));

  return this;
};

MongoDBCursor.prototype.toArray = function(callback) {
  this.queue.push((function() {
    this.cursor.toArray(callback);
  }).bind(this));

  this.runQueue();

  return this;
};

module.exports = MongoDBCursor;