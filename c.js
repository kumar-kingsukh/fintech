      var filename = "SBIN.csv";
      var path = require('path');
      var mongo = require('mongodb').MongoClient;
      
      var insertInMongo = function(data) {

          mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
              if (err) {
                  throw err;
                  return false;
              }
              if (!err) {

                  var coll = db.collection("sbin15");
                  coll.insert(data, function() {

                      console.log("Done!");

                      db.close();

                  });
              } else {
                  return false;
              }
          });

      }

      switch (path.extname(filename)) {
          case ".csv":
              var Converter = require("csvtojson").Converter;
              var converter = new Converter({});
              converter.fromFile(filename, function(err, result) {
                  insertInMongo(result);
              });
              break;

          case ".xlsx":
              var randomjson = Math.floor(Math.random() * 1000000) + ".json";
              xlsxj({
                  input: filename,
                  output: randomjson
              }, function(err, result) {
                  if (err) {
                      console.error(err);
                  } else {
                      insertInMongo(result);
                  }
              });
              break;
      }