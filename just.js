      // var mongo = require('mongodb').MongoClient;

      // var insertInMongo = function(data){
      //     mongo.connect('mongodb://stonexapp:stonexapp@ds033126.mlab.com:33126/stonexapp', function(err, db) {
      //         if (err) {
      //             throw err;
      //             return false;
      //         }
      //         if (!err) {
      //             var coll = db.collection("TCS");
      //             coll.insert(data, function() {
      //                 console.log("DATA INSERTED.");
      //             });
      //         } else {
      //             console.log("SOMETHING WENT WRONG.");
      //             return false;
      //         }
      //     });
      // }

      var filename = "TCS.xlsx";
      var dir = './tmp/jan/';
      var path = require('path');
      var xlsxj = require("xlsx-to-json");
      switch (path.extname(filename)) {
          case ".csv":
              var Converter = require("csvtojson").Converter;
              var converter = new Converter({});
              converter.fromFile(dir + filename, function(err, result) {
                console.log(result);
              });
              break;

          case ".xlsx":
              var randomjson = Math.floor(Math.random() * 1000000) + ".json";
              xlsxj({
                  input: dir + filename,
                  output: dir + randomjson
              }, function(err, result) {
                  if (err) {
                      console.error(err);
                  } else {
                      console.log(result);
                  }
              });
              break;
      }