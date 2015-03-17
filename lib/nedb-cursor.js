function NeDBCursor(cursor) {
  this.cursor = cursor;
}

NeDBCursor.prototype.sort = function (sort) {
  this.cursor.sort(sort);
  
  return this;
};

NeDBCursor.prototype.limit = function (limit) {
  this.cursor.limit(limit);
  
  return this;
};

NeDBCursor.prototype.toArray = function (callback) {
  return this.cursor.exec(callback);
};

module.exports = NeDBCursor;