function NedbCursor(cursor) {
  this.cursor = cursor;
}

NedbCursor.prototype.sort = function (sort) {
  this.cursor.sort(sort);
  
  return this;
};

NedbCursor.prototype.limit = function (limit) {
  this.cursor.limit(limit);
  
  return this;
};

NedbCursor.prototype.toArray = function (callback) {
  return this.cursor.exec(callback);
};

module.exports = NedbCursor;