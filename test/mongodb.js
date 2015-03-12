var Collection = require('../lib/mongodb-collection'),
  assert = require('assert'),
  async = require('async');

describe('Mongodb dumb tests', function() {
  var collection;
  
  beforeEach(function () {
    collection = new Collection('mongodb://localhost:27017/tests-' + String(Date.now()), 'tests');
  });
  
  it('Should .sort.limit.toArray', function(done) {
    collection.find({}).sort({
      date: -1
    }).limit(1).toArray(done);
  });
  it('Should .insert', function(done) {
    collection.insert([{}], done);
  });
  it('Should .count', function(done) {
    collection.insert([{}], function(err) {
      if (err) return done(err);

      collection.count({}, function(err, count) {
        if (err) return callback(err);

        assert(count === 1);

        done();
      });
    });
  });
  it('Should .remove', function(done) {
    collection.remove({}, done);
  });
  it('Should .update', function(done) {
    collection.update({}, {}, done);
  });
});

// describe('Nedb scenario tests', function() {
//   it('Should insert/count/update/find/remove', function(done) {
//     var collection = new Collection();

//     async.series([
//       function (callback) {
//         collection.insert({
//           data: 3
//         }, callback);
//       },
//       function (callback) {
//         collection.find({})
//         .toArray(function (err, docs) {
//           assert(docs.length === 1);
//           assert(docs[0].data === 3);
          
//           callback(err);
//         });
//       },
//       function(callback) {
//         collection.update({}, {
//           $set: {
//             data: 4
//           }
//         }, callback);
//       },
//       function(callback) {
//         collection.find({})
//         .toArray(function (err, docs) {
//           assert(docs.length === 1);
//           assert(docs[0].data === 4);
          
//           callback(err);
//         });
//       },
//       function (callback) {
//         collection.remove({}, callback);
//       },
//       function (callback) {
//         collection.count({}, function(err, count) {
//           assert(count === 0);
//           callback(err);
//         });
//       }
//     ], done);
//   });
// });