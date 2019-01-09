  var mongo = require('mongodb').MongoClient;
  var finalArray = [];
  // var deleteUnwanted = function() {
  //     mongo.connect('mongodb://stonexapp:stonexapp@ds033126.mlab.com:33126/stonexapp', function(err, db) {
  //         if (err) {
  //             throw err;
  //             return false;
  //         }
  //         if (!err) {
  //               var coll = db.collection('nextMonthUSDINRThirteenPE');
  //                   coll.deleteMany({"Underlyings": "USDINR 290114"});
  //                   db.close();
  //                   console.log("Done");
  //         } else {
  //             return false;
  //         }
  //     });
  // }

  // deleteUnwanted();


  var insertInMongo = function(trade_data) {
      mongo.connect('mongodb://stonexapp:stonexapp@ds033126.mlab.com:33126/stonexapp', function(err, db) {
          if (err) {
              throw err;
              return false;
          }
          if (!err) {
              var coll = db.collection('newData');
              coll.insert(trade_data, function() {
                  db.close();
                  console.log("Data Inserted.");
              });
          } else {
              return false;
          }
      });
  }

  mongo.connect('mongodb://stonexapp:stonexapp@ds033126.mlab.com:33126/stonexapp', function(err, db) {
      var coll = db.collection('thisMonthUSDINRSixteen');
      coll.find({}, {
        "_id": 0
      }).toArray(function(err, arr) {
          if (err) {
              throw err;
              return false;
          }else{
            console.log("Data Came");
            for(var i = 0; i < arr.length; i++){
              if((arr[i]["Strike Price"] % 0.5) == 0){
                  finalArray.push(arr[i]);
              }
            }
            insertInMongo(finalArray);
            db.close();
          }
      });
  });