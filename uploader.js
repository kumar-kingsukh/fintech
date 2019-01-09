      var  k = 0;

      function startChanging(k){
        
          var companies = ["ACC", "ADANIENT", "ADANIPORTS", "AMBUJACEM", "ARVIND", "ASHOKLEY", "ASIANPAINT", "AUROPHARMA", "AXISBANK", "BAJAJ-AUTO", "BANKBARODA", "BANKINDIA", "BANKNIFTY", "BHARATFORG", "BHARTIARTL", "BHEL", "BOSCHLTD", "BPCL", "CAIRN", "CANBK", "CENTURYTEX", "CIPLA", "CNX100", "CNX500", "CNXENERGY", "CNXFMCG", "CNX-IT", "CNX-MIDCAP", "CNX-NIFTY-JUNIOR", "COALINDIA", "DISHTV", "DLF", "DRREDDY", "EICHERMOT", "GAIL", "GOLDBEES", "GRASIM", "HCLTECH", "HDFC", "HDFCBANK", "HDIL", "HEROMOTOCO", "HINDALCO", "HINDPETRO", "HINDUNILVR", "IBREALEST", "ICICIBANK", "IDBI", "IDEA", "IDFC", "INDIAVIX", "INDUSINDBK", "INFRATEL", "INFY", "ITC", "JINDALSTEL", "JSWSTEEL", "KOTAKBANK", "LICHSGFIN", "LT", "LUPIN", "M&M", "MARUTI", "NIFTY", "NIFTYBEES", "NIFTYINFRA", "NIFTYMETAL", "NIFTY-MIDCAP50", "NMDC", "NTPC", "ONGC", "PFC", "PNB", "POWERGRID", "RCOM", "RELCAPITAL", "RELIANCE", "RELINFRA", "RPOWER", "SAIL", "SBIN", "SIEMENS", "SUNPHARMA", "SUNTV", "TATAGLOBAL", "TATAMOTORS", "TATAMTRDVR", "TATAPOWER", "TATASTEEL", "TCS", "TECHM", "TITAN", "ULTRACEMCO", "UNIONBANK", "UPL", "VEDL", "VOLTAS", "WIPRO", "WOCKPHARMA", "YESBANK", "ZEEL"]

          var filename = companies[k];

          var fs = require('fs'),
              readline = require('readline');

          var rd = readline.createInterface({
              input: fs.createReadStream('./tmp/' + filename + '.txt'),
              output: process.stdout,
              console: false
          });

          var pf = function(a) {
              return parseFloat(a);
          }

          var pi = function(a) {
              return parseInt(a);
          }

          semiFinalArray = [];
          finalArray = [];
          rd.on('line', function(line) {
              var array = line.split(',');
              semiFinalArray.push(array);
          });

          var createFile = function(arr) {

              try {
                  var dir = './tmp/jancsv/';
                  var json2csv = require('json2csv');
                  var filename = companies[k]+".csv";
                  var fields = ['Date', 'Time', 'Open', 'High', 'Low', 'LTP'];
                  var arr = arr;
                  var csv = json2csv({
                      data: arr,
                      fields: fields
                  });

                  if (!fs.existsSync(dir)) {
                      fs.mkdirSync(dir);
                  }

                  fs.writeFile(dir + filename, csv, function(err) {
                      if (err) throw err;
                      // res.emit('takeName', filename);
                  });

              } catch (err) {
                  console.log(err);
                  console.log("Error Occured In creating file");
              }

          }

          setTimeout(function() {

              for (var i = 0; i < semiFinalArray.length; i++) {

                  var time = semiFinalArray[i][2].toString();

                  time = time + ":00";

                  var date = semiFinalArray[i][1].toString();

                  var year = date.substring(2, 4);

                  var month = date.substring(4, 6);

                  switch (month) {
                      case "01":
                          month = "Jan"
                          break;
                      case "02":
                          month = "Feb"
                          break;
                      case "03":
                          month = "Mar"
                          break;
                      case "04":
                          month = "Apr"
                          break;
                      case "05":
                          month = "May"
                          break;
                      case "06":
                          month = "Jun"
                          break;
                      case "07":
                          month = "Jul"
                          break;
                      case "08":
                          month = "Aug"
                          break;
                      case "09":
                          month = "Sep"
                          break;
                      case "10":
                          month = "Oct"
                          break;
                      case "11":
                          month = "Nov"
                          break;
                      case "12":
                          month = "Dec"
                          break;
                  }

                  var day = date.substring(6, date.length);

                  finalDate = day + "-" + month + "-" + year;

                  semiFinalArray[i][2] = finalDate;

                  semiFinalArray[i][1] = time;

              }


              for (var i = 0; i < semiFinalArray.length; i++) {

                  var onePiece = {};
                  onePiece["Date"] = semiFinalArray[i][2];
                  onePiece["Time"] = semiFinalArray[i][1];
                  onePiece["Open"] = pf(semiFinalArray[i][3]);
                  onePiece["High"] = pf(semiFinalArray[i][4]);
                  onePiece["Low"] = pf(semiFinalArray[i][5]);
                  onePiece["LTP"] = pf(semiFinalArray[i][6]);
                  finalArray.push(onePiece);
                  onePiece = {};

              }

              createFile(finalArray);

              k = k + 1;
              startChanging(k);


          }, 15000);
      }    
                startChanging(k);