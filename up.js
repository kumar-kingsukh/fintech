      var dir = 'tmp/febcsv/';

      var path = require('path');

      var mongo = require('mongodb').MongoClient;

      var companies = ["ACC", "ADANIENT", "ADANIPORTS", "AMBUJACEM", "ARVIND", "ASHOKLEY", "ASIANPAINT", "AUROPHARMA", "AXISBANK", "BAJAJ-AUTO", "BANKBARODA", "BANKINDIA", "BANKNIFTY", "BHARATFORG", "BHARTIARTL", "BHEL", "BOSCHLTD", "BPCL", "CAIRN", "CANBK", "CENTURYTEX", "CIPLA", "CNX100", "CNX500", "CNXENERGY", "CNXFMCG", "CNX-IT", "CNX-MIDCAP", "CNX-NIFTY-JUNIOR", "COALINDIA", "DISHTV", "DLF", "DRREDDY", "EICHERMOT", "GAIL", "GOLDBEES", "GRASIM", "HCLTECH", "HDFC", "HDFCBANK", "HDIL", "HEROMOTOCO", "HINDALCO", "HINDPETRO", "HINDUNILVR", "IBREALEST", "ICICIBANK", "IDBI", "IDEA", "IDFC", "INDIAVIX", "INDUSINDBK", "INFRATEL", "INFY", "ITC", "JINDALSTEL", "JSWSTEEL", "KOTAKBANK", "LICHSGFIN", "LT", "LUPIN", "M&M", "MARUTI", "NIFTY", "NIFTYBEES", "NIFTYINFRA", "NIFTYMETAL", "NIFTY-MIDCAP50", "NMDC", "NTPC", "ONGC", "PFC", "PNB", "POWERGRID", "RCOM", "RELCAPITAL", "RELIANCE", "RELINFRA", "RPOWER", "SAIL", "SBIN", "SIEMENS", "SUNPHARMA", "SUNTV", "TATAGLOBAL", "TATAMOTORS", "TATAMTRDVR", "TATAPOWER", "TATASTEEL", "TCS", "TECHM", "TITAN", "ULTRACEMCO", "UNIONBANK", "UPL", "VEDL", "VOLTAS", "WIPRO", "WOCKPHARMA", "YESBANK", "ZEEL"]

      var k = 0;

      var insertInMongo = function(data, company) {

          mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
              if (err) {
                  throw err;
                  return false;
              }
              if (!err) {
                  var coll = db.collection(company + "feb17");
                  coll.insert(data, function() {

                      k = k + 1;

                      startChanging(k);

                      console.log("Done!");

                      db.close();

                  });
              } else {
                  return false;
              }
          });
      }

      function startChanging(k) {

          var filename = companies[k] + ".csv";

          console.log(companies[k] + " under progress.");

          switch (path.extname(filename)) {
              case ".csv":
                  var Converter = require("csvtojson").Converter;
                  var converter = new Converter({});
                  converter.fromFile(dir + filename, function(err, result) {

                      insertInMongo(result, companies[k]);

                  });
                  break;
          }

      }

      startChanging(k);