  var mongo = require('mongodb').MongoClient;

  var companies = ["ACC", "ADANIENT", "ADANIPORTS", "AMBUJACEM", "ARVIND", "ASHOKLEY", "ASIANPAINT", "AUROPHARMA", "AXISBANK", "BAJAJ-AUTO", "BANKBARODA", "BANKINDIA", "BANKNIFTY", "BHARATFORG", "BHARTIARTL", "BHEL", "BOSCHLTD", "BPCL", "CAIRN", "CANBK", "CENTURYTEX", "CIPLA", "CNX100", "CNX500", "CNXENERGY", "CNXFMCG", "CNX-IT", "CNX-MIDCAP", "CNX-NIFTY-JUNIOR", "COALINDIA", "DISHTV", "DLF", "DRREDDY", "EICHERMOT", "GAIL", "GOLDBEES", "GRASIM", "HCLTECH", "HDFC", "HDFCBANK", "HDIL", "HEROMOTOCO", "HINDALCO", "HINDPETRO", "HINDUNILVR", "IBREALEST", "ICICIBANK", "IDBI", "IDEA", "IDFC", "INDIAVIX", "INDUSINDBK", "INFRATEL", "INFY", "ITC", "JINDALSTEL", "JSWSTEEL", "KOTAKBANK", "LICHSGFIN", "LT", "LUPIN", "M&M", "MARUTI", "NIFTY", "NIFTYBEES", "NIFTYINFRA", "NIFTYMETAL", "NIFTY-MIDCAP50", "NMDC", "NTPC", "ONGC", "PFC", "PNB", "POWERGRID", "RCOM", "RELCAPITAL", "RELIANCE", "RELINFRA", "RPOWER", "SAIL", "SBIN", "SIEMENS", "SUNPHARMA", "SUNTV", "TATAGLOBAL", "TATAMOTORS", "TATAMTRDVR", "TATAPOWER", "TATASTEEL", "TCS", "TECHM", "TITAN", "ULTRACEMCO", "UNIONBANK", "UPL", "VEDL", "VOLTAS", "WIPRO", "WOCKPHARMA", "YESBANK", "ZEEL"]

  var k = 0;

  var deleteUnwanted = function() {
      mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
          if (err) {
              throw err;
              return false;
          }
          if (!err) {
                  var coll = db.collection(companies[k] + "feb17");
                    coll.deleteMany({ "Time": {$or: ["15:43:00", "15:44:00", "15:45:00", "15:46:00", "15:47:00", "15:48:00", "15:49:00","15:50:00", "15:51:00", "15:52:00",  "15:53:00", "15:54:00", "15:55:00", "15:56:00", , "15:57:00", , "15:58:00", , "15:59:00", "16:00:00"] }});
                    console.log("Deleted from "+companies[k]);
                    db.close();
                    k = k + 1;
                    deleteUnwanted(k);

          } else {
              return false;
          }
      });
  }

  deleteUnwanted(k);
