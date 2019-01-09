  var express = require('express');

  var mongo = require('mongodb').MongoClient;

  var session = require("express-session");

  var cookieParser = require('cookie-parser');

  var http = require('http');

  var fs = require('fs');

  var bodyParser = require('body-parser');

  var app = express();

  app.use(bodyParser());

  var serv = require('http').Server(app).listen(process.env.PORT || 5000);

  var path = require('path');

  var formidable = require('formidable');

  var xlsxj = require("xlsx-to-json");

  var calculation = require("./my_modules/calculations");

  var calcur = require("./my_modules/calcur");

  var premiumImport = require("./my_modules/premium");

  app.use('/', express.static(path.join(__dirname, './')));

  app.use(cookieParser());

  app.use(session({
      secret: 'consolidate me',
      cookie: {
          maxAge: 600000000
      }
  }));

  app.use('/nifty', function(req, res, next) {
      var sess = req.session;

      if ((sess.pageSetter) && (sess.pageSetter == req.originalUrl)) {

          if (sess.viewsCEThisMonthSixteen && sess.viewsPEThisMonthSixteen && sess.viewsCENextMonthSixteen && sess.viewsPENextMonthSixteen && sess.viewsCEThisMonthFifteen && sess.viewsPEThisMonthFifteen && sess.viewsCENextMonthFifteen && sess.viewsPENextMonthFifteen) {
              next();
          }

      } else {
          sess.pageSetter = req.originalUrl;
          var fetchCENextMonthSixteenNIFTY = new Promise(function(resolve, reject) {

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthNiftySixteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCENextMonthSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });

          });

          var fetchPENextMonthSixteenNIFTY = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthNiftySixteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPENextMonthSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchCEThisMonthSixteenNIFTY = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthNiftySixteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthSixteenNIFTY = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthNiftySixteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchCENextMonthFifteenNIFTY = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthNiftyFifteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCENextMonthFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPENextMonthFifteenNIFTY = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthNiftyFifteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPENextMonthFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchCEThisMonthFifteenNIFTY = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthNiftyFifteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthFifteenNIFTY = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthNiftyFifteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          Promise.all([fetchCEThisMonthSixteenNIFTY, fetchPEThisMonthSixteenNIFTY, fetchCENextMonthSixteenNIFTY, fetchPENextMonthSixteenNIFTY, fetchCEThisMonthFifteenNIFTY, fetchPEThisMonthFifteenNIFTY, fetchCENextMonthFifteenNIFTY, fetchPENextMonthFifteenNIFTY]).then(function() {
              next();
          });
      }
  });


  app.use('/niftyCEPE', function(req, res, next) {
      var sess = req.session;

      if ((sess.pageSetter) && (sess.pageSetter == req.originalUrl)) {

          if (sess.viewsCEThisMonthSixteen && sess.viewsPEThisMonthSixteen && sess.viewsCEThisMonthFifteen && sess.viewsPEThisMonthFifteen) {
              next();
          }

      } else {
          sess.pageSetter = req.originalUrl;



          var fetchCEThisMonthSixteenNIFTY = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthNiftySixteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthSixteenNIFTY = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthNiftySixteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchCEThisMonthFifteenNIFTY = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthNiftyFifteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthFifteenNIFTY = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthNiftyFifteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          Promise.all([fetchCEThisMonthSixteenNIFTY, fetchPEThisMonthSixteenNIFTY, fetchCEThisMonthFifteenNIFTY, fetchPEThisMonthFifteenNIFTY]).then(function() {
              next();
          });
      }
  });


  app.use('/tcs', function(req, res, next) {
      var sess = req.session;
      if ((sess.pageSetter) && (sess.pageSetter == req.originalUrl)) {

          if (sess.viewsCEThisMonthSixteen && sess.viewsPEThisMonthSixteen && sess.viewsCENextMonthSixteen && sess.viewsPENextMonthSixteen) {
              next();
          }

      } else {
          sess.pageSetter = req.originalUrl;
          var fetchCENextMonthSixteenTCS = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthTCSSixteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCENextMonthSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPENextMonthSixteenTCS = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthTCSSixteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPENextMonthSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchCEThisMonthSixteenTCS = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthTCSSixteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthSixteenTCS = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthTCSSixteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          Promise.all([fetchCEThisMonthSixteenTCS, fetchPEThisMonthSixteenTCS, fetchCENextMonthSixteenTCS, fetchPENextMonthSixteenTCS]).then(function() {
              next();
          });
      }
  });

  app.use('/lt', function(req, res, next) {

      var sess = req.session;

      if ((sess.pageSetter) && (sess.pageSetter == req.originalUrl)) {
          if (sess.viewsCEThisMonthSixteen && sess.viewsPEThisMonthSixteen && sess.viewsCENextMonthSixteen && sess.viewsPENextMonthSixteen) {
              next();
          }

      } else {
          sess.pageSetter = req.originalUrl;
          var fetchCENextMonthSixteenLT = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthLTSixteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCENextMonthSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPENextMonthSixteenLT = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthLTSixteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPENextMonthSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchCEThisMonthSixteenLT = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthLTSixteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthSixteenLT = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthLTSixteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          Promise.all([fetchCEThisMonthSixteenLT, fetchPEThisMonthSixteenLT, fetchCENextMonthSixteenLT, fetchPENextMonthSixteenLT]).then(function() {
              next();
          });
      }
  });

  app.use('/usdinr2013', function(req, res, next) {
      var sess = req.session;

      if ((sess.pageSetter) && (sess.pageSetter == req.originalUrl)) {

          if (sess.viewsCEThisMonthUSDINRThirteen && sess.viewsPEThisMonthUSDINRThirteen && sess.viewsCENextMonthUSDINRThirteen && sess.viewsPENextMonthUSDINRThirteen && sess.viewsCEThisMonthUSDINRThirteen && sess.viewsPEThisMonthUSDINRThirteen && sess.viewsCENextMonthUSDINRThirteen && sess.viewsPENextMonthUSDINRThirteen) {
              next();
          }

      } else {
          sess.pageSetter = req.originalUrl;
          var fetchCENextMonthUSDINRThirteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthUSDINRThirteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCENextMonthUSDINRThirteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPENextMonthUSDINRThirteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthUSDINRThirteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPENextMonthUSDINRThirteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchCEThisMonthUSDINRThirteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthUSDINRThirteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthUSDINRThirteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthUSDINRThirteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthUSDINRThirteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthUSDINRThirteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchCENextMonthUSDINRThirteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthUSDINRThirteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCENextMonthUSDINRThirteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPENextMonthUSDINRThirteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthUSDINRThirteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPENextMonthUSDINRThirteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchCEThisMonthUSDINRThirteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthUSDINRThirteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthUSDINRThirteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthUSDINRThirteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthUSDINRThirteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthUSDINRThirteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          Promise.all([fetchCEThisMonthUSDINRThirteen, fetchPEThisMonthUSDINRThirteen, fetchCENextMonthUSDINRThirteen, fetchPENextMonthUSDINRThirteen, fetchCEThisMonthUSDINRThirteen, fetchPEThisMonthUSDINRThirteen, fetchCENextMonthUSDINRThirteen, fetchPENextMonthUSDINRThirteen]).then(function() {
              next();
          });
      }
  });

  app.use('/usdinr2014', function(req, res, next) {
      var sess = req.session;

      if ((sess.pageSetter) && (sess.pageSetter == req.originalUrl)) {

          if (sess.viewsCEThisMonthUSDINRFourteen && sess.viewsPEThisMonthUSDINRFourteen && sess.viewsCENextMonthUSDINRFourteen && sess.viewsPENextMonthUSDINRFourteen && sess.viewsCEThisMonthUSDINRFourteen && sess.viewsPEThisMonthUSDINRFourteen && sess.viewsCENextMonthUSDINRFourteen && sess.viewsPENextMonthUSDINRFourteen) {
              next();
          }

      } else {
          sess.pageSetter = req.originalUrl;
          var fetchCENextMonthUSDINRFourteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthUSDINRFourteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCENextMonthUSDINRFourteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPENextMonthUSDINRFourteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthUSDINRFourteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPENextMonthUSDINRFourteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchCEThisMonthUSDINRFourteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthUSDINRFourteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthUSDINRFourteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthUSDINRFourteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthUSDINRFourteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthUSDINRFourteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchCENextMonthUSDINRFourteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthUSDINRFourteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCENextMonthUSDINRFourteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPENextMonthUSDINRFourteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthUSDINRFourteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPENextMonthUSDINRFourteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchCEThisMonthUSDINRFourteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthUSDINRFourteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthUSDINRFourteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthUSDINRFourteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthUSDINRFourteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthUSDINRFourteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          Promise.all([fetchCEThisMonthUSDINRFourteen, fetchPEThisMonthUSDINRFourteen, fetchCENextMonthUSDINRFourteen, fetchPENextMonthUSDINRFourteen, fetchCEThisMonthUSDINRFourteen, fetchPEThisMonthUSDINRFourteen, fetchCENextMonthUSDINRFourteen, fetchPENextMonthUSDINRFourteen]).then(function() {
              next();
          });
      }
  });

  app.use('/usdinr2015', function(req, res, next) {
      var sess = req.session;

      if ((sess.pageSetter) && (sess.pageSetter == req.originalUrl)) {

          if (sess.viewsCEThisMonthUSDINRFifteen && sess.viewsPEThisMonthUSDINRFifteen && sess.viewsCENextMonthUSDINRFifteen && sess.viewsPENextMonthUSDINRFifteen && sess.viewsCEThisMonthUSDINRFifteen && sess.viewsPEThisMonthUSDINRFifteen && sess.viewsCENextMonthUSDINRFifteen && sess.viewsPENextMonthUSDINRFifteen) {
              next();
          }

      } else {
          sess.pageSetter = req.originalUrl;
          var fetchCENextMonthUSDINRFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthUSDINRFifteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCENextMonthUSDINRFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPENextMonthUSDINRFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthUSDINRFifteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPENextMonthUSDINRFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchCEThisMonthUSDINRFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthUSDINRFifteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthUSDINRFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthUSDINRFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthUSDINRFifteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthUSDINRFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchCENextMonthUSDINRFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthUSDINRFifteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCENextMonthUSDINRFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPENextMonthUSDINRFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthUSDINRFifteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPENextMonthUSDINRFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchCEThisMonthUSDINRFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthUSDINRFifteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthUSDINRFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthUSDINRFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthUSDINRFifteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthUSDINRFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          Promise.all([fetchCEThisMonthUSDINRFifteen, fetchPEThisMonthUSDINRFifteen, fetchCENextMonthUSDINRFifteen, fetchPENextMonthUSDINRFifteen, fetchCEThisMonthUSDINRFifteen, fetchPEThisMonthUSDINRFifteen, fetchCENextMonthUSDINRFifteen, fetchPENextMonthUSDINRFifteen]).then(function() {
              next();
          });
      }
  });

  app.use('/usdinr2016', function(req, res, next) {
      var sess = req.session;

      if ((sess.pageSetter) && (sess.pageSetter == req.originalUrl)) {

          if (sess.viewsCEThisMonthUSDINRSixteen && sess.viewsPEThisMonthUSDINRSixteen && sess.viewsCENextMonthUSDINRSixteen && sess.viewsPENextMonthUSDINRSixteen && sess.viewsCEThisMonthUSDINRSixteen && sess.viewsPEThisMonthUSDINRSixteen && sess.viewsCENextMonthUSDINRSixteen && sess.viewsPENextMonthUSDINRSixteen) {
              next();
          }

      } else {
          sess.pageSetter = req.originalUrl;
          var fetchCENextMonthUSDINRSixteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthUSDINRSixteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCENextMonthUSDINRSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPENextMonthUSDINRSixteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthUSDINRSixteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPENextMonthUSDINRSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchCEThisMonthUSDINRSixteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthUSDINRSixteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthUSDINRSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthUSDINRSixteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthUSDINRSixteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthUSDINRSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchCENextMonthUSDINRSixteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthUSDINRSixteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCENextMonthUSDINRSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPENextMonthUSDINRSixteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nextMonthUSDINRSixteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPENextMonthUSDINRSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchCEThisMonthUSDINRSixteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthUSDINRSixteen');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthUSDINRSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthUSDINRSixteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('thisMonthUSDINRSixteen');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthUSDINRSixteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          Promise.all([fetchCEThisMonthUSDINRSixteen, fetchPEThisMonthUSDINRSixteen, fetchCENextMonthUSDINRSixteen, fetchPENextMonthUSDINRSixteen, fetchCEThisMonthUSDINRSixteen, fetchPEThisMonthUSDINRSixteen, fetchCENextMonthUSDINRSixteen, fetchPENextMonthUSDINRSixteen]).then(function() {
              next();
          });
      }
  });

  app.use('/BHEL2015', function(req, res, next) {
      var sess = req.session;

      if ((sess.pageSetter) && (sess.pageSetter == req.originalUrl)) {

          if (sess.viewsCEThisMonthBHELFifteen && sess.viewsPEThisMonthBHELFifteen) {
              next();
          }

      } else {
          sess.pageSetter = req.originalUrl;

          var fetchCEThisMonthBHELFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('BHEL2015');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthBHELFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthBHELFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('BHEL2015');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthBHELFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });  
          });

          Promise.all([fetchCEThisMonthBHELFifteen, fetchPEThisMonthBHELFifteen, null, null, null, null, null, null]).then(function() {
              next();
          });
      }
  });

  app.use('/AXISBANK2015', function(req, res, next) {
      var sess = req.session;

      if ((sess.pageSetter) && (sess.pageSetter == req.originalUrl)) {

          if (sess.viewsCEThisMonthAXISBANKFifteen && sess.viewsPEThisMonthAXISBANKFifteen) {
              next();
          }

      } else {
          sess.pageSetter = req.originalUrl;

          var fetchCEThisMonthAXISBANKFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('AXISBANK2015');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthAXISBANKFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthAXISBANKFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('AXISBANK2015');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthAXISBANKFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });  
          });

          Promise.all([fetchCEThisMonthAXISBANKFifteen, fetchPEThisMonthAXISBANKFifteen, null, null, null, null, null, null]).then(function() {
              next();
          });
      }
  });

  app.use('/COALINDIA2015', function(req, res, next) {
      var sess = req.session;

      if ((sess.pageSetter) && (sess.pageSetter == req.originalUrl)) {

          if (sess.viewsCEThisMonthCOALINDIAFifteen && sess.viewsPEThisMonthCOALINDIAFifteen) {
              next();
          }

      } else {
          sess.pageSetter = req.originalUrl;

          var fetchCEThisMonthCOALINDIAFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('COALINDIA2015');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthCOALINDIAFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthCOALINDIAFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('COALINDIA2015');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthCOALINDIAFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });  
          });

          Promise.all([fetchCEThisMonthCOALINDIAFifteen, fetchPEThisMonthCOALINDIAFifteen, null, null, null, null, null, null]).then(function() {
              next();
          });
      }
  });

  app.use('/HDFC2015', function(req, res, next) {
      var sess = req.session;

      if ((sess.pageSetter) && (sess.pageSetter == req.originalUrl)) {

          if (sess.viewsCEThisMonthHDFCFifteen && sess.viewsPEThisMonthHDFCFifteen) {
              next();
          }

      } else {
          sess.pageSetter = req.originalUrl;

          var fetchCEThisMonthHDFCFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('HDFC2015');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthHDFCFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthHDFCFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('HDFC2015');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthHDFCFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });  
          });

          Promise.all([fetchCEThisMonthHDFCFifteen, fetchPEThisMonthHDFCFifteen, null, null, null, null, null, null]).then(function() {
              next();
          });
      }
  });

  app.use('/HINDALCO2015', function(req, res, next) {
      var sess = req.session;

      if ((sess.pageSetter) && (sess.pageSetter == req.originalUrl)) {

          if (sess.viewsCEThisMonthHINDALCOFifteen && sess.viewsPEThisMonthHINDALCOFifteen) {
              next();
          }

      } else {
          sess.pageSetter = req.originalUrl;

          var fetchCEThisMonthHINDALCOFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('HINDALCO2015');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthHINDALCOFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthHINDALCOFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('HINDALCO2015');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthHINDALCOFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });  
          });

          Promise.all([fetchCEThisMonthHINDALCOFifteen, fetchPEThisMonthHINDALCOFifteen, null, null, null, null, null, null]).then(function() {
              next();
          });
      }
  });

  app.use('/HINDUNILVR2015', function(req, res, next) {
      var sess = req.session;

      if ((sess.pageSetter) && (sess.pageSetter == req.originalUrl)) {

          if (sess.viewsCEThisMonthHINDUNILVRFifteen && sess.viewsPEThisMonthHINDUNILVRFifteen) {
              next();
          }

      } else {
          sess.pageSetter = req.originalUrl;

          var fetchCEThisMonthHINDUNILVRFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('HINDUNILVR2015');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthHINDUNILVRFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthHINDUNILVRFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('HINDUNILVR2015');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthHINDUNILVRFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });  
          });

          Promise.all([fetchCEThisMonthHINDUNILVRFifteen, fetchPEThisMonthHINDUNILVRFifteen, null, null, null, null, null, null]).then(function() {
              next();
          });
      }
  });

  app.use('/ICICIBANK2015', function(req, res, next) {
      var sess = req.session;

      if ((sess.pageSetter) && (sess.pageSetter == req.originalUrl)) {

          if (sess.viewsCEThisMonthICICIBANKFifteen && sess.viewsPEThisMonthICICIBANKFifteen) {
              next();
          }

      } else {
          sess.pageSetter = req.originalUrl;

          var fetchCEThisMonthICICIBANKFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('ICICIBANK2015');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthICICIBANKFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthICICIBANKFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('ICICIBANK2015');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthICICIBANKFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });  
          });

          Promise.all([fetchCEThisMonthICICIBANKFifteen, fetchPEThisMonthICICIBANKFifteen, null, null, null, null, null, null]).then(function() {
              next();
          });
      }
  });

  app.use('/INFY2015', function(req, res, next) {
      var sess = req.session;

      if ((sess.pageSetter) && (sess.pageSetter == req.originalUrl)) {

          if (sess.viewsCEThisMonthINFYFifteen && sess.viewsPEThisMonthINFYFifteen) {
              next();
          }

      } else {
          sess.pageSetter = req.originalUrl;

          var fetchCEThisMonthINFYFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('INFY2015');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthINFYFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthINFYFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('INFY2015');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthINFYFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });  
          });

          Promise.all([fetchCEThisMonthINFYFifteen, fetchPEThisMonthINFYFifteen, null, null, null, null, null, null]).then(function() {
              next();
          });
      }
  });

  app.use('/ITC2015', function(req, res, next) {
      var sess = req.session;

      if ((sess.pageSetter) && (sess.pageSetter == req.originalUrl)) {

          if (sess.viewsCEThisMonthITCFifteen && sess.viewsPEThisMonthITCFifteen) {
              next();
          }

      } else {
          sess.pageSetter = req.originalUrl;

          var fetchCEThisMonthITCFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('ITC2015');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthITCFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthITCFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('ITC2015');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthITCFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });  
          });

          Promise.all([fetchCEThisMonthITCFifteen, fetchPEThisMonthITCFifteen, null, null, null, null, null, null]).then(function() {
              next();
          });
      }
  });

  app.use('/ONGC2015', function(req, res, next) {
      var sess = req.session;

      if ((sess.pageSetter) && (sess.pageSetter == req.originalUrl)) {

          if (sess.viewsCEThisMonthONGCFifteen && sess.viewsPEThisMonthONGCFifteen) {
              next();
          }

      } else {
          sess.pageSetter = req.originalUrl;

          var fetchCEThisMonthONGCFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('ONGC2015');
                      coll.find({
                          "Option Type": "CE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsCEThisMonthONGCFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });
          });

          var fetchPEThisMonthONGCFifteen = new Promise(function(resolve, reject) {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('ONGC2015');
                      coll.find({
                          "Option Type": "PE"
                      }, {
                          _id: 0
                      }).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          sess.viewsPEThisMonthONGCFifteen = arr;
                          db.close();
                          resolve();
                      });

                  } else {
                      return false;
                  }
              });  
          });

          Promise.all([fetchCEThisMonthONGCFifteen, fetchPEThisMonthONGCFifteen, null, null, null, null, null, null]).then(function() {
              next();
          });
      }
  });

  app.get('/', function(req, res) {
      res.sendFile(__dirname + '/index.html');
  });
//vivek
  app.get('/csv', function(req, res) {
      res.sendFile(__dirname + '/upload.html');
  });

  app.get('/cepeupload', function(req, res) {
      res.sendFile(__dirname + '/cepeupload.html');
  });

  app.get('/tick', function(req, res) {
      res.sendFile(__dirname + '/tick.html');
  });

  app.get('/putgap', function(req, res) {
      res.sendFile(__dirname + '/gapper.html');
  });

  app.get('/nifty', function(req, res) {
      res.sendFile(__dirname + '/nifty.html');
  });

  app.get('/lt', function(req, res) {
      res.sendFile(__dirname + '/nifty.html');
  });

  app.get('/tcs', function(req, res) {
      res.sendFile(__dirname + '/nifty.html');
  });

  app.get('/premium', function(req, res) {
      res.sendFile(__dirname + '/premium.html');
  });

  app.get('/cepe', function(req, res) {
      res.sendFile(__dirname + '/cepe.html');
  });

  app.get('/currency', function(req, res) {
      res.sendFile(__dirname + '/currency.html');
  });

  app.get('/ohol', function(req, res) {
      res.sendFile(__dirname + '/ohol.html');
  });

  app.get('/oholnew', function(req, res) {
      res.sendFile(__dirname + '/oholnew.html');
  });

  app.get('/ohol2', function(req, res) {
      res.sendFile(__dirname + '/ohol2.html');
  });

  app.get('/oholreversed', function(req, res) {
      res.sendFile(__dirname + '/oholreversed.html');
  });

  app.get('/oresults', function(req, res) {
      res.sendFile(__dirname + '/oresults.html');
  });

  app.get('/currencycsv', function(req, res) {
      res.sendFile(__dirname + '/currencycsv.html');
  });

  app.get('/currencyohol', function(req, res) {
      res.sendFile(__dirname + '/currencyohol.html');
  });

  app.get('/stoploss', function(req, res) {
      res.sendFile(__dirname + '/stoploss.html');
  });

  app.get('/usdinr2013', function(req, res) {
      res.sendFile(__dirname + '/nifty.html');
  });

  app.get('/usdinr2014', function(req, res) {
      res.sendFile(__dirname + '/nifty.html');
  });

  app.get('/usdinr2015', function(req, res) {
      res.sendFile(__dirname + '/nifty.html');
  });

  app.get('/usdinr2016', function(req, res) {
      res.sendFile(__dirname + '/nifty.html');
  });

  app.get('/BHEL2015', function(req, res) {
      res.sendFile(__dirname + '/nifty.html');
  });

  app.get('/COALINDIA2015', function(req, res) {
      res.sendFile(__dirname + '/nifty.html');
  });

  app.get('/HDFC2015', function(req, res) {
      res.sendFile(__dirname + '/nifty.html');
  });

  app.get('/HINDALCO2015', function(req, res) {
      res.sendFile(__dirname + '/nifty.html');
  });

  app.get('/ICICIBANK2015', function(req, res) {
      res.sendFile(__dirname + '/nifty.html');
  });

  app.get('/INFY2015', function(req, res) {
      res.sendFile(__dirname + '/nifty.html');
  });

  app.get('/ITC2015', function(req, res) {
      res.sendFile(__dirname + '/nifty.html');
  });

  app.get('/ONGC2015', function(req, res) {
      res.sendFile(__dirname + '/nifty.html');
  });

  app.get('/oresultscurrency', function(req, res) {
      res.sendFile(__dirname + '/oresultscurrency.html');
  });

  app.get('/niftyCEPE', function(req, res) {
      res.sendFile(__dirname + '/niftyCEPE.html');
  });

  app.get('/omd', function(req, res) {
      res.sendFile(__dirname + '/omd.html');
  });

  app.get('/yearlygraphs', function(req, res) {
      res.sendFile(__dirname + '/d3/yearly.html');
  });

  app.get('/minutegraphs', function(req, res) {
      res.sendFile(__dirname + '/d3/minute.html');
  });

  app.get('/download/:filename', function(req, res) {
      var path = require('path');
      var mime = require('mime');
      var file = __dirname + '/tmp/' + req.params.filename;
      var filename = path.basename(file);
      var mimetype = mime.lookup(file);

      res.setHeader('Content-disposition', 'attachment; filename=' + filename);
      res.setHeader('Content-type', mimetype);

      var filestream = fs.createReadStream(file);
      filestream.pipe(res);
  });

  app.get('/threepointer', function(req, res) {
      res.sendFile(__dirname + '/d3/threepointer.html');
  });

  app.post('/upload', function(req, res) {

      var dir = './tmp/';

      if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
      }

      var form = new formidable.IncomingForm();

      form.multiples = false;
      form.uploadDir = path.join(__dirname, './tmp');
      form.on('file', function(field, file) {
          err = 0;
          if (path.extname(file.name) === ".csv") {
              filename = Math.floor(Math.random() * 1000000) + ".csv";
          } else if (path.extname(file.name) === ".xlsx") {
              filename = Math.floor(Math.random() * 1000000) + ".xlsx";
          } else {
              err = 1;
              res.status(404).send("File format not valid");
              return false;
          }


          fs.rename(file.path, path.join(form.uploadDir, filename));
      });

      form.on('error', function(err) {
          console.log('An error has occured: \n' + err);
      });

      form.on('end', function() {
          if (err == 1) {

          } else {
              res.end(filename);
          }
      });

      form.parse(req);
  });

  app.post("/nse/:instrumentType/:symbol/:year/:expiryDate/:fromDate/:toDate/:fr/:till/:gap/:fu", function(req, res) {
      var instrumentType = req.params.instrumentType;
      var symbol = req.params.symbol;
      var year = req.params.year;
      var expiryDate = req.params.expiryDate;
      var fromDate = req.params.fromDate;
      var toDate = req.params.toDate;
      var fr = req.params.fr;
      var till = req.params.till;
      var gap = req.params.gap;
      var fu = req.params.fu;

      var request = require('request');

      var createFile = function(arr, type) {
          var json2xls = require('json2xls');
          var xls = json2xls(arr);
          if (type == 2 || type == 3) {
              res.emit('progressLane', "Getting file ready.");
          }
          if (type == 1 || type == 2) {
              var filename = "download.xlsx";
              try {
                  var dir = './tmp/';
                  if (!fs.existsSync(dir)) {
                      fs.mkdirSync(dir);
                  }
                  fs.writeFileSync(dir + filename, xls, 'binary');
                  if (type == 2) {
                      res.emit('takeName', filename);
                  }
                  if (type == 1) {
                      res.end(filename);
                  }
              } catch (err) {
                  console.log(err);
                  console.log("Error Occured In creating file");
                  if (type == 1) {
                      res.status(404).send("Sorry, something went wrong please try again.");
                  }
              }
          }
          if (type == 3) {
              try {
                  var dir = './tmp/';
                  var json2csv = require('json2csv');
                  var filename = "download.csv";
                  var fields = ['DATE', 'TIME', 'OPEN', 'HIGH', 'LOW', 'CLOSE'];
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
                      res.emit('takeName', filename);
                  });

              } catch (err) {
                  console.log(err);
                  console.log("Error Occured In creating file");
              }

          }
      }

      var getCalls = new Promise(function(resolve, reject) {
          request.post({
              headers: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
              url: 'https://vivek12ec1118.000webhostapp.com/',
              form: {
                  "instrumentType": instrumentType,
                  "symbol": symbol,
                  "year": year,
                  "expiryDate": expiryDate,
                  "optionType": "CE",
                  "fromDate": fromDate,
                  "toDate": toDate
              }
          }, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                  var cheerio = require("cheerio");
                  var $ = cheerio.load(body);
                  $('#csvContentDiv').filter(function() {
                      var mainContent = $(this).text();
                      var Entities = require('html-entities').AllHtmlEntities;
                      entities = new Entities();
                      mainContent = entities.decode(mainContent);
                      var Converter = require("csvtojson").Converter;
                      var converter = new Converter({});
                      mainContent = mainContent.replace(/\:/g, "\n");
                      converter.fromString(mainContent.toString(), function(err, result) {
                          resolve(calculation(res, fs).algoSix(fr, till, gap, result, fu));
                      });
                  });
              }
          });
      });

      var getPuts = new Promise(function(resolve, reject) {
          request.post({
              headers: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
              url: 'https://vivek12ec1118.000webhostapp.com/',
              form: {
                  "instrumentType": instrumentType,
                  "symbol": symbol,
                  "year": year,
                  "expiryDate": expiryDate,
                  "optionType": "PE",
                  "fromDate": fromDate,
                  "toDate": toDate
              }
          }, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                  var cheerio = require("cheerio");
                  var $ = cheerio.load(body);
                  $('#csvContentDiv').filter(function() {
                      var mainContent = $(this).text();
                      var Entities = require('html-entities').AllHtmlEntities;
                      entities = new Entities();
                      mainContent = entities.decode(mainContent);

                      var Converter = require("csvtojson").Converter;
                      var converter = new Converter({});
                      mainContent = mainContent.replace(/\:/g, "\n");
                      converter.fromString(mainContent.toString(), function(err, result) {
                          resolve(calculation(res, fs).algoSix(fr, till, gap, result, fu));
                      });
                  });
              }
          });
      });

      Promise.all([getCalls, getPuts]).then(values => {
          var finalArray = [];
          var pushEmpty = [];
          for (var i = 0; i < values[0].length; i++) {
              finalArray.push(values[0][i]);
          }

          var keyLen = Object.keys(finalArray[0]).length;

          for (var i = 0; i < keyLen; i++) {
              pushEmpty[i] = "";
          }

          for (var i = 0; i < 5; i++) {
              finalArray.push(pushEmpty);
          }

          for (var i = 0; i < values[0].length; i++) {
              finalArray.push(values[1][i]);
          }

          createFile(finalArray, 1);
      });
  });



  app.post("/nseupload/:instrumentType/:symbol/:year/:expiryDate/:fromDate/:toDate/:fr/:till/:gap/:fu", function(req, res) {

      var instrumentType = req.params.instrumentType;
      var symbol = req.params.symbol;
      var year = req.params.year;
      var expiryDate = req.params.expiryDate;
      var fromDate = req.params.fromDate;
      var toDate = req.params.toDate;
      var fr = req.params.fr;
      var till = req.params.till;
      var gap = req.params.gap;
      var fu = req.params.fu;

      var request = require('request');

      var insertInMongoCE = function(data, company) {

          mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
              if (err) {
                  throw err;
                  return false;
              }
              if (!err) {
                  var coll = db.collection(company + "2015");
                  coll.insert(data, function() {

                      console.log("Calls Done!");

                      db.close();

                  });
              } else {
                  return false;
              }
          });
      }

      var insertInMongoPE = function(data, company) {

          mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
              if (err) {
                  throw err;
                  return false;
              }
              if (!err) {
                  var coll = db.collection(company + "2015");
                  coll.insert(data, function() {

                      console.log("Puts Done!");

                      db.close();

                  });
              } else {
                  return false;
              }
          });
      }

      var getCalls = new Promise(function(resolve, reject) {
          request.post({
              headers: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
              url: 'https://vivek12ec1118.000webhostapp.com/',
              form: {
                  "instrumentType": instrumentType,
                  "symbol": symbol,
                  "year": year,
                  "expiryDate": expiryDate,
                  "optionType": "CE",
                  "fromDate": fromDate,
                  "toDate": toDate
              }
          }, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                  var cheerio = require("cheerio");
                  var $ = cheerio.load(body);
                  $('#csvContentDiv').filter(function() {
                      var mainContent = $(this).text();
                      var Entities = require('html-entities').AllHtmlEntities;
                      entities = new Entities();
                      mainContent = entities.decode(mainContent);
                      var Converter = require("csvtojson").Converter;
                      var converter = new Converter({});
                      mainContent = mainContent.replace(/\:/g, "\n");
                      converter.fromString(mainContent.toString(), function(err, result) {
                          resolve(result);
                      });
                  });
              }
          });
      });

      var getPuts = new Promise(function(resolve, reject) {
          request.post({
              headers: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
              url: 'https://vivek12ec1118.000webhostapp.com/',
              form: {
                  "instrumentType": instrumentType,
                  "symbol": symbol,
                  "year": year,
                  "expiryDate": expiryDate,
                  "optionType": "PE",
                  "fromDate": fromDate,
                  "toDate": toDate
              }
          }, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                  var cheerio = require("cheerio");
                  var $ = cheerio.load(body);
                  $('#csvContentDiv').filter(function() {
                      var mainContent = $(this).text();
                      var Entities = require('html-entities').AllHtmlEntities;
                      entities = new Entities();
                      mainContent = entities.decode(mainContent);

                      var Converter = require("csvtojson").Converter;
                      var converter = new Converter({});
                      mainContent = mainContent.replace(/\:/g, "\n");
                      converter.fromString(mainContent.toString(), function(err, result) {
                          resolve(result);
                      });
                  });
              }
          });
      });

      Promise.all([getCalls, getPuts]).then(values => {
          insertInMongoPE(values[0], symbol);
          insertInMongoCE(values[1], symbol);
      });
  });



  var insertInMongoCurrencyCE = function(trade_data) {
      mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
          if (err) {
              throw err;
              return false;
          }
          if (!err) {
              var coll = db.collection('nextMonthUSDINRThirteenCE');
              coll.insert(trade_data, function() {
                  db.close();
              });
          } else {
              return false;
          }
      });
  }

  var insertInMongoCurrencyPE = function(trade_data) {
      mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
          if (err) {
              throw err;
              return false;
          }
          if (!err) {
              var coll = db.collection('nextMonthUSDINRThirteenPE');
              coll.insert(trade_data, function() {
                  db.close();
              });
          } else {
              return false;
          }
      });
  }

  app.post("/nsecur/:instrumentType/:symbol/:year/:expiryDate/:fromDate/:toDate/:fr/:till/:gap/:fu", function(req, res) {
      var instrumentType = req.params.instrumentType;
      var symbol = req.params.symbol;
      var year = req.params.year;
      var fromDate = req.params.fromDate;
      var toDate = req.params.toDate;
      var expiryDate = req.params.expiryDate;
      var fr = req.params.fr;
      var till = req.params.till;
      var gap = req.params.gap;
      var fu = req.params.fu;

      var request = require('request');

      var createFile = function(arr, type) {
          var json2xls = require('json2xls');
          var xls = json2xls(arr);
          if (type == 2 || type == 3) {
              res.emit('progressLane', "Getting file ready.");
          }
          if (type == 1 || type == 2) {
              var filename = "download.xlsx";
              try {
                  var dir = './tmp/';
                  if (!fs.existsSync(dir)) {
                      fs.mkdirSync(dir);
                  }
                  fs.writeFileSync(dir + filename, xls, 'binary');
                  if (type == 2) {
                      res.emit('takeName', filename);
                  }
                  if (type == 1) {
                      res.end(filename);
                  }
              } catch (err) {
                  console.log(err);
                  console.log("Error Occured In creating file");
                  if (type == 1) {
                      res.status(404).send("Sorry, something went wrong please try again.");
                  }
              }
          }

          if (type == 3) {
              try {
                  var dir = './tmp/';
                  var json2csv = require('json2csv');
                  var filename = "download.csv";
                  var fields = ['DATE', 'TIME', 'OPEN', 'HIGH', 'LOW', 'CLOSE'];
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
                      res.emit('takeName', filename);
                  });

              } catch (err) {
                  console.log(err);
                  console.log("Error Occured In creating file");
              }

          }
      }

      var giveFuture = function(arr) {
          for (var i = 0; i < arr.length; i++) {
              for (key in arr[i]) {
                  if (!((key.indexOf('Trade Date') > -1) || (key.indexOf('Underlyings') > -1) || (key.indexOf('Open Price') > -1) || (key.indexOf('High Price') > -1) || (key.indexOf('Low Price') > -1) || (key.indexOf('Close Price') > -1))) {
                      delete arr[i][key];
                  }
              }
          }

          arr.sort(function(a, b) {
              var aDate = a["Trade Date"];
              var bDate = b["Trade Date"];
              var aa = aDate.replace("Jan", "01").replace("Feb", "02").replace("Mar", "03").replace("Apr", "04").replace("May", "05").replace("Jun", "06").replace("Jul", "07").replace("Aug", "08").replace("Sep", "09").replace("Oct", "10").replace("Nov", "11").replace("Dec", "12");
              var bb = bDate.replace("Jan", "01").replace("Feb", "02").replace("Mar", "03").replace("Apr", "04").replace("May", "05").replace("Jun", "06").replace("Jul", "07").replace("Aug", "08").replace("Sep", "09").replace("Oct", "10").replace("Nov", "11").replace("Dec", "12");
              var aD = aa.split("-");
              var bD = bb.split("-");

              if (aD[0].length == 1) {
                  aD[0] = "0" + aD[0].toString();
              }

              if (bD[0].length == 1) {
                  bD[0] = "0" + bD[0].toString();
              }

              var aD = aD.reverse().join(),
                  bD = bD.reverse().join();
              aD = aD.replace(/\,/g, "");
              bD = bD.replace(/\,/g, "");
              aD = parseInt(aD);
              bD = parseInt(bD);
              return aD < bD ? -1 : (aD > bD ? 1 : 0);
          });

          createFile(arr, 1);
      }

      if (fu == 1) {

          request.post({
              headers: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
              url: 'https://vivek12ec1118.000webhostapp.com/future.php',
              form: {
                  "instrumentType": instrumentType,
                  "symbol": symbol,
                  "fromDate": fromDate,
                  "expiryDate": expiryDate,
                  "toDate": toDate
              }
          }, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                  var cheerio = require("cheerio");
                  var $ = cheerio.load(body);
                  $('#csvContentDiv').filter(function() {
                      var mainContent = $(this).text();
                      var Entities = require('html-entities').AllHtmlEntities;
                      entities = new Entities();
                      mainContent = entities.decode(mainContent);
                      var Converter = require("csvtojson").Converter;
                      var converter = new Converter({});
                      mainContent = mainContent.replace(/\:/g, "\n");
                      converter.fromString(mainContent.toString(), function(err, result) {
                          giveFuture(result);
                      });
                  });
              }
          });
      } else {
          var getCalls = new Promise(function(resolve, reject) {
              request.post({
                  headers: {
                      'content-type': 'application/x-www-form-urlencoded'
                  },
                  url: 'https://vivek12ec1118.000webhostapp.com/currency.php',
                  form: {
                      "instrumentType": instrumentType,
                      "expiryDate": expiryDate,
                      "symbol": symbol,
                      "year": year,
                      "optionType": "CE",
                      "fromDate": fromDate,
                      "toDate": toDate
                  }
              }, function(error, response, body) {
                  if (!error && response.statusCode == 200) {
                      var cheerio = require("cheerio");
                      var $ = cheerio.load(body);
                      $('#csvContentDiv').filter(function() {
                          var mainContent = $(this).text();
                          var Entities = require('html-entities').AllHtmlEntities;
                          entities = new Entities();
                          mainContent = entities.decode(mainContent);
                          var Converter = require("csvtojson").Converter;
                          var converter = new Converter({});
                          mainContent = mainContent.replace(/\:/g, "\n");
                          converter.fromString(mainContent.toString(), function(err, result) {
                              // insertInMongoCurrencyCE(result);
                              resolve(calculation(res, fs).algoSeven(fr, till, gap, result, fu));
                          });
                      });
                  } else {
                      console.log(error);
                  }
              });
          });

          var getPuts = new Promise(function(resolve, reject) {
              request.post({
                  headers: {
                      'content-type': 'application/x-www-form-urlencoded'
                  },
                  url: 'https://vivek12ec1118.000webhostapp.com/currency.php',
                  form: {
                      "instrumentType": instrumentType,
                      "expiryDate": expiryDate,
                      "symbol": symbol,
                      "year": year,
                      "optionType": "PE",
                      "fromDate": fromDate,
                      "toDate": toDate
                  }
              }, function(error, response, body) {
                  if (!error && response.statusCode == 200) {
                      var cheerio = require("cheerio");
                      var $ = cheerio.load(body);
                      $('#csvContentDiv').filter(function() {
                          var mainContent = $(this).text();
                          var Entities = require('html-entities').AllHtmlEntities;
                          entities = new Entities();
                          mainContent = entities.decode(mainContent);
                          var Converter = require("csvtojson").Converter;
                          var converter = new Converter({});
                          mainContent = mainContent.replace(/\:/g, "\n");
                          converter.fromString(mainContent.toString(), function(err, result) {
                              // insertInMongoCurrencyPE(result);
                              resolve(calculation(res, fs).algoSeven(fr, till, gap, result, fu));
                          });
                      });
                  } else {
                      console.log(error);
                  }
              });
          });

          Promise.all([getCalls, getPuts]).then(values => {

              var finalArray = [];
              var pushEmpty = [];
              for (var i = 0; i < values[0].length; i++) {
                  finalArray.push(values[0][i]);
              }

              var keyLen = Object.keys(finalArray[0]).length;

              for (var i = 0; i < keyLen; i++) {
                  pushEmpty[i] = "";
              }

              for (var i = 0; i < 5; i++) {
                  finalArray.push(pushEmpty);
              }

              for (var i = 0; i < values[0].length; i++) {
                  finalArray.push(values[1][i]);
              }

              createFile(finalArray, 1);
          });
      }
  });

  app.post("/curnse/:instrumentType/:symbol/:year/:expiryDate/:fromDate/:toDate/:fr/:till/:gap/:fu/:plusValue/:inputQuan/:addMul/:firstQuan/:addQuan", function(req, res) {
      var instrumentType = req.params.instrumentType;
      var symbol = req.params.symbol;
      var year = req.params.year;
      var fromDate = req.params.fromDate;
      var toDate = req.params.toDate;
      var expiryDate = req.params.expiryDate;
      var fr = req.params.fr;
      var till = req.params.till;
      var gap = req.params.gap;
      var fu = req.params.fu;

      var plusvalue = req.params.plusValue;
      var inputquan = req.params.inputQuan;
      var addMul = req.params.addMul;
      var addQuan = req.params.addQuan;
      var firstQuan = req.params.firstQuan;

      var createFile = function(arr, type) {
          var json2xls = require('json2xls');
          var xls = json2xls(arr);
          if (type == 2 || type == 3) {
              res.emit('progressLane', "Getting file ready.");
          }
          if (type == 1 || type == 2) {
              var filename = "download.xlsx";
              try {
                  var dir = './tmp/';
                  if (!fs.existsSync(dir)) {
                      fs.mkdirSync(dir);
                  }
                  fs.writeFileSync(dir + filename, xls, 'binary');
                  if (type == 2) {
                      res.emit('takeName', filename);
                  }
                  if (type == 1) {
                      res.end(filename);
                  }
              } catch (err) {
                  console.log(err);
                  console.log("Error Occured In creating file");
                  if (type == 1) {
                      res.status(404).send("Sorry, something went wrong please try again.");
                  }
              }
          }

          if (type == 3) {
              try {
                  var dir = './tmp/';
                  var json2csv = require('json2csv');
                  var filename = "download.csv";
                  var fields = ['DATE', 'TIME', 'OPEN', 'HIGH', 'LOW', 'CLOSE'];
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
                      res.emit('takeName', filename);
                  });

              } catch (err) {
                  console.log(err);
                  console.log("Error Occured In creating file");
              }

          }
      }

      var giveFuture = function(arr) {
          for (var i = 0; i < arr.length; i++) {
              for (key in arr[i]) {
                  if (!((key.indexOf('Trade Date') > -1) || (key.indexOf('Underlyings') > -1) || (key.indexOf('Open Price') > -1) || (key.indexOf('High Price') > -1) || (key.indexOf('Low Price') > -1) || (key.indexOf('Close Price') > -1))) {
                      delete arr[i][key];
                  }
              }
          }

          arr.sort(function(a, b) {
              var aDate = a["Trade Date"];
              var bDate = b["Trade Date"];
              var aa = aDate.replace("Jan", "01").replace("Feb", "02").replace("Mar", "03").replace("Apr", "04").replace("May", "05").replace("Jun", "06").replace("Jul", "07").replace("Aug", "08").replace("Sep", "09").replace("Oct", "10").replace("Nov", "11").replace("Dec", "12");
              var bb = bDate.replace("Jan", "01").replace("Feb", "02").replace("Mar", "03").replace("Apr", "04").replace("May", "05").replace("Jun", "06").replace("Jul", "07").replace("Aug", "08").replace("Sep", "09").replace("Oct", "10").replace("Nov", "11").replace("Dec", "12");
              var aD = aa.split("-");
              var bD = bb.split("-");

              if (aD[0].length == 1) {
                  aD[0] = "0" + aD[0].toString();
              }

              if (bD[0].length == 1) {
                  bD[0] = "0" + bD[0].toString();
              }

              var aD = aD.reverse().join(),
                  bD = bD.reverse().join();
              aD = aD.replace(/\,/g, "");
              bD = bD.replace(/\,/g, "");
              aD = parseInt(aD);
              bD = parseInt(bD);
              return aD < bD ? -1 : (aD > bD ? 1 : 0);
          });

          calculation().algoEight(res, arr, plusvalue, inputquan, addMul, addQuan, firstQuan, 2);
      }

      if (fu == 1) {

          var request = require('request');
          request.post({
              headers: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
              url: 'https://vivek12ec1118.000webhostapp.com/future.php',
              form: {
                  "instrumentType": instrumentType,
                  "symbol": symbol,
                  "fromDate": fromDate,
                  "expiryDate": expiryDate,
                  "toDate": toDate
              }
          }, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                  var cheerio = require("cheerio");
                  var $ = cheerio.load(body);
                  $('#csvContentDiv').filter(function() {
                      var mainContent = $(this).text();
                      var Entities = require('html-entities').AllHtmlEntities;
                      entities = new Entities();
                      mainContent = entities.decode(mainContent);
                      var Converter = require("csvtojson").Converter;
                      var converter = new Converter({});
                      mainContent = mainContent.replace(/\:/g, "\n");
                      converter.fromString(mainContent.toString(), function(err, result) {
                          giveFuture(result);
                      });
                  });
              } else {
                  console.log(error);
              }
          });
      } else {
          var getCalls = new Promise(function(resolve, reject) {
              request.post({
                  headers: {
                      'content-type': 'application/x-www-form-urlencoded'
                  },
                  url: 'https://vivek12ec1118.000webhostapp.com/currency.php',
                  form: {
                      "instrumentType": instrumentType,
                      "expiryDate": expiryDate,
                      "symbol": symbol,
                      "year": year,
                      "optionType": "CE",
                      "fromDate": fromDate,
                      "toDate": toDate
                  }
              }, function(error, response, body) {
                  if (!error && response.statusCode == 200) {
                      var cheerio = require("cheerio");
                      var $ = cheerio.load(body);
                      $('#csvContentDiv').filter(function() {
                          var mainContent = $(this).text();
                          var Entities = require('html-entities').AllHtmlEntities;
                          entities = new Entities();
                          mainContent = entities.decode(mainContent);
                          var Converter = require("csvtojson").Converter;
                          var converter = new Converter({});
                          mainContent = mainContent.replace(/\:/g, "\n");
                          converter.fromString(mainContent.toString(), function(err, result) {
                              resolve(calculation(res, fs).algoSeven(fr, till, gap, result, fu));
                          });
                      });
                  }
              });
          });

          var getPuts = new Promise(function(resolve, reject) {
              request.post({
                  headers: {
                      'content-type': 'application/x-www-form-urlencoded'
                  },
                  url: 'https://vivek12ec1118.000webhostapp.com/currency.php',
                  form: {
                      "instrumentType": instrumentType,
                      "expiryDate": expiryDate,
                      "symbol": symbol,
                      "year": year,
                      "optionType": "PE",
                      "fromDate": fromDate,
                      "toDate": toDate
                  }
              }, function(error, response, body) {
                  if (!error && response.statusCode == 200) {
                      var cheerio = require("cheerio");
                      var $ = cheerio.load(body);
                      $('#csvContentDiv').filter(function() {
                          var mainContent = $(this).text();
                          var Entities = require('html-entities').AllHtmlEntities;
                          entities = new Entities();
                          mainContent = entities.decode(mainContent);
                          var Converter = require("csvtojson").Converter;
                          var converter = new Converter({});
                          mainContent = mainContent.replace(/\:/g, "\n");
                          converter.fromString(mainContent.toString(), function(err, result) {
                              resolve(calculation(res, fs).algoSeven(fr, till, gap, result, fu));
                          });
                      });
                  }
              });
          });

          Promise.all([getCalls, getPuts]).then(values => {

              var finalArray = [];
              var pushEmpty = [];
              for (var i = 0; i < values[0].length; i++) {
                  finalArray.push(values[0][i]);
              }

              var keyLen = Object.keys(finalArray[0]).length;

              for (var i = 0; i < keyLen; i++) {
                  pushEmpty[i] = "";
              }

              for (var i = 0; i < 5; i++) {
                  finalArray.push(pushEmpty);
              }

              for (var i = 0; i < values[0].length; i++) {
                  finalArray.push(values[1][i]);
              }

              createFile(finalArray, 1);
          });
      }
  });

  app.post("/putpremium/:filename/:fixedstrike/:daysuptill/:typo", function(req, res) {
      var filename = req.params.filename;
      var fixedstrike = req.params.fixedstrike;
      var daysuptill = req.params.daysuptill;
      var typo = req.params.typo;
      var dir = './tmp/';
      switch (path.extname(filename)) {
          case ".csv":
              var Converter = require("csvtojson").Converter;
              var converter = new Converter({});
              converter.fromFile(dir + filename, function(err, result) {
                  premiumImport().givePremium(res, fs, result, fixedstrike, daysuptill, typo); //requiring algo1
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
                      premiumImport().givePremium(res, fs, result, fixedstrike, daysuptill, typo);
                  }
              });
              break;
      }
  });


  app.post("/putGap/:companyname/:gapValue", function(req, res) {

      var companyname = req.params.companyname;
      var gapValue = parseInt(req.params.gapValue);

      var getEquity = new Promise(function(resolve, reject) {

          var request = require('request');
          request.post({
              headers: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
              url: 'https://vivek12ec1118.000webhostapp.com/equity.php',
              form: {
                  "symbol": companyname
              }
          }, function(error, response, body) {

              if (!error && response.statusCode == 200) {
                  var cheerio = require("cheerio");
                  var $ = cheerio.load(body);
                  $('#csvContentDiv').filter(function() {
                      var mainContent = $(this).text();
                      var Entities = require('html-entities').AllHtmlEntities;
                      entities = new Entities();
                      mainContent = entities.decode(mainContent);
                      var Converter = require("csvtojson").Converter;
                      var converter = new Converter({});
                      mainContent = mainContent.replace(/\:/g, "\n");
                      converter.fromString(mainContent.toString(), function(err, result) {
                          resolve(result);
                      });
                  });
              }

          });
      });

      Promise.all([getEquity]).then(values => {

          calculation(res).putGaps(values[0], gapValue);

      });

  });

  app.post('/calculated/:filename/:plusvalue/:inputquan/:initialstrike/:checked/:currency/:underlyings/:dontSquare/:nseYear', function(req, res) {
      var filename = req.params.filename;
      var plusvalue = req.params.plusvalue;
      var inputquan = req.params.inputquan;
      var initialstrike = req.params.initialstrike;
      var checked = req.params.checked;
      var currency = req.params.currency;
      var underlyings = req.params.underlyings;
      var dontSquare = req.params.dontSquare;
      var nseYear = req.params.nseYear;
      var dir = './tmp/';

      switch (path.extname(filename)) {
          case ".csv":
              var Converter = require("csvtojson").Converter;
              var converter = new Converter({});
              converter.fromFile(dir + filename, function(err, result) {
                  calculation(res, fs, result, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, null, null, null, null, null, null, null, null, null).algoOne(); //requiring algo1
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
                      calculation(res, fs, result, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, null, null, null, null, null, null, null, null, null).algoOne(); //requiring algo1
                  }
              });
              break;
      }
      
  });

  app.post('/calculate/:companyname/:plusvalue/:inputquan/:initialstrike/:checked/:currency/:underlyings/:dontSquare/:nseYear', function(req, res) {
      
      console.log("came here");

      var companyname = req.params.companyname;
      var plusvalue = req.params.plusvalue;
      var inputquan = req.params.inputquan;
      var initialstrike = req.params.initialstrike;
      var checked = req.params.checked;
      var currency = req.params.currency;
      var underlyings = req.params.underlyings;
      var dontSquare = req.params.dontSquare;
      var nseYear = req.params.nseYear;
      var strikeData = req.body;

      var dir = './tmp/';

      console.log(companyname.trim());

      switch (companyname.trim()) {

          case "BHEL 15 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('bhel15');
                      coll.find({}, {
                          _id: 0
                      }).limit(22).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthBHELFifteen, sess.viewsCEThisMonthBHELFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "BHEL 15 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('bhel15');
                      coll.find({}, {
                          _id: 0
                      }).skip(20).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthBHELFifteen, sess.viewsCEThisMonthBHELFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1            
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "BHEL 15 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('bhel15');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthBHELFifteen, sess.viewsCEThisMonthBHELFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "BHEL 15 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('bhel15');
                      coll.find({}, {
                          _id: 0
                      }).skip(59).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthBHELFifteen, sess.viewsCEThisMonthBHELFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "BHEL 15 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('bhel15');
                      coll.find({}, {
                          _id: 0
                      }).skip(81).limit(27).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthBHELFifteen, sess.viewsCEThisMonthBHELFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "BHEL 15 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('bhel15');
                      coll.find({}, {
                          _id: 0
                      }).skip(100).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthBHELFifteen, sess.viewsCEThisMonthBHELFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "BHEL 15 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('bhel15');
                      coll.find({}, {
                          _id: 0
                      }).skip(120).limit(27).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthBHELFifteen, sess.viewsCEThisMonthBHELFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                     
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "BHEL 15 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('bhel15');
                      coll.find({}, {
                          _id: 0
                      }).skip(145).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthBHELFifteen, sess.viewsCEThisMonthBHELFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "BHEL 15 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('bhel15');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthBHELFifteen, sess.viewsCEThisMonthBHELFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "BHEL 15 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('bhel15');
                      coll.find({}, {
                          _id: 0
                      }).skip(184).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthBHELFifteen, sess.viewsCEThisMonthBHELFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "BHEL 15 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('bhel15');
                      coll.find({}, {
                          _id: 0
                      }).skip(206).limit(20).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthBHELFifteen, sess.viewsCEThisMonthBHELFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "AXISBANK 15 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('axis15');
                      coll.find({}, {
                          _id: 0
                      }).limit(30).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthAXISBANKFifteen, sess.viewsCEThisMonthAXISBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "AXISBANK 15 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('axis15');
                      coll.find({}, {
                          _id: 0
                      }).skip(28).limit(27).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthAXISBANKFifteen, sess.viewsCEThisMonthAXISBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1            
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "AXISBANK 15 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('axis15');
                      coll.find({}, {
                          _id: 0
                      }).skip(53).limit(26).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthAXISBANKFifteen, sess.viewsCEThisMonthAXISBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "AXISBANK 15 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('axis15');
                      coll.find({}, {
                          _id: 0
                      }).skip(77).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthAXISBANKFifteen, sess.viewsCEThisMonthAXISBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "AXISBANK 15 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('axis15');
                      coll.find({}, {
                          _id: 0
                      }).skip(104).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthAXISBANKFifteen, sess.viewsCEThisMonthAXISBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "AXISBANK 15 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('axis15');
                      coll.find({}, {
                          _id: 0
                      }).skip(129).limit(28).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthAXISBANKFifteen, sess.viewsCEThisMonthAXISBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "AXISBANK 15 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('axis15');
                      coll.find({}, {
                          _id: 0
                      }).skip(152).limit(28).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthAXISBANKFifteen, sess.viewsCEThisMonthAXISBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                     
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "AXISBANK 15 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('axis15');
                      coll.find({}, {
                          _id: 0
                      }).skip(177).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthAXISBANKFifteen, sess.viewsCEThisMonthAXISBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "AXISBANK 15 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('axis15');
                      coll.find({}, {
                          _id: 0
                      }).skip(199).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthAXISBANKFifteen, sess.viewsCEThisMonthAXISBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "AXISBANK 15 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('axis15');
                      coll.find({}, {
                          _id: 0
                      }).skip(217).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthAXISBANKFifteen, sess.viewsCEThisMonthAXISBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "AXISBANK 15 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('axis15');
                      coll.find({}, {
                          _id: 0
                      }).skip(239).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthAXISBANKFifteen, sess.viewsCEThisMonthAXISBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "COALINDIA 15 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('coalindia15');
                      coll.find({}, {
                          _id: 0
                      }).limit(22).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthCOALINDIAFifteen, sess.viewsCEThisMonthCOALINDIAFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "COALINDIA 15 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('coalindia15');
                      coll.find({}, {
                          _id: 0
                      }).skip(20).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthCOALINDIAFifteen, sess.viewsCEThisMonthCOALINDIAFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1            
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "COALINDIA 15 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('coalindia15');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthCOALINDIAFifteen, sess.viewsCEThisMonthCOALINDIAFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "COALINDIA 15 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('coalindia15');
                      coll.find({}, {
                          _id: 0
                      }).skip(59).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthCOALINDIAFifteen, sess.viewsCEThisMonthCOALINDIAFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "COALINDIA 15 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('coalindia15');
                      coll.find({}, {
                          _id: 0
                      }).skip(81).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthCOALINDIAFifteen, sess.viewsCEThisMonthCOALINDIAFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "COALINDIA 15 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('coalindia15');
                      coll.find({}, {
                          _id: 0
                      }).skip(100).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthCOALINDIAFifteen, sess.viewsCEThisMonthCOALINDIAFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "COALINDIA 15 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('coalindia15');
                      coll.find({}, {
                          _id: 0
                      }).skip(120).limit(27).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthCOALINDIAFifteen, sess.viewsCEThisMonthCOALINDIAFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                     
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "COALINDIA 15 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('coalindia15');
                      coll.find({}, {
                          _id: 0
                      }).skip(145).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthCOALINDIAFifteen, sess.viewsCEThisMonthCOALINDIAFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "COALINDIA 15 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('coalindia15');
                      coll.find({}, {
                          _id: 0
                      }).skip(166).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthCOALINDIAFifteen, sess.viewsCEThisMonthCOALINDIAFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "COALINDIA 15 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('coalindia15');
                      coll.find({}, {
                          _id: 0
                      }).skip(184).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthCOALINDIAFifteen, sess.viewsCEThisMonthCOALINDIAFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "COALINDIA 15 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('coalindia15');
                      coll.find({}, {
                          _id: 0
                      }).skip(206).limit(20).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthCOALINDIAFifteen, sess.viewsCEThisMonthCOALINDIAFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;


          case "SBIN 15 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('sbin15');
                      coll.find({}, {
                          _id: 0
                      }).limit(22).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSBINFifteen, sess.viewsCEThisMonthSBINFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "SBIN 15 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('sbin15');
                      coll.find({}, {
                          _id: 0
                      }).skip(20).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSBINFifteen, sess.viewsCEThisMonthSBINFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1            
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "SBIN 15 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('sbin15');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSBINFifteen, sess.viewsCEThisMonthSBINFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "SBIN 15 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('sbin15');
                      coll.find({}, {
                          _id: 0
                      }).skip(59).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSBINFifteen, sess.viewsCEThisMonthSBINFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "SBIN 15 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('sbin15');
                      coll.find({}, {
                          _id: 0
                      }).skip(81).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSBINFifteen, sess.viewsCEThisMonthSBINFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "SBIN 15 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('sbin15');
                      coll.find({}, {
                          _id: 0
                      }).skip(100).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSBINFifteen, sess.viewsCEThisMonthSBINFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "SBIN 15 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('sbin15');
                      coll.find({}, {
                          _id: 0
                      }).skip(120).limit(27).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSBINFifteen, sess.viewsCEThisMonthSBINFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                     
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "SBIN 15 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('sbin15');
                      coll.find({}, {
                          _id: 0
                      }).skip(145).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSBINFifteen, sess.viewsCEThisMonthSBINFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "SBIN 15 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('sbin15');
                      coll.find({}, {
                          _id: 0
                      }).skip(166).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSBINFifteen, sess.viewsCEThisMonthSBINFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "SBIN 15 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('sbin15');
                      coll.find({}, {
                          _id: 0
                      }).skip(184).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSBINFifteen, sess.viewsCEThisMonthSBINFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "SBIN 15 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('sbin15');
                      coll.find({}, {
                          _id: 0
                      }).skip(206).limit(20).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSBINFifteen, sess.viewsCEThisMonthSBINFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;


          case "HDFC 15 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hdfc15');
                      coll.find({}, {
                          _id: 0
                      }).limit(22).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHDFCFifteen, sess.viewsCEThisMonthHDFCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HDFC 15 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hdfc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(20).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHDFCFifteen, sess.viewsCEThisMonthHDFCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1            
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HDFC 15 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hdfc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHDFCFifteen, sess.viewsCEThisMonthHDFCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HDFC 15 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hdfc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(59).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHDFCFifteen, sess.viewsCEThisMonthHDFCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HDFC 15 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hdfc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(82).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHDFCFifteen, sess.viewsCEThisMonthHDFCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HDFC 15 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hdfc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(101).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHDFCFifteen, sess.viewsCEThisMonthHDFCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HDFC 15 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hdfc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(121).limit(27).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHDFCFifteen, sess.viewsCEThisMonthHDFCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                     
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HDFC 15 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hdfc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(146).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHDFCFifteen, sess.viewsCEThisMonthHDFCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HDFC 15 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hdfc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(166).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHDFCFifteen, sess.viewsCEThisMonthHDFCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HDFC 15 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hdfc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(185).limit(41).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHDFCFifteen, sess.viewsCEThisMonthHDFCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HDFC 15 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hdfc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(224).limit(40).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHDFCFifteen, sess.viewsCEThisMonthHDFCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "HINDALCO 15 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindalco15');
                      coll.find({}, {
                          _id: 0
                      }).limit(22).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDALCOFifteen, sess.viewsCEThisMonthHINDALCOFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDALCO 15 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindalco15');
                      coll.find({}, {
                          _id: 0
                      }).skip(20).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDALCOFifteen, sess.viewsCEThisMonthHINDALCOFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1            
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDALCO 15 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindalco15');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDALCOFifteen, sess.viewsCEThisMonthHINDALCOFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDALCO 15 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindalco15');
                      coll.find({}, {
                          _id: 0
                      }).skip(59).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDALCOFifteen, sess.viewsCEThisMonthHINDALCOFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDALCO 15 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindalco15');
                      coll.find({}, {
                          _id: 0
                      }).skip(81).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDALCOFifteen, sess.viewsCEThisMonthHINDALCOFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDALCO 15 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindalco15');
                      coll.find({}, {
                          _id: 0
                      }).skip(100).limit(26).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDALCOFifteen, sess.viewsCEThisMonthHINDALCOFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDALCO 15 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindalco15');
                      coll.find({}, {
                          _id: 0
                      }).skip(120).limit(27).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDALCOFifteen, sess.viewsCEThisMonthHINDALCOFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                     
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDALCO 15 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindalco15');
                      coll.find({}, {
                          _id: 0
                      }).skip(145).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDALCOFifteen, sess.viewsCEThisMonthHINDALCOFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDALCO 15 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindalco15');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDALCOFifteen, sess.viewsCEThisMonthHINDALCOFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDALCO 15 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindalco15');
                      coll.find({}, {
                          _id: 0
                      }).skip(184).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDALCOFifteen, sess.viewsCEThisMonthHINDALCOFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDALCO 15 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindalco15');
                      coll.find({}, {
                          _id: 0
                      }).skip(206).limit(20).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDALCOFifteen, sess.viewsCEThisMonthHINDALCOFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "HINDUNILVR 15 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindunilvr15');
                      coll.find({}, {
                          _id: 0
                      }).limit(22).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDUNILVRFifteen, sess.viewsCEThisMonthHINDUNILVRFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDUNILVR 15 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindunilvr15');
                      coll.find({}, {
                          _id: 0
                      }).skip(19).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDUNILVRFifteen, sess.viewsCEThisMonthHINDUNILVRFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1            
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDUNILVR 15 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindunilvr15');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDUNILVRFifteen, sess.viewsCEThisMonthHINDUNILVRFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDUNILVR 15 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindunilvr15');
                      coll.find({}, {
                          _id: 0
                      }).skip(62).limit(19).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDUNILVRFifteen, sess.viewsCEThisMonthHINDUNILVRFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDUNILVR 15 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindunilvr15');
                      coll.find({}, {
                          _id: 0
                      }).skip(79).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDUNILVRFifteen, sess.viewsCEThisMonthHINDUNILVRFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDUNILVR 15 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindunilvr15');
                      coll.find({}, {
                          _id: 0
                      }).skip(98).limit(26).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDUNILVRFifteen, sess.viewsCEThisMonthHINDUNILVRFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDUNILVR 15 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindunilvr15');
                      coll.find({}, {
                          _id: 0
                      }).skip(123).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDUNILVRFifteen, sess.viewsCEThisMonthHINDUNILVRFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                     
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDUNILVR 15 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindunilvr15');
                      coll.find({}, {
                          _id: 0
                      }).skip(143).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDUNILVRFifteen, sess.viewsCEThisMonthHINDUNILVRFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDUNILVR 15 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindunilvr15');
                      coll.find({}, {
                          _id: 0
                      }).skip(163).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDUNILVRFifteen, sess.viewsCEThisMonthHINDUNILVRFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDUNILVR 15 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindunilvr15');
                      coll.find({}, {
                          _id: 0
                      }).skip(186).limit(19).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDUNILVRFifteen, sess.viewsCEThisMonthHINDUNILVRFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "HINDUNILVR 15 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('hindunilvr15');
                      coll.find({}, {
                          _id: 0
                      }).skip(204).limit(20).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthHINDUNILVRFifteen, sess.viewsCEThisMonthHINDUNILVRFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "ICICIBANK 15 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('icicibank15');
                      coll.find({}, {
                          _id: 0
                      }).limit(22).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthICICIBANKFifteen, sess.viewsCEThisMonthICICIBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ICICIBANK 15 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('icicibank15');
                      coll.find({}, {
                          _id: 0
                      }).skip(20).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthICICIBANKFifteen, sess.viewsCEThisMonthICICIBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1            
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ICICIBANK 15 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('icicibank15');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthICICIBANKFifteen, sess.viewsCEThisMonthICICIBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ICICIBANK 15 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('icicibank15');
                      coll.find({}, {
                          _id: 0
                      }).skip(59).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthICICIBANKFifteen, sess.viewsCEThisMonthICICIBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ICICIBANK 15 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('icicibank15');
                      coll.find({}, {
                          _id: 0
                      }).skip(81).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthICICIBANKFifteen, sess.viewsCEThisMonthICICIBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ICICIBANK 15 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('icicibank15');
                      coll.find({}, {
                          _id: 0
                      }).skip(100).limit(26).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthICICIBANKFifteen, sess.viewsCEThisMonthICICIBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ICICIBANK 15 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('icicibank15');
                      coll.find({}, {
                          _id: 0
                      }).skip(120).limit(27).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthICICIBANKFifteen, sess.viewsCEThisMonthICICIBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                     
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ICICIBANK 15 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('icicibank15');
                      coll.find({}, {
                          _id: 0
                      }).skip(145).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthICICIBANKFifteen, sess.viewsCEThisMonthICICIBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ICICIBANK 15 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('icicibank15');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthICICIBANKFifteen, sess.viewsCEThisMonthICICIBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ICICIBANK 15 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('icicibank15');
                      coll.find({}, {
                          _id: 0
                      }).skip(184).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthICICIBANKFifteen, sess.viewsCEThisMonthICICIBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ICICIBANK 15 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('icicibank15');
                      coll.find({}, {
                          _id: 0
                      }).skip(206).limit(20).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthICICIBANKFifteen, sess.viewsCEThisMonthICICIBANKFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "INFY 15 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('infy15');
                      coll.find({}, {
                          _id: 0
                      }).limit(22).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthINFYFifteen, sess.viewsCEThisMonthINFYFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "INFY 15 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('infy15');
                      coll.find({}, {
                          _id: 0
                      }).skip(20).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthINFYFifteen, sess.viewsCEThisMonthINFYFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1            
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "INFY 15 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('infy15');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthINFYFifteen, sess.viewsCEThisMonthINFYFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "INFY 15 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('infy15');
                      coll.find({}, {
                          _id: 0
                      }).skip(59).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthINFYFifteen, sess.viewsCEThisMonthINFYFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "INFY 15 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('infy15');
                      coll.find({}, {
                          _id: 0
                      }).skip(82).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthINFYFifteen, sess.viewsCEThisMonthINFYFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "INFY 15 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('infy15');
                      coll.find({}, {
                          _id: 0
                      }).skip(101).limit(26).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthINFYFifteen, sess.viewsCEThisMonthINFYFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "INFY 15 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('infy15');
                      coll.find({}, {
                          _id: 0
                      }).skip(121).limit(28).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthINFYFifteen, sess.viewsCEThisMonthINFYFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                     
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "INFY 15 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('infy15');
                      coll.find({}, {
                          _id: 0
                      }).skip(146).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthINFYFifteen, sess.viewsCEThisMonthINFYFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "INFY 15 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('infy15');
                      coll.find({}, {
                          _id: 0
                      }).skip(166).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthINFYFifteen, sess.viewsCEThisMonthINFYFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "INFY 15 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('infy15');
                      coll.find({}, {
                          _id: 0
                      }).skip(185).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthINFYFifteen, sess.viewsCEThisMonthINFYFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "INFY 15 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('infy15');
                      coll.find({}, {
                          _id: 0
                      }).skip(207).limit(20).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthINFYFifteen, sess.viewsCEThisMonthINFYFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "ITC 15 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('itc15');
                      coll.find({}, {
                          _id: 0
                      }).limit(22).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthITCFifteen, sess.viewsCEThisMonthITCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ITC 15 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('itc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(20).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthITCFifteen, sess.viewsCEThisMonthITCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1            
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ITC 15 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('itc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthITCFifteen, sess.viewsCEThisMonthITCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ITC 15 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('itc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(59).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthITCFifteen, sess.viewsCEThisMonthITCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ITC 15 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('itc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(82).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthITCFifteen, sess.viewsCEThisMonthITCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ITC 15 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('itc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(101).limit(26).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthITCFifteen, sess.viewsCEThisMonthITCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ITC 15 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('itc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(121).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthITCFifteen, sess.viewsCEThisMonthITCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                     
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ITC 15 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('itc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(146).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthITCFifteen, sess.viewsCEThisMonthITCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ITC 15 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('itc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(166).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthITCFifteen, sess.viewsCEThisMonthITCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ITC 15 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('itc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(185).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthITCFifteen, sess.viewsCEThisMonthITCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ITC 15 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('itc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(207).limit(20).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthITCFifteen, sess.viewsCEThisMonthITCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "ONGC 15 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('ongc15');
                      coll.find({}, {
                          _id: 0
                      }).limit(22).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthONGCFifteen, sess.viewsCEThisMonthONGCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ONGC 15 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('ongc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(20).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthONGCFifteen, sess.viewsCEThisMonthONGCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1            
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ONGC 15 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('ongc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthONGCFifteen, sess.viewsCEThisMonthONGCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ONGC 15 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('ongc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(59).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthONGCFifteen, sess.viewsCEThisMonthONGCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ONGC 15 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('ongc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(81).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthONGCFifteen, sess.viewsCEThisMonthONGCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ONGC 15 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('ongc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(100).limit(26).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthONGCFifteen, sess.viewsCEThisMonthONGCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ONGC 15 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('ongc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(123).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthONGCFifteen, sess.viewsCEThisMonthONGCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                     
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ONGC 15 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('ongc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(145).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthONGCFifteen, sess.viewsCEThisMonthONGCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ONGC 15 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('ongc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthONGCFifteen, sess.viewsCEThisMonthONGCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ONGC 15 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('ongc15');
                      coll.find({}, {
                          _id: 0
                      }).skip(184).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthONGCFifteen, sess.viewsCEThisMonthONGCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "ONGC 15 NOV TO DEC":
              var sess = req.session;
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
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthONGCFifteen, sess.viewsCEThisMonthONGCFifteen, null, null, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(20).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(40).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(58).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(75).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(97).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(117).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(140).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(160).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(180).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(201).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(221).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "USDINR 14 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(20).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(58).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(74).limit(26).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(94).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(115).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(137).limit(25).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(155).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(177).limit(20).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(194).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(212).limit(36).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(19).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(37).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(58).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(76).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(95).limit(24).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(117).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(140).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(160).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(180).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(200).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(220).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).limit(20).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(18).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(38).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(58).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(74).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(96).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(118).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(138).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(159).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(179).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(197).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(219).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "NIFTY 15 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 15 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(19).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1            
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 15 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 15 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(62).limit(19).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 15 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(79).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 15 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(98).limit(26).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 15 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(123).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1                     
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 15 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(143).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 15 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(163).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 15 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(186).limit(19).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "NIFTY 15 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(204).limit(20).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 16":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty16');
                      coll.find({}, {
                          _id: 0
                      }).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "LT 16 JAN TO FEB":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "LT 16 FEB TO MAR":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(43).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1                     
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "LT 16 MAR TO APR":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(81).limit(40).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeDatam, sess.pageSetter, 0).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "LT 16 APR TO MAY":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(120).limit(46).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlying, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "LT 16 MAY TO JUN":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "LT 16 JUN TO JUL":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(120).limit(46).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "LT 16 JUL TO AUG":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "LT 16 AUG TO SEP":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "LT 16 SEP TO OCT":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "LT 16 OCT TO NOV":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "LT 16 NOV TO DEC":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "TCS 16 JAN TO FEB":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "TCS 16 FEB TO MAR":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(43).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "TCS 16 MAR TO APR":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(81).limit(40).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "TCS 16 APR TO MAY":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(120).limit(46).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "TCS 16 MAY TO JUN":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "TCS 16 JUN TO JUL":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(120).limit(46).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "TCS 16 JUL TO AUG":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "TCS 16 AUG TO SEP":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "TCS 16 SEP TO OCT":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "TCS 16 OCT TO NOV":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoOne(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "TCS 16 NOV TO DEC":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSette, 0).algoOne(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;

          default:
              console.log("came in default");
              var peDataThisMonthSixteen = [];
              var ceDataThisMonthSixteen = [];
              if (checked != 1){
                  var getEquity = new Promise(function(resolve, reject) {
                      var request = require('request');
                      request.post({
                          headers: {
                              'content-type': 'application/x-www-form-urlencoded'
                          },
                          url: 'https://vivek12ec1118.000webhostapp.com/equity.php',
                          form: {
                              "symbol": companyname
                          }
                      }, function(error, response, body) {
                          if (!error && response.statusCode == 200) {
                              var cheerio = require("cheerio");
                              var $ = cheerio.load(body);
                              $('#csvContentDiv').filter(function() {
                                  var mainContent = $(this).text();
                                  var Entities = require('html-entities').AllHtmlEntities;
                                  entities = new Entities();
                                  mainContent = entities.decode(mainContent);
                                  var Converter = require("csvtojson").Converter;
                                  var converter = new Converter({});
                                  mainContent = mainContent.replace(/\:/g, "\n");
                                  converter.fromString(mainContent.toString(), function(err, result) {
                                      resolve(result);
                                  });
                              });
                          }
                      });
                  });

                  var getCEPE = new Promise(function(resolve, reject) {
                      mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          if (!err) {
                              var coll = db.collection(companyname);
                              coll.find({}, {
                                  _id: 0
                              }).toArray(function(err, arr) {
                                  if (err) {
                                      throw err;
                                      return false;
                                  }
                                  resolve(arr);
                                  db.close();
                              });
                          } else {
                              return false;
                          }
                      });
                  });

                  Promise.all([getEquity, getCEPE]).then(values => {

                      for (var i = 0; i < values[0].length; i++) {

                          if (values[0][i]["Option Type"] == "CE") {
                              var onePiece = {};
                              onePiece["Date"] = values[0][i]["Date"];
                              onePiece["Expiry"] = values[0][i]["Expiry"];
                              onePiece["Option Type"] = values[0][i]["Option Type"];
                              onePiece["Strike Price"] = values[0][i]["Strike Price"];
                              onePiece["Open"] = values[0][i]["Open"];
                              onePiece["High"] = values[0][i]["High"];
                              onePiece["Low"] = values[0][i]["Low"];
                              onePiece["Close"] = values[0][i]["Close"];
                              onePiece["LTP"] = values[0][i]["LTP"];
                              ceDataThisMonthSixteen.push(onePiece);
                              onePiece = {};
                          }

                          if (values[0][i]["Option Type"] == "PE") {
                              var onePiece = {};
                              onePiece["Date"] = values[0][i]["Date"];
                              onePiece["Expiry"] = values[0][i]["Expiry"];
                              onePiece["Option Type"] = values[0][i]["Option Type"];
                              onePiece["Strike Price"] = values[0][i]["Strike Price"];
                              onePiece["Open"] = values[0][i]["Open"];
                              onePiece["High"] = values[0][i]["High"];
                              onePiece["Low"] = values[0][i]["Low"];
                              onePiece["Close"] = values[0][i]["Close"];
                              onePiece["LTP"] = values[0][i]["LTP"];
                              peDataThisMonthSixteen.push(onePiece);
                              onePiece = {};
                          }
                      }

                      calculation(res, fs, values[0], plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, dontSquare, peDataThisMonthSixteen, ceDataThisMonthSixteen, null, null, null, null, null, null, 2016, applyCEPE, values[1]).algoOne();

                  });

              }else {

                  var getEquity = new Promise(function(resolve, reject) {

                      var request = require('request');
                      request.post({
                          headers: {
                              'content-type': 'application/x-www-form-urlencoded'
                          },
                          url: 'https://vivek12ec1118.000webhostapp.com/equity.php',
                          form: {
                              "symbol": companyname
                          }
                      }, function(error, response, body) {

                          if (!error && response.statusCode == 200) {
                              var cheerio = require("cheerio");
                              var $ = cheerio.load(body);
                              $('#csvContentDiv').filter(function() {
                                  var mainContent = $(this).text();
                                  var Entities = require('html-entities').AllHtmlEntities;
                                  entities = new Entities();
                                  mainContent = entities.decode(mainContent);
                                  var Converter = require("csvtojson").Converter;
                                  var converter = new Converter({});
                                  mainContent = mainContent.replace(/\:/g, "\n");
                                  converter.fromString(mainContent.toString(), function(err, result) {
                                      resolve(result);
                                  });
                              });
                          }
                      });
                  });

                  Promise.all([getEquity]).then(values => {
                      calculation(res, fs, values[0], plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, peDataThisMonthSixteen, ceDataThisMonthSixteen, null, null, null, null, null, null, null, null, null).algoOne();
                  });
              }
      }
  });


  app.post('/onlyOneTrade/:companyname/:plusvalue/:inputquan/:initialstrike/:checked/:currency/:underlyings/:dontSquare/:nseYear', function(req, res) {
      var companyname = req.params.companyname;
      var plusvalue = req.params.plusvalue;
      var inputquan = req.params.inputquan;
      var initialstrike = req.params.initialstrike;
      var checked = req.params.checked;
      var currency = req.params.currency;
      var underlyings = req.params.underlyings;
      var dontSquare = req.params.dontSquare;
      var nseYear = req.params.nseYear;
      var strikeData = req.body;



      var dir = './tmp/';

      switch (companyname.trim()) {

          case "USDINR 13 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(20).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(40).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(58).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(75).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(97).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(117).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(140).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(160).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(180).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(201).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(221).limit(30).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRThirteen, sess.viewsCEThisMonthUSDINRThirteen, sess.viewsPENextMonthUSDINRThirteen, sess.viewsCENextMonthUSDINRThirteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "USDINR 14 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(20).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(58).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(74).limit(26).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(94).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(115).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(137).limit(25).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(155).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(177).limit(20).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(194).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(212).limit(36).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFourteen, sess.viewsCEThisMonthUSDINRFourteen, sess.viewsPENextMonthUSDINRFourteen, sess.viewsCENextMonthUSDINRFourteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(19).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(37).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(58).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(76).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(95).limit(24).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(117).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(140).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(160).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(180).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(200).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(220).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRFifteen, sess.viewsCEThisMonthUSDINRFifteen, sess.viewsPENextMonthUSDINRFifteen, sess.viewsCENextMonthUSDINRFifteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).limit(20).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(18).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(38).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(58).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(74).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(96).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(118).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(138).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(159).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(179).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(197).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(219).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calcur(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthUSDINRSixteen, sess.viewsCEThisMonthUSDINRSixteen, sess.viewsPENextMonthUSDINRSixteen, sess.viewsCENextMonthUSDINRSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 1).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "NIFTY 15 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 15 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(19).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1            
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 15 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 15 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(62).limit(19).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 15 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(79).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 15 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(98).limit(26).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 15 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(123).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1                     
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 15 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(143).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 15 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(163).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 15 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(186).limit(19).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "NIFTY 15 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).skip(204).limit(20).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 16":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty16');
                      coll.find({}, {
                          _id: 0
                      }).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPENextMonthFifteen, sess.viewsCEThisMonthFifteen, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "LT 16 JAN TO FEB":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "LT 16 FEB TO MAR":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(43).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1                     
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "LT 16 MAR TO APR":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(81).limit(40).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeDatam, sess.pageSetter, 0).algoThree(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "LT 16 APR TO MAY":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(120).limit(46).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlying, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "LT 16 MAY TO JUN":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "LT 16 JUN TO JUL":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(120).limit(46).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "LT 16 JUL TO AUG":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "LT 16 AUG TO SEP":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "LT 16 SEP TO OCT":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "LT 16 OCT TO NOV":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "LT 16 NOV TO DEC":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('LT');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "TCS 16 JAN TO FEB":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "TCS 16 FEB TO MAR":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(43).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "TCS 16 MAR TO APR":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(81).limit(40).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "TCS 16 APR TO MAY":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(120).limit(46).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "TCS 16 MAY TO JUN":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "TCS 16 JUN TO JUL":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(120).limit(46).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "TCS 16 JUL TO AUG":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "TCS 16 AUG TO SEP":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "TCS 16 SEP TO OCT":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "TCS 16 OCT TO NOV":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSetter, 0).algoThree(); //requiring algo1           
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;
          case "TCS 16 NOV TO DEC":

              var sess = req.session;

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('TCS');
                      coll.find({}, {
                          _id: 0
                      }).skip(165).limit(42).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation(res, fs, arr, plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, sess.viewsPENextMonthSixteen, sess.viewsCENextMonthSixteen, null, null, null, null, nseYear, strikeData, sess.pageSette, 0).algoThree(); //requiring algo1                      
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });
              break;

          default:
              var peDataThisMonthSixteen = [];
              var ceDataThisMonthSixteen = [];

              if (checked != 1) {
                  var getEquity = new Promise(function(resolve, reject) {
                      var request = require('request');
                      request.post({
                          headers: {
                              'content-type': 'application/x-www-form-urlencoded'
                          },
                          url: 'https://vivek12ec1118.000webhostapp.com/equity.php',
                          form: {
                              "symbol": companyname
                          }
                      }, function(error, response, body) {
                          if (!error && response.statusCode == 200) {
                              var cheerio = require("cheerio");
                              var $ = cheerio.load(body);
                              $('#csvContentDiv').filter(function() {
                                  var mainContent = $(this).text();
                                  var Entities = require('html-entities').AllHtmlEntities;
                                  entities = new Entities();
                                  mainContent = entities.decode(mainContent);
                                  var Converter = require("csvtojson").Converter;
                                  var converter = new Converter({});
                                  mainContent = mainContent.replace(/\:/g, "\n");
                                  converter.fromString(mainContent.toString(), function(err, result) {
                                      resolve(result);
                                  });
                              });
                          }
                      });
                  });

                  var getCEPE = new Promise(function(resolve, reject) {
                      mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          if (!err) {
                              var coll = db.collection(companyname);
                              coll.find({}, {
                                  _id: 0
                              }).toArray(function(err, arr) {
                                  if (err) {
                                      throw err;
                                      return false;
                                  }
                                  resolve(arr);
                                  db.close();
                              });
                          } else {
                              return false;
                          }
                      });
                  });

                  Promise.all([getEquity, getCEPE]).then(values => {

                      for (var i = 0; i < values[0].length; i++) {

                          if (values[0][i]["Option Type"] == "CE") {
                              var onePiece = {};
                              onePiece["Date"] = values[0][i]["Date"];
                              onePiece["Expiry"] = values[0][i]["Expiry"];
                              onePiece["Option Type"] = values[0][i]["Option Type"];
                              onePiece["Strike Price"] = values[0][i]["Strike Price"];
                              onePiece["Open"] = values[0][i]["Open"];
                              onePiece["High"] = values[0][i]["High"];
                              onePiece["Low"] = values[0][i]["Low"];
                              onePiece["Close"] = values[0][i]["Close"];
                              onePiece["LTP"] = values[0][i]["LTP"];
                              ceDataThisMonthSixteen.push(onePiece);
                              onePiece = {};
                          }

                          if (values[0][i]["Option Type"] == "PE") {
                              var onePiece = {};
                              onePiece["Date"] = values[0][i]["Date"];
                              onePiece["Expiry"] = values[0][i]["Expiry"];
                              onePiece["Option Type"] = values[0][i]["Option Type"];
                              onePiece["Strike Price"] = values[0][i]["Strike Price"];
                              onePiece["Open"] = values[0][i]["Open"];
                              onePiece["High"] = values[0][i]["High"];
                              onePiece["Low"] = values[0][i]["Low"];
                              onePiece["Close"] = values[0][i]["Close"];
                              onePiece["LTP"] = values[0][i]["LTP"];
                              peDataThisMonthSixteen.push(onePiece);
                              onePiece = {};
                          }
                      }

                      calculation(res, fs, values[0], plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, dontSquare, peDataThisMonthSixteen, ceDataThisMonthSixteen, null, null, null, null, null, null, 2016, applyCEPE, values[1]).algoThree();

                  });

              } else {

                  var getEquity = new Promise(function(resolve, reject) {

                      var request = require('request');
                      request.post({
                          headers: {
                              'content-type': 'application/x-www-form-urlencoded'
                          },
                          url: 'https://vivek12ec1118.000webhostapp.com/equity.php',
                          form: {
                              "symbol": companyname
                          }
                      }, function(error, response, body) {
                          if (!error && response.statusCode == 200) {
                              var cheerio = require("cheerio");
                              var $ = cheerio.load(body);
                              $('#csvContentDiv').filter(function() {
                                  var mainContent = $(this).text();
                                  var Entities = require('html-entities').AllHtmlEntities;
                                  entities = new Entities();
                                  mainContent = entities.decode(mainContent);
                                  var Converter = require("csvtojson").Converter;
                                  var converter = new Converter({});
                                  mainContent = mainContent.replace(/\:/g, "\n");
                                  converter.fromString(mainContent.toString(), function(err, result) {
                                      resolve(result);
                                  });
                              });
                          }
                      });
                  });

                  Promise.all([getEquity]).then(values => {
                      calculation(res, fs, values[0], plusvalue, inputquan, null, null, null, null, initialstrike, checked, currency, underlyings, dontSquare, peDataThisMonthSixteen, ceDataThisMonthSixteen, null, null, null, null, null, null, null, null, null).algoThree();
                  });
              }
      }
  });

  app.post('/ohol/:plusvalue/:inputquan/:addMul/:addQuan/:symbol/:firstQuan/:whatTo', function(req, res) {
      var plusvalue = req.params.plusvalue;
      var inputquan = req.params.inputquan;
      var addMul = req.params.addMul;
      var addQuan = req.params.addQuan;
      var symbol = req.params.symbol;
      var firstQuan = req.params.firstQuan;
      var whatTo = req.params.whatTo;
      var getEquity = new Promise(function(resolve, reject) {
          var request = require('request');
          request.post({
              headers: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
              url: 'https://vivek12ec1118.000webhostapp.com/equity.php',
              form: {
                  "symbol": symbol
              }
          }, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                  var cheerio = require("cheerio");
                  var $ = cheerio.load(body);
                  $('#csvContentDiv').filter(function() {
                      var mainContent = $(this).text();
                      var Entities = require('html-entities').AllHtmlEntities;
                      entities = new Entities();
                      mainContent = entities.decode(mainContent);
                      var Converter = require("csvtojson").Converter;
                      var converter = new Converter({});
                      mainContent = mainContent.replace(/\:/g, "\n");
                      converter.fromString(mainContent.toString(), function(err, result) {
                          resolve(result);
                      });
                  });
              }
          });
      });

      Promise.all([getEquity]).then(values => {

          if (whatTo == 0) {
              calculation().algoEight(res, values[0], plusvalue, inputquan, addMul, addQuan, firstQuan, 0);
          }

          if (whatTo == 1) {
              calculation().algoTen(res, values[0], plusvalue, inputquan, addMul, addQuan, firstQuan, 0);
          }

          if (whatTo == 2) {
              calculation().algoEleven(res, values[0], plusvalue, inputquan, addMul, addQuan, firstQuan, 0);
          }

      });
  });

  app.post('/ohol2/:plusvalue/:inputquan/:addMul/:addQuan/:symbol/:firstQuan/:whatTo/:setBase/:afterBase/:nextMul/:superBase', function(req, res) {
      var plusvalue = req.params.plusvalue;
      var inputquan = req.params.inputquan;
      var addMul = req.params.addMul;
      var addQuan = req.params.addQuan;
      var symbol = req.params.symbol;
      var firstQuan = req.params.firstQuan;
      var whatTo = req.params.whatTo;
      var setBase = req.params.setBase;
      var afterBase = req.params.afterBase;
      var nextMul = req.params.nextMul;
      var superBase = req.params.superBase;

      symbol = symbol.trim();

      switch (symbol) {
          case "NIFTY 2015":


              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          if (whatTo == 0) {
                              calculation().algoFifteen(res, arr, plusvalue, inputquan, addMul, addQuan, firstQuan, 0, setBase, afterBase, nextMul, 1, superBase);
                          }

                          if (whatTo == 1) {
                              calculation().algoTen(res, arr, plusvalue, inputquan, addMul, addQuan, firstQuan, 0);
                          }

                          if (whatTo == 2) {
                              calculation().algoEleven(res, arr, plusvalue, inputquan, addMul, addQuan, firstQuan, 0);
                          }

                          db.close();
                      });
                  } else {
                      return false;
                  }
              });


              break;
          case "NIFTY 2016":

              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty16');
                      coll.find({}, {
                          _id: 0
                      }).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          if (whatTo == 0) {
                              calculation().algoFifteen(res, arr, plusvalue, inputquan, addMul, addQuan, firstQuan, 0, setBase, afterBase, nextMul, 2, superBase);
                          }

                          if (whatTo == 1) {
                              calculation().algoTen(res, arr, plusvalue, inputquan, addMul, addQuan, firstQuan, 0);
                          }

                          if (whatTo == 2) {
                              calculation().algoEleven(res, arr, plusvalue, inputquan, addMul, addQuan, firstQuan, 0);
                          }

                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          default:
              var getEquity = new Promise(function(resolve, reject) {
                  var request = require('request');
                  request.post({
                      headers: {
                          'content-type': 'application/x-www-form-urlencoded'
                      },
                      url: 'https://vivek12ec1118.000webhostapp.com/equity.php',
                      form: {
                          "symbol": symbol
                      }
                  }, function(error, response, body) {
                      if (!error && response.statusCode == 200) {
                          var cheerio = require("cheerio");
                          var $ = cheerio.load(body);
                          $('#csvContentDiv').filter(function() {
                              var mainContent = $(this).text();
                              var Entities = require('html-entities').AllHtmlEntities;
                              entities = new Entities();
                              mainContent = entities.decode(mainContent);
                              var Converter = require("csvtojson").Converter;
                              var converter = new Converter({});
                              mainContent = mainContent.replace(/\:/g, "\n");
                              converter.fromString(mainContent.toString(), function(err, result) {
                                  resolve(result);
                              });
                          });
                      }
                  });
              });

              Promise.all([getEquity]).then(values => {

                  if (whatTo == 0) {
                      calculation().algoFifteen(res, values[0], plusvalue, inputquan, addMul, addQuan, firstQuan, 0, setBase, afterBase, nextMul, null, superBase);
                  }

                  if (whatTo == 1) {
                      calculation().algoTen(res, values[0], plusvalue, inputquan, addMul, addQuan, firstQuan, 0);
                  }

                  if (whatTo == 2) {
                      calculation().algoEleven(res, values[0], plusvalue, inputquan, addMul, addQuan, firstQuan, 0);
                  }

              });
      }
  });

  app.post('/oholnew/:plusvalue/:inputquan/:addMul/:addQuan/:symbol/:firstQuan/:whatTo/:till/:gap', function(req, res) {
      var plusvalue = req.params.plusvalue;
      var inputquan = req.params.inputquan;
      var addMul = req.params.addMul;
      var addQuan = req.params.addQuan;
      var symbol = req.params.symbol;
      var firstQuan = req.params.firstQuan;
      var whatTo = req.params.whatTo;
      var till = req.params.till;
      var gap = req.params.gap;
      var getEquity = new Promise(function(resolve, reject) {
          var request = require('request');
          request.post({
              headers: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
              url: 'https://vivek12ec1118.000webhostapp.com/equity.php',
              form: {
                  "symbol": symbol
              }
          }, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                  var cheerio = require("cheerio");
                  var $ = cheerio.load(body);
                  $('#csvContentDiv').filter(function() {
                      var mainContent = $(this).text();
                      var Entities = require('html-entities').AllHtmlEntities;
                      entities = new Entities();
                      mainContent = entities.decode(mainContent);
                      var Converter = require("csvtojson").Converter;
                      var converter = new Converter({});
                      mainContent = mainContent.replace(/\:/g, "\n");
                      converter.fromString(mainContent.toString(), function(err, result) {
                          resolve(result);
                      });
                  });
              }
          });
      });

      Promise.all([getEquity]).then(values => {

          if (whatTo == 0) {
              calculation().algoThirteen(res, values[0], plusvalue, inputquan, addMul, addQuan, firstQuan, 0, till, gap);
          }

          if (whatTo == 1) {
              calculation().algoTen(res, values[0], plusvalue, inputquan, addMul, addQuan, firstQuan, 0);
          }

          if (whatTo == 2) {
              calculation().algoEleven(res, values[0], plusvalue, inputquan, addMul, addQuan, firstQuan, 0);
          }

      });
  });

  app.post('/oholreversed/:plusvalue/:inputquan/:addMul/:addQuan/:symbol/:firstQuan/:whatTo/:setBase/:afterBase/:nextMul/:superBase', function(req, res) {
      var plusvalue = req.params.plusvalue;
      var inputquan = req.params.inputquan;
      var addMul = req.params.addMul;
      var addQuan = req.params.addQuan;
      var symbol = req.params.symbol;
      var firstQuan = req.params.firstQuan;
      var whatTo = req.params.whatTo;
      var setBase = req.params.setBase;
      var afterBase = req.params.afterBase;
      var nextMul = req.params.nextMul;
      var superBase = req.params.superBase;

      symbol = symbol.trim();

      var getEquity = new Promise(function(resolve, reject) {
          var request = require('request');
          request.post({
              headers: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
              url: 'https://vivek12ec1118.000webhostapp.com/equity.php',
              form: {
                  "symbol": symbol
              }
          }, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                  var cheerio = require("cheerio");
                  var $ = cheerio.load(body);
                  $('#csvContentDiv').filter(function() {
                      var mainContent = $(this).text();
                      var Entities = require('html-entities').AllHtmlEntities;
                      entities = new Entities();
                      mainContent = entities.decode(mainContent);
                      var Converter = require("csvtojson").Converter;
                      var converter = new Converter({});
                      mainContent = mainContent.replace(/\:/g, "\n");
                      converter.fromString(mainContent.toString(), function(err, result) {
                          resolve(result);
                      });
                  });
              }
          });
      });

      Promise.all([getEquity]).then(values => {

          if (whatTo == 0) {
              calculation().algoFourteen(res, values[0], plusvalue, inputquan, addMul, addQuan, firstQuan, 0, setBase, afterBase, nextMul, null, superBase);
          }

          if (whatTo == 1) {
              calculation().algoTen(res, values[0], plusvalue, inputquan, addMul, addQuan, firstQuan, 0);
          }

          if (whatTo == 2) {
              calculation().algoEleven(res, values[0], plusvalue, inputquan, addMul, addQuan, firstQuan, 0);
          }

      });
  });

  app.post('/currencyohol/:filename/:plusValue/:inputQuan/:addMul/:firstQuan/:addQuan', function(req, res) {

      var filename = req.params.filename;
      var plusvalue = req.params.plusValue;
      var inputquan = req.params.inputQuan;
      var addMul = req.params.addMul;
      var addQuan = req.params.addQuan;
      var firstQuan = req.params.firstQuan;

      var dir = './tmp/';

      switch (path.extname(filename)) {
          case ".csv":
              var Converter = require("csvtojson").Converter;
              var converter = new Converter({});
              converter.fromFile(dir + filename, function(err, result) {
                  calculation().algoEight(res, result, plusvalue, inputquan, addMul, addQuan, firstQuan, 2);
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
                      calculation().algoEight(res, result, plusvalue, inputquan, addMul, addQuan, firstQuan, 2);
                  }
              });
              break;
      }

  });

  app.post('/ohold/:filename/:plusvalue/:inputquan/:addMul/:addQuan/:firstQuan', function(req, res) {
      var filename = req.params.filename;
      var plusvalue = req.params.plusvalue;
      var inputquan = req.params.inputquan;
      var addMul = req.params.addMul;
      var addQuan = req.params.addQuan;
      var firstQuan = req.params.firstQuan;

      var dir = './tmp/';

      switch (path.extname(filename)) {
          case ".csv":
              var Converter = require("csvtojson").Converter;
              var converter = new Converter({});
              converter.fromFile(dir + filename, function(err, result) {
                  calculation().algoEight(res, result, plusvalue, inputquan, addMul, addQuan, firstQuan);
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
                      calculation().algoEight(res, result, plusvalue, inputquan, addMul, addQuan, firstQuan);
                  }
              });
              break;

      }
  });

  app.post('/quantumplate/:symbol', function(req, res) {

      symbol = req.params.symbol;
      symbol = symbol.trim();

      switch (symbol) {
          case "NIFTY 15":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty15');
                      coll.find({}, {
                          _id: 0
                      }).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoSixteen(res, arr, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, 1);

                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "NIFTY 16":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('nifty16');
                      coll.find({}, {
                          _id: 0
                      }).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoSixteen(res, arr, sess.viewsPEThisMonthFifteen, sess.viewsCEThisMonthFifteen, sess.viewsPEThisMonthSixteen, sess.viewsCEThisMonthSixteen, 2);

                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
      } //swith ends here

  });

  app.post('/tick/:companyname/:plusvalue/:inputquan/:meth/:addmul', function(req, res) {
      companyname = req.params.companyname;
      plusvalue = req.params.plusvalue;
      inputquan = req.params.inputquan;
      meth = req.params.meth;
      addmul = req.params.addmul;

      var getYahooData = new Promise(function(resolve, reject) {

          var pf = function(a) {
              return parseFloat(a);
          }

          var pi = function(a) {
              return parseInt(a);
          }

          var abs = function(a) {
              return Math.abs(a);
          }

          var getDate = function(con) {
              var myOldDateObj = new Date(con * 1000);
              var myTZO = -330;
              var myNewDate = new Date(myOldDateObj.getTime() + (60000 * (myOldDateObj.getTimezoneOffset() - myTZO)));
              var d = myNewDate;
              date = ((d.getDate() < 10) ? "0" + d.getDate() : d.getDate()) + "-" + ((d.getMonth() + 1 < 10) ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + d.getFullYear();
              return date;
          }

          var getTime = function(con) {
              var myOldDateObj = new Date(con * 1000);
              var myTZO = -330;
              var myNewDate = new Date(myOldDateObj.getTime() + (60000 * (myOldDateObj.getTimezoneOffset() - myTZO)));
              var d = myNewDate;
              time = ((d.getHours() < 10) ? "0" + d.getHours() : d.getHours()) + ":" + ((d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes()) + ":" + ((d.getSeconds() < 10) ? "0" + d.getSeconds() : d.getSeconds());
              return time;
          }

          var dataSort = function(arr) {

              arr.sort(function(a, b) {
                  var aDate = a["DATE"];
                  var aTime = a["TIME"];
                  var bDate = b["DATE"];
                  var bTime = b["TIME"];
                  if (aDate == bDate) {
                      return (aTime < bTime) ? -1 : (aTime > bTime) ? 1 : 0;
                  } else {
                      var aa = aDate.split('-').reverse().join(),
                          bb = bDate.split('-').reverse().join();
                      return aa < bb ? -1 : (aa > bb ? 1 : 0);
                  }
              });

              resolve(arr);

          }

          var crunchData = function(data) {

              console.log(data);

              var dataPieces = [];
              var onePiece = {};
              for (var i = 0; i < data.chart.result[0].timestamp.length; i++) {
                  onePiece["DATE"] = getDate(data.chart.result[0].timestamp[i]);
                  onePiece["TIME"] = getTime(data.chart.result[0].timestamp[i]);
                  onePiece["OPEN"] = (data.chart.result[0].indicators.quote[0].open[i] == null) ? null : pf(data.chart.result[0].indicators.quote[0].open[i]);
                  onePiece["HIGH"] = (data.chart.result[0].indicators.quote[0].high[i] == null) ? null : pf(data.chart.result[0].indicators.quote[0].high[i]);
                  onePiece["LOW"] = (data.chart.result[0].indicators.quote[0].low[i] == null) ? null : pf(data.chart.result[0].indicators.quote[0].low[i]);
                  onePiece["CLOSE"] = (data.chart.result[0].indicators.quote[0].close[i] == null) ? null : pf(data.chart.result[0].indicators.quote[0].close[i]);
                  dataPieces.push(onePiece);
                  onePiece = {};
              }
              dataSort(dataPieces);
          }

          var makeRequest = function() {
              var request = require('request');
              var cheerio = require('cheerio');
              url = "https://query2.finance.yahoo.com/v7/finance/chart/" + companyname + ".NS?range=1mo&interval=1m&indicators=quote&includeTimestamps=true&includePrePost=false&corsDomain=finance.yahoo.com";
              if (companyname == "NIFTY 50") {
                  url = "https://query2.finance.yahoo.com/v7/finance/chart/%5Ensei?range=1wk&interval=1m&indicators=quote&includeTimestamps=true&includePrePost=false&corsDomain=finance.yahoo.com"
              }
              if (companyname == "BANKNIFTY") {
                  url = "https://query2.finance.yahoo.com/v7/finance/chart/%5Ensebank?range=1wk&interval=1m&indicators=quote&includeTimestamps=true&includePrePost=false&corsDomain=finance.yahoo.com"
              }

              request(url, function(error, response, data) {
                  crunchData(JSON.parse(data));
              });
          }

          makeRequest();
      });

      Promise.all([getYahooData]).then(values => {
          calculation().algoFour(res, fs, values[0], plusvalue, inputquan, meth, addmul);

      });
  });

  app.post('/cepe/:filename/:fr/:till/:gap', function(req, res) {
      var filename = req.params.filename;
      var fr = req.params.fr;
      var till = req.params.till;
      var gap = req.params.gap;
      var dir = './tmp/';

      switch (path.extname(filename)) {
          case ".csv":
              var Converter = require("csvtojson").Converter;
              var converter = new Converter({});
              converter.fromFile(dir + filename, function(err, result) {
                  calculation(res, fs).algoSix(fr, till, gap, result);
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
                      calculation(res, fs).algoSix(fr, till, gap, result);
                  }
              });
              break;
      }
  });

  app.post('/oresults/:companyname', function(req, res) {
      var symbol = req.params.companyname;
      var getEquity = new Promise(function(resolve, reject) {
          var request = require('request');
          request.post({
              headers: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
              url: 'https://vivek12ec1118.000webhostapp.com/equity.php',
              form: {
                  "symbol": symbol
              }
          }, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                  var cheerio = require("cheerio");
                  var $ = cheerio.load(body);
                  $('#csvContentDiv').filter(function() {
                      var mainContent = $(this).text();
                      var Entities = require('html-entities').AllHtmlEntities;
                      entities = new Entities();
                      mainContent = entities.decode(mainContent);
                      var Converter = require("csvtojson").Converter;
                      var converter = new Converter({});
                      mainContent = mainContent.replace(/\:/g, "\n");
                      converter.fromString(mainContent.toString(), function(err, result) {
                          resolve(result);
                      });
                  });
              }
          });
      });

      Promise.all([getEquity]).then(values => {
          calculation().algoNine(res, values[0]);
      });
  });

  app.post('/giveGraph/:companyname', function(req, res) {

      var symbol = req.params.companyname;

      var trimData = function(result) {

          for (var i = 0; i < result.length; i++) {
              for (key in result[i]) {
                  if (!((key.indexOf('Date') > -1) || (key.indexOf('Open') > -1) || (key.indexOf('High') > -1) || (key.indexOf('Low') > -1) || (key.indexOf('LTP') > -1) || (key.indexOf('Close') > -1))) {
                      delete result[i][key];
                  }
              }
          }

          var drogo = [];
          for (key in result[0]) {
              drogo.push(key);
          }

          var regenerate = [];

          if (drogo.indexOf("LTP") > -1) {

              for (var i = 0; i < result.length; i++) {
                  var oneTime = {};
                  oneTime["Date"] = result[i][drogo[1]];
                  oneTime["Open"] = pf(pf(result[i][drogo[2]]).toFixed(2));
                  oneTime["High"] = pf(pf(result[i][drogo[3]]).toFixed(2));
                  oneTime["Low"] = pf(pf(result[i][drogo[4]]).toFixed(2));
                  oneTime["LTP"] = pf(pf(result[i][drogo[0]]).toFixed(2));
                  regenerate.push(oneTime);
              }

          } else {
              for (var i = 0; i < result.length; i++) {
                  var oneTime = {};
                  oneTime["Date"] = result[i][drogo[0]];
                  oneTime["Open"] = pf(pf(result[i][drogo[2]]).toFixed(2));
                  oneTime["High"] = pf(pf(result[i][drogo[3]]).toFixed(2));
                  oneTime["Low"] = pf(pf(result[i][drogo[4]]).toFixed(2));
                  oneTime["LTP"] = pf(pf(result[i][drogo[5]]).toFixed(2));
                  regenerate.push(oneTime);
              }
          }
          return regenerate;
      }

      var getEquityForGraph = new Promise(function(resolve, reject) {
          var request = require('request');
          request.post({
              headers: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
              url: 'https://vivek12ec1118.000webhostapp.com/equity.php',
              form: {
                  "symbol": symbol
              }
          }, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                  var cheerio = require("cheerio");
                  var $ = cheerio.load(body);
                  $('#csvContentDiv').filter(function() {
                      var mainContent = $(this).text();
                      var Entities = require('html-entities').AllHtmlEntities;
                      entities = new Entities();
                      mainContent = entities.decode(mainContent);
                      var Converter = require("csvtojson").Converter;
                      var converter = new Converter({});
                      mainContent = mainContent.replace(/\:/g, "\n");
                      converter.fromString(mainContent.toString(), function(err, result) {
                          resolve(result);
                      });
                  });
              }
          });
      });

      Promise.all([getEquityForGraph]).then(values => {
          res.end(JSON.stringify(trimData(values[0])));
      });

  });

  app.post('/giveMinuteGraph/:currentDate/:whereToGo/:company', function(req, res) {

      var currentDate = req.params.currentDate;

      var whereToGo = req.params.whereToGo;

      var company = req.params.company;

      var mongo = require('mongodb').MongoClient;

      if (currentDate == "null") {

          mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {

              var coll = db.collection('nifty16minuteSecond');

              var sendData = function(date) {

                  coll.find({
                      "Date": date
                  }, {
                      "_id": 0
                  }).toArray(function(err, arr) {

                      if (err) {
                          throw err;
                          return false;
                      } else {
                          res.end(JSON.stringify(arr));
                          db.close();
                      }
                  });

              }

              var getLastDate = function() {
                  coll.find().sort({
                      $natural: -1
                  }).limit(1).toArray(function(err, arr) {
                      if (err) {
                          throw err;
                          return false;
                      }

                      sendData(arr[0]["Date"]);

                  });
              }

              getLastDate();

          });

      } else {

          if (company == "NIFTY") {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  var year = parseInt(currentDate.substr(7, 8));

                  if (year == 16) {
                      year = year.toString();
                      var firstHalf = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
                      mon = currentDate.substr(3, 3);
                      if (firstHalf.indexOf(mon) > -1) {
                          var coll = db.collection('nifty' + year + 'minuteFirst');
                      } else {
                          var coll = db.collection('nifty' + year + 'minuteSecond');
                      }
                  } else {
                      year = year.toString();
                      var coll = db.collection('nifty' + year + 'minute');
                  }

                  var sendData = function(date) {

                      if (date == "null") {

                          res.end(JSON.stringify([]));

                      } else {
                          coll.find({
                              "Date": date
                          }, {
                              "_id": 0
                          }).toArray(function(err, arr) {
                              if (err) {
                                  throw err;
                                  return false;
                              } else {

                                  if (!arr.length) {
                                      res.end(JSON.stringify([]));
                                      db.close();
                                  } else {
                                      res.end(JSON.stringify(arr));
                                      db.close();
                                  }

                              }
                          });
                      }

                  }

                  var getPreviousDate = function() {

                      coll.find({
                          "Date": currentDate,
                          "Time": "09:16:00"
                      }, {}).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          } else {

                              if (!arr.length) {

                                  res.end(JSON.stringify([]));
                                  db.close();

                              } else {

                                  if (whereToGo == 1) {
                                      var currentId = arr[0]["_id"];

                                      coll.find({
                                              '_id': {
                                                  '$lt': currentId
                                              }
                                          })
                                          .sort({
                                              $natural: -1
                                          })
                                          .limit(1)
                                          .toArray(function(err, arr) {

                                              if (err) {
                                                  throw err;
                                                  return false;
                                              } else {

                                                  if (!arr.length) {
                                                      sendData(null);
                                                  } else {
                                                      sendData(arr[0]["Date"]);
                                                  }
                                              }

                                          });
                                  }

                                  if (whereToGo == 2) {
                                      sendData(currentDate);
                                  }

                              }
                          }
                      });

                  }

                  getPreviousDate();
              });
          } 

          if (company != "NIFTY") {
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  var year = parseInt(currentDate.substr(7, 8));

                  var mon = currentDate.substr(3, 3);

                  if ((year == 17) && (mon == "Jan" || mon == "Feb")) {

                      if (mon == "Jan") {
                          var coll = db.collection(company + "jan17");
                      }

                      if (mon == "Feb") {
                          var coll = db.collection(company + "feb17");
                      }

                      var sendData = function(date) {

                          if (date == "null") {

                              res.end(JSON.stringify([]));

                          } else {
                              coll.find({
                                  "Date": date
                              }, {
                                  "_id": 0
                              }).toArray(function(err, arr) {
                                  if (err) {
                                      throw err;
                                      return false;
                                  } else {

                                      if (!arr.length) {
                                          res.end(JSON.stringify([]));
                                          db.close();
                                      } else {
                                          res.end(JSON.stringify(arr));
                                          db.close();
                                      }

                                  }
                              });
                          }

                      }

                      var getPreviousDate = function() {

                          coll.find({
                              "Date": currentDate,
                              "Time": "09:16:00"
                          }, {}).toArray(function(err, arr) {
                              if (err) {
                                  throw err;
                                  return false;
                              } else {

                                  if (!arr.length) {

                                      res.end(JSON.stringify([]));
                                      db.close();

                                  } else {

                                      if (whereToGo == 1) {
                                          var currentId = arr[0]["_id"];

                                          coll.find({
                                                  '_id': {
                                                      '$lt': currentId
                                                  }
                                              })
                                              .sort({
                                                  $natural: -1
                                              })
                                              .limit(1)
                                              .toArray(function(err, arr) {

                                                  if (err) {
                                                      throw err;
                                                      return false;
                                                  } else {

                                                      if (!arr.length) {
                                                          sendData(null);
                                                      } else {
                                                          sendData(arr[0]["Date"]);
                                                      }
                                                  }

                                              });
                                      }

                                      if (whereToGo == 2) {
                                          sendData(currentDate);
                                      }

                                  }
                              }
                          });

                      }

                      getPreviousDate();


                  } else {
                      res.end(JSON.stringify([]));
                  }
              });
          } 

      }

  });

  app.post('/getoneminutedata/:companyname', function(req, res) {
      var companyname = req.params.companyname;
      calculation().algoFive(res, fs, companyname);
  });


  //oresults currency begins here

  app.post('/oresultscurrency/:companyname', function(req, res) {
      var companyname = req.params.companyname;

      switch (companyname.trim()) {

          case "USDINR 13 JAN TO FEB":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).limit(40).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 FEB TO MAR":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(58).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(75).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 MAY TO JUN":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(96).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 JUN TO JUL":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(117).limit(27).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 JUL TO AUG":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(140).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 AUG TO SEP":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(160).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 SEP TO OCT":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(181).limit(25).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 OCT TO NOV":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(201).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 13 NOV TO DEC":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2013');
                      coll.find({}, {
                          _id: 0
                      }).skip(221).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
          case "USDINR 14 JAN TO FEB":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).limit(40).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 FEB TO MAR":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(39).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 MAR TO APR":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(58).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 APR TO MAY":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(74).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 MAY TO JUN":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(94).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 JUN TO JUL":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(115).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 JUL TO AUG":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(137).limit(24).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 AUG TO SEP":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(156).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 SEP TO OCT":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(177).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 OCT TO NOV":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(194).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 14 NOV TO DEC":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2014');
                      coll.find({}, {
                          _id: 0
                      }).skip(212).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 JAN TO FEB":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).limit(20).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 FEB":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(19).limit(19).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 FEB TO MAR":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(37).limit(22).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 MAR TO APR":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(58).limit(20).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 APR TO MAY":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(76).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 MAY TO JUN":
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(95).limit(24).toArray(function(err, arr) {

                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(117).limit(26).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(140).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(160).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(180).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(200).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 15 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2015');
                      coll.find({}, {
                          _id: 0
                      }).skip(219).limit(24).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 JAN TO FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).limit(39).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 FEB":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).limit(39).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 FEB TO MAR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(38).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 MAR TO APR":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(58).limit(17).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 APR TO MAY":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(74).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 MAY TO JUN":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(96).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 JUN TO JUL":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(118).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 JUL TO AUG":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(139).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 AUG TO SEP":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(159).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 SEP TO OCT":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(179).limit(19).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 OCT TO NOV":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(197).limit(23).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }
                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;

          case "USDINR 16 NOV TO DEC":
              var sess = req.session;
              mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  if (!err) {
                      var coll = db.collection('usdinr2016');
                      coll.find({}, {
                          _id: 0
                      }).skip(219).limit(21).toArray(function(err, arr) {
                          if (err) {
                              throw err;
                              return false;
                          }

                          calculation().algoTwelve(res, arr);
                          db.close();
                      });
                  } else {
                      return false;
                  }
              });

              break;
      }

  });


  app.post('/threePointer/:plusValue/:initialQuantity/:multipleValue/:currentDate/:udAverage', function(req, res) {

      var finalArray = [];

      currentDate = req.params.currentDate;

      plusValue = req.params.plusValue;

      initialQuantity = req.params.initialQuantity;

      multipleValue = req.params.multipleValue;

      udAverage = req.params.udAverage;

      var getPartsOfPlusValue = function(cv, bm) {
          return pi((cv - bm).toFixed(2) / plusValue);
      }

      var year = parseInt(currentDate.substr(7, 8));

      mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {

          if (err) {
              throw err;
              return false;
          }

          if (year == 16) {
              year = year.toString();
              var firstHalf = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
              mon = currentDate.substr(3, 3);
              if (firstHalf.indexOf(mon) > -1) {
                  var coll = db.collection('nifty' + year + 'minuteFirst');
              } else {
                  var coll = db.collection('nifty' + year + 'minuteSecond');
              }
          } else {
              year = year.toString();
              var coll = db.collection('nifty' + year + 'minute');
          }

          coll.find({
              Date: currentDate
          }, {
              _id: 0
          }).skip(0).limit(375).toArray(function(err, arr) {
              if (err) {
                  throw err;
                  return false;
              }

              if (!arr.length) {

                  res.end("No data");
                  db.close();

              } else {

                  for (var i = 0; i < arr.length; i++) {

                      oneTime = {};

                      oneTime["DATE"] = (arr[i]["Date"]).toString();
                      oneTime["TIME"] = arr[i]["Time"];
                      oneTime["CURRENT"] = arr[i]["Open"];
                      oneTime["STOPLOSS"] = null;
                      oneTime["BP"] = null;
                      oneTime["BQ"] = null;
                      oneTime["BV"] = null;
                      oneTime["SP"] = null;
                      oneTime["SQ"] = null;
                      oneTime["SV"] = null;
                      oneTime["NQ"] = null;
                      oneTime["NV"] = null;
                      oneTime["AVG"] = null;
                      oneTime["MTM"] = null;

                      finalArray.push(oneTime);

                  }

                  calculation(res).algoSeventeen(finalArray, plusValue, initialQuantity, multipleValue, udAverage);
                  db.close();
              }

          });
      });

  });


  // algoSeventeen();

  //oresults currency ends here

  var io = require('socket.io')(serv, {});
  io.sockets.on('connection', function(socket) {
      socket.on('giveMoneyData', function() {
          calculation(socket, fs, null, null, null, null, null, null, null).algoThree();
      });
      socket.on('giveFiveDaysData', function(com) {
          calculation(socket, fs, null, null, null, null, com, null, null).algoFive();
      });
      socket.on('givePremiumPrice', function(data) {
          premiumImport().getPremium(socket, data.strikeprice, data.fromdate, data.expirydate, data.type);
      });

      socket.on('giveOHOL', function(data) {

          var filename = data.filename;
          var plusvalue = data.plusValue;
          var inputquan = data.inputQuan;
          var addMul = data.addMul;
          var addQuan = data.addQuan;
          var firstQuan = data.firstQuan;

          var dir = './tmp/';

          switch (path.extname(filename)) {
              case ".csv":
                  var Converter = require("csvtojson").Converter;
                  var converter = new Converter({});
                  converter.fromFile(dir + filename, function(err, result) {
                      calculation().algoEight(socket, result, plusvalue, inputquan, addMul, addQuan, firstQuan, 1);
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
                      } else {;
                          calculation().algoEight(socket, result, plusvalue, inputquan, addMul, addQuan, firstQuan, 1);
                      }
                  });
                  break;
          }
      });

      socket.on('giveOHOLD', function(data) {
          var plusvalue = data.plusValue;
          var inputquan = data.inputQuan;
          var addMul = data.addMul;
          var addQuan = data.addQuan;
          var firstQuan = data.firstQuan;
          var symbol = data.sym;

          var getEquity = new Promise(function(resolve, reject) {
              var request = require('request');
              request.post({
                  headers: {
                      'content-type': 'application/x-www-form-urlencoded'
                  },
                  url: 'https://vivek12ec1118.000webhostapp.com/equity.php',
                  form: {
                      "symbol": symbol
                  }
              }, function(error, response, body) {
                  if (!error && response.statusCode == 200) {
                      var cheerio = require("cheerio");
                      var $ = cheerio.load(body);
                      $('#csvContentDiv').filter(function() {
                          var mainContent = $(this).text();
                          var Entities = require('html-entities').AllHtmlEntities;
                          entities = new Entities();
                          mainContent = entities.decode(mainContent);
                          var Converter = require("csvtojson").Converter;
                          var converter = new Converter({});
                          mainContent = mainContent.replace(/\:/g, "\n");
                          converter.fromString(mainContent.toString(), function(err, result) {
                              resolve(result);
                          });
                      });
                  }
              });
          });

          Promise.all([getEquity]).then(values => {
              calculation().algoEight(socket, values[0], plusvalue, inputquan, addMul, addQuan, firstQuan, 1);
          });
      });
  });

  /* stoploss begins here */

  var stock_url = "https://in.finance.yahoo.com/q?s=%5ENSEI";
  var request = require("request");

  plusValue = parseFloat(7);

  var io = require('socket.io')(serv, {});
  io.sockets.on('connection', function(socket) {;
      socket.on('giveStocks', function() {
          showStocks(socket);
      });
      socket.on('changeValue', function(val) {
          plusValue = parseFloat(val);
          starter = null;
          currentStoploss = null;
          plusParts = null;
          lastTrade = null;
          lastTradePrice = null;
          status = null;
          currentQuantities = 100;
          mul = 2;
      });
  });

  var pi = function(a) {
      return parseInt(a);
  }

  var pf = function(a) {
      return parseFloat(a);
  }

  app.post('/fetch', function(req, res) {
      fetchDataFromMongo(res);
  });

  var putCalculations = function(arr, res) {

      for (var i = 0; i < arr.length; i++) {
          if (i == 0) {
              if (arr[i]["BP"] == null && arr[i]["SP"] == null) {
                  arr[i]["NQ"] = 0;
              }
              if (arr[i]["BP"] != null && arr[i]["SP"] == null) {
                  arr[i]["NQ"] = pi(arr[i]["BQ"]);
              }
              if (arr[i]["BP"] == null && arr[i]["SP"] != null) {
                  arr[i]["NQ"] = pi(arr[i]["SQ"]);
              }
              if (arr[i]["BP"] != null && arr[i]["SP"] != null) {
                  arr[i]["NQ"] = pi(arr[i]["BQ"]) - pi(arr[i]["SQ"]);
              }
          } else {
              if (arr[i]["BP"] == null && arr[i]["SP"] == null) {
                  arr[i]["NQ"] = pi(arr[i - 1]["NQ"]);
              }
              if (arr[i]["BP"] != null && arr[i]["SP"] == null) {
                  arr[i]["NQ"] = pi(arr[i - 1]["NQ"]) + pi(arr[i]["BQ"]);
              }
              if (arr[i]["BP"] == null && arr[i]["SP"] != null) {
                  arr[i]["NQ"] = pi(arr[i - 1]["NQ"]) - pi(arr[i]["SQ"]);
              }
              if (arr[i]["BP"] != null && arr[i]["SP"] != null) {
                  arr[i]["NQ"] = pi(arr[i]["NQ"]) + (pi(arr[i]["BQ"]) - pi(arr[i]["SQ"]));
              }
          }
      }

      for (var i = 0; i < arr.length; i++) {
          if (i == 0) {
              if (arr[i]["BP"] == null && arr[i]["SP"] == null) {
                  arr[i]["NV"] = 0;
              }
              if (arr[i]["BP"] != null && arr[i]["SP"] == null) {
                  arr[i]["NV"] = pi(arr[i]["BV"]);
              }
              if (arr[i]["BP"] == null && arr[i]["SP"] != null) {
                  arr[i]["NV"] = pi(arr[i]["SV"]);
              }
              if (arr[i]["BP"] != null && arr[i]["SP"] != null) {
                  arr[i]["NV"] = pi(arr[i]["BV"]) - pi(arr[i]["SV"]);
              }
          } else {
              if (arr[i]["BP"] == null && arr[i]["SP"] == null) {
                  arr[i]["NV"] = pi(arr[i - 1]["NV"]);
              }
              if (arr[i]["BP"] != null && arr[i]["SP"] == null) {
                  arr[i]["NV"] = pi(arr[i - 1]["NV"]) + pi(arr[i]["BV"]);
              }
              if (arr[i]["BP"] == null && arr[i]["SP"] != null) {
                  arr[i]["NV"] = pi(arr[i - 1]["NV"]) - pi(arr[i]["SV"]);
              }
              if (arr[i]["BP"] != null && arr[i]["SP"] != null) {
                  arr[i]["NV"] = pi(arr[i]["NV"]) + (pi(arr[i]["BV"]) - pi(arr[i]["SV"]));
              }
          }
      }

      for (var i = 0; i < arr.length; i++) {
          if (arr[i]["NQ"] == 0) {
              arr[i]["AVG"] = 0;
          } else {
              arr[i]["AVG"] = (parseFloat(arr[i]["NV"]) / parseFloat(arr[i]["NQ"])).toFixed(2);
          }
      }

      for (var i = 0; i < arr.length; i++) {
          if (i == 0) {
              arr[i]["MTM"] = (parseFloat(arr[i]["AVG"]) - (arr[i]["Market Price"])) * parseFloat(arr[i]["NQ"]);
          } else {
              if (arr[i - 1]["BP"] != null) {
                  arr[i]["MTM"] = (parseFloat(arr[i]["AVG"]) - (arr[i - 1]["BP"])) * parseFloat(arr[i]["NQ"]);
              }
              if (arr[i - 1]["SP"] != null) {
                  arr[i]["MTM"] = (parseFloat(arr[i]["AVG"]) - (arr[i - 1]["SP"])) * parseFloat(arr[i]["NQ"]);
              }
          }
          //arr[i]["MTM"] = (parseFloat(arr[i]["AVG"]) - (arr[i]["Market Price"])) * parseFloat(arr[i]["NQ"]);
      }



      createFile(arr, res);
  }

  var createFile = function(arr, res) {
      var json2xls = require('json2xls');
      var fs = require("fs");
      var xls = json2xls(arr);
      var filename = "download.xlsx";
      try {
          var dir = './tmp/';
          if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
          }
          fs.writeFileSync(dir + filename, xls, 'binary');
          res.end(filename);
      } catch (err) {
          console.log(err);
          console.log("Error Occured In creating file");
          res.status(404).send("Sorry, something went wrong please try again.");
      }
  }

  var insertInMongo = function(trade_data) {
      mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
          if (err) {
              throw err;
              return false;
          }
          if (!err) {
              var coll = db.collection('recordsnew');
              coll.insert(trade_data, function() {
                  db.close();
              });
          } else {
              return false;
          }
      });
  }

  var fetchDataFromMongo = function(res) {
      mongo.connect('mongodb://biggzero:biggzero@ds057386.mlab.com:57386/biggzero', function(err, db) {
          if (err) {
              throw err;
              return false;
          }
          if (!err) {
              var coll = db.collection('recordsnew');
              coll.find({}, {
                  _id: 0
              }).toArray(function(err, arr) {
                  if (err) {
                      throw err;
                      return false;
                  }
                  putCalculations(arr, res);
                  db.close();
              });

          } else {
              return false;
          }
      });
  }

  var benchTime = "09:20:00";
  starter = null;
  currentStoploss = null;
  plusParts = null;
  lastTrade = null;
  lastTradePrice = null;
  status = null;
  currentQuantities = 100;
  mul = 2;
  var tradeArray = [];

  var getPartsOfPlusValue = function(cv, bm) {
      return pi((cv - bm).toFixed(2) / plusValue);
  }

  var getTime = function() {
      var currentTime = new Date();
      var currentOffset = currentTime.getTimezoneOffset();
      var ISTOffset = 330;
      var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
      var hoursIST = (ISTTime.getHours() < 10) ? ("0" + ISTTime.getHours()) : (ISTTime.getHours());
      var minutesIST = (ISTTime.getMinutes() < 10) ? ("0" + ISTTime.getMinutes()) : (ISTTime.getMinutes());
      var secondsIST = (ISTTime.getSeconds() < 10) ? ("0" + ISTTime.getSeconds()) : (ISTTime.getSeconds());
      var time = hoursIST + ":" + minutesIST + ":" + secondsIST;
      return time;
  }

  var showStocks = function(socket) {
      request(stock_url, function(error, response, body) {
          if (!error) {

              time = getTime();

              var cheerio = require("cheerio");
              var $ = cheerio.load(body);

              $("#quote-market-notice").filter(function() {
                  var currentV = $(this).parent().text().trim();
                  currentPrice = pf(currentV.replace(/\,/g, ""));
              });

              if (time == benchTime) {
                  starter = pf(currentPrice);
              }

              if (time > benchTime) {
                  if (lastTradePrice == null) {
                      if (starter == null) {
                          starter = pf(currentPrice);
                      }
                      plusParts = getPartsOfPlusValue(currentPrice, starter);
                      if (plusParts > 0) {
                          lastTradePrice = pf(currentPrice);
                          currentStoploss = pf(currentPrice) - plusValue;
                          status = 0;
                          lastTrade = "BOUGHT" + currentQuantities + " Quantities";
                          var data = {
                              "Market Price": currentPrice,
                              "Current Time": time,
                              "Current Stoploss": null,
                              "BP": currentPrice,
                              "BQ": currentQuantities,
                              "BV": currentPrice * currentQuantities,
                              "SP": null,
                              "SQ": null,
                              "SV": null
                          }
                          insertInMongo(data);
                          currentQuantities = currentQuantities * mul;


                      }
                      if (plusParts < 0) {
                          lastTradePrice = pf(currentPrice);
                          currentStoploss = pf(currentPrice) + plusValue;
                          status = 1;
                          lastTrade = "SOLD " + currentQuantities + " Quantities";
                          var data = {
                              "Market Price": currentPrice,
                              "Current Time": time,
                              "Current Stoploss": null,
                              "BP": null,
                              "BQ": null,
                              "BV": null,
                              "SP": currentPrice,
                              "SQ": currentQuantities,
                              "SV": currentPrice * currentQuantities
                          }
                          insertInMongo(data);
                          currentQuantities = currentQuantities * mul;
                      }
                      socket.emit('givenStocks', {
                          "currentPrice": currentPrice,
                          "start": starter,
                          "currentStoploss": currentStoploss,
                          "lastTrade": lastTrade,
                          "lastPrice": lastTradePrice
                      });
                  } else {
                      if (status == 0) {
                          if (getPartsOfPlusValue(currentPrice, currentStoploss) < 0) {
                              lastTradePrice = currentPrice;
                              status = 1;
                              currentStoploss = pf(currentPrice) + plusValue;
                              lastTrade = "SOLD" + currentQuantities + " Quantities";
                              var data = {
                                  "Market Price": currentPrice,
                                  "Current Time": time,
                                  "Current Stoploss": currentStoploss,
                                  "BP": null,
                                  "BQ": null,
                                  "BV": null,
                                  "SP": currentPrice,
                                  "SQ": currentQuantities,
                                  "SV": currentPrice * currentQuantities
                              }
                              insertInMongo(data);
                              currentQuantities = currentQuantities * mul;
                          }
                          if (status == 0) {
                              if (currentPrice > currentStoploss) {
                                  currentStoploss = currentPrice;
                              }
                          }
                      }
                      if (status == 1) {
                          if (getPartsOfPlusValue(currentPrice, currentStoploss) > 0) {
                              lastTradePrice = currentPrice;
                              status = 0;
                              currentStoploss = pf(currentPrice) - plusValue;
                              lastTrade = "BOUGHT" + currentQuantities + " Quantities";
                              var data = {
                                  "Market Price": currentPrice,
                                  "Current Time": time,
                                  "Current Stoploss": currentStoploss,
                                  "BP": currentPrice,
                                  "BQ": currentQuantities,
                                  "BV": currentPrice * currentQuantities,
                                  "SP": null,
                                  "SQ": null,
                                  "SV": null
                              }
                              insertInMongo(data);
                              currentQuantities = currentQuantities * mul;
                          }
                          if (status == 1) {
                              if (currentPrice < currentStoploss) {
                                  currentStoploss = currentPrice;
                              }
                          }
                      }

                      socket.emit('givenStocks', {
                          "currentPrice": currentPrice,
                          "start": starter,
                          "currentStoploss": currentStoploss,
                          "lastTrade": lastTrade,
                          "lastPrice": lastTradePrice
                      });

                  }
              } else {
                  socket.emit('givenStocks', {
                      "currentPrice": currentPrice,
                      "start": null,
                      "currentStoploss": currentStoploss,
                      "lastTrade": lastTrade,
                      "lastPrice": lastTradePrice
                  });
              }
          };
      });
  }

  /* stoploss ends here */