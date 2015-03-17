var MongoDBCollection = require('./mongodb-collection');

function MongoDB(url) {
  this.url = url;
  this.collections = {};
}

MongoDB.prototype.collection = function (name) {
  if (this.collections[name]) {
    return this.collections[name];
  } else {
    return (this.collections[name] = new MongoDBCollection(this.url, name));
  }
};

module.exports = MongoDB;