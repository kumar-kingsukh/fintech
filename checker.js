              var mongo = require('mongodb').MongoClient;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }  
                  if (!err) {
                      var coll = db.collection('ongc15');    
                      coll.find({}, {
                          _id: 0
                      }).skip(206).limit(20).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          console.log(arr[0]["Date"]);
                          console.log(arr[arr.length - 1]["Date"]);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });