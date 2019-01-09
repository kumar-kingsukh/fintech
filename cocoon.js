      var path = require('path');
      var dir = './tmp/';

      var finalArray = [];

      var filename = "nifty16dec.csv";

      var createFile = function(arr) {

          console.log("In create file!");

          var json2xls = require('json2xls');
          var fs = require("fs");
          var xls = json2xls(arr);
          var filename = "nifty16dec.xlsx";
          try {
              var dir = './tmp/';
              if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir);
              }
              fs.writeFileSync(dir + filename, xls, 'binary');
          } catch (err) {
              console.log(err);
          }
      }

      var changeDateFormat = function(result){

        for(var i = 0; i < result.length; i++){

              var time = result[i]["Time"].toString();

              time = time+":00";

              var date = result[i]["Date"].toString();

              var year = date.substring(2, 4);

              var month = date.substring(4, 6);

              switch(month){
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

              var day = date.substring  (6, date.length);

              finalDate = day+"-"+month+"-"+year;

              var onePiece = {};
              onePiece["Date"] = finalDate;
              onePiece["Time"] = time;
              onePiece["Open"] = result[i]["Open"];
              onePiece["High"] = result[i]["High"];
              onePiece["Low"] = result[i]["Low"];
              onePiece["LTP"] = result[i]["LTP"];
              finalArray.push(onePiece);
              onePiece = {};
        }

        createFile(finalArray);

      }


      switch (path.extname(filename)) {
          case ".csv":
              var Converter = require("csvtojson").Converter;
              var converter = new Converter({});
              converter.fromFile(dir + filename, function(err, result) {
                    changeDateFormat(result);
              });
              break;

      }