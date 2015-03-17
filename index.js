module.exports = {
  NeDB: {
    Collection: require('./lib/nedb-collection'),
    DB: require('./lib/nedb-db'),
  },
  Mongo: {
    Collection: require('./lib/mongodb-collection'),
    DB: require('./lib/mongodb-db'),
  },
};