var mongo = require('mongodb').MongoClient;
var insertInMongo = function(data) {
    mongo.connect('mongodb://stonexapp:stonexapp@ds033126.mlab.com:33126/stonexapp', function(err, db) {
        if (err) {
            throw err;
            return false;
        }
        if (!err) {
            var coll = db.collection('nextMonthUSDINRFifteen');
            coll.insert(data, function() {
                console.log("All Inserted!");
                db.close();
            });
        } else {
            return false;
        }
    });
}

var fetchDataFromMongo = function() {
    mongo.connect('mongodb://stonexapp:stonexapp@ds033126.mlab.com:33126/stonexapp', function(err, db) {
        if (err) {
            throw err;
            return false;
        }
        console.log("Connected");
        if (!err) {
            var coll = db.collection('nextMonthUSDINRThirteenCE');
            coll.find({}, {
                "_id":                      0,
                "Symbol":                   0,
                "Settle Price":             0,
                "No":                       0,
                "Turnover in Lacs":         0,
                "Premium Turnover in Lacs": 0,
                "Open Int":                 0,
                "Change in OI":             0,
                "Underlying Value":         0,
            }).toArray(function(err, arr) {
                if (err) {
                    throw err;
                    return false;
                }
                //console.log(arr);
            console.log("data came");
            db.close();
            var vivek = [];

            for(var i = 0; i < arr.length; i++){
              if((arr[i]["Strike Price"] % 0.5) == 0){
                  vivek.push(arr[i]);
              }
            }

            console.log("about to insert");
            insertInMongo(vivek);
            });

        } else {
            return false;
        }
    });
}

fetchDataFromMongo();

