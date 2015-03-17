var NedbCollection = require('./nedb-collection');

function NeDB(path) {
  this.path = path;
  this.collections = {};
}

NeDB.prototype.collection = function(name) {
  if (this.collections[name]) {
    return this.collections[name];
  }
  else if (this.path) {
    return (this.collections[name] = new NedbCollection(require('path').combine(this.path, name)));
  }
  else {
    return (this.collections[name] = new NedbCollection());
  }
};

module.exports = NeDB;