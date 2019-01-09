              var mongo = require('mongodb').MongoClient;
              var companies = ["nextMonthNiftyFifteen", "nextMonthNiftySixteen", "nextMonthTCSSixteen", "nextMonthUSDINRFifteen", "nextMonthUSDINRFourteen", "nextMonthUSDINRSixteen", "nextMonthUSDINRThirteen", "nextMonthUSDINRThirteenCE", "nextMonthUSDINRThirteenPE", "nifty13minute", "nifty14minute", "nifty15", "nifty15minute", "nifty16", "nifty16minuteFirst", "nifty16minuteSecond", "recordsnew", "TCS", "thisMonthNiftyFifteen", "thisMonthNiftySixteen", "thisMonthTCSSixteen", "thisMonthUSDINRFifteen", "thisMonthUSDINRFourteen", "thisMonthUSDINRSixteen", "thisMonthUSDINRThirteen", "usdinr2013", "usdinr2014", "usdinr2015", "usdinr2016"];  
              k = 0;

              function insertInMongo(data, nameAt) {
                  mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                      if (err) {
                          throw err;
                          return false;
                      }
                      if (!err) {
                          var coll = db.collection(nameAt);
                          coll.insert(data, function() {

                              console.log("Done!");
                              k = k + 1;
                              fetchData(k);
                              db.close();

                          });
                      }else {
                          return false;
                      }
                  });
              }

              function fetchData(k){
                            mongo.connect('mongodb://stonexapp:stonexapp@ds033126.mlab.com:33126/stonexapp', function(err, db) {
                                if (err) {
                                    throw err;
                                    return false;
                                }
                                var nameAt = companies[k];
                                if (!err) {
                                    var coll = db.collection(nameAt);
                                    coll.find({}, {
                                        _id: 0
                                    }).toArray(function(err, arr) {
                                        if (err) {
                                            throw err;
                                            return false;
                                        }
                                        console.log("Data Fetched!");
                                        insertInMongo(arr, nameAt);                          
                                        db.close();
                                    });
                                } else {
                                    return false;
                                }
                            });
              }

              fetchData(k);
