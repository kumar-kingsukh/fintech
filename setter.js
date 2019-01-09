              
              // var mongo = require('mongodb').MongoClient; 
              // mongo.connect('mongodb://stonexapp:stonexapp@ds033126.mlab.com:33126/stonexapp', function(err, db) {
              //     if (err) {
              //         throw err;
              //         return false;
              //     }
              //     if (!err) {
                    
              //         var coll = db.collection('nifty13jan');

              //         coll.find().sort({ $natural: -1 }).limit(1).toArray(function(err, arr) {
              //             if (err) {
              //                 throw err;
              //                 return false;
              //             }
              //             console.log(arr);
              //         });

              //     } else {
              //         return false;
              //     }
              // });



      var insertInMongo = function(trade_data) {
          // console.log(trade_data);
          mongo.connect('mongodb://stonexapp:stonexapp@ds033126.mlab.com:33126/stonexapp', function(err, db) {
              if (err) {
                  throw err;
                  return false;
              }
              if (!err) {
                  var coll = db.collection('quantumplate');

                  coll.insert(trade_data, function() {
                      db.close();
                      console.log("Data Inserted.");
                  });

                  // coll.update({}, {$unset: {High:1, Low:1,LTP:1}}, {multi: true});
                  // console.log("Done!");
                  // db.close();

              } else {
                  return false;
              }
          });
      }



// db.collection.find().sort({ $natural: -1 }).limit()

          var finalArray = [];

          var mongo = require('mongodb').MongoClient; 

          var firstHalf = new Promise(function(resolve, reject) {

              mongo.connect('mongodb://stonexapp:stonexapp@ds033126.mlab.com:33126/stonexapp', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty16minute');
                      coll.find({

                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          db.close();
                          resolve(arr);
                      });

                  } else {
                      return false;
                  }
              });

          });

          var secondHalf = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://stonexapp:stonexapp@ds033126.mlab.com:33126/stonexapp', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty16minute2');
                      coll.find({
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          db.close();
                          resolve(arr);
                      });

                  } else {
                      return false;
                  }
              });
          });

          Promise.all([firstHalf, secondHalf]).then(values => {

                  for(var i = 0; i < values[1].length; i++){
                        finalArray.push(values[1][i]);
                  }

                  for(var i = 0; i < values[0].length; i++){
                        finalArray.push(values[0][i]);
                  }

                  insertInMongo(finalArray);

          });


