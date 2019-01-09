module.exports = function(res, fs, result, plusvalue, inputQuan, benchMark, com, typo, addmul, initialStrike, checked, currency, underlyings, dontSquare, peDataThisMonthSixteen, ceDataThisMonthSixteen, peDataNextMonthSixteen, ceDataNextMonthSixteen, peDataThisMonthFifteen, ceDataThisMonthFifteen, peDataNextMonthFifteen, ceDataNextMonthFifteen, nseYear, strikeData, onwhich, towhich) {
    var boughtQuantity = parseFloat(inputQuan);
    var soldQuantity = parseFloat(inputQuan);
    var checked = checked;
    var towhich = towhich;
    var mysql = require("mysql");
    var crypto = require("crypto");
    var request = require('request');
    var cheerio = require('cheerio');
    var mongo = require('mongodb').MongoClient;

    var con = mysql.createConnection({ 
        host: "db4free.net",
        user: "ivivekyadav",
        password: "9f6b18",
        database: "fintech"
    });

    var underlyingsArray = ["29-Jan-13", "26-Feb-13", "25-Mar-13", "26-Apr-13", "29-May-13", "26-Jun-13", "29-Jul-13", "28-Aug-13", "26-Sep-13", "29-Oct-13", "27-Nov-13", "27-Dec-13", "29-Jan-14", "26-Feb-14", "27-Mar-14", "28-Apr-14", "28-May-14", "26-Jun-14", "28-Jul-14", "26-Aug-14", "26-Sep-14", "29-Oct-14", "26-Nov-14", "29-Dec-14", "28-Jan-15", "25-Feb-15", "27-Mar-15", "28-Apr-15", "27-May-15", "26-Jun-15", "29-Jul-15", "27-Aug-15", "28-Sep-15", "28-Oct-15", "26-Nov-15", "29-Dec-15", "27-Jan-16", "25-Feb-16", "29-Mar-16", "27-Apr-16", "27-May-16", "28-Jun-16", "27-Jul-16", "29-Aug-16", "28-Sep-16", "26-Oct-16", "28-Nov-16", "28-Dec-16"];

    var currency = currency;

    var underlyings = underlyings;

    var dontSquare = dontSquare;

    var strikeData = strikeData;

    var monthEnd = {
        left: null,
        right: null,
        ce: null,
        pe: null
    }

    if (towhich == 1) {

        var ceDataThisMonth = ceDataThisMonthSixteen;
        var peDataThisMonth = peDataThisMonthSixteen;
        var ceDataNextMonth = ceDataNextMonthSixteen;
        var peDataNextMonth = peDataNextMonthSixteen;

    } else {

        var ceDataThisMonthSixteen = ceDataThisMonthSixteen;
        var peDataThisMonthSixteen = peDataThisMonthSixteen;
        var ceDataNextMonthSixteen = ceDataNextMonthSixteen;
        var peDataNextMonthSixteen = peDataNextMonthSixteen;
        var ceDataThisMonthFifteen = ceDataThisMonthFifteen;
        var peDataThisMonthFifteen = peDataThisMonthFifteen;
        var ceDataNextMonthFifteen = ceDataNextMonthFifteen;
        var peDataNextMonthFifteen = peDataNextMonthFifteen;

    }

    var nseYear = parseInt(nseYear);

    return {
        typo: typo,
        addmul: addmul,
        maths: {
            pi: function(x) {
                return parseInt(x);
            },

            pf: function(x) {
                return parseFloat(x);
            },

            abs: function(x) {
                return Math.abs(x);
            }
        },
        functions: {
            putCP: function(superSupreme) {

                function applyCallPut(superSupreme) {
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

                    var pi = function(a) {
                        return parseInt(a);
                    }

                    var pf = function(a) {
                        return parseFloat(a);
                    }

                    var getPreviousDATE = function(i) {
                        for (var t = i; t >= 0; t--) {
                            if (superSupreme[t]["DATE"] != "" && superSupreme[t]["DATE"] != null) {
                                return superSupreme[t]["DATE"];
                            }
                        }
                    }

                    var getPreviousLTP = function(i) {
                        for (var t = i; t >= 0; t--) {
                            if ((superSupreme[t]["LTP"] != "") && superSupreme[t]["LTP"] != null) {
                                return superSupreme[t]["LTP"];
                            }
                        }
                    }

                    //usdinr shit begins

                    var getCEThisMonthUSDINR = function(date, strikePrice, check) {
                        for (var i = 0; i < ceDataThisMonth.length; i++) {
                            var day = ceDataThisMonth[i]["Trade Date"].substring(0, 2);
                            var month = ceDataThisMonth[i]["Trade Date"].substring(3, 6);
                            var year = ceDataThisMonth[i]["Trade Date"].substring(9, 11);
                            var compareDate = day + "-" + month + "-" + year;
                            var compareStrikePrice = ceDataThisMonth[i]["Strike Price"];
                            if ((date == compareDate) && (strikePrice == ceDataThisMonth[i]["Strike Price"])) {

                                return ceDataThisMonth[i]["Close Price"];
                            }
                        }
                    }

                    var getPEThisMonthUSDINR = function(date, strikePrice, check) {
                        for (var i = 0; i < peDataThisMonth.length; i++) {
                            var day = peDataThisMonth[i]["Trade Date"].substring(0, 2);
                            var month = peDataThisMonth[i]["Trade Date"].substring(3, 6);
                            var year = peDataThisMonth[i]["Trade Date"].substring(9, 11);
                            var compareDate = day + "-" + month + "-" + year;
                            var compareStrikePrice = peDataThisMonth[i]["Strike Price"];
                            if ((date == compareDate) && (strikePrice == compareStrikePrice)) {
                                return peDataThisMonth[i]["Close Price"];
                            }
                        }
                    }

                    var getCENextMonthUSDINR = function(date, strikePrice, check) {
                        for (var i = 0; i < ceDataNextMonth.length; i++) {
                            var day = ceDataNextMonth[i]["Trade Date"].substring(0, 2);
                            var month = ceDataNextMonth[i]["Trade Date"].substring(3, 6);
                            var year = ceDataNextMonth[i]["Trade Date"].substring(9, 11);
                            var compareDate = day + "-" + month + "-" + year;
                            var compareStrikePrice = ceDataNextMonth[i]["Strike Price"];
                            if ((date == compareDate) && (strikePrice == compareStrikePrice)) {
                                return ceDataNextMonth[i]["Close Price"];
                            }
                        }
                    }

                    var getPENextMonthUSDINR = function(date, strikePrice, check) {
                        for (var i = 0; i < peDataNextMonth.length; i++) {
                            var day = peDataNextMonth[i]["Trade Date"].substring(0, 2);
                            var month = peDataNextMonth[i]["Trade Date"].substring(3, 6);
                            var year = peDataNextMonth[i]["Trade Date"].substring(9, 11);
                            var compareDate = day + "-" + month + "-" + year;
                            var compareStrikePrice = peDataNextMonth[i]["Strike Price"];
                            if ((date == compareDate) && (strikePrice == compareStrikePrice)) {
                                return peDataNextMonth[i]["Close Price"];
                            }
                        }
                    }

                    var getCEThisMonthSixteen = function(date, strikePrice) {
                        for (var i = 0; i < ceDataThisMonthSixteen.length; i++) {
                            var day = ceDataThisMonthSixteen[i]["Date"].substring(0, 2);
                            var month = ceDataThisMonthSixteen[i]["Date"].substring(3, 6);
                            var year = ceDataThisMonthSixteen[i]["Date"].substring(9, 11);
                            var compareDate = day + "-" + month + "-" + year;
                            var compareStrikePrice = ceDataThisMonthSixteen[i]["Strike Price"];
                            if ((date == compareDate) && (strikePrice == ceDataThisMonthSixteen[i]["Strike Price"])) {
                                return ceDataThisMonthSixteen[i]["LTP"];
                            }
                        }
                    }

                    var getPEThisMonthSixteen = function(date, strikePrice) {
                        for (var i = 0; i < peDataThisMonthSixteen.length; i++) {
                            var day = peDataThisMonthSixteen[i]["Date"].substring(0, 2);
                            var month = peDataThisMonthSixteen[i]["Date"].substring(3, 6);
                            var year = peDataThisMonthSixteen[i]["Date"].substring(9, 11);
                            var compareDate = day + "-" + month + "-" + year;
                            var compareStrikePrice = peDataThisMonthSixteen[i]["Strike Price"];
                            if ((date == compareDate) && (strikePrice == compareStrikePrice)) {
                                return peDataThisMonthSixteen[i]["LTP"];
                            }
                        }
                    }

                    var getCENextMonthSixteen = function(date, strikePrice) {
                        for (var i = 0; i < ceDataNextMonthSixteen.length; i++) {
                            var day = ceDataNextMonthSixteen[i]["Date"].substring(0, 2);
                            var month = ceDataNextMonthSixteen[i]["Date"].substring(3, 6);
                            var year = ceDataNextMonthSixteen[i]["Date"].substring(9, 11);
                            var compareDate = day + "-" + month + "-" + year;
                            var compareStrikePrice = ceDataNextMonthSixteen[i]["Strike Price"];
                            if ((date == compareDate) && (strikePrice == compareStrikePrice)) {
                                return ceDataNextMonthSixteen[i]["LTP"];
                            }
                        }
                    }

                    var getPENextMonthSixteen = function(date, strikePrice) {
                        for (var i = 0; i < peDataNextMonthSixteen.length; i++) {
                            var day = peDataNextMonthSixteen[i]["Date"].substring(0, 2);
                            var month = peDataNextMonthSixteen[i]["Date"].substring(3, 6);
                            var year = peDataNextMonthSixteen[i]["Date"].substring(9, 11);
                            var compareDate = day + "-" + month + "-" + year;
                            var compareStrikePrice = peDataNextMonthSixteen[i]["Strike Price"];
                            if ((date == compareDate) && (strikePrice == compareStrikePrice)) {
                                return peDataNextMonthSixteen[i]["LTP"];
                            }
                        }
                    }

                    var getCEThisMonthFifteen = function(date, strikePrice) {
                        for (var i = 0; i < ceDataThisMonthFifteen.length; i++) {
                            var day = ceDataThisMonthFifteen[i]["Date"].substring(0, 2);
                            var month = ceDataThisMonthFifteen[i]["Date"].substring(3, 6);
                            var year = ceDataThisMonthFifteen[i]["Date"].substring(9, 11);
                            var compareDate = day + "-" + month + "-" + year;
                            var compareStrikePrice = ceDataThisMonthFifteen[i]["Strike Price"];
                            if ((date == compareDate) && (strikePrice == ceDataThisMonthFifteen[i]["Strike Price"])) {
                                return ceDataThisMonthFifteen[i]["LTP"];
                            }
                        }
                    }

                    var getPEThisMonthFifteen = function(date, strikePrice) {
                        for (var i = 0; i < peDataThisMonthFifteen.length; i++) {
                            var day = peDataThisMonthFifteen[i]["Date"].substring(0, 2);
                            var month = peDataThisMonthFifteen[i]["Date"].substring(3, 6);
                            var year = peDataThisMonthFifteen[i]["Date"].substring(9, 11);
                            var compareDate = day + "-" + month + "-" + year;
                            var compareStrikePrice = peDataThisMonthFifteen[i]["Strike Price"];
                            if ((date == compareDate) && (strikePrice == compareStrikePrice)) {
                                return peDataThisMonthFifteen[i]["LTP"];
                            }
                        }
                    }

                    var getCENextMonthFifteen = function(date, strikePrice) {
                        for (var i = 0; i < ceDataNextMonthFifteen.length; i++) {
                            var day = ceDataNextMonthFifteen[i]["Date"].substring(0, 2);
                            var month = ceDataNextMonthFifteen[i]["Date"].substring(3, 6);
                            var year = ceDataNextMonthFifteen[i]["Date"].substring(9, 11);
                            var compareDate = day + "-" + month + "-" + year;
                            var compareStrikePrice = ceDataNextMonthFifteen[i]["Strike Price"];
                            if ((date == compareDate) && (strikePrice == compareStrikePrice)) {
                                return ceDataNextMonthFifteen[i]["LTP"];
                            }
                        }
                    }

                    var getPENextMonthFifteen = function(date, strikePrice) {
                        for (var i = 0; i < peDataNextMonthFifteen.length; i++) {
                            var day = peDataNextMonthFifteen[i]["Date"].substring(0, 2);
                            var month = peDataNextMonthFifteen[i]["Date"].substring(3, 6);
                            var year = peDataNextMonthFifteen[i]["Date"].substring(9, 11);
                            var compareDate = day + "-" + month + "-" + year;
                            var compareStrikePrice = peDataNextMonthFifteen[i]["Strike Price"];
                            if ((date == compareDate) && (strikePrice == compareStrikePrice)) {
                                return peDataNextMonthFifteen[i]["LTP"];
                            }
                        }
                    }

                    var highest = 0;
                    for (var i = 0; i < superSupreme.length; i++) {
                        if ((superSupreme[i]["HIGH"] != null) && (superSupreme[i]["HIGH"] != "")) {
                            if (parseInt(superSupreme[i]["HIGH"]) > highest) {
                                highest = parseInt(superSupreme[i]["HIGH"]);
                            }
                        }
                    }

                    var lowest = highest;
                    for (var i = 0; i < superSupreme.length; i++) {
                        if ((superSupreme[i]["LOW"] != null) && (superSupreme[i]["LOW"] != "")) {
                            if (parseInt(superSupreme[i]["LOW"]) < lowest) {
                                lowest = parseInt(superSupreme[i]["LOW"]);
                            }
                        }
                    }

                    switch (onwhich) {
                        case "/lt":
                            highest = (Math.ceil(highest / 20) * 20) + 40;
                            lowest = (Math.floor(lowest / 20) * 20) - 40;
                            looper = (highest - lowest) / 20;
                            break;
                        case "/tcs":
                            highest = (Math.ceil(highest / 50) * 50) + 100;
                            lowest = (Math.floor(lowest / 50) * 50) - 100;
                            looper = (highest - lowest) / 50;
                            break;
                        case "/nifty":
                            highest = (Math.ceil(highest / 100) * 100) + 200;
                            lowest = (Math.floor(lowest / 100) * 100) - 200;
                            looper = (highest - lowest) / 100;
                            break;
                        case "/usdinr2013":
                            highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                            lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                            looper = (highest - lowest) / 0.5;
                            break;
                        case "/usdinr2014":
                            highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                            lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                            looper = (highest - lowest) / 0.5;
                            break;
                        case "/usdinr2015":
                            highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                            lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                            looper = (highest - lowest) / 0.5;
                            break;
                        case "/usdinr2016":
                            highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                            lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                            looper = (highest - lowest) / 0.5;
                            break;
                    }

                    buyFirstStrikeTm = parseFloat(strikeData.buyFirstStrikeTm);
                    buyFirstStrikeTmAt = parseFloat(strikeData.buyFirstStrikeTmAt);
                    buyFirstStrikeTmDiv = parseFloat(strikeData.buyFirstStrikeTmDiv);

                    buySecondStrikeTm = parseFloat(strikeData.buySecondStrikeTm);
                    buySecondStrikeTmAt = parseFloat(strikeData.buySecondStrikeTmAt);
                    buySecondStrikeTmDiv = parseFloat(strikeData.buySecondStrikeTmDiv);

                    buyThirdStrikeTm = parseFloat(strikeData.buyThirdStrikeTm);
                    buyThirdStrikeTmAt = parseFloat(strikeData.buyThirdStrikeTmAt);
                    buyThirdStrikeTmDiv = parseFloat(strikeData.buyThirdStrikeTmDiv);

                    buyFourthStrikeTm = parseFloat(strikeData.buyFourthStrikeTm);
                    buyFourthStrikeTmAt = parseFloat(strikeData.buyFourthStrikeTmAt);
                    buyFourthStrikeTmDiv = parseFloat(strikeData.buyFourthStrikeTmDiv);

                    buyFirstStrikeNm = parseFloat(strikeData.buyFirstStrikeNm);
                    buyFirstStrikeNmAt = parseFloat(strikeData.buyFirstStrikeNmAt);
                    buyFirstStrikeNmDiv = parseFloat(strikeData.buyFirstStrikeNmDiv);

                    buySecondStrikeNm = parseFloat(strikeData.buySecondStrikeNm);
                    buySecondStrikeNmAt = parseFloat(strikeData.buySecondStrikeNmAt);
                    buySecondStrikeNmDiv = parseFloat(strikeData.buySecondStrikeNmDiv);

                    buyThirdStrikeNm = parseFloat(strikeData.buyThirdStrikeNm);
                    buyThirdStrikeNmAt = parseFloat(strikeData.buyThirdStrikeNmAt);
                    buyThirdStrikeNmDiv = parseFloat(strikeData.buyThirdStrikeNmDiv);

                    buyFourthStrikeNm = parseFloat(strikeData.buyFourthStrikeNm);
                    buyFourthStrikeNmAt = parseFloat(strikeData.buyFourthStrikeNmAt);
                    buyFourthStrikeNmDiv = parseFloat(strikeData.buyFourthStrikeNmDiv);

                    buyFirstTmQty = parseFloat(strikeData.buyFirstTmQty);
                    buySecondTmQty = parseFloat(strikeData.buySecondTmQty);
                    buyThirdTmQty = parseFloat(strikeData.buyThirdTmQty);
                    buyFourthTmQty = parseFloat(strikeData.buyFourthTmQty);
                    buyFirstNmQty = parseFloat(strikeData.buyFirstNmQty);
                    buySecondNmQty = parseFloat(strikeData.buySecondNmQty);
                    buyThirdNmQty = parseFloat(strikeData.buyThirdNmQty);
                    buyFourthNmQty = parseFloat(strikeData.buyFourthNmQty);


                    sellFirstStrikeTm = parseFloat(strikeData.sellFirstStrikeTm);
                    sellFirstStrikeTmAt = parseFloat(strikeData.sellFirstStrikeTmAt);
                    sellFirstStrikeTmDiv = parseFloat(strikeData.sellFirstStrikeTmDiv);

                    sellSecondStrikeTm = parseFloat(strikeData.sellSecondStrikeTm);
                    sellSecondStrikeTmAt = parseFloat(strikeData.sellSecondStrikeTmAt);
                    sellSecondStrikeTmDiv = parseFloat(strikeData.sellSecondStrikeTmDiv);

                    sellThirdStrikeTm = parseFloat(strikeData.sellThirdStrikeTm);
                    sellThirdStrikeTmAt = parseFloat(strikeData.sellThirdStrikeTmAt);
                    sellThirdStrikeTmDiv = parseFloat(strikeData.sellThirdStrikeTmDiv);

                    sellFourthStrikeTm = parseFloat(strikeData.sellFourthStrikeTm);
                    sellFourthStrikeTmAt = parseFloat(strikeData.sellFourthStrikeTmAt);
                    sellFourthStrikeTmDiv = parseFloat(strikeData.sellFourthStrikeTmDiv);

                    sellFirstStrikeNm = parseFloat(strikeData.sellFirstStrikeNm);
                    sellFirstStrikeNmAt = parseFloat(strikeData.sellFirstStrikeNmAt);
                    sellFirstStrikeNmDiv = parseFloat(strikeData.sellFirstStrikeNmDiv);

                    sellSecondStrikeNm = parseFloat(strikeData.sellSecondStrikeNm);
                    sellSecondStrikeNmAt = parseFloat(strikeData.sellSecondStrikeNmAt);
                    sellSecondStrikeNmDiv = parseFloat(strikeData.sellSecondStrikeNmDiv);


                    sellThirdStrikeNm = parseFloat(strikeData.sellThirdStrikeNm);
                    sellThirdStrikeNmAt = parseFloat(strikeData.sellThirdStrikeNmAt);
                    sellThirdStrikeNmDiv = parseFloat(strikeData.sellThirdStrikeNmDiv);

                    sellFourthStrikeNm = parseFloat(strikeData.sellFourthStrikeNm);
                    sellFourthStrikeNmAt = parseFloat(strikeData.sellFourthStrikeNmAt);
                    sellFourthStrikeNmDiv = parseFloat(strikeData.sellFourthStrikeNmDiv);

                    sellFirstTmQty = parseFloat(strikeData.sellFirstTmQty);
                    sellSecondTmQty = parseFloat(strikeData.sellSecondTmQty);
                    sellThirdTmQty = parseFloat(strikeData.sellThirdTmQty);
                    sellFourthTmQty = parseFloat(strikeData.sellFourthTmQty);
                    sellFirstNmQty = parseFloat(strikeData.sellFirstNmQty);
                    sellSecondNmQty = parseFloat(strikeData.sellSecondNmQty);
                    sellThirdNmQty = parseFloat(strikeData.sellThirdNmQty);
                    sellFourthNmQty = parseFloat(strikeData.sellFourthNmQty);
                    tradeArray = parseFloat(strikeData.tradeArray);
                    checkedboxes = strikeData.checkedboxes;
                    tradeArray = strikeData.tradeArray;

                    var coverMeBuy = [];
                    var coverMeSell = [];

                    checkToPutCE = function(a) {
                        for (var t = a + 1; t < superSupreme.length - 1; t++) {
                            date = superSupreme[t]["DATE"];
                            if (date != "" && date != null) {
                                if (superSupreme[t - 1]["SP"] == superSupreme[a]["LTP"]) {
                                    return false;
                                }
                                break;
                            }
                        }
                        return true;
                    }

                    checkToPutPE = function(a) {
                        for (var t = a + 1; t < superSupreme.length - 1; t++) {
                            date = superSupreme[t]["DATE"];
                            if (date != "" && date != null) {
                                if (superSupreme[t - 1]["bp"] == superSupreme[a]["LTP"]) {
                                    return false;
                                }
                                break;
                            }
                        }
                        return true;
                    }

                    for (var i = 0; i < superSupreme.length; i++) {

                        currentPrice = pf(superSupreme[i]["LTP"]);

                        switch (onwhich) {
                            case "/lt":
                                basePrice = Math.floor(currentPrice / 20) * 20;
                                break;
                            case "/tcs":
                                basePrice = Math.floor(currentPrice / 50) * 50;
                                break;
                            case "/nifty":
                                basePrice = Math.floor(currentPrice / 100) * 100;
                                break;
                            case "/usdinr2013":
                                basePrice = Math.floor(currentPrice / 0.5) * 0.5;
                                break;
                            case "/usdinr2014":
                                basePrice = Math.floor(currentPrice / 0.5) * 0.5;
                                break;
                            case "/usdinr2015":
                                basePrice = Math.floor(currentPrice / 0.5) * 0.5;
                                break;
                            case "/usdinr2016":
                                basePrice = Math.floor(currentPrice / 0.5) * 0.5;
                                break;
                        }

                        if ((superSupreme[i]["DATE"] != "") && (superSupreme[i]["DATE"] !== undefined) && (superSupreme[i]["DATE"] != null)) {
                            currentPrice = pf(superSupreme[i]["LTP"]);
                            if ((superSupreme[i]["SP"] == "" || superSupreme[i]["SP"] == null) && checkToPutCE(i)) { //BUY PART BEGINS

                                if (checkedboxes.indexOf("1") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "1") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                firstStrike = basePrice + (buyFirstStrikeTm);
                                                defendingStrikePrice = firstStrike;
                                                coverMeBuy.push(["buy", "CE", "T", i, firstStrike, buyFirstTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE STK " + (defendingStrikePrice)] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    premiumPrice = pf(getCEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    premiumPrice = (nseYear == 2015) ? pf(getCEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE BP " + (defendingStrikePrice)] = Math.abs(premiumPrice).toFixed(2);
                                                superSupreme[i]["CE BQ " + (defendingStrikePrice)] = buyFirstTmQty;
                                                superSupreme[i]["CE BV " + (defendingStrikePrice)] = pf(superSupreme[i]["CE BP " + (defendingStrikePrice)]) * pf(superSupreme[i]["CE BQ " + (defendingStrikePrice)]);
                                            } else {
                                                firstStrike = basePrice + (buyFirstStrikeTm);
                                                defendingStrikePrice = firstStrike;
                                                coverMeBuy.push(["sell", "CE", "T", i, firstStrike, buyFirstTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE sq " + defendingStrikePrice] = buyFirstTmQty;
                                                superSupreme[i]["CE sv " + defendingStrikePrice] = pf(superSupreme[i]["CE sp " + defendingStrikePrice]) * pf(superSupreme[i]["CE sq " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("2") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "2") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                firstStrike = basePrice + (buyFirstStrikeTm);
                                                defendingStrikePrice = firstStrike;
                                                coverMeBuy.push(["buy", "PE", "T", i, firstStrike, buyFirstTmQty, 0, superSupreme[i]["DATE"], 2, null, null]);
                                                superSupreme[i]["PE STK " + defendingStrikePrice] = defendingStrikePrice; //vivek
                                                if (towhich == 1) {
                                                    premiumPrice = pf(getPEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    premiumPrice = (nseYear == 2015) ? pf(getPEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE BP " + defendingStrikePrice] = Math.abs(premiumPrice).toFixed(2);
                                                superSupreme[i]["PE BQ " + defendingStrikePrice] = buyFirstTmQty;
                                                superSupreme[i]["PE BV " + defendingStrikePrice] = pf(superSupreme[i]["PE BP " + defendingStrikePrice]) * pf(superSupreme[i]["PE BQ " + defendingStrikePrice]);

                                            } else {
                                                firstStrike = basePrice + (buyFirstStrikeTm);
                                                defendingStrikePrice = firstStrike;
                                                coverMeBuy.push(["sell", "PE", "T", i, firstStrike, buyFirstTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE sq " + defendingStrikePrice] = buyFirstTmQty;
                                                superSupreme[i]["PE sv " + defendingStrikePrice] = pf(superSupreme[i]["PE sp " + defendingStrikePrice]) * pf(superSupreme[i]["PE sq " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("3") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "3") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                secondStrike = basePrice + (buySecondStrikeTm);
                                                defendingStrikePrice = secondStrike;
                                                coverMeBuy.push(["buy", "CE", "T", i, secondStrike, buySecondTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE STK " + (defendingStrikePrice)] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    premiumPrice = pf(getCEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    premiumPrice = (nseYear == 2015) ? pf(getCEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE BP " + (defendingStrikePrice)] = Math.abs(premiumPrice).toFixed(2);
                                                superSupreme[i]["CE BQ " + (defendingStrikePrice)] = buySecondTmQty;
                                                superSupreme[i]["CE BV " + (defendingStrikePrice)] = pf(superSupreme[i]["CE BP " + (defendingStrikePrice)]) * pf(superSupreme[i]["CE BQ " + (defendingStrikePrice)]);
                                            } else {
                                                secondStrike = basePrice + (buyStrikeStrikeTm);
                                                defendingStrikePrice = secondStrike;
                                                coverMeBuy.push(["sell", "CE", "T", i, secondStrike, buySecondTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE sq " + defendingStrikePrice] = buySecondTmQty;
                                                superSupreme[i]["CE sv " + defendingStrikePrice] = pf(superSupreme[i]["CE sp " + defendingStrikePrice]) * pf(superSupreme[i]["CE sq " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("4") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "4") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                secondStrike = basePrice + (buySecondStrikeTm);
                                                defendingStrikePrice = secondStrike;
                                                coverMeBuy.push(["buy", "PE", "T", i, secondStrike, buySecondTmQty, 0, superSupreme[i]["DATE"], 4, null, null]);
                                                superSupreme[i]["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    premiumPrice = pf(getPEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    premiumPrice = (nseYear == 2015) ? pf(getPEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE BP " + defendingStrikePrice] = Math.abs(premiumPrice).toFixed(2);
                                                superSupreme[i]["PE BQ " + defendingStrikePrice] = buySecondTmQty;
                                                superSupreme[i]["PE BV " + defendingStrikePrice] = pf(superSupreme[i]["PE BP " + defendingStrikePrice]) * pf(superSupreme[i]["PE BQ " + defendingStrikePrice]);
                                            } else {
                                                secondStrike = basePrice + (buySecondStrikeTm);
                                                defendingStrikePrice = secondStrike;
                                                coverMeBuy.push(["sell", "PE", "T", i, secondStrike, buySecondTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE sq " + defendingStrikePrice] = buySecondTmQty;
                                                superSupreme[i]["PE sv " + defendingStrikePrice] = pf(superSupreme[i]["PE sp " + defendingStrikePrice]) * pf(superSupreme[i]["PE sq " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("5") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "5") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                thirdStrike = basePrice + (buyThirdStrikeTm);
                                                defendingStrikePrice = thirdStrike;
                                                coverMeBuy.push(["buy", "CE", "T", i, thirdStrike, buyThirdTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE STK " + (defendingStrikePrice)] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    premiumPrice = pf(getCEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    premiumPrice = (nseYear == 2015) ? pf(getCEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE BP " + (defendingStrikePrice)] = Math.abs(premiumPrice).toFixed(2);
                                                superSupreme[i]["CE BQ " + (defendingStrikePrice)] = buyThirdTmQty;
                                                superSupreme[i]["CE BV " + (defendingStrikePrice)] = pf(superSupreme[i]["CE BP " + (defendingStrikePrice)]) * pf(superSupreme[i]["CE BQ " + (defendingStrikePrice)]);
                                            } else {
                                                thirdStrike = basePrice + (buyThirdStrikeTm);
                                                defendingStrikePrice = thirdStrike;
                                                coverMeBuy.push(["sell", "CE", "T", i, thirdStrike, buyThirdTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE sq " + defendingStrikePrice] = buyThirdTmQty;
                                                superSupreme[i]["CE sv " + defendingStrikePrice] = pf(superSupreme[i]["CE sp " + defendingStrikePrice]) * pf(superSupreme[i]["CE sq " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("6") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "6") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                thirdStrike = basePrice + (buyThirdStrikeTm);
                                                defendingStrikePrice = thirdStrike;
                                                coverMeBuy.push(["buy", "PE", "T", i, thirdStrike, buyThirdTmQty, 0, superSupreme[i]["DATE"], 6, null, null]);
                                                superSupreme[i]["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    premiumPrice = pf(getPEThisMonthUSDINR(date, defendingStrikePrice))
                                                } else {
                                                    premiumPrice = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE BP " + defendingStrikePrice] = Math.abs(premiumPrice).toFixed(2);
                                                superSupreme[i]["PE BQ " + defendingStrikePrice] = buyThirdTmQty;
                                                superSupreme[i]["PE BV " + defendingStrikePrice] = pf(superSupreme[i]["PE BP " + defendingStrikePrice]) * pf(superSupreme[i]["PE BQ " + defendingStrikePrice]);
                                            } else {
                                                thirdStrike = basePrice + (buyThirdStrikeTm);
                                                defendingStrikePrice = thirdStrike;
                                                coverMeBuy.push(["sell", "PE", "T", i, thirdStrike, buyThirdTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice))
                                                } else {
                                                    superSupreme[i]["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE sq " + defendingStrikePrice] = buyThirdTmQty;
                                                superSupreme[i]["PE sv " + defendingStrikePrice] = pf(superSupreme[i]["PE sp " + defendingStrikePrice]) * pf(superSupreme[i]["PE sq " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("7") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "7") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                fourthStrike = basePrice + (buyFirstStrikeNm);
                                                defendingStrikePrice = fourthStrike;
                                                coverMeBuy.push(["buy", "CE", "N", i, fourthStrike, buyFirstNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE bp " + defendingStrikePrice] = pf(getCENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE bp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE bq " + defendingStrikePrice] = buyFirstNmQty;
                                                superSupreme[i]["CE bv " + defendingStrikePrice] = pf(superSupreme[i]["CE bp " + defendingStrikePrice]) * pf(superSupreme[i]["CE bq " + defendingStrikePrice]);
                                            } else {
                                                fourthStrike = basePrice + (buyFirstStrikeNm);
                                                defendingStrikePrice = fourthStrike;
                                                coverMeBuy.push(["sell", "CE", "N", i, fourthStrike, buyFirstNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE SP " + defendingStrikePrice] = pf(getCENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE SQ " + defendingStrikePrice] = buyFirstNmQty;
                                                superSupreme[i]["CE SV " + defendingStrikePrice] = pf(superSupreme[i]["CE SP " + defendingStrikePrice]) * pf(superSupreme[i]["CE SQ " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("8") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "8") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                fourthStrike = basePrice + (buyFirstStrikeNm);
                                                defendingStrikePrice = fourthStrike;
                                                coverMeBuy.push(["buy", "PE", "N", i, fourthStrike, buyFirstNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE bp " + defendingStrikePrice] = pf(getPENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE bp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE bq " + defendingStrikePrice] = buyFirstNmQty;
                                                superSupreme[i]["PE bv " + defendingStrikePrice] = pf(superSupreme[i]["PE bp " + defendingStrikePrice]) * pf(superSupreme[i]["PE bq " + defendingStrikePrice]);
                                            } else {
                                                fourthStrike = basePrice + (buyFirstStrikeNm);
                                                defendingStrikePrice = fourthStrike;
                                                coverMeBuy.push(["sell", "PE", "N", i, fourthStrike, buyFirstNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE SP " + defendingStrikePrice] = pf(getPENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE SQ " + defendingStrikePrice] = buyFirstNmQty;
                                                superSupreme[i]["PE SV " + defendingStrikePrice] = pf(superSupreme[i]["PE SP " + defendingStrikePrice]) * pf(superSupreme[i]["PE SQ " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("9") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "9") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                fifthStrike = basePrice + (buySecondStrikeNm);
                                                defendingStrikePrice = fifthStrike;
                                                coverMeBuy.push(["buy", "CE", "N", i, fifthStrike, buySecondNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE bp " + defendingStrikePrice] = pf(getCENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE bp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["CE bq " + defendingStrikePrice] = buySecondNmQty;
                                                superSupreme[i]["CE bv " + defendingStrikePrice] = pf(superSupreme[i]["CE bp " + defendingStrikePrice]) * pf(superSupreme[i]["CE bq " + defendingStrikePrice]);
                                            } else {
                                                fifthStrike = basePrice + (buySecondStrikeNm);
                                                defendingStrikePrice = fifthStrike;
                                                coverMeBuy.push(["sell", "CE", "N", i, fifthStrike, buySecondNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE SP " + defendingStrikePrice] = pf(getCENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["CE SQ " + defendingStrikePrice] = buySecondNmQty;
                                                superSupreme[i]["CE SV " + defendingStrikePrice] = pf(superSupreme[i]["CE SP " + defendingStrikePrice]) * pf(superSupreme[i]["CE SQ " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("10") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "10") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                fifthStrike = basePrice + (buySecondStrikeNm);
                                                defendingStrikePrice = fifthStrike;
                                                coverMeBuy.push(["buy", "PE", "N", i, fifthStrike, buySecondNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE bp " + defendingStrikePrice] = pf(getPENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE bp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["PE bq " + defendingStrikePrice] = buySecondNmQty;
                                                superSupreme[i]["PE bv " + defendingStrikePrice] = pf(superSupreme[i]["PE bp " + defendingStrikePrice]) * pf(superSupreme[i]["PE bq " + defendingStrikePrice]);
                                            } else {
                                                fifthStrike = basePrice + (buySecondStrikeNm);
                                                defendingStrikePrice = fifthStrike;
                                                coverMeBuy.push(["sell", "PE", "N", i, fifthStrike, buySecondNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE SP " + defendingStrikePrice] = pf(getPENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["PE SQ " + defendingStrikePrice] = buySecondNmQty;
                                                superSupreme[i]["PE SV " + defendingStrikePrice] = pf(superSupreme[i]["PE SP " + defendingStrikePrice]) * pf(superSupreme[i]["PE SQ " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("11") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "11") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                sixthStrike = basePrice + (buyThirdStrikeNm);
                                                defendingStrikePrice = sixthStrike;
                                                coverMeBuy.push(["buy", "CE", "N", i, sixthStrike, buyThirdNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE bp " + defendingStrikePrice] = pf(getCENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE bp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["CE bq " + defendingStrikePrice] = buyThirdNmQty;
                                                superSupreme[i]["CE bv " + defendingStrikePrice] = pf(superSupreme[i]["CE bp " + defendingStrikePrice]) * pf(superSupreme[i]["CE bq " + defendingStrikePrice]);
                                            } else {
                                                sixthStrike = basePrice + (buyThirdStrikeNm);
                                                defendingStrikePrice = sixthStrike;
                                                coverMeBuy.push(["sell", "CE", "N", i, sixthStrike, buyThirdNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE SP " + defendingStrikePrice] = pf(getCENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE SQ " + defendingStrikePrice] = buyThirdNmQty;
                                                superSupreme[i]["CE SV " + defendingStrikePrice] = pf(superSupreme[i]["CE SP " + defendingStrikePrice]) * pf(superSupreme[i]["CE SQ " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("12") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "12") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                sixthStrike = basePrice + (buyThirdStrikeNm);
                                                defendingStrikePrice = sixthStrike;
                                                coverMeBuy.push(["buy", "PE", "N", i, sixthStrike, buyThirdNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE bp " + defendingStrikePrice] = pf(getPENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE bp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["PE bq " + defendingStrikePrice] = buyThirdNmQty;
                                                superSupreme[i]["PE bv " + defendingStrikePrice] = pf(superSupreme[i]["PE bp " + defendingStrikePrice]) * pf(superSupreme[i]["PE bq " + defendingStrikePrice]);
                                            } else {
                                                sixthStrike = basePrice + (buyThirdStrikeNm);
                                                defendingStrikePrice = sixthStrike;
                                                coverMeBuy.push(["sell", "PE", "N", i, sixthStrike, buyThirdNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE SP " + defendingStrikePrice] = pf(getPENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["PE SQ " + defendingStrikePrice] = buyThirdNmQty;
                                                superSupreme[i]["PE SV " + defendingStrikePrice] = pf(superSupreme[i]["PE SP " + defendingStrikePrice]) * pf(superSupreme[i]["PE SQ " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("25") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "25") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                firstStrike = basePrice + (buyFourthStrikeTm);
                                                defendingStrikePrice = firstStrike;
                                                coverMeBuy.push(["buy", "CE", "T", i, firstStrike, buyFourthTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE STK " + (defendingStrikePrice)] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    premiumPrice = pf(getCEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    premiumPrice = (nseYear == 2015) ? pf(getCEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE BP " + (defendingStrikePrice)] = Math.abs(premiumPrice).toFixed(2);
                                                superSupreme[i]["CE BQ " + (defendingStrikePrice)] = buyFourthTmQty;
                                                superSupreme[i]["CE BV " + (defendingStrikePrice)] = pf(superSupreme[i]["CE BP " + (defendingStrikePrice)]) * pf(superSupreme[i]["CE BQ " + (defendingStrikePrice)]);
                                            } else {
                                                firstStrike = basePrice + (buyFourthStrikeTm);
                                                defendingStrikePrice = firstStrike;
                                                coverMeBuy.push(["sell", "CE", "T", i, firstStrike, buyFourthTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE sq " + defendingStrikePrice] = buyFourthTmQty;
                                                superSupreme[i]["CE sv " + defendingStrikePrice] = pf(superSupreme[i]["CE sp " + defendingStrikePrice]) * pf(superSupreme[i]["CE sq " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("26") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "26") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                firstStrike = basePrice + (buyFourthStrikeTm);
                                                defendingStrikePrice = firstStrike;
                                                coverMeBuy.push(["buy", "PE", "T", i, firstStrike, buyFourthTmQty, 0, superSupreme[i]["DATE"], 26, null, null]);
                                                superSupreme[i]["PE STK " + defendingStrikePrice] = defendingStrikePrice; //vivek
                                                if (towhich == 1) {
                                                    premiumPrice = pf(getPEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    premiumPrice = (nseYear == 2015) ? pf(getPEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE BP " + defendingStrikePrice] = Math.abs(premiumPrice).toFixed(2);
                                                superSupreme[i]["PE BQ " + defendingStrikePrice] = buyFourthTmQty;
                                                superSupreme[i]["PE BV " + defendingStrikePrice] = pf(superSupreme[i]["PE BP " + defendingStrikePrice]) * pf(superSupreme[i]["PE BQ " + defendingStrikePrice]);

                                            } else {
                                                firstStrike = basePrice + (buyFourthStrikeTm);
                                                defendingStrikePrice = firstStrike;
                                                coverMeBuy.push(["sell", "PE", "T", i, firstStrike, buyFourthTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE sq " + defendingStrikePrice] = buyFourthTmQty;
                                                superSupreme[i]["PE sv " + defendingStrikePrice] = pf(superSupreme[i]["PE sp " + defendingStrikePrice]) * pf(superSupreme[i]["PE sq " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("27") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "27") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                sixthStrike = basePrice + (buyFourthStrikeNm);
                                                defendingStrikePrice = sixthStrike;
                                                coverMeBuy.push(["buy", "CE", "N", i, sixthStrike, buyFourthNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE bp " + defendingStrikePrice] = pf(getCENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE bp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["CE bq " + defendingStrikePrice] = buyFourthNmQty;
                                                superSupreme[i]["CE bv " + defendingStrikePrice] = pf(superSupreme[i]["CE bp " + defendingStrikePrice]) * pf(superSupreme[i]["CE bq " + defendingStrikePrice]);
                                            } else {
                                                sixthStrike = basePrice + (buyFourthStrikeNm);
                                                defendingStrikePrice = sixthStrike;
                                                coverMeBuy.push(["sell", "CE", "N", i, sixthStrike, buyFourthNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE SP " + defendingStrikePrice] = pf(getCENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE SQ " + defendingStrikePrice] = buyFourthNmQty;
                                                superSupreme[i]["CE SV " + defendingStrikePrice] = pf(superSupreme[i]["CE SP " + defendingStrikePrice]) * pf(superSupreme[i]["CE SQ " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("28") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "28") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                sixthStrike = basePrice + (buyFourthStrikeNm);
                                                defendingStrikePrice = sixthStrike;
                                                coverMeBuy.push(["buy", "PE", "N", i, sixthStrike, buyThirdNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE bp " + defendingStrikePrice] = pf(getPENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE bp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["PE bq " + defendingStrikePrice] = buyFourthNmQty;
                                                superSupreme[i]["PE bv " + defendingStrikePrice] = pf(superSupreme[i]["PE bp " + defendingStrikePrice]) * pf(superSupreme[i]["PE bq " + defendingStrikePrice]);
                                            } else {
                                                sixthStrike = basePrice + (buyThirdStrikeNm);
                                                defendingStrikePrice = sixthStrike;
                                                coverMeBuy.push(["sell", "PE", "N", i, sixthStrike, buyFourthNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE SP " + defendingStrikePrice] = pf(getPENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["PE SQ " + defendingStrikePrice] = buyFourthNmQty;
                                                superSupreme[i]["PE SV " + defendingStrikePrice] = pf(superSupreme[i]["PE SP " + defendingStrikePrice]) * pf(superSupreme[i]["PE SQ " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }
                            }


                            if ((superSupreme[i]["bp"] == "" || superSupreme[i]["bp"] == null) && checkToPutPE(i)) {

                                switch (onwhich) {
                                    case "/lt":
                                        basePrice = Math.floor(currentPrice / 20) * 20;
                                        break;
                                    case "/tcs":
                                        basePrice = Math.floor(currentPrice / 50) * 50;
                                        break;
                                    case "/nifty":
                                        basePrice = Math.floor(currentPrice / 100) * 100;
                                        break;
                                    case "/usdinr2013":
                                        basePrice = Math.floor(currentPrice / 0.5) * 0.5;
                                        break;
                                    case "/usdinr2014":
                                        basePrice = Math.floor(currentPrice / 0.5) * 0.5;
                                        break;
                                    case "/usdinr2015":
                                        basePrice = Math.floor(currentPrice / 0.5) * 0.5;
                                        break;
                                    case "/usdinr2016":
                                        basePrice = Math.floor(currentPrice / 0.5) * 0.5;
                                        break;
                                }

                                if (checkedboxes.indexOf("13") > -1) {

                                    for (var j = 0; j < tradeArray.length; j++) {

                                        if (tradeArray[j][1] == "13") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                firstStrike = basePrice + (sellFirstStrikeTm);
                                                defendingStrikePrice = firstStrike;
                                                coverMeSell.push(["buy", "CE", "T", i, firstStrike, sellFirstTmQty, 0, superSupreme[i]["DATE"], 13, null, null]);
                                                superSupreme[i]["CE STK " + (defendingStrikePrice)] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    premiumPrice = pf(getCEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    premiumPrice = (nseYear == 2015) ? pf(getCEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["CE BP " + (defendingStrikePrice)] = Math.abs(premiumPrice).toFixed(2);
                                                superSupreme[i]["CE BQ " + (defendingStrikePrice)] = sellFirstTmQty;
                                                superSupreme[i]["CE BV " + (defendingStrikePrice)] = pf(superSupreme[i]["CE BP " + (defendingStrikePrice)]) * pf(superSupreme[i]["CE BQ " + (defendingStrikePrice)]);
                                            } else {
                                                firstStrike = basePrice + (sellFirstStrikeTm);
                                                defendingStrikePrice = firstStrike;
                                                coverMeSell.push(["sell", "CE", "T", i, firstStrike, sellFirstTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["CE sq " + defendingStrikePrice] = sellFirstTmQty;
                                                superSupreme[i]["CE sv " + defendingStrikePrice] = pf(superSupreme[i]["CE sp " + defendingStrikePrice]) * pf(superSupreme[i]["CE sq " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("14") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "14") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                firstStrike = basePrice + (sellFirstStrikeTm);
                                                defendingStrikePrice = firstStrike;
                                                coverMeSell.push(["buy", "PE", "T", i, firstStrike, sellFirstTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    premiumPrice = pf(getPEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    premiumPrice = (nseYear == 2015) ? pf(getPEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["PE BP " + defendingStrikePrice] = Math.abs(premiumPrice).toFixed(2);
                                                superSupreme[i]["PE BQ " + defendingStrikePrice] = sellFirstTmQty;
                                                superSupreme[i]["PE BV " + defendingStrikePrice] = pf(superSupreme[i]["PE BP " + defendingStrikePrice]) * pf(superSupreme[i]["PE BQ " + defendingStrikePrice]);

                                            } else {
                                                firstStrike = basePrice + (sellFirstStrikeTm);
                                                defendingStrikePrice = firstStrike;
                                                coverMeSell.push(["sell", "PE", "T", i, firstStrike, sellFirstTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["PE sq " + defendingStrikePrice] = sellFirstTmQty;
                                                superSupreme[i]["PE sv " + defendingStrikePrice] = pf(superSupreme[i]["PE sp " + defendingStrikePrice]) * pf(superSupreme[i]["PE sq " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("15") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "15") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                secondStrike = basePrice + (sellSecondStrikeTm);
                                                defendingStrikePrice = secondStrike;
                                                coverMeSell.push(["buy", "CE", "T", i, secondStrike, sellSecondTmQty, 0, superSupreme[i]["DATE"], 15, null, null]);
                                                superSupreme[i]["CE STK " + (defendingStrikePrice)] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    premiumPrice = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                } else {
                                                    premiumPrice = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["CE BP " + (defendingStrikePrice)] = Math.abs(premiumPrice).toFixed(2);
                                                superSupreme[i]["CE BQ " + (defendingStrikePrice)] = sellSecondTmQty;
                                                superSupreme[i]["CE BV " + (defendingStrikePrice)] = pf(superSupreme[i]["CE BP " + (defendingStrikePrice)]) * pf(superSupreme[i]["CE BQ " + (defendingStrikePrice)]);
                                            } else {
                                                secondStrike = basePrice + (sellSecondStrikeTm);
                                                defendingStrikePrice = secondStrike;
                                                coverMeSell.push(["sell", "CE", "T", i, secondStrike, sellSecondTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["CE sq " + defendingStrikePrice] = sellSecondTmQty;
                                                superSupreme[i]["CE sv " + defendingStrikePrice] = pf(superSupreme[i]["CE sp " + defendingStrikePrice]) * pf(superSupreme[i]["CE sq " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("16") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "16") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                secondStrike = basePrice + (sellSecondStrikeTm);
                                                defendingStrikePrice = secondStrike;
                                                coverMeSell.push(["sell", "CE", "T", i, secondStrike, sellSecondTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    premiumPrice = pf(getPEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    premiumPrice = (nseYear == 2015) ? pf(getPEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["PE BP " + defendingStrikePrice] = Math.abs(premiumPrice).toFixed(2);
                                                superSupreme[i]["PE BQ " + defendingStrikePrice] = sellSecondTmQty;
                                                superSupreme[i]["PE BV " + defendingStrikePrice] = pf(superSupreme[i]["PE BP " + defendingStrikePrice]) * pf(superSupreme[i]["PE BQ " + defendingStrikePrice]);
                                            } else {
                                                secondStrike = basePrice + (sellSecondStrikeTm);
                                                defendingStrikePrice = secondStrike;
                                                coverMeSell.push(["sell", "PE", "T", i, secondStrike, sellSecondTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["PE sq " + defendingStrikePrice] = sellSecondTmQty;
                                                superSupreme[i]["PE sv " + defendingStrikePrice] = pf(superSupreme[i]["PE sp " + defendingStrikePrice]) * pf(superSupreme[i]["PE sq " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("17") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "17") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                thirdStrike = basePrice + (sellThirdStrikeTm);
                                                defendingStrikePrice = thirdStrike;
                                                coverMeSell.push(["buy", "CE", "T", i, thirdStrike, sellThirdTmQty, 0, superSupreme[i]["DATE"], 17, null, null]);
                                                superSupreme[i]["CE STK " + (defendingStrikePrice)] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    premiumPrice = pf(getCEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    premiumPrice = (nseYear == 2015) ? pf(getCEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE BP " + (defendingStrikePrice)] = Math.abs(premiumPrice).toFixed(2);
                                                superSupreme[i]["CE BQ " + (defendingStrikePrice)] = sellThirdTmQty;
                                                superSupreme[i]["CE BV " + (defendingStrikePrice)] = pf(superSupreme[i]["CE BP " + (defendingStrikePrice)]) * pf(superSupreme[i]["CE BQ " + (defendingStrikePrice)]);
                                            } else {
                                                thirdStrike = basePrice + (sellThirdStrikeTm);
                                                defendingStrikePrice = thirdStrike;
                                                coverMeSell.push(["sell", "CE", "T", i, thirdStrike, sellThirdTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["CE sq " + defendingStrikePrice] = sellThirdTmQty;
                                                superSupreme[i]["CE sv " + defendingStrikePrice] = pf(superSupreme[i]["CE sp " + defendingStrikePrice]) * pf(superSupreme[i]["CE sq " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("18") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "18") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                thirdStrike = basePrice + (sellThirdStrikeTm);
                                                defendingStrikePrice = thirdStrike;
                                                coverMeSell.push(["buy", "PE", "T", i, thirdStrike, sellThirdTmQty, 0, superSupreme[i]["DATE"], 18]);
                                                superSupreme[i]["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    premiumPrice = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                } else {
                                                    premiumPrice = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["PE BP " + defendingStrikePrice] = Math.abs(premiumPrice).toFixed(2);
                                                superSupreme[i]["PE BQ " + defendingStrikePrice] = sellThirdTmQty;
                                                superSupreme[i]["PE BV " + defendingStrikePrice] = pf(superSupreme[i]["PE BP " + defendingStrikePrice]) * pf(superSupreme[i]["PE BQ " + defendingStrikePrice]);
                                            } else {
                                                thirdStrike = basePrice + (sellThirdStrikeTm);
                                                defendingStrikePrice = thirdStrike;
                                                coverMeSell.push(["sell", "PE", "T", i, thirdStrike, sellThirdTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE sq " + defendingStrikePrice] = sellThirdTmQty;
                                                superSupreme[i]["PE sv " + defendingStrikePrice] = pf(superSupreme[i]["PE sp " + defendingStrikePrice]) * pf(superSupreme[i]["PE sq " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("19") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "19") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                fourthStrike = basePrice + (sellFirstStrikeNm);
                                                defendingStrikePrice = fourthStrike;
                                                coverMeSell.push(["buy", "CE", "N", i, fourthStrike, sellFirstNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE bp " + defendingStrikePrice] = pf(getCENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE bp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE bq " + defendingStrikePrice] = sellFirstNmQty;
                                                superSupreme[i]["CE bv " + defendingStrikePrice] = pf(superSupreme[i]["CE bp " + defendingStrikePrice]) * pf(superSupreme[i]["CE bq " + defendingStrikePrice]);
                                            } else {
                                                fourthStrike = basePrice + (sellFirstStrikeNm);
                                                defendingStrikePrice = fourthStrike;
                                                coverMeSell.push(["sell", "CE", "N", i, fourthStrike, sellFirstNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE SP " + defendingStrikePrice] = pf(getCENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["CE SQ " + defendingStrikePrice] = sellFirstNmQty;
                                                superSupreme[i]["CE SV " + defendingStrikePrice] = pf(superSupreme[i]["CE SP " + defendingStrikePrice]) * pf(superSupreme[i]["CE SQ " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("20") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "20") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                fourthStrike = basePrice + (sellFirstStrikeNm);
                                                defendingStrikePrice = fourthStrike;
                                                coverMeSell.push(["buy", "PE", "N", i, fourthStrike, sellFirstNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE bp " + defendingStrikePrice] = pf(getPENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE bp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE bq " + defendingStrikePrice] = sellFirstNmQty;
                                                superSupreme[i]["PE bv " + defendingStrikePrice] = pf(superSupreme[i]["PE BP " + defendingStrikePrice]) * pf(superSupreme[i]["PE BQ " + defendingStrikePrice]);
                                            } else {
                                                fourthStrike = basePrice + (sellFirstStrikeNm);
                                                defendingStrikePrice = fourthStrike;
                                                coverMeSell.push(["sell", "PE", "N", i, fourthStrike, sellFirstNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE SP " + defendingStrikePrice] = pf(getPENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE SQ " + defendingStrikePrice] = sellFirstNmQty;
                                                superSupreme[i]["PE SV " + defendingStrikePrice] = pf(superSupreme[i]["PE SP " + defendingStrikePrice]) * pf(superSupreme[i]["PE SQ " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("21") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "21") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                fifthStrike = basePrice + (sellSecondStrikeNm);
                                                defendingStrikePrice = fifthStrike;
                                                coverMeSell.push(["buy", "CE", "N", i, fifthStrike, sellSecondNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE bp " + defendingStrikePrice] = pf(getCENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE bp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE bq " + defendingStrikePrice] = sellSecondNmQty;
                                                superSupreme[i]["CE bv " + defendingStrikePrice] = pf(superSupreme[i]["CE BP " + defendingStrikePrice]) * pf(superSupreme[i]["CE BQ " + defendingStrikePrice]);
                                            } else {
                                                fifthStrike = basePrice + (sellSecondStrikeNm);
                                                defendingStrikePrice = fifthStrike;
                                                coverMeSell.push(["sell", "CE", "N", i, fifthStrike, sellSecondNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE SP " + defendingStrikePrice] = pf(getCENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE SQ " + defendingStrikePrice] = sellSecondNmQty;
                                                superSupreme[i]["CE SV " + defendingStrikePrice] = pf(superSupreme[i]["CE SP " + defendingStrikePrice]) * pf(superSupreme[i]["CE SQ " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("22") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "22") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                fifthStrike = basePrice + (sellSecondStrikeNm);
                                                defendingStrikePrice = fifthStrike;
                                                coverMeSell.push(["buy", "PE", "N", i, fifthStrike, sellSecondNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE bp " + defendingStrikePrice] = pf(getPENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE bp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE bq " + defendingStrikePrice] = sellSecondNmQty;
                                                superSupreme[i]["PE bv " + defendingStrikePrice] = pf(superSupreme[i]["PE BP " + defendingStrikePrice]) * pf(superSupreme[i]["PE BQ " + defendingStrikePrice]);
                                            } else {
                                                fifthStrike = basePrice + (sellSecondStrikeNm);
                                                defendingStrikePrice = fifthStrike;
                                                coverMeSell.push(["sell", "PE", "N", i, fifthStrike, sellSecondNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE SP " + defendingStrikePrice] = pf(getPENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE SQ " + defendingStrikePrice] = sellSecondNmQty;
                                                superSupreme[i]["PE SV " + defendingStrikePrice] = pf(superSupreme[i]["PE SP " + defendingStrikePrice]) * pf(superSupreme[i]["PE SQ " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("23") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "23") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                sixthStrike = basePrice + (sellThirdStrikeNm);
                                                defendingStrikePrice = sixthStrike;
                                                coverMeSell.push(["buy", "CE", "N", i, fifthStrike, sellThirdNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE bp " + defendingStrikePrice] = pf(getCENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE bp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE bq " + defendingStrikePrice] = sellThirdNmQty;
                                                superSupreme[i]["CE bv " + defendingStrikePrice] = pf(superSupreme[i]["CE BP " + defendingStrikePrice]) * pf(superSupreme[i]["CE BQ " + defendingStrikePrice]);
                                            } else {
                                                sixthStrike = basePrice + (sellThirdStrikeNm);
                                                defendingStrikePrice = sixthStrike;
                                                coverMeSell.push(["sell", "CE", "N", i, fifthStrike, sellThirdNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE SP " + defendingStrikePrice] = pf(getCENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE SQ " + defendingStrikePrice] = sellThirdNmQty;
                                                superSupreme[i]["CE SV " + defendingStrikePrice] = pf(superSupreme[i]["CE SP " + defendingStrikePrice]) * pf(superSupreme[i]["CE SQ " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("24") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "24") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                sixthStrike = basePrice + (sellThirdStrikeNm);
                                                defendingStrikePrice = sixthStrike;
                                                coverMeSell.push(["buy", "PE", "N", i, fifthStrike, sellThirdNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE bp " + defendingStrikePrice] = pf(getPENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE bp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE bq " + defendingStrikePrice] = sellThirdNmQty;
                                                superSupreme[i]["PE bv " + defendingStrikePrice] = pf(superSupreme[i]["PE BP " + defendingStrikePrice]) * pf(superSupreme[i]["PE BQ " + defendingStrikePrice]);
                                            } else {
                                                sixthStrike = basePrice + (sellThirdStrikeNm);
                                                defendingStrikePrice = sixthStrike;
                                                coverMeSell.push(["sell", "PE", "N", i, fifthStrike, sellThirdNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE SP " + defendingStrikePrice] = pf(getPENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE SQ " + defendingStrikePrice] = sellThirdNmQty;
                                                superSupreme[i]["PE SV " + defendingStrikePrice] = pf(superSupreme[i]["PE SP " + defendingStrikePrice]) * pf(superSupreme[i]["PE SQ " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("29") > -1) {

                                    for (var j = 0; j < tradeArray.length; j++) {

                                        if (tradeArray[j][1] == "29") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                firstStrike = basePrice + (sellFourthStrikeTm);
                                                defendingStrikePrice = firstStrike;
                                                coverMeSell.push(["buy", "CE", "T", i, firstStrike, sellFirstTmQty, 0, superSupreme[i]["DATE"], 29, null, null]);
                                                superSupreme[i]["CE STK " + (defendingStrikePrice)] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    premiumPrice = pf(getCEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    premiumPrice = (nseYear == 2015) ? pf(getCEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["CE BP " + (defendingStrikePrice)] = Math.abs(premiumPrice).toFixed(2);
                                                superSupreme[i]["CE BQ " + (defendingStrikePrice)] = sellFourthTmQty;
                                                superSupreme[i]["CE BV " + (defendingStrikePrice)] = pf(superSupreme[i]["CE BP " + (defendingStrikePrice)]) * pf(superSupreme[i]["CE BQ " + (defendingStrikePrice)]);
                                            } else {
                                                firstStrike = basePrice + (sellFirstStrikeTm);
                                                defendingStrikePrice = firstStrike;
                                                coverMeSell.push(["sell", "CE", "T", i, firstStrike, sellFourthTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["CE sq " + defendingStrikePrice] = sellFourthTmQty;
                                                superSupreme[i]["CE sv " + defendingStrikePrice] = pf(superSupreme[i]["CE sp " + defendingStrikePrice]) * pf(superSupreme[i]["CE sq " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("30") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "30") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                firstStrike = basePrice + (sellFourthStrikeTm);
                                                defendingStrikePrice = firstStrike;
                                                coverMeSell.push(["buy", "PE", "T", i, firstStrike, sellFourthTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    premiumPrice = pf(getPEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    premiumPrice = (nseYear == 2015) ? pf(getPEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["PE BP " + defendingStrikePrice] = Math.abs(premiumPrice).toFixed(2);
                                                superSupreme[i]["PE BQ " + defendingStrikePrice] = sellFourthTmQty;
                                                superSupreme[i]["PE BV " + defendingStrikePrice] = pf(superSupreme[i]["PE BP " + defendingStrikePrice]) * pf(superSupreme[i]["PE BQ " + defendingStrikePrice]);

                                            } else {
                                                firstStrike = basePrice + (sellFourthStrikeTm);
                                                defendingStrikePrice = firstStrike;
                                                coverMeSell.push(["sell", "PE", "T", i, firstStrike, sellFirstTmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPEThisMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }

                                                superSupreme[i]["PE sq " + defendingStrikePrice] = sellFourthTmQty;
                                                superSupreme[i]["PE sv " + defendingStrikePrice] = pf(superSupreme[i]["PE sp " + defendingStrikePrice]) * pf(superSupreme[i]["PE sq " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("31") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "31") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                sixthStrike = basePrice + (sellFourthStrikeNm);
                                                defendingStrikePrice = sixthStrike;
                                                coverMeSell.push(["buy", "CE", "N", i, fifthStrike, sellFourthNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE bp " + defendingStrikePrice] = pf(getCENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE bp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE bq " + defendingStrikePrice] = sellFourthNmQty;
                                                superSupreme[i]["CE bv " + defendingStrikePrice] = pf(superSupreme[i]["CE BP " + defendingStrikePrice]) * pf(superSupreme[i]["CE BQ " + defendingStrikePrice]);
                                            } else {
                                                sixthStrike = basePrice + (sellThirdStrikeNm);
                                                defendingStrikePrice = sixthStrike;
                                                coverMeSell.push(["sell", "CE", "N", i, fifthStrike, sellFourthNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["CE SP " + defendingStrikePrice] = pf(getCENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["CE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["CE SQ " + defendingStrikePrice] = sellFourthNmQty;
                                                superSupreme[i]["CE SV " + defendingStrikePrice] = pf(superSupreme[i]["CE SP " + defendingStrikePrice]) * pf(superSupreme[i]["CE SQ " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }

                                if (checkedboxes.indexOf("32") > -1) {
                                    for (var j = 0; j < tradeArray.length; j++) {
                                        if (tradeArray[j][1] == "32") {
                                            tradeType = tradeArray[j][0];
                                            if (tradeType == "buy") {
                                                sixthStrike = basePrice + (sellFourthStrikeNm);
                                                defendingStrikePrice = sixthStrike;
                                                coverMeSell.push(["buy", "PE", "N", i, fifthStrike, sellFourthNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE bp " + defendingStrikePrice] = pf(getPENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE bp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE bq " + defendingStrikePrice] = sellFourthNmQty;
                                                superSupreme[i]["PE bv " + defendingStrikePrice] = pf(superSupreme[i]["PE BP " + defendingStrikePrice]) * pf(superSupreme[i]["PE BQ " + defendingStrikePrice]);
                                            } else {
                                                sixthStrike = basePrice + (sellFourthStrikeNm);
                                                defendingStrikePrice = sixthStrike;
                                                coverMeSell.push(["sell", "PE", "N", i, fifthStrike, sellFourthNmQty, 0, superSupreme[i]["DATE"], null]);
                                                superSupreme[i]["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                if (towhich == 1) {
                                                    superSupreme[i]["PE SP " + defendingStrikePrice] = pf(getPENextMonthUSDINR(superSupreme[i]["DATE"], defendingStrikePrice));
                                                } else {
                                                    superSupreme[i]["PE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(superSupreme[i]["DATE"], defendingStrikePrice)) : pf(getPENextMonthSixteen(superSupreme[i]["DATE"], defendingStrikePrice));
                                                }
                                                superSupreme[i]["PE SQ " + defendingStrikePrice] = sellFourthNmQty;
                                                superSupreme[i]["PE SV " + defendingStrikePrice] = pf(superSupreme[i]["PE SP " + defendingStrikePrice]) * pf(superSupreme[i]["PE SQ " + defendingStrikePrice]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    var returnGreatorDate = function(date1, date2) {
                        var aa = date1.replace("Jan", "01").replace("Feb", "02").replace("Mar", "03").replace("Apr", "04").replace("May", "05").replace("Jun", "06").replace("Jul", "07").replace("Aug", "08").replace("Sep", "09").replace("Oct", "10").replace("Nov", "11").replace("Dec", "12");
                        var bb = date2.replace("Jan", "01").replace("Feb", "02").replace("Mar", "03").replace("Apr", "04").replace("May", "05").replace("Jun", "06").replace("Jul", "07").replace("Aug", "08").replace("Sep", "09").replace("Oct", "10").replace("Nov", "11").replace("Dec", "12");
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

                        if (aD > bD) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                    var checkV = function(coverMeBuyStr) {
                        var coverMeBuyStr = coverMeBuyStr.toString()
                        var lastChar = coverMeBuyStr.substr(coverMeBuyStr.length - 1);
                        if (lastChar == "V") {
                            return true;
                        } else {
                            return false;
                        }
                    }

                    for (var v = 0; v < superSupreme.length - 2; v++) {

                        if ((superSupreme[v]["DATE"] != null) && (superSupreme[v]["DATE"] !== undefined) && (underlyingsArray.indexOf(superSupreme[v]["DATE"].toString()) > -1)) {

                        } else {
                            for (var t = 0; t < coverMeBuy.length; t++) {

                                if (coverMeBuy[t][6] == 0) {

                                    if ((v > parseInt(coverMeBuy[t][3])) && returnGreatorDate(superSupreme[v]["DATE"], coverMeBuy[t][7]) && (coverMeBuy[t][8] == 2)) {

                                        for (var a = buyFirstStrikeTmDiv; a >= 1; a--) {

                                            if (((parseFloat(coverMeBuy[t][4]) - parseFloat(superSupreme[v]["LOW"])) >= (buyFirstStrikeTmAt * a))) {

                                                var date = superSupreme[v]["DATE"];

                                                if (coverMeBuy[t][2] == "T") {

                                                    if (coverMeBuy[t][0] == "buy") {

                                                        if (checkV(coverMeBuy[t][5])) {

                                                            if (parseFloat(buyFirstStrikeTmDiv) == parseFloat(coverMeBuy[t][10])) {

                                                            } else {

                                                                var totalParts = parseFloat(buyFirstStrikeTmDiv);
                                                                var takenParts = parseFloat(coverMeBuy[t][10]);
                                                                var leftParts = totalParts - takenParts;

                                                                if (a > takenParts) {
                                                                    nextTakenOut = a - takenParts;
                                                                    if ((a + takenParts) > totalParts) {

                                                                        nextTakenOut = totalParts - takenParts;

                                                                    }


                                                                    if (coverMeBuy[t][1] == "CE") {
                                                                        defendingStrikePrice = coverMeBuy[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }

                                                                        obj["CE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeBuy[t][5]) / buyFirstStrikeTmDiv);
                                                                        obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeBuy[t][10] = coverMeBuy[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }

                                                                    if (coverMeBuy[t][1] == "PE") {
                                                                        defendingStrikePrice = coverMeBuy[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["PE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeBuy[t][5]) / buyFirstStrikeTmDiv);
                                                                        obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeBuy[t][10] = coverMeBuy[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }
                                                                }
                                                            }

                                                        } else {

                                                            if (coverMeBuy[t][1] == "CE") {
                                                                defendingStrikePrice = coverMeBuy[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["CE sq " + defendingStrikePrice] = a * (parseFloat(coverMeBuy[t][5]) / buyFirstStrikeTmDiv);
                                                                obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                coverMeBuy[t][10] = a;

                                                                coverMeBuy[t][5] = (parseFloat(coverMeBuy[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;
                                                                continue;

                                                            }

                                                            if (coverMeBuy[t][1] == "PE") {
                                                                defendingStrikePrice = coverMeBuy[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["PE sq " + defendingStrikePrice] = a * (parseFloat(coverMeBuy[t][5]) / buyFirstStrikeTmDiv);
                                                                obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                coverMeBuy[t][10] = a;
                                                                coverMeBuy[t][5] = (parseFloat(coverMeBuy[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        for (var a = buyFirstStrikeNmDiv; a >= 1; a--) {

                                            if (((parseFloat(coverMeBuy[t][4]) - parseFloat(superSupreme[v]["LOW"])) >= (buyFirstStrikeNmAt * a))) {

                                                var date = superSupreme[v]["DATE"];

                                                if (coverMeBuy[t][2] == "N") {
                                                    if (coverMeBuy[t][0] == "buy") {

                                                        if (checkV(coverMeBuy[t][5])) {

                                                            if (parseFloat(buyFirstStrikeNmDiv) == parseFloat(coverMeBuy[t][10])) {

                                                            } else {

                                                                var totalParts = parseFloat(buyFirstStrikeNmDiv);
                                                                var takenParts = parseFloat(coverMeBuy[t][10]);
                                                                var leftParts = totalParts - takenParts;

                                                                if (a > takenParts) {

                                                                    nextTakenOut = a - takenParts;

                                                                    if ((a + takenParts) > totalParts) {

                                                                        nextTakenOut = totalParts - takenParts;

                                                                    }

                                                                    if (coverMeBuy[t][1] == "CE") {
                                                                        defendingStrikePrice = coverMeBuy[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["CE sp " + defendingStrikePrice] = pf(getCENextMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["CE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeBuy[t][5]) / buyFirstStrikeNmDiv);
                                                                        obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        continue;

                                                                    }

                                                                    if (coverMeBuy[t][1] == "PE") {
                                                                        defendingStrikePrice = coverMeBuy[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["PE sp " + defendingStrikePrice] = pf(getPENextMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["PE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeBuy[t][5]) / buyFirstStrikeNmDiv);
                                                                        obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        continue;

                                                                    }

                                                                    coverMeBuy[t][10] = coverMeBuy[t][10] + nextTakenOut;

                                                                }
                                                            }

                                                        } else {

                                                            if (coverMeBuy[t][1] == "CE") {
                                                                defendingStrikePrice = coverMeBuy[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["CE SP " + defendingStrikePrice] = pf(getCENextMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["CE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(date, defendingStrikePrice)) : pf(getCENextMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["CE SQ " + defendingStrikePrice] = a * (parseFloat(coverMeBuy[t][5]) / buyFirstStrikeNmDiv);
                                                                obj["CE SV " + defendingStrikePrice] = pf(obj["CE SP " + defendingStrikePrice]) * pf(obj["CE SQ " + defendingStrikePrice]);

                                                                coverMeBuy[t][10] = a;

                                                                coverMeBuy[t][5] = (parseFloat(coverMeBuy[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }

                                                            if (coverMeBuy[t][1] == "PE") {
                                                                defendingStrikePrice = coverMeBuy[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["PE SP " + defendingStrikePrice] = pf(getPENextMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["PE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(date, defendingStrikePrice)) : pf(getPENextMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["PE SQ " + defendingStrikePrice] = a * (parseFloat(coverMeBuy[t][5]) / buyFirstStrikeNmDiv);
                                                                obj["PE SV " + defendingStrikePrice] = pf(obj["PE SP " + defendingStrikePrice]) * pf(obj["PE SQ " + defendingStrikePrice]);

                                                                coverMeBuy[t][10] = a;
                                                                coverMeBuy[t][5] = (parseFloat(coverMeBuy[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    if ((v > parseInt(coverMeBuy[t][3])) && returnGreatorDate(superSupreme[v]["DATE"], coverMeBuy[t][7]) && (coverMeBuy[t][8] == 4)) {

                                        for (var a = buySecondStrikeTmDiv; a >= 1; a--) {

                                            if (((parseFloat(coverMeBuy[t][4]) - parseFloat(superSupreme[v]["LOW"])) >= (buySecondStrikeTmAt * a))) {

                                                var date = superSupreme[v]["DATE"];

                                                if (coverMeBuy[t][2] == "T") {

                                                    if (coverMeBuy[t][0] == "buy") {

                                                        if (checkV(coverMeBuy[t][5])) {

                                                            if (parseFloat(buySecondStrikeTmDiv) == parseFloat(coverMeBuy[t][10])) {

                                                            } else {

                                                                var totalParts = parseFloat(buySecondStrikeTmDiv);
                                                                var takenParts = parseFloat(coverMeBuy[t][10]);
                                                                var leftParts = totalParts - takenParts;

                                                                if (a > takenParts) {

                                                                    nextTakenOut = a - takenParts;

                                                                    if ((a + takenParts) > totalParts) {

                                                                        nextTakenOut = totalParts - takenParts;

                                                                    }

                                                                    if (coverMeBuy[t][1] == "CE") {
                                                                        defendingStrikePrice = coverMeBuy[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["CE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeBuy[t][5]) / buySecondStrikeTmDiv) + "T";
                                                                        obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeBuy[t][10] = coverMeBuy[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }

                                                                    if (coverMeBuy[t][1] == "PE") {
                                                                        defendingStrikePrice = coverMeBuy[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["PE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeBuy[t][5]) / buySecondStrikeTmDiv) + "T";
                                                                        obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeBuy[t][10] = coverMeBuy[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }
                                                                }
                                                            }

                                                        } else {

                                                            if (coverMeBuy[t][1] == "CE") {
                                                                defendingStrikePrice = coverMeBuy[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["CE sq " + defendingStrikePrice] = a * (parseFloat(coverMeBuy[t][5]) / buySecondStrikeTmDiv) + "T";
                                                                obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                coverMeBuy[t][10] = a;
                                                                coverMeBuy[t][5] = (parseFloat(coverMeBuy[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }

                                                            if (coverMeBuy[t][1] == "PE") {
                                                                defendingStrikePrice = coverMeBuy[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["PE sq " + defendingStrikePrice] = a * (parseFloat(coverMeBuy[t][5]) / buySecondStrikeTmDiv) + "T";
                                                                obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                coverMeBuy[t][10] = a;
                                                                coverMeBuy[t][5] = (parseFloat(coverMeBuy[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        for (var a = buySecondStrikeNmDiv; a >= 1; a--) {

                                            if (((parseFloat(coverMeBuy[t][4]) - parseFloat(superSupreme[v]["LOW"])) >= (buySecondStrikeNmAt * a))) {

                                                var date = superSupreme[v]["DATE"];

                                                if (coverMeBuy[t][2] == "N") {
                                                    if (coverMeBuy[t][0] == "buy") {

                                                        if (checkV(coverMeBuy[t][5])) {

                                                            if (parseFloat(buySecondStrikeNmDiv) == parseFloat(coverMeBuy[t][10])) {

                                                            } else {

                                                                var totalParts = parseFloat(buySecondStrikeNmDiv);
                                                                var takenParts = parseFloat(coverMeBuy[t][10]);
                                                                var leftParts = totalParts - takenParts;

                                                                if (a > takenParts) {

                                                                    nextTakenOut = a - takenParts;

                                                                    if ((a + takenParts) > totalParts) {

                                                                        nextTakenOut = totalParts - takenParts;
                                                                    }

                                                                    if (coverMeBuy[t][1] == "CE") {
                                                                        defendingStrikePrice = coverMeBuy[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["CE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeBuy[t][5]) / buySecondStrikeNmDiv) + "T";
                                                                        obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeBuy[t][10] = coverMeBuy[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }

                                                                    if (coverMeBuy[t][1] == "PE") {
                                                                        defendingStrikePrice = coverMeBuy[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["PE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeBuy[t][5]) / buySecondStrikeNmDiv) + "T";
                                                                        obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeBuy[t][10] = coverMeBuy[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }
                                                                }
                                                            }

                                                        } else {

                                                            if (coverMeBuy[t][1] == "CE") {
                                                                defendingStrikePrice = coverMeBuy[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["CE SP " + defendingStrikePrice] = pf(getCENextMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["CE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(date, defendingStrikePrice)) : pf(getCENextMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["CE SQ " + defendingStrikePrice] = a * (parseFloat(coverMeBuy[t][5]) / buySecondStrikeNmDiv) + "T";
                                                                obj["CE SV " + defendingStrikePrice] = pf(obj["CE SP " + defendingStrikePrice]) * pf(obj["CE SQ " + defendingStrikePrice]);

                                                                coverMeBuy[t][10] = a;
                                                                coverMeBuy[t][5] = (parseFloat(coverMeBuy[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }

                                                            if (coverMeBuy[t][1] == "PE") {
                                                                defendingStrikePrice = coverMeBuy[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["PE SP " + defendingStrikePrice] = pf(getPENextMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["PE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(date, defendingStrikePrice)) : pf(getPENextMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["PE SQ " + defendingStrikePrice] = a * (parseFloat(coverMeBuy[t][5]) / buySecondStrikeNmDiv) + "T";
                                                                obj["PE SV " + defendingStrikePrice] = pf(obj["PE SP " + defendingStrikePrice]) * pf(obj["PE SQ " + defendingStrikePrice]);

                                                                coverMeBuy[t][10] = a;
                                                                coverMeBuy[t][5] = (parseFloat(coverMeBuy[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    if ((v > parseInt(coverMeBuy[t][3])) && returnGreatorDate(superSupreme[v]["DATE"], coverMeBuy[t][7]) && (coverMeBuy[t][8] == 6)) {

                                        for (var a = buyThirdStrikeTmDiv; a >= 1; a--) {

                                            if (((parseFloat(coverMeBuy[t][4]) - parseFloat(superSupreme[v]["LOW"])) >= (buyThirdStrikeTmAt * a))) {

                                                var date = superSupreme[v]["DATE"];

                                                if (coverMeBuy[t][2] == "T") {

                                                    if (coverMeBuy[t][0] == "buy") {

                                                        if (checkV(coverMeBuy[t][5])) {

                                                            if (parseFloat(buyThirdStrikeTmDiv) == parseFloat(coverMeBuy[t][10])) {

                                                            } else {

                                                                var totalParts = parseFloat(buyThirdStrikeTmDiv);
                                                                var takenParts = parseFloat(coverMeBuy[t][10]);
                                                                var leftParts = totalParts - takenParts;

                                                                if (a > takenParts) {

                                                                    nextTakenOut = a - takenParts;

                                                                    if ((a + takenParts) > totalParts) {

                                                                        nextTakenOut = totalParts - takenParts;
                                                                    }


                                                                    if (coverMeBuy[t][1] == "CE") {
                                                                        defendingStrikePrice = coverMeBuy[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["CE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeBuy[t][5]) / buyThirdStrikeTmDiv) + "F";
                                                                        obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeBuy[t][10] = coverMeBuy[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }

                                                                    if (coverMeBuy[t][1] == "PE") {
                                                                        defendingStrikePrice = coverMeBuy[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["PE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeBuy[t][5]) / buyThirdStrikeTmDiv) + "F";
                                                                        obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeBuy[t][10] = coverMeBuy[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }
                                                                }
                                                            }

                                                        } else {

                                                            if (coverMeBuy[t][1] == "CE") {
                                                                defendingStrikePrice = coverMeBuy[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["CE sq " + defendingStrikePrice] = a * (parseFloat(coverMeBuy[t][5]) / buyThirdStrikeTmDiv) + "F";
                                                                obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                coverMeBuy[t][10] = a;
                                                                coverMeBuy[t][5] = (parseFloat(coverMeBuy[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }

                                                            if (coverMeBuy[t][1] == "PE") {
                                                                defendingStrikePrice = coverMeBuy[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["PE sq " + defendingStrikePrice] = a * (parseFloat(coverMeBuy[t][5]) / buyThirdStrikeTmDiv) + "F";
                                                                obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                coverMeBuy[t][10] = a;
                                                                coverMeBuy[t][5] = (parseFloat(coverMeBuy[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        for (var a = buyThirdStrikeNmDiv; a >= 1; a--) {

                                            if (((parseFloat(coverMeBuy[t][4]) - parseFloat(superSupreme[v]["LOW"])) >= (buyThirdStrikeNmAt * a))) {

                                                var date = superSupreme[v]["DATE"];

                                                if (coverMeBuy[t][2] == "N") {
                                                    if (coverMeBuy[t][0] == "buy") {

                                                        if (checkV(coverMeBuy[t][5])) {

                                                            if (parseFloat(buyThirdStrikeNmDiv) == parseFloat(coverMeBuy[t][10])) {

                                                            } else {

                                                                var totalParts = parseFloat(buyThirdStrikeNmDiv);
                                                                var takenParts = parseFloat(coverMeBuy[t][10]);
                                                                var leftParts = totalParts - takenParts;

                                                                if (a > takenParts) {

                                                                    nextTakenOut = a - takenParts;

                                                                    if ((a + takenParts) > totalParts) {

                                                                        nextTakenOut = totalParts - takenParts;
                                                                    }

                                                                    if (coverMeBuy[t][1] == "CE") {
                                                                        defendingStrikePrice = coverMeBuy[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["CE sp " + defendingStrikePrice] = pf(getCENextMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["CE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeBuy[t][5]) / buyThirdStrikeNmDiv) + "F";
                                                                        obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeBuy[t][10] = coverMeBuy[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }

                                                                    if (coverMeBuy[t][1] == "PE") {
                                                                        defendingStrikePrice = coverMeBuy[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["PE sp " + defendingStrikePrice] = pf(getPENextMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["PE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeBuy[t][5]) / buyThirdStrikeNmDiv) + "F";
                                                                        obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeBuy[t][10] = coverMeBuy[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }
                                                                }
                                                            }

                                                        } else {

                                                            if (coverMeBuy[t][1] == "CE") {
                                                                defendingStrikePrice = coverMeBuy[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["CE SP " + defendingStrikePrice] = pf(getCENextMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["CE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(date, defendingStrikePrice)) : pf(getCENextMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["CE SQ " + defendingStrikePrice] = a * (parseFloat(coverMeBuy[t][5]) / buyThirdStrikeNmDiv) + "F";
                                                                obj["CE SV " + defendingStrikePrice] = pf(obj["CE SP " + defendingStrikePrice]) * pf(obj["CE SQ " + defendingStrikePrice]);

                                                                coverMeBuy[t][10] = a;
                                                                coverMeBuy[t][5] = (parseFloat(coverMeBuy[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }

                                                            if (coverMeBuy[t][1] == "PE") {
                                                                defendingStrikePrice = coverMeBuy[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["PE SP " + defendingStrikePrice] = pf(getPENextMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["PE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(date, defendingStrikePrice)) : pf(getPENextMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["PE SQ " + defendingStrikePrice] = a * (parseFloat(coverMeBuy[t][5]) / buyThirdStrikeNmDiv) + "F";
                                                                obj["PE SV " + defendingStrikePrice] = pf(obj["PE SP " + defendingStrikePrice]) * pf(obj["PE SQ " + defendingStrikePrice]);

                                                                coverMeBuy[t][10] = a;
                                                                coverMeBuy[t][5] = (parseFloat(coverMeBuy[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    if ((v > parseInt(coverMeBuy[t][3])) && returnGreatorDate(superSupreme[v]["DATE"], coverMeBuy[t][7]) && (coverMeBuy[t][8] == 26)) {

                                        for (var a = buyFourthStrikeTmDiv; a >= 1; a--) {

                                            if (((parseFloat(coverMeBuy[t][4]) - parseFloat(superSupreme[v]["LOW"])) >= (buyFourthStrikeTmAt * a))) {

                                                var date = superSupreme[v]["DATE"];

                                                if (coverMeBuy[t][2] == "T") {

                                                    if (coverMeBuy[t][0] == "buy") {

                                                        if (checkV(coverMeBuy[t][5])) {

                                                            if (parseFloat(buyFourthStrikeTmDiv) == parseFloat(coverMeBuy[t][10])) {

                                                            } else {

                                                                var totalParts = parseFloat(buyFourthStrikeTmDiv);
                                                                var takenParts = parseFloat(coverMeBuy[t][10]);
                                                                var leftParts = totalParts - takenParts;

                                                                if (a > takenParts) {

                                                                    nextTakenOut = a - takenParts;

                                                                    if ((a + takenParts) > totalParts) {

                                                                        nextTakenOut = totalParts - takenParts;
                                                                    }


                                                                    if (coverMeBuy[t][1] == "CE") {
                                                                        defendingStrikePrice = coverMeBuy[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["CE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeBuy[t][5]) / buyFourthStrikeTmDiv) + "F";
                                                                        obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeBuy[t][10] = coverMeBuy[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }

                                                                    if (coverMeBuy[t][1] == "PE") {
                                                                        defendingStrikePrice = coverMeBuy[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["PE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeBuy[t][5]) / buyFourthStrikeTmDiv) + "F";
                                                                        obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeBuy[t][10] = coverMeBuy[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }
                                                                }
                                                            }

                                                        } else {

                                                            if (coverMeBuy[t][1] == "CE") {
                                                                defendingStrikePrice = coverMeBuy[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["CE sq " + defendingStrikePrice] = a * (parseFloat(coverMeBuy[t][5]) / buyFourthStrikeTmDiv) + "F";
                                                                obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                coverMeBuy[t][10] = a;
                                                                coverMeBuy[t][5] = (parseFloat(coverMeBuy[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }

                                                            if (coverMeBuy[t][1] == "PE") {
                                                                defendingStrikePrice = coverMeBuy[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["PE sq " + defendingStrikePrice] = a * (parseFloat(coverMeBuy[t][5]) / buyFourthStrikeTmDiv) + "F";
                                                                obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                coverMeBuy[t][10] = a;
                                                                coverMeBuy[t][5] = (parseFloat(coverMeBuy[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        for (var a = buyFourthStrikeNmDiv; a >= 1; a--) {

                                            if (((parseFloat(coverMeBuy[t][4]) - parseFloat(superSupreme[v]["LOW"])) >= (buyFourthStrikeNmAt * a))) {

                                                var date = superSupreme[v]["DATE"];

                                                if (coverMeBuy[t][2] == "N") {
                                                    if (coverMeBuy[t][0] == "buy") {

                                                        if (checkV(coverMeBuy[t][5])) {

                                                            if (parseFloat(buyFourthStrikeNmDiv) == parseFloat(coverMeBuy[t][10])) {

                                                            } else {

                                                                var totalParts = parseFloat(buyFourthStrikeNmDiv);
                                                                var takenParts = parseFloat(coverMeBuy[t][10]);
                                                                var leftParts = totalParts - takenParts;

                                                                if (a > takenParts) {

                                                                    nextTakenOut = a - takenParts;

                                                                    if ((a + takenParts) > totalParts) {

                                                                        nextTakenOut = totalParts - takenParts;
                                                                    }

                                                                    if (coverMeBuy[t][1] == "CE") {
                                                                        defendingStrikePrice = coverMeBuy[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["CE sp " + defendingStrikePrice] = pf(getCENextMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["CE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeBuy[t][5]) / buyFourthStrikeNmDiv) + "F";
                                                                        obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeBuy[t][10] = coverMeBuy[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }

                                                                    if (coverMeBuy[t][1] == "PE") {
                                                                        defendingStrikePrice = coverMeBuy[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["PE sp " + defendingStrikePrice] = pf(getPENextMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["PE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeBuy[t][5]) / buyFourthStrikeNmDiv) + "F";
                                                                        obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeBuy[t][10] = coverMeBuy[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }
                                                                }
                                                            }

                                                        } else {

                                                            if (coverMeBuy[t][1] == "CE") {
                                                                defendingStrikePrice = coverMeBuy[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["CE SP " + defendingStrikePrice] = pf(getCENextMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["CE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(date, defendingStrikePrice)) : pf(getCENextMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["CE SQ " + defendingStrikePrice] = a * (parseFloat(coverMeBuy[t][5]) / buyFourthStrikeNmDiv) + "F";
                                                                obj["CE SV " + defendingStrikePrice] = pf(obj["CE SP " + defendingStrikePrice]) * pf(obj["CE SQ " + defendingStrikePrice]);

                                                                coverMeBuy[t][10] = a;
                                                                coverMeBuy[t][5] = (parseFloat(coverMeBuy[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }

                                                            if (coverMeBuy[t][1] == "PE") {
                                                                defendingStrikePrice = coverMeBuy[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["PE SP " + defendingStrikePrice] = pf(getPENextMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["PE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(date, defendingStrikePrice)) : pf(getPENextMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["PE SQ " + defendingStrikePrice] = a * (parseFloat(coverMeBuy[t][5]) / buyFourthStrikeNmDiv) + "F";
                                                                obj["PE SV " + defendingStrikePrice] = pf(obj["PE SP " + defendingStrikePrice]) * pf(obj["PE SQ " + defendingStrikePrice]);

                                                                coverMeBuy[t][10] = a;
                                                                coverMeBuy[t][5] = (parseFloat(coverMeBuy[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            for (var t = 0; t < coverMeSell.length; t++) {

                                if (coverMeSell[t][6] == 0) {

                                    if ((v > parseInt(coverMeSell[t][3])) && returnGreatorDate(superSupreme[v]["DATE"], coverMeSell[t][7]) && (coverMeSell[t][8] == 13)) {

                                        for (var a = sellFirstStrikeTmDiv; a >= 1; a--) {

                                            if (((parseFloat(superSupreme[v]["HIGH"]) - parseFloat(coverMeSell[t][4])) >= (sellFirstStrikeTmAt * a))) {

                                                var date = superSupreme[v]["DATE"];

                                                if (coverMeSell[t][2] == "T") {

                                                    if (coverMeSell[t][0] == "buy") {

                                                        if (checkV(coverMeSell[t][5])) {

                                                            if (parseFloat(sellFirstStrikeTmDiv) == parseFloat(coverMeSell[t][10])) {

                                                            } else {

                                                                var totalParts = parseFloat(sellFirstStrikeTmDiv);
                                                                var takenParts = parseFloat(coverMeSell[t][10]);
                                                                var leftParts = totalParts - takenParts;

                                                                if (a > takenParts) {

                                                                    nextTakenOut = a - takenParts;

                                                                    if ((a + takenParts) > totalParts) {

                                                                        nextTakenOut = totalParts - takenParts;

                                                                    }


                                                                    if (coverMeSell[t][1] == "CE") {
                                                                        defendingStrikePrice = coverMeSell[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["CE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeSell[t][5]) / sellFirstStrikeTmDiv);
                                                                        obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeSell[t][10] = coverMeSell[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }

                                                                    if (coverMeSell[t][1] == "PE") {
                                                                        defendingStrikePrice = coverMeSell[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["PE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeSell[t][5]) / sellFirstStrikeTmDiv);
                                                                        obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeSell[t][10] = coverMeSell[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }
                                                                }
                                                            }

                                                        } else {

                                                            if (coverMeSell[t][1] == "CE") {
                                                                defendingStrikePrice = coverMeSell[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["CE sq " + defendingStrikePrice] = a * (parseFloat(coverMeSell[t][5]) / sellFirstStrikeTmDiv);
                                                                obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                coverMeSell[t][10] = a;

                                                                coverMeSell[t][5] = (parseFloat(coverMeSell[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;
                                                                continue;

                                                            }

                                                            if (coverMeSell[t][1] == "PE") {
                                                                defendingStrikePrice = coverMeSell[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["PE sq " + defendingStrikePrice] = a * (parseFloat(coverMeSell[t][5]) / sellFirstStrikeTmDiv);
                                                                obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                coverMeSell[t][10] = a;
                                                                coverMeSell[t][5] = (parseFloat(coverMeSell[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        for (var a = sellFirstStrikeNmDiv; a >= 1; a--) {

                                            if (((parseFloat(superSupreme[v]["HIGH"]) - parseFloat(coverMeSell[t][4])) >= (sellFirstStrikeNmAt * a))) {

                                                var date = superSupreme[v]["DATE"];

                                                if (coverMeSell[t][2] == "N") {
                                                    if (coverMeSell[t][0] == "buy") {

                                                        if (checkV(coverMeSell[t][5])) {

                                                            if (parseFloat(sellFirstStrikeNmDiv) == parseFloat(coverMeSell[t][10])) {

                                                            } else {

                                                                var totalParts = parseFloat(sellFirstStrikeNmDiv);
                                                                var takenParts = parseFloat(coverMeSell[t][10]);
                                                                var leftParts = totalParts - takenParts;

                                                                if (a > takenParts) {

                                                                    nextTakenOut = a - takenParts;

                                                                    if ((a + takenParts) > totalParts) {

                                                                        nextTakenOut = totalParts - takenParts;
                                                                    }

                                                                    if (coverMeSell[t][1] == "CE") {
                                                                        defendingStrikePrice = coverMeSell[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["CE sp " + defendingStrikePrice] = pf(getCENextMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["CE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeSell[t][5]) / sellFirstStrikeNmDiv);
                                                                        obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        continue;

                                                                    }

                                                                    if (coverMeSell[t][1] == "PE") {
                                                                        defendingStrikePrice = coverMeSell[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["PE sp " + defendingStrikePrice] = pf(getPENextMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["PE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeSell[t][5]) / sellFirstStrikeNmDiv);
                                                                        obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        continue;

                                                                    }

                                                                    coverMeSell[t][10] = coverMeSell[t][10] + nextTakenOut;

                                                                }
                                                            }
                                                        } else {

                                                            if (coverMeSell[t][1] == "CE") {
                                                                defendingStrikePrice = coverMeSell[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["CE SP " + defendingStrikePrice] = pf(getCENextMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["CE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(date, defendingStrikePrice)) : pf(getCENextMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["CE SQ " + defendingStrikePrice] = a * (parseFloat(coverMeSell[t][5]) / sellFirstStrikeNmDiv);
                                                                obj["CE SV " + defendingStrikePrice] = pf(obj["CE SP " + defendingStrikePrice]) * pf(obj["CE SQ " + defendingStrikePrice]);

                                                                coverMeSell[t][10] = a;

                                                                coverMeSell[t][5] = (parseFloat(coverMeSell[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }

                                                            if (coverMeSell[t][1] == "PE") {
                                                                defendingStrikePrice = coverMeSell[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["PE SP " + defendingStrikePrice] = pf(getPENextMonthUSRINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["PE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(date, defendingStrikePrice)) : pf(getPENextMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["PE SQ " + defendingStrikePrice] = a * (parseFloat(coverMeSell[t][5]) / sellFirstStrikeNmDiv);
                                                                obj["PE SV " + defendingStrikePrice] = pf(obj["PE SP " + defendingStrikePrice]) * pf(obj["PE SQ " + defendingStrikePrice]);

                                                                coverMeSell[t][10] = a;
                                                                coverMeSell[t][5] = (parseFloat(coverMeSell[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    if ((v > parseInt(coverMeSell[t][3])) && returnGreatorDate(superSupreme[v]["DATE"], coverMeSell[t][7]) && (coverMeSell[t][8] == 15)) {

                                        for (var a = sellSecondStrikeTmDiv; a >= 1; a--) {

                                            if (((parseFloat(superSupreme[v]["HIGH"]) - parseFloat(coverMeSell[t][4])) >= (sellSecondStrikeTmAt * a))) {

                                                var date = superSupreme[v]["DATE"];

                                                if (coverMeSell[t][2] == "T") {

                                                    if (coverMeSell[t][0] == "buy") {

                                                        if (checkV(coverMeSell[t][5])) {

                                                            if (parseFloat(sellSecondStrikeTmDiv) == parseFloat(coverMeSell[t][10])) {

                                                            } else {

                                                                var totalParts = parseFloat(sellSecondStrikeTmDiv);
                                                                var takenParts = parseFloat(coverMeSell[t][10]);
                                                                var leftParts = totalParts - takenParts;

                                                                if (a > takenParts) {

                                                                    nextTakenOut = a - takenParts;

                                                                    if ((a + takenParts) > totalParts) {

                                                                        nextTakenOut = totalParts - takenParts;

                                                                    }

                                                                    if (coverMeSell[t][1] == "CE") {
                                                                        defendingStrikePrice = coverMeSell[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["CE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeSell[t][5]) / sellSecondStrikeTmDiv) + "T";
                                                                        obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeSell[t][10] = coverMeSell[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }

                                                                    if (coverMeSell[t][1] == "PE") {
                                                                        defendingStrikePrice = coverMeSell[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["PE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeSell[t][5]) / sellSecondStrikeTmDiv) + "T";
                                                                        obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeSell[t][10] = coverMeSell[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }
                                                                }
                                                            }

                                                        } else {

                                                            if (coverMeSell[t][1] == "CE") {
                                                                defendingStrikePrice = coverMeSell[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["CE sq " + defendingStrikePrice] = a * (parseFloat(coverMeSell[t][5]) / sellSecondStrikeTmDiv) + "T";
                                                                obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                coverMeSell[t][10] = a;
                                                                coverMeSell[t][5] = (parseFloat(coverMeSell[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }

                                                            if (coverMeSell[t][1] == "PE") {
                                                                defendingStrikePrice = coverMeSell[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["PE sq " + defendingStrikePrice] = a * (parseFloat(coverMeSell[t][5]) / sellSecondStrikeTmDiv) + "T";
                                                                obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                coverMeSell[t][10] = a;
                                                                coverMeSell[t][5] = (parseFloat(coverMeSell[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        for (var a = sellSecondStrikeNmDiv; a >= 1; a--) {

                                            if (((parseFloat(superSupreme[v]["HIGH"]) - parseFloat(coverMeSell[t][4])) >= (sellSecondStrikeNmAt * a))) {

                                                var date = superSupreme[v]["DATE"];

                                                if (coverMeSell[t][2] == "N") {
                                                    if (coverMeSell[t][0] == "buy") {

                                                        if (checkV(coverMeSell[t][5])) {

                                                            if (parseFloat(sellSecondStrikeNmDiv) == parseFloat(coverMeSell[t][10])) {

                                                            } else {

                                                                var totalParts = parseFloat(sellSecondStrikeNmDiv);
                                                                var takenParts = parseFloat(coverMeSell[t][10]);
                                                                var leftParts = totalParts - takenParts;

                                                                if (a > takenParts) {

                                                                    nextTakenOut = a - takenParts;

                                                                    if ((a + takenParts) > totalParts) {

                                                                        nextTakenOut = totalParts - takenParts;

                                                                    }

                                                                    if (coverMeSell[t][1] == "CE") {
                                                                        defendingStrikePrice = coverMeSell[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["CE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeSell[t][5]) / sellSecondStrikeNmDiv) + "T";
                                                                        obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeSell[t][10] = coverMeSell[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }

                                                                    if (coverMeSell[t][1] == "PE") {
                                                                        defendingStrikePrice = coverMeSell[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["PE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeSell[t][5]) / sellSecondStrikeNmDiv) + "T";
                                                                        obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeSell[t][10] = coverMeSell[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }
                                                                }
                                                            }

                                                        } else {

                                                            if (coverMeSell[t][1] == "CE") {
                                                                defendingStrikePrice = coverMeSell[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["CE SP " + defendingStrikePrice] = pf(getCENextMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["CE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(date, defendingStrikePrice)) : pf(getCENextMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["CE SQ " + defendingStrikePrice] = a * (parseFloat(coverMeSell[t][5]) / sellSecondStrikeNmDiv) + "T";
                                                                obj["CE SV " + defendingStrikePrice] = pf(obj["CE SP " + defendingStrikePrice]) * pf(obj["CE SQ " + defendingStrikePrice]);

                                                                coverMeSell[t][10] = a;
                                                                coverMeSell[t][5] = (parseFloat(coverMeSell[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }

                                                            if (coverMeSell[t][1] == "PE") {
                                                                defendingStrikePrice = coverMeSell[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["PE SP " + defendingStrikePrice] = pf(getPENextMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["PE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(date, defendingStrikePrice)) : pf(getPENextMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["PE SQ " + defendingStrikePrice] = a * (parseFloat(coverMeSell[t][5]) / sellSecondStrikeNmDiv) + "T";
                                                                obj["PE SV " + defendingStrikePrice] = pf(obj["PE SP " + defendingStrikePrice]) * pf(obj["PE SQ " + defendingStrikePrice]);

                                                                coverMeSell[t][10] = a;
                                                                coverMeSell[t][5] = (parseFloat(coverMeSell[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    if ((v > parseInt(coverMeSell[t][3])) && returnGreatorDate(superSupreme[v]["DATE"], coverMeSell[t][7]) && (coverMeSell[t][8] == 17)) {

                                        for (var a = sellThirdStrikeTmDiv; a >= 1; a--) {

                                            if (((parseFloat(superSupreme[v]["HIGH"]) - parseFloat(coverMeSell[t][4])) >= (sellThirdStrikeTmAt * a))) {

                                                var date = superSupreme[v]["DATE"];

                                                if (coverMeSell[t][2] == "T") {

                                                    if (coverMeSell[t][0] == "buy") {

                                                        if (checkV(coverMeSell[t][5])) {

                                                            if (parseFloat(sellThirdStrikeTmDiv) == parseFloat(coverMeSell[t][10])) {

                                                            } else {

                                                                var totalParts = parseFloat(sellThirdStrikeTmDiv);
                                                                var takenParts = parseFloat(coverMeSell[t][10]);
                                                                var leftParts = totalParts - takenParts;

                                                                if (a > takenParts) {

                                                                    nextTakenOut = a - takenParts;

                                                                    if ((a + takenParts) > totalParts) {

                                                                        nextTakenOut = totalParts - takenParts;

                                                                    }


                                                                    if (coverMeSell[t][1] == "CE") {
                                                                        defendingStrikePrice = coverMeSell[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["CE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeSell[t][5]) / sellThirdStrikeTmDiv) + "F";
                                                                        obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeSell[t][10] = coverMeSell[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }

                                                                    if (coverMeSell[t][1] == "PE") {
                                                                        defendingStrikePrice = coverMeSell[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["PE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeSell[t][5]) / sellThirdStrikeTmDiv) + "F";
                                                                        obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeSell[t][10] = coverMeSell[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }
                                                                }
                                                            }

                                                        } else {

                                                            if (coverMeSell[t][1] == "CE") {
                                                                defendingStrikePrice = coverMeSell[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["CE sq " + defendingStrikePrice] = a * (parseFloat(coverMeSell[t][5]) / sellThirdStrikeTmDiv) + "F";
                                                                obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                coverMeSell[t][10] = a;
                                                                coverMeSell[t][5] = (parseFloat(coverMeSell[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }

                                                            if (coverMeSell[t][1] == "PE") {
                                                                defendingStrikePrice = coverMeSell[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["PE sq " + defendingStrikePrice] = a * (parseFloat(coverMeSell[t][5]) / sellThirdStrikeTmDiv) + "F";
                                                                obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                coverMeSell[t][10] = a;
                                                                coverMeSell[t][5] = (parseFloat(coverMeSell[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        for (var a = sellThirdStrikeNmDiv; a >= 1; a--) {

                                            if (((parseFloat(superSupreme[v]["HIGH"]) - parseFloat(coverMeSell[t][4])) >= (sellThirdStrikeNmAt * a))) {

                                                var date = superSupreme[v]["DATE"];

                                                if (coverMeSell[t][2] == "N") {
                                                    if (coverMeSell[t][0] == "buy") {

                                                        if (checkV(coverMeSell[t][5])) {

                                                            if (parseFloat(sellThirdStrikeNmDiv) == parseFloat(coverMeSell[t][10])) {

                                                            } else {

                                                                var totalParts = parseFloat(sellThirdStrikeNmDiv);
                                                                var takenParts = parseFloat(coverMeSell[t][10]);
                                                                var leftParts = totalParts - takenParts;

                                                                if (a > takenParts) {

                                                                    nextTakenOut = a - takenParts;

                                                                    if ((a + takenParts) > totalParts) {

                                                                        nextTakenOut = totalParts - takenParts;

                                                                    }

                                                                    if (coverMeSell[t][1] == "CE") {
                                                                        defendingStrikePrice = coverMeSell[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["CE sp " + defendingStrikePrice] = pf(getCENextMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["CE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeSell[t][5]) / sellThirdStrikeNmDiv) + "F";
                                                                        obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeSell[t][10] = coverMeSell[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }

                                                                    if (coverMeSell[t][1] == "PE") {
                                                                        defendingStrikePrice = coverMeSell[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["PE sp " + defendingStrikePrice] = pf(getPENextMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["PE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeSell[t][5]) / sellThirdStrikeNmDiv) + "F";
                                                                        obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeSell[t][10] = coverMeSell[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }
                                                                }
                                                            }

                                                        } else {

                                                            if (coverMeSell[t][1] == "CE") {
                                                                defendingStrikePrice = coverMeSell[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["CE SP " + defendingStrikePrice] = pf(getCENextMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["CE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(date, defendingStrikePrice)) : pf(getCENextMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["CE SQ " + defendingStrikePrice] = a * (parseFloat(coverMeSell[t][5]) / sellThirdStrikeNmDiv) + "F";
                                                                obj["CE SV " + defendingStrikePrice] = pf(obj["CE SP " + defendingStrikePrice]) * pf(obj["CE SQ " + defendingStrikePrice]);

                                                                coverMeSell[t][10] = a;
                                                                coverMeSell[t][5] = (parseFloat(coverMeSell[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }

                                                            if (coverMeSell[t][1] == "PE") {
                                                                defendingStrikePrice = coverMeSell[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["PE SP " + defendingStrikePrice] = pf(getPENextMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["PE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(date, defendingStrikePrice)) : pf(getPENextMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["PE SQ " + defendingStrikePrice] = a * (parseFloat(coverMeSell[t][5]) / sellThirdStrikeNmDiv) + "F";
                                                                obj["PE SV " + defendingStrikePrice] = pf(obj["PE SP " + defendingStrikePrice]) * pf(obj["PE SQ " + defendingStrikePrice]);

                                                                coverMeSell[t][10] = a;
                                                                coverMeSell[t][5] = (parseFloat(coverMeSell[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    if ((v > parseInt(coverMeSell[t][3])) && returnGreatorDate(superSupreme[v]["DATE"], coverMeSell[t][7]) && (coverMeSell[t][8] == 29)) {

                                        for (var a = sellFourthStrikeTmDiv; a >= 1; a--) {

                                            if (((parseFloat(superSupreme[v]["HIGH"]) - parseFloat(coverMeSell[t][4])) >= (sellFourthStrikeTmAt * a))) {

                                                var date = superSupreme[v]["DATE"];

                                                if (coverMeSell[t][2] == "T") {

                                                    if (coverMeSell[t][0] == "buy") {

                                                        if (checkV(coverMeSell[t][5])) {

                                                            if (parseFloat(sellFourthStrikeTmDiv) == parseFloat(coverMeSell[t][10])) {

                                                            } else {

                                                                var totalParts = parseFloat(sellFourthStrikeTmDiv);
                                                                var takenParts = parseFloat(coverMeSell[t][10]);
                                                                var leftParts = totalParts - takenParts;

                                                                if (a > takenParts) {

                                                                    nextTakenOut = a - takenParts;

                                                                    if ((a + takenParts) > totalParts) {

                                                                        nextTakenOut = totalParts - takenParts;

                                                                    }


                                                                    if (coverMeSell[t][1] == "CE") {
                                                                        defendingStrikePrice = coverMeSell[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["CE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeSell[t][5]) / sellFourthStrikeTmDiv) + "F";
                                                                        obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeSell[t][10] = coverMeSell[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }

                                                                    if (coverMeSell[t][1] == "PE") {
                                                                        defendingStrikePrice = coverMeSell[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["PE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeSell[t][5]) / sellFourthStrikeTmDiv) + "F";
                                                                        obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeSell[t][10] = coverMeSell[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }
                                                                }
                                                            }

                                                        } else {

                                                            if (coverMeSell[t][1] == "CE") {
                                                                defendingStrikePrice = coverMeSell[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["CE sp " + defendingStrikePrice] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["CE sq " + defendingStrikePrice] = a * (parseFloat(coverMeSell[t][5]) / sellFourthStrikeTmDiv) + "F";
                                                                obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                coverMeSell[t][10] = a;
                                                                coverMeSell[t][5] = (parseFloat(coverMeSell[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }

                                                            if (coverMeSell[t][1] == "PE") {
                                                                defendingStrikePrice = coverMeSell[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["PE sq " + defendingStrikePrice] = a * (parseFloat(coverMeSell[t][5]) / sellFourthStrikeTmDiv) + "F";
                                                                obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                coverMeSell[t][10] = a;
                                                                coverMeSell[t][5] = (parseFloat(coverMeSell[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        for (var a = sellFourthStrikeNmDiv; a >= 1; a--) {

                                            if (((parseFloat(superSupreme[v]["HIGH"]) - parseFloat(coverMeSell[t][4])) >= (sellFourthStrikeNmAt * a))) {

                                                var date = superSupreme[v]["DATE"];

                                                if (coverMeSell[t][2] == "N") {
                                                    if (coverMeSell[t][0] == "buy") {

                                                        if (checkV(coverMeSell[t][5])) {

                                                            if (parseFloat(sellFourthStrikeNmDiv) == parseFloat(coverMeSell[t][10])) {

                                                            } else {

                                                                var totalParts = parseFloat(sellThirdStrikeNmDiv);
                                                                var takenParts = parseFloat(coverMeSell[t][10]);
                                                                var leftParts = totalParts - takenParts;

                                                                if (a > takenParts) {

                                                                    nextTakenOut = a - takenParts;

                                                                    if ((a + takenParts) > totalParts) {

                                                                        nextTakenOut = totalParts - takenParts;

                                                                    }

                                                                    if (coverMeSell[t][1] == "CE") {
                                                                        defendingStrikePrice = coverMeSell[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["CE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["CE sp " + defendingStrikePrice] = pf(getCENextMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["CE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(date, defendingStrikePrice)) : pf(getCEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["CE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeSell[t][5]) / sellThirdStrikeNmDiv) + "F";
                                                                        obj["CE sv " + defendingStrikePrice] = pf(obj["CE sp " + defendingStrikePrice]) * pf(obj["CE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeSell[t][10] = coverMeSell[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }

                                                                    if (coverMeSell[t][1] == "PE") {
                                                                        defendingStrikePrice = coverMeSell[t][4];

                                                                        var obj = {};

                                                                        for (key in superSupreme) {
                                                                            obj[key] = null;
                                                                        }

                                                                        obj["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                                                                        if (towhich == 1) {
                                                                            obj["PE sp " + defendingStrikePrice] = pf(getPENextMonthUSDINR(date, defendingStrikePrice));
                                                                        } else {
                                                                            obj["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                                                        }
                                                                        obj["PE sq " + defendingStrikePrice] = nextTakenOut * (parseFloat(coverMeSell[t][5]) / sellFourthStrikeNmDiv) + "F";
                                                                        obj["PE sv " + defendingStrikePrice] = pf(obj["PE sp " + defendingStrikePrice]) * pf(obj["PE sq " + defendingStrikePrice]);

                                                                        superSupreme.splice(v, 0, obj);
                                                                        v = v + 1;
                                                                        coverMeSell[t][10] = coverMeSell[t][10] + nextTakenOut;
                                                                        continue;

                                                                    }
                                                                }
                                                            }

                                                        } else {

                                                            if (coverMeSell[t][1] == "CE") {
                                                                defendingStrikePrice = coverMeSell[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["CE SP " + defendingStrikePrice] = pf(getCENextMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["CE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(date, defendingStrikePrice)) : pf(getCENextMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["CE SQ " + defendingStrikePrice] = a * (parseFloat(coverMeSell[t][5]) / sellFourthStrikeNmDiv) + "F";
                                                                obj["CE SV " + defendingStrikePrice] = pf(obj["CE SP " + defendingStrikePrice]) * pf(obj["CE SQ " + defendingStrikePrice]);

                                                                coverMeSell[t][10] = a;
                                                                coverMeSell[t][5] = (parseFloat(coverMeSell[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;

                                                            }

                                                            if (coverMeSell[t][1] == "PE") {
                                                                defendingStrikePrice = coverMeSell[t][4];

                                                                var obj = {};

                                                                for (key in superSupreme) {
                                                                    obj[key] = null;
                                                                }

                                                                obj["PE stk " + defendingStrikePrice] = defendingStrikePrice;
                                                                if (towhich == 1) {
                                                                    obj["PE SP " + defendingStrikePrice] = pf(getPENextMonthUSDINR(date, defendingStrikePrice));
                                                                } else {
                                                                    obj["PE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPENextMonthFifteen(date, defendingStrikePrice)) : pf(getPENextMonthSixteen(date, defendingStrikePrice));
                                                                }
                                                                obj["PE SQ " + defendingStrikePrice] = a * (parseFloat(coverMeSell[t][5]) / sellFourthStrikeNmDiv) + "F";
                                                                obj["PE SV " + defendingStrikePrice] = pf(obj["PE SP " + defendingStrikePrice]) * pf(obj["PE SQ " + defendingStrikePrice]);

                                                                coverMeSell[t][10] = a;
                                                                coverMeSell[t][5] = (parseFloat(coverMeSell[t][5])) + "|" + a.toString() + "V";

                                                                superSupreme.splice(v, 0, obj);
                                                                v = v + 1;

                                                                continue;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    var firstDays = [];

                    var getNextEntry = function(i) {
                        for (var t = i + 1; t < superSupreme.length; t++) {
                            if ((superSupreme[t]["DATE"] !== null) && (superSupreme[t]["DATE"] != "") && (superSupreme[t]["DATE"] !== undefined)) {
                                return t;
                            }
                        }
                    }

                    var checkLastWednesday = function(date) {
                        if (underlyingsArray.indexOf(date.toString()) > -1) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                    for (var v = 0; v < superSupreme.length; v++) {
                        var date = superSupreme[v]["DATE"];
                        if (date != "" && date != null && date !== undefined) {
                            if (checkLastWednesday(superSupreme[v]["DATE"])) {
                                firstDays.push(superSupreme[getNextEntry(v)]["DATE"]);
                            }
                        }
                    }

                    var checkFirstDay = function(date, cepechecker) {
                        if (towhich == 1) {
                            if (cepechecker == 1) {
                                if (firstDays.length == 1) {
                                    if (firstDays.indexOf(date) > -1) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                } else {
                                    if (firstDays.indexOf(date) > 0) {
                                        return true;
                                    }
                                    if (firstDays.indexOf(date) == 0) {
                                        return false;
                                    }
                                }
                            }
                        }
                        if (firstDays.indexOf(date) > -1) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                    var toRetNQBuy = function(i, whereat, amount) {

                        if (i > superSupreme.length) {
                            return 0;
                        }

                        if (i == 0) {
                            return 0;
                        }

                        if ((superSupreme[i]["DATE"] != null) && (superSupreme[i]["DATE"] !== undefined) && (checkFirstDay(superSupreme[i]["DATE"]))) {
                            return 0;
                        }

                        var boughtQuan = superSupreme[i]["PE BQ " + amount];
                        var soldQuan = superSupreme[i]["PE sq " + amount];

                        if (boughtQuan != null && soldQuan == null) {
                            return pi(boughtQuan);
                        }
                        if (boughtQuan == null && soldQuan != null) {
                            return -Math.abs(pi(soldQuan));
                        }
                        if (boughtQuan != null && soldQuan != null) {
                            return (pi(boughtQuan) - pi(soldQuan))
                        }
                        if (boughtQuan == null && soldQuan == null) {
                            return 0;
                        }
                    }

                    var toRetNVBuy = function(i, whereat, amount) {

                        if (i == 0) {
                            return 0;
                        }

                        if ((superSupreme[i]["DATE"] != null) && (superSupreme[i]["DATE"] !== undefined) && (checkFirstDay(superSupreme[i]["DATE"]))) {
                            return 0;
                        }

                        var boughtValue = superSupreme[i]["PE BV " + amount];
                        var soldValue = superSupreme[i]["PE sv " + amount];

                        if (boughtValue != null && soldValue == null) {
                            return pi(boughtValue);
                        }
                        if (boughtValue == null && soldValue != null) {
                            return -Math.abs(pi(soldValue));
                        }
                        if (boughtValue != null && soldValue != null) {
                            return (pi(boughtValue) - pi(soldValue))
                        }
                        if (boughtValue == null && soldValue == null) {
                            return 0;
                        }
                    }

                    var toRetNQBuyS = function(i, whereat, amount) {

                        if (i == 0) {
                            return 0;
                        }

                        if ((superSupreme[i]["DATE"] != null) && (superSupreme[i]["DATE"] !== undefined) && (checkFirstDay(superSupreme[i]["DATE"]))) {
                            return 0;
                        }

                        var boughtQuan = superSupreme[i]["PE bq " + amount];
                        var soldQuan = superSupreme[i]["PE SQ " + amount];

                        if (boughtQuan != null && soldQuan == null) {
                            return pi(boughtQuan);
                        }
                        if (boughtQuan == null && soldQuan != null) {
                            return -Math.abs(pi(soldQuan));
                        }
                        if (boughtQuan != null && soldQuan != null) {
                            return (pi(boughtQuan) - pi(soldQuan))
                        }
                        if (boughtQuan == null && soldQuan == null) {
                            return 0;
                        }
                    }

                    var toRetNVBuyS = function(i, whereat, amount) {

                        if (i == 0) {
                            return 0;
                        }

                        if ((superSupreme[i]["DATE"] != null) && (superSupreme[i]["DATE"] !== undefined) && (checkFirstDay(superSupreme[i]["DATE"]))) {
                            return 0;
                        }

                        var boughtValue = superSupreme[i]["PE bv " + amount];
                        var soldValue = superSupreme[i]["PE SV " + amount];

                        if (boughtValue != null && soldValue == null) {
                            return pi(boughtValue);
                        }
                        if (boughtValue == null && soldValue != null) {
                            return -Math.abs(pi(soldValue));
                        }
                        if (boughtValue != null && soldValue != null) {
                            return (pi(boughtValue) - pi(soldValue))
                        }
                        if (boughtValue == null && soldValue == null) {
                            return 0;
                        }
                    }

                    var getBuyNQ = function(i, whereat, amount) {
                        if (i == 0) {

                            var boughtQuan = superSupreme[i]["PE BQ " + amount];
                            var soldQuan = superSupreme[i]["PE sq " + amount];

                            if (boughtQuan != null && soldQuan == null) {
                                return pi(boughtQuan);
                            }
                            if (boughtQuan == null && soldQuan != null) {
                                return -Math.abs(pi(soldQuan));
                            }
                            if (boughtQuan != null && soldQuan != null) {
                                return (pi(boughtQuan) - pi(soldQuan));
                            }
                            if (boughtQuan == null && soldQuan == null) {
                                return 0;
                            }

                        } else if ((superSupreme[i]["DATE"] != null) && (superSupreme[i]["DATE"] !== undefined) && (checkFirstDay(superSupreme[i]["DATE"]))) {

                            var boughtQuan = superSupreme[i]["PE BQ " + amount];
                            var soldQuan = superSupreme[i]["PE sq " + amount];

                            if (boughtQuan != null && soldQuan == null) {
                                return pi(boughtQuan);
                            }
                            if (boughtQuan == null && soldQuan != null) {
                                return -Math.abs(pi(soldQuan));
                            }
                            if (boughtQuan != null && soldQuan != null) {
                                return (pi(boughtQuan) - pi(soldQuan));
                            }
                            if (boughtQuan == null && soldQuan == null) {
                                return 0;
                            }

                        } else {
                            return superSupreme[i - 1][whereat];
                        }
                    }

                    var getBuyNV = function(i, whereat, amount) {
                        if (i == 0) {
                            var boughtValue = superSupreme[i]["PE BV " + amount];
                            var soldValue = superSupreme[i]["PE sv " + amount];

                            if (boughtValue != null && soldValue == null) {
                                return pi(boughtValue);
                            }
                            if (boughtValue == null && soldValue != null) {
                                return -Math.abs(pi(soldValue));
                            }
                            if (boughtValue != null && soldValue != null) {
                                return (pi(boughtValue) - pi(soldValue));
                            }
                            if (boughtValue == null && soldValue == null) {
                                return 0;
                            }

                        } else if ((superSupreme[i]["DATE"] != null) && (superSupreme[i]["DATE"] !== undefined) && (checkFirstDay(superSupreme[i]["DATE"]))) {
                            var boughtValue = superSupreme[i]["PE BV " + amount];
                            var soldValue = superSupreme[i]["PE sv " + amount];

                            if (boughtValue != null && soldValue == null) {
                                return pi(boughtValue);
                            }
                            if (boughtValue == null && soldValue != null) {
                                return -Math.abs(pi(soldValue));
                            }
                            if (boughtValue != null && soldValue != null) {
                                return (pi(boughtValue) - pi(soldValue));
                            }
                            if (boughtValue == null && soldValue == null) {
                                return 0;
                            }
                        } else {
                            return superSupreme[i - 1][whereat];
                        }
                    }

                    var getBuyAVG = function(i, whereat, amount) {
                        if (pi(superSupreme[i]["PE nq " + amount]) == 0) {
                            return 0;
                        }
                        if (pi(superSupreme[i]["PE nv " + amount]) == 0) {
                            return 0;
                        } else {
                            return (pi(superSupreme[i]["PE nv " + amount]) / pi(superSupreme[i]["PE nq " + amount]));
                        }
                    }

                    var getSellNQ = function(i, whereat, amount) {

                        if (i == 0) {

                            var boughtQuan = superSupreme[i]["PE bq " + amount];
                            var soldQuan = superSupreme[i]["PE SQ " + amount];

                            if (boughtQuan != null && soldQuan == null) {
                                return pi(boughtQuan);
                            }
                            if (boughtQuan == null && soldQuan != null) {
                                return -Math.abs(pi(soldQuan));
                            }
                            if (boughtQuan != null && soldQuan != null) {
                                return (pi(boughtQuan) - pi(soldQuan));
                            }
                            if (boughtQuan == null && soldQuan == null) {
                                return 0;
                            }

                        } else if ((superSupreme[i]["DATE"] != null) && (superSupreme[i]["DATE"] !== undefined) && (checkFirstDay(superSupreme[i]["DATE"]))) {
                            var boughtQuan = superSupreme[i]["PE bq " + amount];
                            var soldQuan = superSupreme[i]["PE SQ " + amount];

                            if (boughtQuan != null && soldQuan == null) {
                                return pi(boughtQuan);
                            }
                            if (boughtQuan == null && soldQuan != null) {
                                return -Math.abs(pi(soldQuan));
                            }
                            if (boughtQuan != null && soldQuan != null) {
                                return (pi(boughtQuan) - pi(soldQuan));
                            }
                            if (boughtQuan == null && soldQuan == null) {
                                return 0;
                            }

                        } else {
                            return superSupreme[i - 1][whereat];
                        }

                    }

                    var getSellNV = function(i, whereat, amount) {

                        if (i == 0) {

                            var boughtValue = superSupreme[i]["PE bv " + amount];
                            var soldValue = superSupreme[i]["PE SV " + amount];

                            if (boughtValue != null && soldValue == null) {
                                return pi(boughtValue);
                            }
                            if (boughtValue == null && soldValue != null) {
                                return -Math.abs(pi(soldValue));
                            }
                            if (boughtValue != null && soldValue != null) {
                                return (pi(boughtValue) - pi(soldValue));
                            }
                            if (boughtValue == null && soldValue == null) {
                                return 0;
                            }

                        } else if ((superSupreme[i]["DATE"] != null) && (superSupreme[i]["DATE"] !== undefined) && (checkFirstDay(superSupreme[i]["DATE"]))) {
                            var boughtValue = superSupreme[i]["PE bv " + amount];
                            var soldValue = superSupreme[i]["PE SV " + amount];

                            if (boughtValue != null && soldValue == null) {
                                return pi(boughtValue);
                            }
                            if (boughtValue == null && soldValue != null) {
                                return -Math.abs(pi(soldValue));
                            }
                            if (boughtValue != null && soldValue != null) {
                                return (pi(boughtValue) - pi(soldValue));
                            }
                            if (boughtValue == null && soldValue == null) {
                                return 0;
                            }
                        } else {
                            return superSupreme[i - 1][whereat];
                        }

                    }

                    var getSellAVG = function(i, whereat, amount) {

                        if (pi(superSupreme[i]["PE NQ " + amount]) == 0) {
                            return 0;
                        }

                        if (pi(superSupreme[i]["PE NV " + amount]) == 0) {
                            return 0;
                        } else {
                            return (pi(superSupreme[i]["PE NV " + amount]) / pi(superSupreme[i]["PE NQ " + amount]));
                        }
                    }

                    var highest = 0;
                    for (var i = 0; i < superSupreme.length; i++) {
                        if ((superSupreme[i]["HIGH"] != null) && (superSupreme[i]["HIGH"] != "")) {
                            if (parseInt(superSupreme[i]["HIGH"]) > highest) {
                                highest = parseInt(superSupreme[i]["HIGH"]);
                            }
                        }
                    }

                    var lowest = highest;

                    for (var i = 0; i < superSupreme.length; i++) {
                        if ((superSupreme[i]["LOW"] != null) && (superSupreme[i]["LOW"] != "")) {
                            if (parseInt(superSupreme[i]["LOW"]) < lowest) {
                                lowest = parseInt(superSupreme[i]["LOW"]);
                            }
                        }
                    }



                    switch (onwhich) {
                        case "/lt":
                            highest = (Math.ceil(highest / 20) * 20) + 40;
                            lowest = (Math.floor(lowest / 20) * 20) - 40;
                            looper = (highest - lowest) / 20;
                            nQuan = 20;
                            break;
                        case "/tcs":
                            highest = (Math.ceil(highest / 50) * 50) + 100;
                            lowest = (Math.floor(lowest / 50) * 50) - 100;
                            looper = (highest - lowest) / 50;
                            nQuan = 50;
                            break;
                        case "/nifty":
                            highest = (Math.ceil(highest / 100) * 100) + 200;
                            lowest = (Math.floor(lowest / 100) * 100) - 200;
                            looper = (highest - lowest) / 100;
                            nQuan = 100;
                            break;
                        case "/usdinr2013":
                            highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                            lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                            looper = (highest - lowest) / 0.5;
                            nQuan = 0.5;
                            break;
                        case "/usdinr2014":
                            highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                            lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                            looper = (highest - lowest) / 0.5;
                            nQuan = 0.5;
                            break;
                        case "/usdinr2015":
                            highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                            lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                            looper = (highest - lowest) / 0.5;
                            nQuan = 0.5;
                            break;
                        case "/usdinr2016":
                            highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                            lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                            looper = (highest - lowest) / 0.5;
                            nQuan = 0.5;
                            break;
                    }

                    var getPreviousDate = function(i) {
                        for (var t = i - 1; t > 0; t--) {
                            if (superSupreme[t]["DATE"] !== null && superSupreme[t]["DATE"] != "" && superSupreme[t]["DATE"] !== undefined) {
                                return superSupreme[t]["DATE"];
                            }
                        }
                    }

                    for (var i = 0; i < superSupreme.length; i++) {

                        for (var k = looper; k >= 0; k--) {

                            var toAddNQ = pi(getBuyNQ(i, "PE nq " + ((lowest + (k * nQuan))), (lowest + (k * nQuan))));

                            var toRetNQ = pi(toRetNQBuy(i, "PE nq " + ((lowest + (k * nQuan))), (lowest + (k * nQuan))));

                            superSupreme[i]["PE nq " + ((lowest + (k * nQuan)))] = toAddNQ + toRetNQ;

                            var toAddNV = pi(getBuyNV(i, "PE nv " + ((lowest + (k * nQuan))), (lowest + (k * nQuan))));

                            var toRetNV = pi(toRetNVBuy(i, "PE nv " + ((lowest + (k * nQuan))), (lowest + (k * nQuan))));

                            superSupreme[i]["PE nv " + ((lowest + (k * nQuan)))] = toAddNV + toRetNV;

                            superSupreme[i]["PE avg " + ((lowest + (k * nQuan)))] = getBuyAVG(i, "PE avg " + ((lowest + (k * nQuan))), ((lowest + (k * nQuan))));

                            var toAddNQS = pi(getSellNQ(i, "PE NQ " + ((lowest + (k * nQuan))), (lowest + (k * nQuan))));

                            var toRetNQS = pi(toRetNQBuyS(i, "PE NQ " + ((lowest + (k * nQuan))), (lowest + (k * nQuan))));

                            superSupreme[i]["PE NQ " + ((lowest + (k * nQuan)))] = toAddNQS + toRetNQS;

                            var toAddNVS = pi(getSellNV(i, "PE NV " + ((lowest + (k * nQuan))), (lowest + (k * nQuan))));

                            var toRetNVS = pi(toRetNVBuyS(i, "PE NV " + ((lowest + (k * nQuan))), (lowest + (k * nQuan))));

                            superSupreme[i]["PE NV " + ((lowest + (k * nQuan)))] = toAddNVS + toRetNVS;

                            superSupreme[i]["PE AVG1 " + ((lowest + (k * nQuan)))] = getSellAVG(i, "PE AVG1 " + ((lowest + (k * nQuan))), ((lowest + (k * nQuan))));

                        }

                        var date = superSupreme[i]["DATE"];

                        if (date != null && date != "" && date !== undefined) {

                            if (checkFirstDay(date, 1)) {

                                var totalnqPE = 0;
                                var totalnvPE = 0;
                                var totalNQPE = 0;
                                var totalNVPE = 0;


                                for (var k = looper; k >= 0; k--) {

                                    var nq = superSupreme[i - 1]["PE nq " + ((lowest + (k * nQuan)))];

                                    var NQ = superSupreme[i - 1]["PE NQ " + ((lowest + (k * nQuan)))];

                                    if (nq < 0) {

                                        var date = getPreviousDate(i - 1);

                                        var defendingStrikePrice = ((lowest + (k * nQuan)));
                                        if (towhich == 1) {
                                            superSupreme[i - 1]["PE BP " + ((lowest + (k * nQuan)))] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice, 1));
                                        } else {
                                            superSupreme[i - 1]["PE BP " + ((lowest + (k * nQuan)))] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                        }
                                        superSupreme[i - 1]["PE BQ " + ((lowest + (k * nQuan)))] = Math.abs(nq);
                                        superSupreme[i - 1]["PE BV " + ((lowest + (k * nQuan)))] = parseFloat(superSupreme[i - 1]["PE BP " + ((lowest + (k * nQuan)))]) * parseInt(superSupreme[i - 1]["PE BQ " + ((lowest + (k * nQuan)))]);

                                    }

                                    if (nq > 0) {

                                        var date = getPreviousDate(i - 1);

                                        var defendingStrikePrice = ((lowest + (k * nQuan)));
                                        if (towhich == 1) {
                                            superSupreme[i - 1]["PE sp " + ((lowest + (k * nQuan)))] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice, 1));
                                        } else {
                                            superSupreme[i - 1]["PE sp " + ((lowest + (k * nQuan)))] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                        }
                                        superSupreme[i - 1]["PE sq " + ((lowest + (k * nQuan)))] = -Math.abs(nq);
                                        superSupreme[i - 1]["PE sv " + ((lowest + (k * nQuan)))] = parseFloat(superSupreme[i - 1]["PE sp " + ((lowest + (k * nQuan)))]) * parseInt(superSupreme[i - 1]["PE sq " + ((lowest + (k * nQuan)))]);

                                    }

                                    if (NQ < 0) {

                                        var date = getPreviousDate(i - 1);

                                        var defendingStrikePrice = ((lowest + (k * nQuan)));
                                        if (towhich == 1) {
                                            superSupreme[i - 1]["PE bp " + ((lowest + (k * nQuan)))] = pf(getPENextMonthUSDINR(date, defendingStrikePrice, 1));
                                        } else {
                                            superSupreme[i - 1]["PE bp " + ((lowest + (k * nQuan)))] = (nseYear == 2015) ? pf(getPENextMonthFifteen(date, defendingStrikePrice)) : pf(getPENextMonthSixteen(date, defendingStrikePrice));
                                        }
                                        superSupreme[i - 1]["PE bq " + ((lowest + (k * nQuan)))] = Math.abs(NQ);
                                        superSupreme[i - 1]["PE bv " + ((lowest + (k * nQuan)))] = parseFloat(superSupreme[i - 1]["PE bp " + ((lowest + (k * nQuan)))]) * parseInt(superSupreme[i - 1]["PE bq " + ((lowest + (k * nQuan)))]);

                                    }

                                    if (NQ > 0) {

                                        var date = getPreviousDate(i - 1);

                                        var defendingStrikePrice = ((lowest + (k * nQuan)));
                                        if (towhich == 1) {
                                            superSupreme[i - 1]["PE SP " + ((lowest + (k * nQuan)))] = pf(getPENextMonthUSDINR(date, defendingStrikePrice, 1));
                                        } else {
                                            superSupreme[i - 1]["PE SP " + ((lowest + (k * nQuan)))] = (nseYear == 2015) ? pf(getPENextMonthFifteen(date, defendingStrikePrice)) : pf(getPENextMonthSixteen(date, defendingStrikePrice));
                                        }
                                        superSupreme[i - 1]["PE SQ " + ((lowest + (k * nQuan)))] = -Math.abs(NQ);
                                        superSupreme[i - 1]["PE SV " + ((lowest + (k * nQuan)))] = parseFloat(superSupreme[i - 1]["PE SP " + ((lowest + (k * nQuan)))]) * parseInt(superSupreme[i - 1]["PE SQ " + ((lowest + (k * nQuan)))]);

                                    }


                                    if (superSupreme[i - 1]["PE nq " + ((lowest + (k * nQuan)))] == 0) {
                                        totalnqPE += superSupreme[i - 1]["PE nq " + ((lowest + (k * nQuan)))];
                                        totalnvPE += superSupreme[i - 1]["PE nv " + ((lowest + (k * nQuan)))];
                                    } else {
                                        superSupreme[i - 1]["PE nq " + ((lowest + (k * nQuan)))] = ((superSupreme[i - 1]["PE nq " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["PE nq " + ((lowest + (k * nQuan)))]) + (superSupreme[i - 1]["PE BQ " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["PE BQ " + ((lowest + (k * nQuan)))]) + (superSupreme[i - 1]["PE sq " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["PE sq " + ((lowest + (k * nQuan)))]));

                                        totalnqPE += superSupreme[i - 1]["PE nq " + ((lowest + (k * nQuan)))];

                                        superSupreme[i - 1]["PE nv " + ((lowest + (k * nQuan)))] = ((superSupreme[i - 1]["PE nv " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["PE nv " + ((lowest + (k * nQuan)))]) + (superSupreme[i - 1]["PE BV " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["PE BV " + ((lowest + (k * nQuan)))]) + (superSupreme[i - 1]["PE sv " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["PE sv " + ((lowest + (k * nQuan)))]));

                                        totalnvPE += superSupreme[i - 1]["PE nv " + ((lowest + (k * nQuan)))];
                                    }

                                    if (superSupreme[i - 1]["PE NQ " + ((lowest + (k * nQuan)))] == 0) {
                                        totalNQPE += superSupreme[i - 1]["PE NQ " + ((lowest + (k * nQuan)))];
                                        totalNVPE += superSupreme[i - 1]["PE NV " + ((lowest + (k * nQuan)))];
                                    } else {
                                        superSupreme[i - 1]["PE NQ " + ((lowest + (k * nQuan)))] = ((superSupreme[i - 1]["PE NQ " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["PE NQ " + ((lowest + (k * nQuan)))]) + (superSupreme[i - 1]["PE bq " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["PE bq " + ((lowest + (k * nQuan)))]) + (superSupreme[i - 1]["PE SQ " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["PE SQ " + ((lowest + (k * nQuan)))]));

                                        totalNQPE += superSupreme[i - 1]["PE NQ " + ((lowest + (k * nQuan)))];

                                        superSupreme[i - 1]["PE NV " + ((lowest + (k * nQuan)))] = ((superSupreme[i - 1]["PE NV " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["PE NV " + ((lowest + (k * nQuan)))]) + (superSupreme[i - 1]["PE bv " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["PE bv " + ((lowest + (k * nQuan)))]) + (superSupreme[i - 1]["PE SV " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["PE SV " + ((lowest + (k * nQuan)))]));

                                        totalNVPE += superSupreme[i - 1]["PE NV " + ((lowest + (k * nQuan)))];
                                    }
                                }

                                var totalNetValuePE = totalNVPE + totalnvPE;
                                monthEnd["pe"] = totalNetValuePE;
                            }
                        }
                    }

                    var getBuyNQC = function(i, whereat, amount) {

                        if (i == 0) {
                            var boughtQuan = superSupreme[i]["CE BQ " + amount];
                            var soldQuan = superSupreme[i]["CE sq " + amount];

                            if (boughtQuan != null && soldQuan == null) {
                                return pi(boughtQuan);
                            }
                            if (boughtQuan == null && soldQuan != null) {
                                return -Math.abs(pi(soldQuan));
                            }
                            if (boughtQuan != null && soldQuan != null) {
                                return (pi(boughtQuan) - pi(soldQuan));
                            }
                            if (boughtQuan == null && soldQuan == null) {
                                return 0;
                            }
                        } else if ((superSupreme[i]["DATE"] != null) && (superSupreme[i]["DATE"] !== undefined) && (checkFirstDay(superSupreme[i]["DATE"]))) {
                            var boughtQuan = superSupreme[i]["CE BQ " + amount];
                            var soldQuan = superSupreme[i]["CE sq " + amount];

                            if (boughtQuan != null && soldQuan == null) {
                                return pi(boughtQuan);
                            }
                            if (boughtQuan == null && soldQuan != null) {
                                return -Math.abs(pi(soldQuan));
                            }
                            if (boughtQuan != null && soldQuan != null) {
                                return (pi(boughtQuan) - pi(soldQuan));
                            }
                            if (boughtQuan == null && soldQuan == null) {
                                return 0;
                            }
                        } else {
                            return superSupreme[i - 1][whereat];
                        }
                    }

                    var getRetNQCVS = function(i, whereat, amount) {

                        if (i == 0) {
                            return 0;
                        }

                        if ((superSupreme[i]["DATE"] != null) && (superSupreme[i]["DATE"] !== undefined) && (checkFirstDay(superSupreme[i]["DATE"]))) {
                            return 0;
                        }

                        var boughtQuan = superSupreme[i]["CE bq " + amount];
                        var soldQuan = superSupreme[i]["CE SQ " + amount];

                        if (boughtQuan != null && soldQuan == null) {
                            return pi(boughtQuan);
                        }
                        if (boughtQuan == null && soldQuan != null) {
                            return -Math.abs(pi(soldQuan));
                        }
                        if (boughtQuan != null && soldQuan != null) {
                            return (pi(boughtQuan) - pi(soldQuan));
                        }
                        if (boughtQuan == null && soldQuan == null) {
                            return 0;
                        }

                    }

                    var getRetNVCVS = function(i, whereat, amount) {

                        if (i == 0) {
                            return 0;
                        }

                        if ((superSupreme[i]["DATE"] != null) && (superSupreme[i]["DATE"] !== undefined) && (checkFirstDay(superSupreme[i]["DATE"]))) {
                            return 0;
                        }

                        var boughtValue = superSupreme[i]["CE bv " + amount];
                        var soldValue = superSupreme[i]["CE SV " + amount];

                        if (boughtValue != null && soldValue == null) {
                            return pi(boughtValue);
                        }
                        if (boughtValue == null && soldValue != null) {
                            return -Math.abs(pi(soldValue));
                        }
                        if (boughtValue != null && soldValue != null) {
                            return (pi(boughtValue) - pi(soldValue));
                        }
                        if (boughtValue == null && soldValue == null) {
                            return 0;
                        }

                    }

                    var getRetNQCV = function(i, whereat, amount) {

                        if (i == 0) {
                            return 0;
                        }

                        if ((superSupreme[i]["DATE"] != null) && (superSupreme[i]["DATE"] !== undefined) && (checkFirstDay(superSupreme[i]["DATE"]))) {
                            return 0;
                        }

                        var boughtQuan = superSupreme[i]["CE BQ " + amount];
                        var soldQuan = superSupreme[i]["CE sq " + amount];

                        if (boughtQuan != null && soldQuan == null) {
                            return pi(boughtQuan);
                        }
                        if (boughtQuan == null && soldQuan != null) {
                            return -Math.abs(pi(soldQuan));
                        }
                        if (boughtQuan != null && soldQuan != null) {
                            return (pi(boughtQuan) - pi(soldQuan));
                        }
                        if (boughtQuan == null && soldQuan == null) {
                            return 0;
                        }

                    }

                    var getRetNVCV = function(i, whereat, amount) {

                        if (i == 0) {
                            return 0;
                        }

                        if ((superSupreme[i]["DATE"] != null) && (superSupreme[i]["DATE"] !== undefined) && (checkFirstDay(superSupreme[i]["DATE"]))) {
                            return 0;
                        }

                        var boughtValue = superSupreme[i]["CE BV " + amount];
                        var soldValue = superSupreme[i]["CE sv " + amount];

                        if (boughtValue != null && soldValue == null) {
                            return pi(boughtValue);
                        }
                        if (boughtValue == null && soldValue != null) {
                            return -Math.abs(pi(soldValue));
                        }
                        if (boughtValue != null && soldValue != null) {
                            return (pi(boughtValue) - pi(soldValue));
                        }
                        if (boughtValue == null && soldValue == null) {
                            return 0;
                        }

                    }

                    var getBuyNVC = function(i, whereat, amount) {

                        if (i == 0) {
                            var boughtValue = superSupreme[i]["CE BV " + amount];
                            var soldValue = superSupreme[i]["CE sv " + amount];

                            if (boughtValue != null && soldValue == null) {
                                return pi(boughtValue);
                            }
                            if (boughtValue == null && soldValue != null) {
                                return -Math.abs(pi(soldValue));
                            }
                            if (boughtValue != null && soldValue != null) {
                                return (pi(boughtValue) - pi(soldValue));
                            }
                            if (boughtValue == null && soldValue == null) {
                                return 0;
                            }
                        } else if ((superSupreme[i]["DATE"] != null) && (superSupreme[i]["DATE"] !== undefined) && (checkFirstDay(superSupreme[i]["DATE"]))) {
                            var boughtValue = superSupreme[i]["CE BV " + amount];
                            var soldValue = superSupreme[i]["CE sv " + amount];

                            if (boughtValue != null && soldValue == null) {
                                return pi(boughtValue);
                            }
                            if (boughtValue == null && soldValue != null) {
                                return -Math.abs(pi(soldValue));
                            }
                            if (boughtValue != null && soldValue != null) {
                                return (pi(boughtValue) - pi(soldValue));
                            }
                            if (boughtValue == null && soldValue == null) {
                                return 0;
                            }
                        } else {
                            return superSupreme[i - 1][whereat];
                        }

                    }

                    var getBuyAVGC = function(i, whereat, amount) {

                        if (pi(superSupreme[i]["CE nq " + amount]) == 0) {
                            return 0;
                        }
                        if (pi(superSupreme[i]["CE nv " + amount]) == 0) {
                            return 0;
                        } else {
                            return (pi(superSupreme[i]["CE nv " + amount]) / pi(superSupreme[i]["CE nq " + amount]));
                        }

                    }

                    var getSellNQC = function(i, whereat, amount) {

                        if (i == 0) {

                            var boughtQuan = superSupreme[i]["CE bq " + amount];
                            var soldQuan = superSupreme[i]["CE SQ " + amount];

                            if (boughtQuan != null && soldQuan == null) {
                                return pi(boughtQuan);
                            }
                            if (boughtQuan == null && soldQuan != null) {
                                return -Math.abs(pi(soldQuan));
                            }
                            if (boughtQuan != null && soldQuan != null) {
                                return (pi(boughtQuan) - pi(soldQuan));
                            }
                            if (boughtQuan == null && soldQuan == null) {
                                return 0;
                            }
                        } else if ((superSupreme[i]["DATE"] != null) && (superSupreme[i]["DATE"] !== undefined) && (checkFirstDay(superSupreme[i]["DATE"]))) {
                            var boughtQuan = superSupreme[i]["CE bq " + amount];
                            var soldQuan = superSupreme[i]["CE SQ " + amount];

                            if (boughtQuan != null && soldQuan == null) {
                                return pi(boughtQuan);
                            }
                            if (boughtQuan == null && soldQuan != null) {
                                return -Math.abs(pi(soldQuan));
                            }
                            if (boughtQuan != null && soldQuan != null) {
                                return (pi(boughtQuan) - pi(soldQuan));
                            }
                            if (boughtQuan == null && soldQuan == null) {
                                return 0;
                            }
                        } else {
                            return superSupreme[i - 1][whereat];
                        }

                    }

                    var getSellNVC = function(i, whereat, amount) {

                        if (i == 0) {

                            var boughtValue = superSupreme[i]["CE bv " + amount];
                            var soldValue = superSupreme[i]["CE SV " + amount];

                            if (boughtValue != null && soldValue == null) {
                                return pi(boughtValue);
                            }
                            if (boughtValue == null && soldValue != null) {
                                return -Math.abs(pi(soldValue));
                            }
                            if (boughtValue != null && soldValue != null) {
                                return (pi(boughtValue) - pi(soldValue));
                            }
                            if (boughtValue == null && soldValue == null) {
                                return 0;
                            }

                        } else if ((superSupreme[i]["DATE"] != null) && (superSupreme[i]["DATE"] !== undefined) && (checkFirstDay(superSupreme[i]["DATE"]))) {

                            var boughtValue = superSupreme[i]["CE bv " + amount];
                            var soldValue = superSupreme[i]["CE SV " + amount];

                            if (boughtValue != null && soldValue == null) {
                                return pi(boughtValue);
                            }
                            if (boughtValue == null && soldValue != null) {
                                return -Math.abs(pi(soldValue));
                            }
                            if (boughtValue != null && soldValue != null) {
                                return (pi(boughtValue) - pi(soldValue));
                            }
                            if (boughtValue == null && soldValue == null) {
                                return 0;
                            }

                        } else {
                            return superSupreme[i - 1][whereat];
                        }

                    }

                    var getSellAVGC = function(i, whereat, amount) {
                        if (pi(superSupreme[i]["CE NQ " + amount]) == 0) {
                            return 0;
                        }
                        if (pi(superSupreme[i]["CE NV " + amount]) == 0) {
                            return 0;
                        } else {
                            return (pi(superSupreme[i]["CE NV " + amount]) / pi(superSupreme[i]["CE NQ " + amount]));
                        }
                    }

                    for (var i = 0; i < superSupreme.length; i++) {

                        for (var k = looper; k >= 0; k--) {

                            //BUY BEGINS
                            var toAddNQC = pi(getBuyNQC(i, "CE nq " + (lowest + (k * nQuan)), (lowest + (k * nQuan))));

                            var toRetNQC = pi(getRetNQCV(i, "CE nq " + (lowest + (k * nQuan)), (lowest + (k * nQuan))));

                            superSupreme[i]["CE nq " + ((lowest + (k * nQuan)))] = toAddNQC + toRetNQC;

                            var toAddNVC = pi(getBuyNVC(i, "CE nv " + (lowest + (k * nQuan)), (lowest + (k * nQuan))));

                            var toRetNVC = pi(getRetNVCV(i, "CE nq " + (lowest + (k * nQuan)), (lowest + (k * nQuan))));

                            superSupreme[i]["CE nv " + (lowest + (k * nQuan))] = toAddNVC + toRetNVC;

                            superSupreme[i]["CE avg " + (lowest + (k * nQuan))] = getBuyAVGC(i, "CE avg " + (lowest + (k * nQuan)), (lowest + (k * nQuan)));

                            //SELL BEGINS
                            var toAddNQSC = pi(getSellNQC(i, "CE NQ " + (lowest + (k * nQuan)), (lowest + (k * nQuan))));

                            var toRetNQSC = pi(getRetNQCVS(i, "CE NQ " + (lowest + (k * nQuan)), (lowest + (k * nQuan))));

                            superSupreme[i]["CE NQ " + (lowest + (k * nQuan))] = toAddNQSC + toRetNQSC;

                            var toAddNVSC = pi(getSellNVC(i, "CE NV " + (lowest + (k * nQuan)), (lowest + (k * nQuan))));

                            var toRetNVSC = pi(getRetNVCVS(i, "CE NQ " + (lowest + (k * nQuan)), (lowest + (k * nQuan))));

                            superSupreme[i]["CE NV " + (lowest + (k * nQuan))] = toAddNVSC + toRetNVSC;

                            superSupreme[i]["CE AVG1 " + (lowest + (k * nQuan))] = getSellAVGC(i, "CE AVG1 " + (lowest + (k * nQuan)), (lowest + (k * nQuan)));

                        }

                        var date = superSupreme[i]["DATE"];

                        if (date != null && date != "" && date !== undefined) {

                            if ((superSupreme[i]["DATE"] != null) && (superSupreme[i]["DATE"] !== undefined) && (checkFirstDay(superSupreme[i]["DATE"], 1))) {

                                var totalnqCE = 0;
                                var totalnvCE = 0;
                                var totalNQCE = 0;
                                var totalNVCE = 0;

                                for (var k = looper; k >= 0; k--) {

                                    var nq = superSupreme[i - 1]["CE nq " + ((lowest + (k * nQuan)))];

                                    var NQ = superSupreme[i - 1]["CE NQ " + ((lowest + (k * nQuan)))];

                                    if (nq < 0) {

                                        var date = getPreviousDate(i - 1);
                                        var defendingStrikePrice = ((lowest + (k * nQuan)));
                                        if (towhich == 1) {
                                            superSupreme[i - 1]["CE BP " + ((lowest + (k * nQuan)))] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                        } else {
                                            superSupreme[i - 1]["CE BP " + ((lowest + (k * nQuan)))] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                        }
                                        superSupreme[i - 1]["CE BQ " + ((lowest + (k * nQuan)))] = Math.abs(nq);
                                        superSupreme[i - 1]["CE BV " + ((lowest + (k * nQuan)))] = parseFloat(superSupreme[i - 1]["CE BP " + ((lowest + (k * nQuan)))]) * parseInt(superSupreme[i - 1]["CE BQ " + ((lowest + (k * nQuan)))]);

                                    }

                                    if (nq > 0) {

                                        var date = getPreviousDate(i - 1);
                                        var defendingStrikePrice = ((lowest + (k * nQuan)));
                                        if (towhich == 1) {
                                            superSupreme[i - 1]["CE sp " + ((lowest + (k * nQuan)))] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                        } else {
                                            superSupreme[i - 1]["CE sp " + ((lowest + (k * nQuan)))] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                        }
                                        superSupreme[i - 1]["CE sq " + ((lowest + (k * nQuan)))] = -Math.abs(nq);
                                        superSupreme[i - 1]["CE sv " + ((lowest + (k * nQuan)))] = parseFloat(superSupreme[i - 1]["CE sp " + ((lowest + (k * nQuan)))]) * parseInt(superSupreme[i - 1]["CE sq " + ((lowest + (k * nQuan)))]);

                                    }

                                    if (NQ < 0) {

                                        var date = getPreviousDate(i - 1);
                                        var defendingStrikePrice = ((lowest + (k * nQuan)));
                                        if (towhich == 1) {
                                            superSupreme[i - 1]["CE bp " + ((lowest + (k * nQuan)))] = pf(getCENextMonthUSDINR(date, defendingStrikePrice));
                                        } else {
                                            superSupreme[i - 1]["CE bp " + ((lowest + (k * nQuan)))] = (nseYear == 2015) ? pf(getCENextMonthFifteen(date, defendingStrikePrice)) : pf(getPENextMonthSixteen(date, defendingStrikePrice));
                                        }
                                        superSupreme[i - 1]["CE bq " + ((lowest + (k * nQuan)))] = Math.abs(NQ);
                                        superSupreme[i - 1]["CE bv " + ((lowest + (k * nQuan)))] = parseFloat(superSupreme[i - 1]["CE bp " + ((lowest + (k * nQuan)))]) * parseInt(superSupreme[i - 1]["CE bq " + ((lowest + (k * nQuan)))]);

                                    }

                                    if (NQ > 0) {

                                        var date = getPreviousDate(i - 1);
                                        var defendingStrikePrice = ((lowest + (k * nQuan)));
                                        if (towhich == 1) {
                                            superSupreme[i - 1]["CE SP " + ((lowest + (k * nQuan)))] = pf(getCENextMonthUSDINR(date, defendingStrikePrice));
                                        } else {
                                            superSupreme[i - 1]["CE SP " + ((lowest + (k * nQuan)))] = (nseYear == 2015) ? pf(getCENextMonthFifteen(date, defendingStrikePrice)) : pf(getPENextMonthSixteen(date, defendingStrikePrice));
                                        }
                                        superSupreme[i - 1]["CE SQ " + ((lowest + (k * nQuan)))] = -Math.abs(NQ);
                                        superSupreme[i - 1]["CE SV " + ((lowest + (k * nQuan)))] = parseFloat(superSupreme[i - 1]["CE SP " + ((lowest + (k * nQuan)))]) * parseInt(superSupreme[i - 1]["CE SQ " + ((lowest + (k * nQuan)))]);

                                    }


                                    if (superSupreme[i - 1]["CE nq " + ((lowest + (k * nQuan)))] == 0) {
                                        totalnqCE += superSupreme[i - 1]["CE nq " + ((lowest + (k * nQuan)))];
                                        totalnvCE += superSupreme[i - 1]["CE nv " + ((lowest + (k * nQuan)))];
                                    } else {
                                        superSupreme[i - 1]["CE nq " + ((lowest + (k * nQuan)))] = ((superSupreme[i - 1]["CE nq " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["CE nq " + ((lowest + (k * nQuan)))]) + (superSupreme[i - 1]["CE BQ " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["CE BQ " + ((lowest + (k * nQuan)))]) + (superSupreme[i - 1]["CE sq " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["CE sq " + ((lowest + (k * nQuan)))]));

                                        totalnqCE += superSupreme[i - 1]["CE nq " + ((lowest + (k * nQuan)))];

                                        superSupreme[i - 1]["CE nv " + ((lowest + (k * nQuan)))] = ((superSupreme[i - 1]["CE nv " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["CE nv " + ((lowest + (k * nQuan)))]) + (superSupreme[i - 1]["CE BV " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["CE BV " + ((lowest + (k * nQuan)))]) + (superSupreme[i - 1]["CE sv " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["CE sv " + ((lowest + (k * nQuan)))]));

                                        totalnvCE += superSupreme[i - 1]["CE nv " + ((lowest + (k * nQuan)))];
                                    }

                                    if (superSupreme[i - 1]["CE NQ " + ((lowest + (k * nQuan)))] == 0) {
                                        totalNQCE += superSupreme[i - 1]["CE NQ " + ((lowest + (k * nQuan)))];
                                        totalNVCE += superSupreme[i - 1]["CE NV " + ((lowest + (k * nQuan)))];
                                    } else {
                                        superSupreme[i - 1]["CE NQ " + ((lowest + (k * nQuan)))] = ((superSupreme[i - 1]["CE NQ " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["CE NQ " + ((lowest + (k * nQuan)))]) + (superSupreme[i - 1]["CE bq " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["CE bq " + ((lowest + (k * nQuan)))]) + (superSupreme[i - 1]["CE SQ " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["CE SQ " + ((lowest + (k * nQuan)))]));

                                        totalNQCE += superSupreme[i - 1]["CE NQ " + ((lowest + (k * nQuan)))];

                                        superSupreme[i - 1]["CE NV " + ((lowest + (k * nQuan)))] = ((superSupreme[i - 1]["CE NV " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["CE NV " + ((lowest + (k * nQuan)))]) + (superSupreme[i - 1]["CE bv " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["CE bv " + ((lowest + (k * nQuan)))]) + (superSupreme[i - 1]["CE SV " + ((lowest + (k * nQuan)))] === undefined ? null : superSupreme[i - 1]["CE SV " + ((lowest + (k * nQuan)))]));

                                        totalNVCE += superSupreme[i - 1]["CE NV " + ((lowest + (k * nQuan)))];
                                    }
                                }

                                var totalNetValueCE = totalNVCE + totalnvCE;
                                monthEnd["ce"] = totalNetValueCE;
                            }
                        }

                    }



                    for (var i = 0; i < superSupreme.length; i++) {

                        if ((superSupreme[i]["DATE"] != null) && (superSupreme[i]["DATE"] !== undefined) && (checkFirstDay(superSupreme[i]["DATE"], 1))) {

                            superSupreme[i - 1]["P/L"] = monthEnd["ce"] + monthEnd["pe"] + monthEnd["left"] + monthEnd["right"];
                            superSupreme[i - 2]["P/L"] = "MONTH END";
                            superSupreme[i - 3]["P/L"] = monthEnd["pe"];
                            superSupreme[i - 4]["P/L"] = "PE";
                            superSupreme[i - 5]["P/L"] = monthEnd["ce"];
                            superSupreme[i - 6]["P/L"] = "CE";
                            superSupreme[i - 7]["P/L"] = monthEnd["right"];
                            superSupreme[i - 8]["P/L"] = "RIGHT";
                            superSupreme[i - 9]["P/L"] = monthEnd["left"];
                            superSupreme[i - 10]["P/L"] = "LEFT";
                            superSupreme[i - 11]["P/L"] = monthEnd["left"] + monthEnd["right"];
                            superSupreme[i - 12]["P/L"] = "NET FO";
                        }
                    }

                    createFile(superSupreme, 1);
                }
                applyCallPut(superSupreme);

            },
            putTNV: function(arr, callback) {
                var that = this;
                var supremeArray = [];
                var oneTime = {};

                for (var i = 0; i < arr.length; i++) {
                    if ((arr[i]["NV"] === null || arr[i]["NV"] === undefined || arr[i]["NV"] === "") && (arr[i]["nv"] === null || arr[i]["nv"] === undefined || arr[i]["nv"] === "")) {
                        arr[i]["TNV"] = "";
                    } else if ((arr[i]["NV"] === null) || (arr[i]["NV"] === undefined) || (arr[i]["NV"] === "")) {
                        arr[i]["TNV"] = parseInt(arr[i]["nv"]);
                    } else if (arr[i]["nv"] === null || arr[i]["nv"] === undefined || arr[i]["nv"] === "") {
                        arr[i]["TNV"] = parseInt(arr[i]["NV"]);
                    } else {
                        arr[i]["TNV"] = parseInt(arr[i]["NV"]) + parseInt(arr[i]["nv"]);
                    }
                }
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i]["TNQ"] == 0) {
                        arr[i]["TAVG"] = 0;
                    } else if (arr[i]["TNQ"] == "") {
                        arr[i]["TAVG"] = "";
                    } else {
                        arr[i]["TAVG"] = parseFloat((parseFloat(arr[i]["TNV"]) / parseFloat(arr[i]["TNQ"])).toFixed(2));
                    }
                }

                for (var i = 0; i < arr.length; i++) {
                    if (arr[i]["LTP"] != "") {
                        arr[i]["NMTM"] = (parseFloat(arr[i]["TAVG"]) - parseFloat(arr[i]["LTP"])) * parseFloat(arr[i]["TNQ"]);
                    } else if (arr[i]["TAVG"] == "") {
                        arr[i]["NMTM"] = "";
                    } else {
                        var getPreviousLTP = function(i) {
                            var i = i - 1;
                            if (arr[i]["LTP"] != "") {
                                return arr[i]["LTP"];
                            } else {
                                for (var t = i; t >= 0; t--) {
                                    if (arr[t]["LTP"] != "") {
                                        return arr[t]["LTP"];
                                    }
                                }
                            }
                        }

                        arr[i]["NMTM"] = (parseFloat(arr[i]["TAVG"]) - parseFloat(getPreviousLTP(i))) * parseFloat(arr[i]["TNQ"]);
                    }
                }

                for (var i = 0; i < arr.length; i++) {
                    if (arr[i]["TNV"] == 0) {
                        arr[i]["MARGIN"] = 0;
                        continue;
                    }
                    if (arr[i]["TNV"] == "" || arr[i]["TNV"] == null) {
                        arr[i]["MARGIN"] = "";
                        continue;
                    }
                    arr[i]["MARGIN"] = arr[i]["TNV"] * 0.07;
                }

                var highest = 0;
                for (var i = 0; i < arr.length; i++) {
                    if ((arr[i]["HIGH"] != null) && (arr[i]["HIGH"] != "")) {
                        if (parseInt(arr[i]["HIGH"]) > highest) {
                            highest = parseInt(arr[i]["HIGH"]);
                        }
                    }
                }


                var lowest = highest;
                for (var i = 0; i < arr.length; i++) {
                    if ((arr[i]["LOW"] != null) && (arr[i]["LOW"] != "")) {
                        if (parseInt(arr[i]["LOW"]) < lowest) {
                            lowest = parseInt(arr[i]["LOW"]);
                        }
                    }
                }


                switch (onwhich) {
                    case "/lt":

                        highest = (Math.ceil(highest / 20) * 20) + 40;
                        lowest = (Math.floor(lowest / 20) * 20) - 40;
                        looper = (highest - lowest) / 20;
                        nQuan = 20;
                        break;
                    case "/tcs":

                        highest = (Math.ceil(highest / 50) * 50) + 100;
                        lowest = (Math.floor(lowest / 50) * 50) - 100;
                        looper = (highest - lowest) / 50;
                        nQuan = 50;
                        break;
                    case "/nifty":

                        highest = (Math.ceil(highest / 100) * 100) + 200;
                        lowest = (Math.floor(lowest / 100) * 100) - 200;
                        looper = (highest - lowest) / 100;
                        nQuan = 100;
                        break;
                    case "/usdinr2013":

                        highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                        lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                        looper = (highest - lowest) / 0.5;
                        nQuan = 0.5;
                        break;
                    case "/usdinr2014":

                        highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                        lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                        looper = (highest - lowest) / 0.5;
                        nQuan = 0.5;
                        break;
                    case "/usdinr2015":

                        highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                        lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                        looper = (highest - lowest) / 0.5;
                        nQuan = 0.5;
                        break;
                    case "/usdinr2016":

                        highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                        lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                        looper = (highest - lowest) / 0.5;
                        nQuan = 0.5;
                        break;

                }

                for (var i = 0; i < arr.length; i++) {
                    oneTime["P/L"] = "";
                    oneTime["DATE"] = arr[i]["DATE"];
                    oneTime["OPEN"] = arr[i]["OPEN"];
                    oneTime["HIGH"] = arr[i]["HIGH"];
                    oneTime["LOW"] = arr[i]["LOW"];
                    oneTime["LTP"] = arr[i]["LTP"];
                    oneTime["BP"] = arr[i]["BP"];
                    oneTime["BQ"] = arr[i]["BQ"];
                    oneTime["BV"] = arr[i]["BV"];
                    oneTime["SP"] = arr[i]["SP"];
                    oneTime["SQ"] = arr[i]["SQ"];
                    oneTime["SV"] = arr[i]["SV"];
                    oneTime["NQ"] = arr[i]["NQ"];
                    oneTime["NV"] = arr[i]["NV"];
                    oneTime["AVG"] = arr[i]["AVERAGE"];
                    oneTime["MTM"] = arr[i]["MTM"];

                    if (checked != 1) {

                        for (var k = looper; k >= 0; k--) {

                            oneTime["PE STK " + ((lowest + (k * nQuan)))] = null;
                            oneTime["PE BP " + ((lowest + (k * nQuan)))] = null;
                            oneTime["PE BQ " + ((lowest + (k * nQuan)))] = null;
                            oneTime["PE BV " + ((lowest + (k * nQuan)))] = null;

                            oneTime["PE sp " + ((lowest + (k * nQuan)))] = null;
                            oneTime["PE sq " + ((lowest + (k * nQuan)))] = null;
                            oneTime["PE sv " + ((lowest + (k * nQuan)))] = null;
                            oneTime["PE nq " + ((lowest + (k * nQuan)))] = null;
                            oneTime["PE nv " + ((lowest + (k * nQuan)))] = null;
                            oneTime["PE avg " + ((lowest + (k * nQuan)))] = null;

                            oneTime["PE stk " + ((lowest + (k * nQuan)))] = null;
                            oneTime["PE bp " + ((lowest + (k * nQuan)))] = null;
                            oneTime["PE bq " + ((lowest + (k * nQuan)))] = null;
                            oneTime["PE bv " + ((lowest + (k * nQuan)))] = null;

                            oneTime["PE SP " + ((lowest + (k * nQuan)))] = null;
                            oneTime["PE SQ " + ((lowest + (k * nQuan)))] = null;
                            oneTime["PE SV " + ((lowest + (k * nQuan)))] = null;
                            oneTime["PE NQ " + ((lowest + (k * nQuan)))] = null;
                            oneTime["PE NV " + ((lowest + (k * nQuan)))] = null;
                            oneTime["PE AVG1 " + ((lowest + (k * nQuan)))] = null;

                        }
                    }

                    oneTime["bp"] = arr[i]["bp"];
                    oneTime["bq"] = arr[i]["bq"];
                    oneTime["bv"] = arr[i]["bv"];
                    oneTime["sp"] = arr[i]["sp"];
                    oneTime["sq"] = arr[i]["sq"];
                    oneTime["sv"] = arr[i]["sv"];
                    oneTime["nq"] = arr[i]["nq"];
                    oneTime["nv"] = arr[i]["nv"];
                    oneTime["avg"] = arr[i]["average"];
                    oneTime["mtm"] = arr[i]["mtm"];

                    if (checked != 1) {

                        for (var k = 0; k <= looper; k++) {

                            oneTime["CE STK " + ((lowest + (k * nQuan)))] = null;
                            oneTime["CE BP " + ((lowest + (k * nQuan)))] = null;
                            oneTime["CE BQ " + ((lowest + (k * nQuan)))] = null;
                            oneTime["CE BV " + ((lowest + (k * nQuan)))] = null;

                            oneTime["CE sp " + ((lowest + (k * nQuan)))] = null;
                            oneTime["CE sq " + ((lowest + (k * nQuan)))] = null;
                            oneTime["CE sv " + ((lowest + (k * nQuan)))] = null;
                            oneTime["CE nq " + ((lowest + (k * nQuan)))] = null;
                            oneTime["CE nv " + ((lowest + (k * nQuan)))] = null;
                            oneTime["CE avg " + ((lowest + (k * nQuan)))] = null;

                            oneTime["CE stk " + ((lowest + (k * nQuan)))] = null;
                            oneTime["CE bp " + ((lowest + (k * nQuan)))] = null;
                            oneTime["CE bq " + ((lowest + (k * nQuan)))] = null;
                            oneTime["CE bv " + ((lowest + (k * nQuan)))] = null;

                            oneTime["CE SP " + ((lowest + (k * nQuan)))] = null;
                            oneTime["CE SQ " + ((lowest + (k * nQuan)))] = null;
                            oneTime["CE SV " + ((lowest + (k * nQuan)))] = null;
                            oneTime["CE NQ " + ((lowest + (k * nQuan)))] = null;
                            oneTime["CE NV " + ((lowest + (k * nQuan)))] = null;
                            oneTime["CE AVG1 " + ((lowest + (k * nQuan)))] = null;
                        }
                    }

                    oneTime["TNQ"] = arr[i]["TNQ"];
                    oneTime["TNV"] = arr[i]["TNV"];
                    oneTime["TAVG"] = arr[i]["TAVG"];
                    oneTime["NMTM"] = arr[i]["NMTM"];
                    oneTime["MARGIN"] = arr[i]["MARGIN"];
                    oneTime["MAX MARGIN"] = "";
                    supremeArray.push(oneTime);
                    oneTime = {};
                }

                var firstDays = [];

                var getPreviousDate = function(i) {
                    for (var t = i - 1; t > 0; t--) {
                        if (supremeArray[t]["DATE"] !== null && supremeArray[t]["DATE"] != "") {
                            return supremeArray[t]["DATE"];
                        }
                    }
                }

                var getNextEntry = function(i) {
                    for (var t = i + 1; t < supremeArray.length; t++) {
                        if (supremeArray[t]["DATE"] !== null && supremeArray[t]["DATE"] != "") {
                            return t;
                        }
                    }
                }

                for (var i = 1; i < supremeArray.length; i++) {
                    if (supremeArray[i]["DATE"] != null && supremeArray[i]["DATE"] != "") {
                        if (supremeArray[i]["DATE"] != "" && supremeArray[i]["DATE"] != null) {
                            nowRealDate = supremeArray[i]["DATE"];
                            nowDate = supremeArray[i]["DATE"].substring(3, supremeArray.length);
                            previousRealDate = getPreviousDate(i);
                            if (previousRealDate === undefined) {

                            } else {
                                previousDate = previousRealDate.substring(3, supremeArray.length);
                                if (nowDate != previousDate) {
                                    firstDays.push(nowRealDate);
                                }
                            }
                        }
                    }
                }

                var checkFirstDay = function(date) {
                    if (firstDays.indexOf(date) > -1) {
                        return true;
                    } else {
                        return false;
                    }
                }

                var checkLastWednesday = function(date) {
                    // var date = new Date(date);
                    // var gd = date.getDate();
                    // var gy = date.getFullYear();
                    // var gm = date.getMonth() + 1;
                    // var d = new Date(gy, gm, 1);
                    // var dif = (d.getDay() + 2) % 7 + 2;
                    // var lastWednesday = new Date(gy, gm, 1 - dif);
                    if (underlyingsArray.indexOf(date.toString()) > -1) {
                        return true;
                    } else {
                        return false;
                    }
                }

                var getPreviousLNV = function(i) {
                    var i = i - 1;
                    if (supremeArray[i]["NV"] != "") {
                        return supremeArray[i]["NV"];
                    } else {
                        for (var t = i; t >= 0; t--) {
                            if (supremeArray[t]["NV"] != "") {
                                return supremeArray[t]["NV"];
                            }
                        }
                    }
                }

                var getNextRNV = function(i) {
                    var i = i - 1;
                    if (supremeArray[i]["nv"] != "") {
                        return supremeArray[i]["nv"];
                    } else {
                        for (var t = i; t >= 0; t--) {
                            if (supremeArray[t]["nv"] != "") {
                                return supremeArray[t]["nv"];
                            }
                        }
                    }
                }

                var getPreviousDate = function(i) {
                    var i = i - 1;
                    if (supremeArray[i]["DATE"] != "") {
                        return supremeArray[i]["DATE"];
                    } else {
                        for (var t = i; t >= 0; t--) {
                            if (supremeArray[t]["DATE"] != "") {
                                return supremeArray[t]["DATE"];
                            }
                        }
                    }
                }

                var getPreviousRNV = function(i) {
                    var i = i - 1;
                    if (supremeArray[i]["nv"] != "") {
                        return supremeArray[i]["nv"];
                    } else {
                        for (var t = i; t >= 0; t--) {
                            if (supremeArray[t]["nv"] != "") {
                                return supremeArray[t]["nv"];
                            }
                        }
                    }
                }

                for (var i = 1; i < supremeArray.length; i++) {

                    if (currency == 1) {

                        if (underlyings == 1) {

                            if (supremeArray[i]["DATE"] != "") {
                                if (underlyingsArray.indexOf(getPreviousDate(i)) > -1) {
                                    monthEnd["left"] = getPreviousLNV(i);
                                    monthEnd["right"] = getPreviousRNV(i);
                                }
                            }

                        } else {
                            if ((supremeArray[i]["DATE"] != "") && checkFirstDay(supremeArray[i]["DATE"])) {
                                monthEnd["left"] = getPreviousLNV(i);
                                monthEnd["right"] = getPreviousRNV(i);
                            }
                        }

                    } else {
                        if ((supremeArray[i]["DATE"] != "") && checkLastWednesday(getPreviousDate(i))) {
                            if (towhich == 1) {
                                if (firstDays.indexOf(supremeArray[i]["DATE"]) == 0) {
                                    if (firstDays.length == 1) {
                                        monthEnd["left"] = getPreviousLNV(i);
                                        monthEnd["right"] = getPreviousRNV(i);
                                    } else {

                                    }
                                } else {
                                    monthEnd["left"] = getPreviousLNV(i);
                                    monthEnd["right"] = getPreviousRNV(i);
                                }
                            } else {
                                monthEnd["left"] = getPreviousLNV(i);
                                monthEnd["right"] = getPreviousRNV(i);
                            }
                        }
                    }
                }

                goTo = 0;
                for (var i = 1; i < supremeArray.length; i++) {
                    if (supremeArray[i]["P/L"] != "") {
                        max = 0;
                        maxIndex = 0;
                        startFrom = i;
                        for (var k = startFrom - 1; k >= goTo; k--) {
                            currentValue = parseFloat(Math.abs(supremeArray[k]["MARGIN"]));
                            if (currentValue > max) {
                                max = currentValue;
                                maxIndex = k;
                            }
                        }
                        goTo = startFrom + 1;
                        supremeArray[i]["MAX MARGIN"] = supremeArray[maxIndex]["MARGIN"];
                    }

                }

                superSupreme = [];

                for (var i = 0; i < supremeArray.length; i++) {
                    if ((supremeArray[i]["DATE"] == "" || supremeArray[i]["DATE"] == null) && (supremeArray[i]["OPEN"] == "" || supremeArray[i]["OPEN"] == null) && (supremeArray[i]["HIGH"] == "" || supremeArray[i]["DATE"] == null) && (supremeArray[i]["LOW"] == "" || supremeArray[i]["LOW"] == null) && (supremeArray[i]["LTP"] == "" || supremeArray[i]["LTP"] == null) && (supremeArray[i]["BP"] == "" || supremeArray[i]["BP"] == null) && (supremeArray[i]["BQ"] == "" || supremeArray[i]["BQ"] == null) && (supremeArray[i]["BV"] == "" || supremeArray[i]["BV"] == null) && (supremeArray[i]["SP"] == "" || supremeArray[i]["SP"] == null) && (supremeArray[i]["SQ"] == "" || supremeArray[i]["SQ"] == null) && (supremeArray[i]["SV"] == "" || supremeArray[i]["SV"] == null) && (supremeArray[i]["NQ"] == "" || supremeArray[i]["NQ"] == null) && (supremeArray[i]["NV"] == "" || supremeArray[i]["NV"] == null) && (supremeArray[i]["AVG"] == "" || supremeArray[i]["AVG"] == null) && (supremeArray[i]["MTM"] == "" || supremeArray[i]["MTM"] == null) && (supremeArray[i]["P/L"] == "" || supremeArray[i]["P/L"] == null) && (supremeArray[i]["date"] == "" || supremeArray[i]["date"] == null) && (supremeArray[i]["open"] == "" || supremeArray[i]["open"] == null) && (supremeArray[i]["high"] == "" || supremeArray[i]["high"] == null) && (supremeArray[i]["low"] == "" || supremeArray[i]["low"] == null) && (supremeArray[i]["ltp"] == "" || supremeArray[i]["ltp"] == null) && (supremeArray[i]["bp"] == "" || supremeArray[i]["bp"] == null) && (supremeArray[i]["bq"] == "" || supremeArray[i]["bq"] == null) && (supremeArray[i]["bv"] == "" || supremeArray[i]["bv"] == null) && (supremeArray[i]["sp"] == "" || supremeArray[i]["sp"] == null) && (supremeArray[i]["sq"] == "" || supremeArray[i]["sq"] == null) && (supremeArray[i]["sv"] == "" || supremeArray[i]["sv"] == null) && (supremeArray[i]["nq"] == "" || supremeArray[i]["nq"] == null) && (supremeArray[i]["nv"] == "" || supremeArray[i]["nv"] == null) && (supremeArray[i]["avg"] == "" || supremeArray[i]["avg"] == null) && (supremeArray[i]["mtm"] == "" || supremeArray[i]["mtm"] == null)) {

                    } else {
                        superSupreme.push(supremeArray[i]);
                    }
                }

                var createFile = function(arr, type) {
                    var json2xls = require('json2xls');
                    var xls = json2xls(arr);
                    if (type == 2 || type == 3) {
                        res.emit('progressLane', "Getting file ready.");
                    }
                    if (type == 1 || type == 2) {
                        var filename = "download.xlsx"; //Math.floor((Math.random()*10000000))+".xlsx";
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

                if (checked == 1) {
                    createFile(superSupreme, 1);
                    superSupreme = null;
                } else {
                    callback(superSupreme);
                    superSupreme = null;
                }
            },
            putTNQ: function(arr, callback) {
                for (var i = 0; i < arr.length; i++) {
                    if ((arr[i]["NQ"] === null || arr[i]["NQ"] === undefined || arr[i]["NQ"] === "") && (arr[i]["nq"] === null || arr[i]["nq"] === undefined || arr[i]["nq"] === "")) {
                        arr[i]["TNQ"] = "";
                    } else if (arr[i]["NQ"] === null || arr[i]["NQ"] === undefined || arr[i]["NQ"] === "") {
                        arr[i]["TNQ"] = parseInt(arr[i]["nq"]);
                    } else if (arr[i]["nq"] === null || arr[i]["nq"] === undefined || arr[i]["nq"] === "") {
                        arr[i]["TNQ"] = parseInt(arr[i]["NQ"]);
                    } else {
                        arr[i]["TNQ"] = parseInt(arr[i]["NQ"]) + parseInt(arr[i]["nq"]);
                    }
                }

                callback(arr, this.putCP);
            },
            compareDates: function(date1, date2) {
                if (date1 === "" || date1 === undefined) {
                    return 1;
                } else if (date2 === "" || date2 === undefined) {
                    return 2;
                } else if (date1 === "" && date2 === "") {
                    return 3
                } else if (date1 === undefined && date2 === undefined) {
                    return 0;
                } else {
                    date1 = date1.replace("Jan", "01").replace("Feb", "02").replace("Mar", "03").replace("Apr", "04").replace("May", "05").replace("Jun", "06").replace("Jul", "07").replace("Aug", "08").replace("Sep", "09").replace("Oct", "10").replace("Nov", "11").replace("Dec", "12");
                    date2 = date2.replace("Jan", "01").replace("Feb", "02").replace("Mar", "03").replace("Apr", "04").replace("May", "05").replace("Jun", "06").replace("Jul", "07").replace("Aug", "08").replace("Sep", "09").replace("Oct", "10").replace("Nov", "11").replace("Dec", "12");
                    if (date1 > date2) {
                        return 4;
                    }
                    if (date2 > date1) {
                        return 4;
                    }
                    if (date1 === date2) {
                        return 5;
                    }
                }

            },
            dataTrimmer: function(arr) {

                for (var i = 0; i < arr.length; i++) {
                    var patt = /-/;
                    var pos = arr[i]["Date"].search(patt);
                    var day = arr[i]["Date"].substring(0, pos);
                    var mon = arr[i]["Date"].substring(pos + 1, pos + 4);
                    var patt = /-/;
                    var pos = arr[i]["Date"].search(patt);
                    var remainingString = arr[i]["Date"].substring(pos + 1, arr[i]["Date"].length);
                    var yea = Math.abs(remainingString.substring(pos + 2, remainingString.length));
                    if (day.length == 1) {
                        day = "0" + day;
                        arr[i]["Date"] = day + "-" + mon + "-" + yea;
                    }
                }

                for (var i = 0; i < arr.length; i++) {
                    for (key in arr[i]) {
                        if (!((key.indexOf('Date') > -1) || (key.indexOf('Open') > -1) || (key.indexOf('High') > -1) || (key.indexOf('Low') > -1) || (key.indexOf('LTP') > -1) || (key.indexOf('Last') > -1))) {
                            delete arr[i][key];
                        }
                    }
                }

                if (arr[0].hasOwnProperty("LTP")) {
                    var pusher = [];
                    for (var i = 0; i < arr.length; i++) {
                        pusher.push({
                            "Date": arr[i]["Date"],
                            "Open": arr[i]["Open"],
                            "High": arr[i]["High"],
                            "Low": arr[i]["Low"],
                            "LTP": arr[i]["LTP"]
                        })
                    }
                    return pusher;
                }
                return arr;
            },
            dataSort: function(arr) {

                arr.sort(function(a, b) {
                    var aDate = a["Date"];
                    var bDate = b["Date"];
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

                return arr;

            },
            dataClean: function(arr) {
                var clArray = [];
                for (var i = 0; i < arr.length; i++) {
                    var obj = arr[i];
                    if (obj.Date == "" || obj.Date == "Date" || obj.Date == null) {} else {
                        clArray.push(obj);
                    }
                }
                return clArray;
            },
            checkLastWednesday: function(date) {
                // var date = new Date(date);
                // var gd = date.getDate();
                // var gy = date.getFullYear();
                // var gm = date.getMonth() + 1;
                // var d = new Date(gy, gm, 1);
                // var dif = (d.getDay() + 2) % 7 + 2;
                // var lastWednesday = new Date(gy, gm, 1 - dif);
                if (underlyingsArray.indexOf(date.toString()) > -1) {
                    return true;
                } else {
                    return false;
                }
            },
            createFile: function(arr, type) {
                var json2xls = require('json2xls');
                var fs = require("fs");
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
            },
            removeRepeatedDates: function(arr, type) {
                var type = type;
                var check = [];
                for (var i = 0; i < arr.length; i++) {
                    if (check.indexOf(arr[i]["Date"]) > -1) {
                        if (type == 1) {
                            arr[i]["Date"] = "";
                            arr[i]["Open"] = "";
                            arr[i]["Low"] = "";
                            arr[i]["High"] = "";
                            arr[i]["LTP"] = "";
                            arr[i]["BP"] = "";
                            arr[i]["BQ"] = "";
                            arr[i]["BV"] = "";
                        }
                        if (type == 2) {
                            arr[i]["Date"] = "";
                            arr[i]["Open"] = "";
                            arr[i]["Low"] = "";
                            arr[i]["High"] = "";
                            arr[i]["LTP"] = "";
                            arr[i]["SP"] = "";
                            arr[i]["SQ"] = "";
                            arr[i]["SV"] = "";
                        }
                    } else {
                        check.push(arr[i]["Date"]);
                    }
                }
                return arr;
            },
            uploadToMysql: function(arr, callback, type) {
                var arrv = [];
                for (var i = 0; i < arr.length; i++) {
                    arr[i]["Transid"] = crypto.createHash('md5').update((Math.random() * 10000000).toString()).digest("hex");
                    arrv.push(Object.keys(arr[i]).map(function(k) {
                        return arr[i][k];
                    }));
                }

                if (type == 1) {
                    con.query('CREATE TEMPORARY TABLE IF NOT EXISTS `logs1` (`id` float(11) NOT NULL AUTO_INCREMENT,`Date` text NOT NULL,`Open` float(11) NOT NULL,`High` float(11) NOT NULL,`Low` float(11) NOT NULL,`LTP` float(11) NOT NULL,`Transid` varchar(32) NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1', function(err, response) {
                        if (err) {
                            throw err;
                        } else {
                            con.query('INSERT INTO logs1 (Date, Open, High, Low, LTP, Transid) VALUES ?', [arrv], function(err, response) {
                                if (err) {
                                    throw err;
                                } else {
                                    callback();
                                }
                            });
                        }

                    });
                }
                if (type == 2) {
                    con.query('CREATE TEMPORARY TABLE IF NOT EXISTS `logs2` (`id` float(11) NOT NULL AUTO_INCREMENT,`Date` text NOT NULL,`Open` float(11) NOT NULL,`High` float(11) NOT NULL,`Low` float(11) NOT NULL,`LTP` float(11) NOT NULL,`Transid` varchar(32) NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1', function(err, response) {
                        if (err) {
                            throw err;
                        } else {
                            con.query('INSERT INTO logs2 (Date, Open, High, Low, LTP, Transid) VALUES ?', [arrv], function(err, response) {
                                if (err) {
                                    throw err;
                                } else {
                                    callback();
                                }
                            });
                        }

                    });
                }
            },
            concateThem: function(arr1, arr2) {
                var finalArray = [];
                var oneTime = {};
                var length = (arr1.length >= arr2.length) ? arr1.length : arr2.length;
                if (arr1.length > arr2.length) {
                    for (var i = arr2.length + 1; i <= arr1.length; i++) {
                        arr2.push({
                            "Date": "",
                            "Open": "",
                            "High": "",
                            "Low": "",
                            "LTP": "",
                            "BP": "",
                            "BQ": "",
                            "BV": "",
                            "toDate": "",
                            "toSP": "",
                            "SP": "",
                            "SQ": "",
                            "SV": "",
                            "NQ": "",
                            "NV": "",
                            "Average": "",
                            "MTM": ""
                        });
                    }
                } else {
                    for (var i = arr1.length + 1; i <= arr2.length; i++) {
                        arr1.push({
                            "Date": "",
                            "Open": "",
                            "High": "",
                            "Low": "",
                            "LTP": "",
                            "BP": "",
                            "BQ": "",
                            "BV": "",
                            "OnDate": "",
                            "SP": "",
                            "SQ": "",
                            "SV": "",
                            "NQ": "",
                            "NV": "",
                            "Average": "",
                            "MTM": ""
                        });
                    }
                }

                var length = (arr1.length <= arr2.length) ? arr1.length : arr2.length;
                for (var i = 0; i < length; i++) {
                    var type = this.compareDates(arr1[i]["Date"], arr2[i]["Date"]);
                    if (type == 1) {
                        var count = 0;
                        for (var j = i;; j++) {
                            if (arr2[i]["Date"] !== arr1[j]["Date"]) {
                                count++;
                            } else {
                                for (var k = 0; k < count; k++) {
                                    arr2.splice(i, 0, {
                                        "Date": "",
                                        "Open": "",
                                        "High": "",
                                        "Low": "",
                                        "LTP": "",
                                        "BP": "",
                                        "BQ": "",
                                        "BV": "",
                                        "toDate": "",
                                        "toSP": "",
                                        "SP": "",
                                        "SQ": "",
                                        "SV": "",
                                        "NQ": "",
                                        "NV": "",
                                        "Average": "",
                                        "MTM": ""
                                    });
                                }
                                count = 0;
                                break;
                            }
                        }
                    }


                    if (type == 2) {
                        var count = 0;
                        for (var j = i;; j++) {
                            if (arr1[i]["Date"] !== arr2[j]["Date"]) {
                                count++;
                            } else {
                                for (var k = 0; k < count; k++) {
                                    arr1.splice(i, 0, {
                                        "Date": "",
                                        "Open": "",
                                        "High": "",
                                        "Low": "",
                                        "LTP": "",
                                        "BP": "",
                                        "BQ": "",
                                        "BV": "",
                                        "OnDate": "",
                                        "SP": "",
                                        "SQ": "",
                                        "SV": "",
                                        "NQ": "",
                                        "NV": "",
                                        "Average": "",
                                        "MTM": ""
                                    });
                                }
                                count = 0;
                                break;
                            }
                        }
                    }
                    length = (arr1.length <= arr2.length) ? arr1.length : arr2.length;
                }

                if (arr1.length > arr2.length) {
                    for (var i = arr2.length + 1; i <= arr1.length; i++) {
                        arr2.push({
                            "Date": "",
                            "Open": "",
                            "High": "",
                            "Low": "",
                            "LTP": "",
                            "BP": "",
                            "BQ": "",
                            "BV": "",
                            "toDate": "",
                            "toSP": "",
                            "SP": "",
                            "SQ": "",
                            "SV": "",
                            "NQ": "",
                            "NV": "",
                            "Average": "",
                            "MTM": ""
                        });
                    }
                } else {
                    for (var i = arr1.length + 1; i <= arr2.length; i++) {
                        arr1.push({
                            "Date": "",
                            "Open": "",
                            "High": "",
                            "Low": "",
                            "LTP": "",
                            "BP": "",
                            "BQ": "",
                            "BV": "",
                            "OnDate": "",
                            "SP": "",
                            "SQ": "",
                            "SV": "",
                            "NQ": "",
                            "NV": "",
                            "Average": "",
                            "MTM": ""
                        });
                    }
                }

                var length = (arr1.length >= arr2.length) ? arr1.length : arr2.length;
                for (var i = 0; i < length; i++) {
                    oneTime["DATE"] = arr1[i]["Date"];
                    oneTime["OPEN"] = arr1[i]["Open"];
                    oneTime["HIGH"] = arr1[i]["High"];
                    oneTime["LOW"] = arr1[i]["Low"];
                    oneTime["LTP"] = arr1[i]["LTP"];
                    oneTime["BP"] = arr1[i]["BP"];
                    oneTime["BQ"] = arr1[i]["BQ"];
                    oneTime["BV"] = arr1[i]["BV"];
                    oneTime["OnDate"] = arr1[i]["OnDate"];
                    oneTime["SP"] = arr1[i]["SP"];
                    oneTime["SQ"] = arr1[i]["SQ"];
                    oneTime["SV"] = arr1[i]["SV"];
                    oneTime["NQ"] = arr1[i]["NQ"];
                    oneTime["NV"] = arr1[i]["NV"];
                    oneTime["AVERAGE"] = arr1[i]["Average"];
                    oneTime["MTM"] = arr1[i]["MTM"];

                    oneTime["date"] = arr2[i]["Date"];
                    oneTime["open"] = arr2[i]["Open"];
                    oneTime["high"] = arr2[i]["High"];
                    oneTime["low"] = arr2[i]["Low"];
                    oneTime["ltp"] = arr2[i]["LTP"];
                    oneTime["bp"] = arr2[i]["BP"];
                    oneTime["bq"] = arr2[i]["BQ"];
                    oneTime["bv"] = arr2[i]["BV"];
                    oneTime["toDate"] = arr2[i]["toDate"];
                    oneTime["toSP"] = arr2[i]["toSP"];
                    oneTime["sp"] = arr2[i]["SP"];
                    oneTime["sq"] = arr2[i]["SQ"];
                    oneTime["sv"] = arr2[i]["SV"];
                    oneTime["nq"] = arr2[i]["NQ"];
                    oneTime["nv"] = arr2[i]["NV"];
                    oneTime["average"] = arr2[i]["Average"];
                    oneTime["mtm"] = arr2[i]["MTM"];
                    finalArray.push(oneTime);
                    oneTime = {};
                }
                this.putTNQ(finalArray, this.putTNV);
                con.end();
            }
        },

        algoOne: function() {
            var that = this;
            con.connect(function(err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    var toCheck = parseFloat(plusvalue);
                    var finalStep = function(arr1) {

                        that.algoTwo(arr1);

                    }

                    var cleanAgain = function(arr, rows, callback) {
                        var rows = that.functions.removeRepeatedDates(rows, 1);
                        callback(arr, rows, putNV);
                    }

                    var putGapAfterLastDay = function(arr, callback) {

                        var firstDays = [];

                        var getPreviousDate = function(i) {
                            for (var t = i - 1; t > 0; t--) {
                                if (arr[t]["Date"] !== null && arr[t]["Date"] != "") {
                                    return arr[t]["Date"];
                                }
                            }
                        }

                        var getNextEntry = function(i) {
                            for (var t = i + 1; t < arr.length; t++) {
                                if (arr[t]["Date"] !== null && arr[t]["Date"] != "") {
                                    return t;
                                }
                            }
                        }

                        for (var i = 1; i < arr.length; i++) {
                            if (arr[i]["Date"] != null && arr[i]["Date"] != "") {
                                if (arr[i]["Date"] != "" && arr[i]["Date"] != null) {
                                    nowRealDate = arr[i]["Date"];
                                    nowDate = arr[i]["Date"].substring(3, arr.length);
                                    previousRealDate = getPreviousDate(i);
                                    if (previousRealDate === undefined) {

                                    } else {
                                        previousDate = previousRealDate.substring(3, arr.length);
                                        if (nowDate != previousDate) {
                                            firstDays.push(nowRealDate);
                                        }
                                    }
                                }
                            }
                        }

                        var checkFirstDay = function(date) {
                            if (firstDays.indexOf(date) > -1) {
                                return true;
                            } else {
                                return false;
                            }
                        }

                        for (var i = 1; i < arr.length; i++) {
                            if (arr[i]["Date"] != "" && checkFirstDay(arr[i]["Date"])) {
                                arr.splice(i, 0, {
                                    "Date": "",
                                    "Open": "",
                                    "Low": "",
                                    "High": "",
                                    "LTP": "",
                                    "BP": "",
                                    "BQ": "",
                                    "BV": "",
                                    "OnDate": "",
                                    "SP": "",
                                    "SQ": "",
                                    "SV": "",
                                    "NQ": "",
                                    "NV": "",
                                    "Average": "",
                                    "MTM": ""
                                });

                                i = i + 2;
                            }
                        }
                        callback(arr);
                    }

                    var putGapAfterLastwednesday = function(arr, callback) {
                        var getPreviousDate = function(i) {
                            var i = i - 1;
                            if (arr[i]["Date"] != "") {
                                return arr[i]["Date"];
                            } else {
                                for (var t = i; t >= 0; t--) {
                                    if (arr[t]["Date"] != "") {
                                        return arr[t]["Date"];
                                    }
                                }
                            }
                        }

                        for (var i = 1; i < arr.length; i++) {
                            if ((arr[i]["Date"] != "") && (that.functions.checkLastWednesday(getPreviousDate(i)))) {
                                arr.splice(i, 0, {
                                    "Date": "",
                                    "Open": "",
                                    "Low": "",
                                    "High": "",
                                    "LTP": "",
                                    "BP": "",
                                    "BQ": "",
                                    "BV": "",
                                    "OnDate": "",
                                    "SP": "",
                                    "SQ": "",
                                    "SV": "",
                                    "NQ": "",
                                    "NV": "",
                                    "Average": "",
                                    "MTM": ""
                                });

                                i = i + 2;
                            }

                        }
                        callback(arr);
                    }

                    var putMTM = function(arr, callback) {
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i]["LTP"] != "") {
                                arr[i]["MTM"] = (that.maths.pf(arr[i]["Average"]) - that.maths.pf(arr[i]["LTP"])) * that.maths.pf(arr[i]["NQ"]);
                            } else {
                                var getPreviousLTP = function(i) {
                                    var i = i - 1;
                                    if (arr[i]["LTP"] != "") {
                                        return arr[i]["LTP"];
                                    } else {
                                        for (var t = i; t >= 0; t--) {
                                            if (arr[t]["LTP"] != "") {
                                                return arr[t]["LTP"];
                                            }
                                        }
                                    }
                                }
                                arr[i]["MTM"] = ((that.maths.pf(arr[i]["Average"]) - that.maths.pf(getPreviousLTP(i))) * that.maths.pf(arr[i]["NQ"])).toFixed(2);
                            }
                        }
                        callback(arr, finalStep);
                    }

                    var putAverage = function(arr, callback) {
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i]["NQ"] == 0) {
                                arr[i]["Average"] = 0;
                            } else {
                                arr[i]["Average"] = (that.maths.pf(arr[i]["NV"]) / that.maths.pf(arr[i]["NQ"])).toFixed(2);
                            }
                        }
                        if (currency == 1) {
                            callback(arr, putGapAfterLastDay);
                        } else {
                            callback(arr, putGapAfterLastwednesday);
                        }
                    }


                    var putNV = function(arr, rows, callback) {

                        if (dontSquare == 1) {

                            for (var i = 0; i < rows.length; i++) {
                                if (i == 0) {
                                    if (rows[i]["SP"] === null) {
                                        rows[i]["NV"] = that.maths.pf(rows[i]["BV"]);
                                    } else {
                                        rows[i]["NV"] = that.maths.pf(rows[i]["BV"]) - that.maths.pf(rows[i]["SV"]);
                                    }
                                } else {

                                    var getPreviousDate = function(i) {
                                        var i = i - 1;
                                        if (rows[i]["Date"] != "") {
                                            return rows[i]["Date"];
                                        } else {
                                            for (var t = i; t >= 0; t--) {
                                                if (rows[t]["Date"] != "") {
                                                    return rows[t]["Date"];
                                                }
                                            }
                                        }
                                    }

                                    if (currency == 1) {

                                        if (rows[i]["SP"] == null && rows[i]["BP"] != null) {
                                            rows[i]["NV"] = that.maths.pf(rows[i]["BV"]) + that.maths.pf(rows[i - 1]["NV"]);
                                        }
                                        if (rows[i]["SP"] != null && rows[i]["BP"] != null) {
                                            rows[i]["NV"] = (that.maths.pf(rows[i - 1]["NV"]) + that.maths.pf(rows[i]["BV"])) - that.maths.pf(rows[i]["SV"]);
                                        }
                                        if (rows[i]["BP"] == "" && rows[i]["SP"] != null) {
                                            rows[i]["NV"] = that.maths.pf(rows[i - 1]["NV"]) - that.maths.pf(rows[i]["SV"]);
                                        }

                                    } else {
                                        if (rows[i]["SP"] == null && rows[i]["BP"] != null) {
                                            rows[i]["NV"] = that.maths.pf(rows[i]["BV"]) + that.maths.pf(rows[i - 1]["NV"]);
                                        }
                                        if (rows[i]["SP"] != null && rows[i]["BP"] != null) {
                                            rows[i]["NV"] = (that.maths.pf(rows[i - 1]["NV"]) + that.maths.pf(rows[i]["BV"])) - that.maths.pf(rows[i]["SV"]);
                                        }
                                        if (rows[i]["BP"] == "" && rows[i]["SP"] != null) {
                                            rows[i]["NV"] = that.maths.pf(rows[i - 1]["NV"]) - that.maths.pf(rows[i]["SV"]);
                                        }
                                    }
                                }
                            }
                            callback(rows, putMTM);

                        } else {

                            var lastDays = [];
                            var getNextDate = function(i) {
                                for (var t = i + 1; t < rows.length; t++) {
                                    if (rows[t]["Date"] !== null && rows[t]["Date"] != "") {
                                        return rows[t]["Date"];
                                    }
                                }
                            }

                            for (var i = 0; i < rows.length; i++) {
                                if (i > (rows.length - 1)) {} else {
                                    if (rows[i]["Date"] != null && rows[i]["Date"] != "") {

                                        var nextDate = getNextDate(i);
                                        if (nextDate === undefined) {

                                        } else {
                                            var nowDate = rows[i]["Date"].substring(3, rows.length);
                                            var nextDate = getNextDate(i);
                                            nextDate = nextDate.substring(3, rows.length);
                                            if (nowDate != nextDate) {
                                                lastDays.push(rows[i]["Date"]);
                                            }
                                        }
                                    }
                                }
                            }

                            var checkLastDay = function(date) {
                                if (lastDays.indexOf(date) > -1) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }


                            var firstDays = [];

                            var getPreviousDate = function(i) {
                                for (var t = i - 1; t > 0; t--) {
                                    if (rows[t]["Date"] !== null && rows[t]["Date"] != "") {
                                        return rows[t]["Date"];
                                    }
                                }
                            }

                            var getNextEntry = function(i) {
                                for (var t = i + 1; t < rows.length; t++) {
                                    if (rows[t]["Date"] !== null && rows[t]["Date"] != "") {
                                        return t;
                                    }
                                }
                            }

                            for (var i = 1; i < rows.length; i++) {
                                if (rows[i]["Date"] != null && rows[i]["Date"] != "") {
                                    if (rows[i]["Date"] != "" && rows[i]["Date"] != null) {
                                        nowRealDate = rows[i]["Date"];
                                        nowDate = rows[i]["Date"].substring(3, rows.length);
                                        previousRealDate = getPreviousDate(i);
                                        if (previousRealDate === undefined) {

                                        } else {
                                            previousDate = previousRealDate.substring(3, rows.length);
                                            if (nowDate != previousDate) {
                                                firstDays.push(nowRealDate);
                                            }
                                        }
                                    }
                                }
                            }

                            var checkFirstDay = function(date) {
                                if (firstDays.indexOf(date) > -1) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }

                            for (var i = 0; i < rows.length; i++) {
                                if (i == 0) {
                                    if (rows[i]["SP"] === null) {
                                        rows[i]["NV"] = that.maths.pf(rows[i]["BV"]);
                                    } else {
                                        rows[i]["NV"] = that.maths.pf(rows[i]["BV"]) - that.maths.pf(rows[i]["SV"]);
                                    }
                                } else {

                                    var getPreviousDate = function(i) {
                                        var i = i - 1;
                                        if (rows[i]["Date"] != "") {
                                            return rows[i]["Date"];
                                        } else {
                                            for (var t = i; t >= 0; t--) {
                                                if (rows[t]["Date"] != "") {
                                                    return rows[t]["Date"];
                                                }
                                            }
                                        }
                                    }

                                    if (currency == 1) {

                                        if (underlyings == 1) {

                                            if ((rows[i]["Date"]) != "" && (underlyingsArray.indexOf(getPreviousDate(i)) > -1)) {
                                                if (rows[i]["SP"] == null && rows[i]["BP"] != null) {
                                                    rows[i]["NV"] = that.maths.pf(rows[i]["BV"]);
                                                }
                                                if (rows[i]["SP"] != null && rows[i]["BP"] != null) {
                                                    rows[i]["NV"] = that.maths.pf(rows[i]["BV"]) - that.maths.pf(rows[i]["SV"]);
                                                }
                                                if (rows[i]["BP"] == "" && rows[i]["SP"] != null) {
                                                    rows[i]["NV"] = that.maths.pf(rows[i - 1]["NV"]) - that.maths.pf(rows[i]["SV"]);
                                                }
                                            } else {

                                                if (rows[i]["SP"] == null && rows[i]["BP"] != null) {
                                                    rows[i]["NV"] = that.maths.pf(rows[i]["BV"]) + that.maths.pf(rows[i - 1]["NV"]);
                                                }
                                                if (rows[i]["SP"] != null && rows[i]["BP"] != null) {
                                                    rows[i]["NV"] = (that.maths.pf(rows[i - 1]["NV"]) + that.maths.pf(rows[i]["BV"])) - that.maths.pf(rows[i]["SV"]);
                                                }
                                                if (rows[i]["BP"] == "" && rows[i]["SP"] != null) {
                                                    rows[i]["NV"] = that.maths.pf(rows[i - 1]["NV"]) - that.maths.pf(rows[i]["SV"]);

                                                }
                                            }

                                        } else {
                                            if ((rows[i]["Date"]) != "" && checkFirstDay(rows[i]["Date"])) {
                                                if (rows[i]["SP"] == null && rows[i]["BP"] != null) {
                                                    rows[i]["NV"] = that.maths.pf(rows[i]["BV"]);
                                                }
                                                if (rows[i]["SP"] != null && rows[i]["BP"] != null) {
                                                    rows[i]["NV"] = that.maths.pf(rows[i]["BV"]) - that.maths.pf(rows[i]["SV"]);
                                                }
                                                if (rows[i]["BP"] == "" && rows[i]["SP"] != null) {
                                                    rows[i]["NV"] = that.maths.pf(rows[i - 1]["NV"]) - that.maths.pf(rows[i]["SV"]);
                                                }
                                            } else {

                                                if (rows[i]["SP"] == null && rows[i]["BP"] != null) {
                                                    rows[i]["NV"] = that.maths.pf(rows[i]["BV"]) + that.maths.pf(rows[i - 1]["NV"]);
                                                }
                                                if (rows[i]["SP"] != null && rows[i]["BP"] != null) {
                                                    rows[i]["NV"] = (that.maths.pf(rows[i - 1]["NV"]) + that.maths.pf(rows[i]["BV"])) - that.maths.pf(rows[i]["SV"]);
                                                }
                                                if (rows[i]["BP"] == "" && rows[i]["SP"] != null) {
                                                    rows[i]["NV"] = that.maths.pf(rows[i - 1]["NV"]) - that.maths.pf(rows[i]["SV"]);

                                                }
                                            }
                                        }

                                    } else {

                                        if ((rows[i]["Date"]) != "" && that.functions.checkLastWednesday(getPreviousDate(i))) {
                                            if (rows[i]["SP"] == null && rows[i]["BP"] != null) {
                                                rows[i]["NV"] = that.maths.pf(rows[i]["BV"]);
                                            }
                                            if (rows[i]["SP"] != null && rows[i]["BP"] != null) {
                                                rows[i]["NV"] = that.maths.pf(rows[i]["BV"]) - that.maths.pf(rows[i]["SV"]);
                                            }
                                            if (rows[i]["BP"] == "" && rows[i]["SP"] != null) {
                                                rows[i]["NV"] = that.maths.pf(rows[i - 1]["NV"]) - that.maths.pf(rows[i]["SV"]);
                                            }
                                        } else {
                                            if (rows[i]["SP"] == null && rows[i]["BP"] != null) {
                                                rows[i]["NV"] = that.maths.pf(rows[i]["BV"]) + that.maths.pf(rows[i - 1]["NV"]);
                                            }
                                            if (rows[i]["SP"] != null && rows[i]["BP"] != null) {
                                                rows[i]["NV"] = (that.maths.pf(rows[i - 1]["NV"]) + that.maths.pf(rows[i]["BV"])) - that.maths.pf(rows[i]["SV"]);
                                            }
                                            if (rows[i]["BP"] == "" && rows[i]["SP"] != null) {
                                                rows[i]["NV"] = that.maths.pf(rows[i - 1]["NV"]) - that.maths.pf(rows[i]["SV"]);

                                            }
                                        }
                                    }
                                }
                            }
                            callback(rows, putMTM);
                        }
                    }

                    var putNQ = function(arr, rows, callback) {
                        for (var i = 0; i < rows.length; i++) {
                            if (i == 0) {
                                if (rows[i]["SP"] === null) {
                                    rows[i]["NQ"] = that.maths.pi(rows[i]["BQ"]);
                                } else {
                                    rows[i]["NQ"] = that.maths.pi(rows[i]["BQ"]) - that.maths.pi(rows[i]["SQ"]);
                                }
                            } else {
                                if (rows[i]["SP"] == null && rows[i]["BP"] != null) {
                                    rows[i]["NQ"] = that.maths.pi(rows[i]["BQ"]) + that.maths.pi(rows[i - 1]["NQ"]);
                                }
                                if (rows[i]["SP"] != null && rows[i]["BP"] != null) {
                                    rows[i]["NQ"] = that.maths.abs((that.maths.pi(rows[i - 1]["NQ"]) + that.maths.pi(rows[i]["BQ"])) - that.maths.pi(rows[i]["SQ"]));
                                }
                                if (rows[i]["BP"] == "" && rows[i]["SP"] != null) {
                                    rows[i]["NQ"] = that.maths.abs(that.maths.pi(rows[i - 1]["NQ"]) - that.maths.pi(rows[i]["SQ"]));
                                }
                            }

                        }
                        callback(arr, rows, putAverage);
                    }


                    var returnJoin = function(arr) {
                        var query = "SELECT tabl.Date,tabl.Open,tabl.High,tabl.Low,tabl.LTP,tabl.BP, tabl.BQ,(SELECT tabl.BP*tabl.BQ) AS BV,tabl.OnDate, tabl.SP,tabl.SQ,(SELECT tabl.SP*tabl.SQ) AS SV FROM sellbuy RIGHT JOIN(SELECT tabl.id,tabl.Date,tabl.Open,tabl.High,tabl.Low,tabl.LTP,tabl.BP, tabl.BQ,tabl.OnDate, tabl.SP,tabl.SQ,notsquared.BP AS BPN,notsquared.BQ as BQN,(SELECT logger1.Transid FROM logger1 WHERE logger1.Date = tabl.OnDate) AS mapper FROM notsquared RIGHT JOIN(SELECT logs1.Date AS Date,logs1.id,logs1.Open, logs1.High, logs1.Low, logs1.LTP, tab.BP, tab.BQ, tab.OnDate,tab.Transid,tab.SP,tab.SQ FROM logs1 LEFT JOIN(SELECT buy.Transid,buy.BP,buy.BQ, sell.todate AS OnDate, sell.SP, sell.SQ FROM buy LEFT JOIN sell ON buy.Transid = sell.bykey ORDER BY buy.id) AS tab ON logs1.Transid = tab.Transid ORDER BY logs1.id) AS tabl ON tabl.Transid = notsquared.Transid ORDER BY tabl.id) AS tabl ON tabl.mapper = sellbuy.Transid ORDER BY tabl.id";

                        con.query(query, function(err, rows, fields) {
                            if (err) throw err;
                            cleanAgain(arr, rows, putNQ);

                        });
                    }

                    var sayHi = function(arr) {
                        con.query('CREATE TEMPORARY TABLE logger1 LIKE logs1', function(err, response) {
                            if (err) {
                                console.log("Error here");
                                throw err;
                            } else {
                                con.query('INSERT INTO logger1 SELECT * FROM logs1', function(err, response) {
                                    if (err) {
                                        console.log("Error there");
                                        throw err;
                                    } else {
                                        returnJoin(arr);
                                    }
                                });
                            }
                        });
                    }

                    var sellAndBuyDb = function(arr, callback) {
                        var sellAndBuy = [];
                        arr.forEach(function(a, i) {
                            if ((arr[i]["status"] == 1) && (arr[i]["F"] > arr[arr[i]["I"]]["Low"])) {
                                sellAndBuy.push([arr[arr[i]["I"]]["Low"], boughtQuantity, arr[i]["Transid"], arr[i]["O"]]);
                            }
                        });
                        con.query('CREATE TEMPORARY TABLE `sellbuy` (`id` int(11) NOT NULL AUTO_INCREMENT,`BP` float NOT NULL,`BQ` float NOT NULL,`Transid` varchar(32) NOT NULL,`atkey` varchar(32) NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1', function(err, response) {
                            if (err) {
                                throw err;
                            } else {
                                con.query('INSERT INTO sellbuy (BP, BQ, Transid, atkey) VALUES ?', [sellAndBuy], function(err, response) {
                                    if (err) {
                                        throw err;
                                    } else {
                                        callback(arr);
                                    }
                                });
                            }
                        });
                    }

                    var notSquaredDb = function(arr, callback) {
                        var notSquar = [];
                        arr.forEach(function(a, i) {
                            if (arr[i]["status"] != 1) {
                                notSquar.push([arr[i]["Date"], arr[i]["Open"], boughtQuantity, arr[i]["Transid"]]);
                            }
                        });
                        if (notSquar.length != 0) {
                            con.query('CREATE TEMPORARY TABLE `notsquared` (`id` int(11) NOT NULL AUTO_INCREMENT,`Date` text NOT NULL,`BP` float NOT NULL,`BQ` float NOT NULL,`Transid`varchar(32) NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1', function(err, response) {
                                if (err) {
                                    throw err;
                                } else {
                                    con.query('INSERT INTO notsquared (Date, BP, BQ, Transid) VALUES ?', [notSquar], function(err, response) {
                                        if (err) {
                                            throw err;
                                        } else {
                                            callback(arr, sayHi);
                                        }
                                    });
                                }
                            });
                        } else {
                            con.query('CREATE TEMPORARY TABLE `notsquared` (`id` int(11) NOT NULL AUTO_INCREMENT,`Date` text NOT NULL,`BP` float NOT NULL,`BQ` float NOT NULL,`Transid`varchar(32) NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1', function(err, response) {
                                if (err) {
                                    throw err;
                                } else {
                                    callback(arr, sayHi);
                                }
                            });

                        }
                    }

                    var buyAllDb = function(arr, callback) {
                        var buyAll = [];
                        arr.forEach(function(a, i) {
                            buyAll.push([arr[i]["Date"], arr[i]["Open"], boughtQuantity, arr[i]["Transid"]]);
                        });
                        con.query('CREATE TEMPORARY TABLE `buy` (`id` int(11) NOT NULL AUTO_INCREMENT,`Date` text NOT NULL,`BP` float NOT NULL,`BQ` float NOT NULL,`Transid` varchar(32)NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1', function(err, response) {
                            if (err) {
                                throw err;
                            } else {
                                con.query('INSERT INTO buy (Date, BP, BQ, Transid) VALUES ?', [buyAll], function(err, response) {
                                    if (err) {
                                        throw err;
                                    } else {
                                        callback(arr, notSquaredDb);
                                    }
                                });
                            }

                        });

                    }

                    var applyLogicDb = function(arr, callback) {

                        if (dontSquare == 1) {
                            var squareAll = [];
                            var setIt = 0;
                            for (var i = setIt; i < arr.length; i++) {

                                if (that.maths.pf(arr[i]['LTP']) > that.maths.pf(arr[i]['Open'])) {
                                    arr[i]["status"] = 1;
                                    squareAll.push([arr[i]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["LTP"]), soldQuantity, arr[i]["Transid"], arr[i]["Transid"]]);
                                    arr[i]["F"] = that.maths.pf(arr[i]['LTP']);
                                    arr[i]["I"] = i;
                                    arr[i]["O"] = arr[i]["Transid"];
                                }

                                var date = arr[i]["Date"];

                                if (currency == 1) {

                                    for (var j = 0; j <= i; j++) {
                                        if (arr[j]["status"] == 1) {
                                            continue;
                                        }
                                        if (that.maths.pf(arr[i]['Open']) >= (that.maths.pf(arr[j]['Open']) + toCheck)) {
                                            arr[j]["status"] = 1;
                                            squareAll.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["Open"]), soldQuantity, arr[i]["Transid"], arr[j]["Transid"]]);
                                            arr[j]["F"] = that.maths.pf(arr[i]['Open']);
                                            arr[j]["I"] = i;
                                            arr[j]["O"] = arr[i]["Transid"];
                                        } else if ((that.maths.pf(arr[i]['High']) >= (that.maths.pf(arr[j]['Open']) + toCheck)) && (i != j)) {
                                            arr[j]["status"] = 1;
                                            squareAll.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[j]['Open']) + toCheck, soldQuantity, arr[i]["Transid"], arr[j]["Transid"]]);
                                            arr[j]["F"] = that.maths.pf(arr[i]['High']);
                                            arr[j]["I"] = i;
                                            arr[j]["O"] = arr[i]["Transid"];
                                        }
                                    }

                                } else {
                                    for (var j = 0; j <= i; j++) {
                                        if (arr[j]["status"] == 1) {
                                            continue;
                                        }
                                        if (that.maths.pf(arr[i]['Open']) >= (that.maths.pf(arr[j]['Open']) + toCheck)) {
                                            arr[j]["status"] = 1;
                                            squareAll.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["Open"]), soldQuantity, arr[i]["Transid"], arr[j]["Transid"]]);
                                            arr[j]["F"] = that.maths.pf(arr[i]['Open']);
                                            arr[j]["I"] = i;
                                            arr[j]["O"] = arr[i]["Transid"];
                                        } else if ((that.maths.pf(arr[i]['High']) >= (that.maths.pf(arr[j]['Open']) + toCheck)) && (i != j)) {
                                            arr[j]["status"] = 1;
                                            squareAll.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[j]['Open']) + toCheck, soldQuantity, arr[i]["Transid"], arr[j]["Transid"]]);
                                            arr[j]["F"] = that.maths.pf(arr[i]['High']);
                                            arr[j]["I"] = i;
                                            arr[j]["O"] = arr[i]["Transid"];
                                        }
                                    }
                                }
                            }

                            con.query('CREATE TEMPORARY TABLE `sell` (`id` int(11) NOT NULL AUTO_INCREMENT,`todate` text NOT NULL,`ondate` text NOT NULL,`SP` float NOT NULL,`SQ` float NOT NULL,`bykey` varchar(32) NOT NULL,`tokey` varchar(32) NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1', function(err, response) {
                                if (err) {
                                    throw err;
                                } else {
                                    con.query('INSERT INTO sell (todate, ondate, SP, SQ, bykey, tokey) VALUES ?', [squareAll], function(err, response) {
                                        if (err) {
                                            throw err;
                                        } else {
                                            callback(arr, sellAndBuyDb);
                                        }
                                    });
                                }

                            });

                        } else {
                            var lastDays = [];

                            var getNextDate = function(i) {
                                for (var t = i + 1; t < arr.length; t++) {
                                    if (arr[t]["Date"] !== null && arr[t]["Date"] != "") {
                                        return arr[t]["Date"];
                                    }
                                }
                            }

                            for (var i = 0; i < arr.length; i++) {
                                if (i > (arr.length - 1)) {} else {
                                    if (arr[i]["Date"] != null && arr[i]["Date"] != "") {

                                        var nextDate = getNextDate(i);
                                        if (nextDate === undefined) {

                                        } else {
                                            var nowDate = arr[i]["Date"].substring(3, arr.length);
                                            var nextDate = getNextDate(i);
                                            nextDate = nextDate.substring(3, arr.length);
                                            if (nowDate != nextDate) {
                                                lastDays.push(arr[i]["Date"]);
                                            }
                                        }
                                    }
                                }
                            }

                            var checkLastDay = function(date) {
                                if (lastDays.indexOf(date) > -1) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }

                            var squareAll = [];
                            var setIt = 0;

                            for (var i = setIt; i < arr.length; i++) {

                                if (that.maths.pf(arr[i]['LTP']) > that.maths.pf(arr[i]['Open'])) {
                                    arr[i]["status"] = 1;
                                    squareAll.push([arr[i]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["LTP"]), soldQuantity, arr[i]["Transid"], arr[i]["Transid"]]);
                                    arr[i]["F"] = that.maths.pf(arr[i]['LTP']);
                                    arr[i]["I"] = i;
                                    arr[i]["O"] = arr[i]["Transid"];
                                }

                                var date = arr[i]["Date"];

                                if (currency == 1) {

                                    if (underlyings == 1) {

                                        if ((date != "") && (underlyingsArray.indexOf(date) > -1)) {
                                            for (var j = 0; j <= i; j++) {
                                                if (arr[j]["status"] == 1) {
                                                    continue;
                                                } else {

                                                    if (that.maths.pf(arr[i]['Open']) >= (that.maths.pf(arr[j]['Open']) + toCheck)) {
                                                        arr[j]["status"] = 1;
                                                        squareAll.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["Open"]), soldQuantity, arr[i]["Transid"], arr[j]["Transid"]]);
                                                        arr[j]["F"] = that.maths.pf(arr[i]['Open']);
                                                        arr[j]["I"] = i;
                                                        arr[j]["O"] = arr[i]["Transid"];
                                                    } else {
                                                        squareAll.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["LTP"]), soldQuantity, arr[i]["Transid"], arr[j]["Transid"]]);
                                                        arr[j]["status"] = 1;
                                                        arr[j]["F"] = that.maths.pf(arr[i]['LTP']);
                                                        arr[j]["I"] = i;
                                                        arr[j]["O"] = arr[i]["Transid"];
                                                    }

                                                }

                                            }
                                            setIt = i + 1;
                                        } else {
                                            for (var j = 0; j <= i; j++) {
                                                if (arr[j]["status"] == 1) {
                                                    continue;
                                                }
                                                if (that.maths.pf(arr[i]['Open']) >= (that.maths.pf(arr[j]['Open']) + toCheck)) {
                                                    arr[j]["status"] = 1;
                                                    squareAll.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["Open"]), soldQuantity, arr[i]["Transid"], arr[j]["Transid"]]);
                                                    arr[j]["F"] = that.maths.pf(arr[i]['Open']);
                                                    arr[j]["I"] = i;
                                                    arr[j]["O"] = arr[i]["Transid"];
                                                } else if ((that.maths.pf(arr[i]['High']) >= (that.maths.pf(arr[j]['Open']) + toCheck)) && (i != j)) {
                                                    arr[j]["status"] = 1;
                                                    squareAll.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[j]['Open']) + toCheck, soldQuantity, arr[i]["Transid"], arr[j]["Transid"]]);
                                                    arr[j]["F"] = that.maths.pf(arr[i]['High']);
                                                    arr[j]["I"] = i;
                                                    arr[j]["O"] = arr[i]["Transid"];
                                                }
                                            }
                                        }

                                    } else {

                                        if (checkLastDay(date)) {
                                            for (var j = 0; j <= i; j++) {
                                                if (arr[j]["status"] == 1) {
                                                    continue;
                                                } else {

                                                    if (that.maths.pf(arr[i]['Open']) >= (that.maths.pf(arr[j]['Open']) + toCheck)) {
                                                        arr[j]["status"] = 1;
                                                        squareAll.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["Open"]), soldQuantity, arr[i]["Transid"], arr[j]["Transid"]]);
                                                        arr[j]["F"] = that.maths.pf(arr[i]['Open']);
                                                        arr[j]["I"] = i;
                                                        arr[j]["O"] = arr[i]["Transid"];
                                                    } else {
                                                        squareAll.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["LTP"]), soldQuantity, arr[i]["Transid"], arr[j]["Transid"]]);
                                                        arr[j]["status"] = 1;
                                                        arr[j]["F"] = that.maths.pf(arr[i]['LTP']);
                                                        arr[j]["I"] = i;
                                                        arr[j]["O"] = arr[i]["Transid"];
                                                    }

                                                }

                                            }
                                            setIt = i + 1;
                                        } else {
                                            for (var j = 0; j <= i; j++) {
                                                if (arr[j]["status"] == 1) {
                                                    continue;
                                                }
                                                if (that.maths.pf(arr[i]['Open']) >= (that.maths.pf(arr[j]['Open']) + toCheck)) {
                                                    arr[j]["status"] = 1;
                                                    squareAll.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["Open"]), soldQuantity, arr[i]["Transid"], arr[j]["Transid"]]);
                                                    arr[j]["F"] = that.maths.pf(arr[i]['Open']);
                                                    arr[j]["I"] = i;
                                                    arr[j]["O"] = arr[i]["Transid"];
                                                } else if ((that.maths.pf(arr[i]['High']) >= (that.maths.pf(arr[j]['Open']) + toCheck)) && (i != j)) {
                                                    arr[j]["status"] = 1;
                                                    squareAll.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[j]['Open']) + toCheck, soldQuantity, arr[i]["Transid"], arr[j]["Transid"]]);
                                                    arr[j]["F"] = that.maths.pf(arr[i]['High']);
                                                    arr[j]["I"] = i;
                                                    arr[j]["O"] = arr[i]["Transid"];
                                                }
                                            }
                                        }
                                    }

                                } else {
                                    if (that.functions.checkLastWednesday(date)) {
                                        for (var j = 0; j <= i; j++) {
                                            if (arr[j]["status"] == 1) {
                                                continue;
                                            } else {

                                                if (that.maths.pf(arr[i]['Open']) >= (that.maths.pf(arr[j]['Open']) + toCheck)) {
                                                    arr[j]["status"] = 1;
                                                    squareAll.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["Open"]), soldQuantity, arr[i]["Transid"], arr[j]["Transid"]]);
                                                    arr[j]["F"] = that.maths.pf(arr[i]['Open']);
                                                    arr[j]["I"] = i;
                                                    arr[j]["O"] = arr[i]["Transid"];
                                                } else {
                                                    squareAll.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["LTP"]), soldQuantity, arr[i]["Transid"], arr[j]["Transid"]]);
                                                    arr[j]["status"] = 1;
                                                    arr[j]["F"] = that.maths.pf(arr[i]['LTP']);
                                                    arr[j]["I"] = i;
                                                    arr[j]["O"] = arr[i]["Transid"];
                                                }

                                            }

                                        }
                                        setIt = i + 1;
                                    } else {
                                        for (var j = 0; j <= i; j++) {
                                            if (arr[j]["status"] == 1) {
                                                continue;
                                            }
                                            if (that.maths.pf(arr[i]['Open']) >= (that.maths.pf(arr[j]['Open']) + toCheck)) {
                                                arr[j]["status"] = 1;
                                                squareAll.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["Open"]), soldQuantity, arr[i]["Transid"], arr[j]["Transid"]]);
                                                arr[j]["F"] = that.maths.pf(arr[i]['Open']);
                                                arr[j]["I"] = i;
                                                arr[j]["O"] = arr[i]["Transid"];
                                            } else if ((that.maths.pf(arr[i]['High']) >= (that.maths.pf(arr[j]['Open']) + toCheck)) && (i != j)) {
                                                arr[j]["status"] = 1;
                                                squareAll.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[j]['Open']) + toCheck, soldQuantity, arr[i]["Transid"], arr[j]["Transid"]]);
                                                arr[j]["F"] = that.maths.pf(arr[i]['High']);
                                                arr[j]["I"] = i;
                                                arr[j]["O"] = arr[i]["Transid"];
                                            }
                                        }
                                    }

                                }
                            }
                            con.query('CREATE TEMPORARY TABLE `sell` (`id` int(11) NOT NULL AUTO_INCREMENT,`todate` text NOT NULL,`ondate` text NOT NULL,`SP` float NOT NULL,`SQ` float NOT NULL,`bykey` varchar(32) NOT NULL,`tokey` varchar(32) NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1', function(err, response) {
                                if (err) {
                                    throw err;
                                } else {
                                    con.query('INSERT INTO sell (todate, ondate, SP, SQ, bykey, tokey) VALUES ?', [squareAll], function(err, response) {
                                        if (err) {
                                            throw err;
                                        } else {
                                            callback(arr, sellAndBuyDb);
                                        }
                                    });
                                }

                            });
                        }

                    }

                    var getDataBack = function() {
                        con.query('SELECT Date,Open,High,Low,LTP,Transid FROM logs1 ORDER BY id', function(err, rows, fields) {
                            if (err) throw err;
                            buyAllDb(rows, applyLogicDb);

                        });
                    }

                    var sortIt = function(arr, callback, type) {
                        var arr = that.functions.dataSort(arr);
                        callback(arr, getDataBack, type);
                    }

                    var cleanIt = function(arr, callback) {
                        var clArray = that.functions.dataClean(arr);
                        callback(clArray, that.functions.uploadToMysql, 1);

                    }

                    var trimData = function(result, callback) {
                        var result = that.functions.dataTrimmer(result);
                        callback(result, sortIt);
                    }
                    trimData(result, cleanIt);
                }

            });
        },
        algoTwo: function(arr1) {
            var that = this;
            var toCheck = parseFloat(plusvalue);
            var boughtQuantity = parseFloat(inputQuan);
            var soldQuantity = parseFloat(inputQuan);

            var putGapAfterLastDay = function(arr, callback) {

                var firstDays = [];

                var getPreviousDate = function(i) {
                    for (var t = i - 1; t > 0; t--) {
                        if (arr[t]["Date"] !== null && arr[t]["Date"] != "") {
                            return arr[t]["Date"];
                        }
                    }
                }

                var getNextEntry = function(i) {
                    for (var t = i + 1; t < arr.length; t++) {
                        if (arr[t]["Date"] !== null && arr[t]["Date"] != "") {
                            return t;
                        }
                    }
                }

                for (var i = 1; i < arr.length; i++) {
                    if (arr[i]["Date"] != null && arr[i]["Date"] != "") {
                        if (arr[i]["Date"] != "" && arr[i]["Date"] != null) {
                            nowRealDate = arr[i]["Date"];
                            nowDate = arr[i]["Date"].substring(3, arr.length);
                            previousRealDate = getPreviousDate(i);
                            if (previousRealDate === undefined) {

                            } else {
                                previousDate = previousRealDate.substring(3, arr.length);
                                if (nowDate != previousDate) {
                                    firstDays.push(nowRealDate);
                                }
                            }
                        }
                    }
                }

                var checkFirstDay = function(date) {
                    if (firstDays.indexOf(date) > -1) {
                        return true;
                    } else {
                        return false;
                    }
                }

                for (var i = 1; i < arr.length; i++) {
                    if (arr[i]["Date"] != "" && checkFirstDay(arr[i]["Date"])) {
                        arr.splice(i, 0, {
                            "Date": "",
                            "Open": "",
                            "Low": "",
                            "High": "",
                            "LTP": "",
                            "BP": "",
                            "BQ": "",
                            "BV": "",
                            "OnDate": "",
                            "SP": "",
                            "SQ": "",
                            "SV": "",
                            "NQ": "",
                            "NV": "",
                            "Average": "",
                            "MTM": ""
                        });

                        i = i + 2;
                    }
                }
                callback(arr);
            }


            var finalStep = function(arr2) {
                that.functions.concateThem(arr1, arr2);
            }

            var putGapAfterLastwednesday = function(rows, callback) {
                var getPreviousDate = function(i) {
                    var i = i - 1;
                    if (rows[i]["Date"] != "") {
                        return rows[i]["Date"];
                    } else {
                        for (var t = i; t >= 0; t--) {
                            if (rows[t]["Date"] != "") {
                                return rows[t]["Date"];
                            }
                        }
                    }
                }

                for (var i = 1; i < rows.length; i++) {
                    if ((rows[i]["Date"] != "") && (that.functions.checkLastWednesday(getPreviousDate(i)))) {
                        rows.splice(i, 0, {
                            "Date": "",
                            "Open": "",
                            "Low": "",
                            "High": "",
                            "LTP": "",
                            "BP": "",
                            "BQ": "",
                            "BV": "",
                            "toDate": "",
                            "toSP": "",
                            "SP": "",
                            "SQ": "",
                            "SV": "",
                            "NQ": "",
                            "NV": "",
                            "Average": "",
                            "MTM": ""
                        });
                        i = i + 2;
                    }
                }
                callback(rows);
            }

            var putMTM = function(rows, callback) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i]["LTP"] != "") {
                        rows[i]["MTM"] = ((that.maths.pf(rows[i]["Average"]) - that.maths.pf(rows[i]["LTP"])) * that.maths.pf(rows[i]["NQ"])).toFixed(2);
                    } else {
                        var getPreviousLTP = function(i) {
                            var i = i - 1;
                            if (rows[i]["LTP"] != "") {
                                return rows[i]["LTP"];
                            } else {
                                for (var t = i; t >= 0; t--) {
                                    if (rows[t]["LTP"] != "") {
                                        return rows[t]["LTP"];
                                    }
                                }
                            }
                        }

                        rows[i]["MTM"] = ((that.maths.pf(rows[i]["Average"]) - that.maths.pf(getPreviousLTP(i))) * that.maths.pf(rows[i]["NQ"])).toFixed(2);
                    }
                }
                callback(rows, finalStep);
            }

            var putAverage = function(rows, callback) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i]["NQ"] == 0) {
                        rows[i]["Average"] = 0;
                    } else {
                        rows[i]["Average"] = (that.maths.pf(rows[i]["NV"]) / that.maths.pf(rows[i]["NQ"])).toFixed(2);
                    }
                }

                if (currency == 1) {
                    callback(rows, putGapAfterLastDay);
                } else {
                    callback(rows, putGapAfterLastwednesday);
                }
            }

            var putNV = function(rows, callback) {

                if (dontSquare == 1) {
                    for (var i = 0; i < rows.length; i++) {
                        if (currency == 1) {
                            if (i == 0) {
                                if (rows[i]["BP"] === null) {
                                    rows[i]["NV"] = -Math.abs(that.maths.pf(rows[i]["SV"]));
                                } else {
                                    rows[i]["NV"] = that.maths.pf(rows[i]["BV"]) - that.maths.pf(rows[i]["SV"]);
                                }
                            } else {
                                if (rows[i]["BP"] == null && rows[i]["SP"] != null) {
                                    rows[i]["NV"] = that.maths.pf(rows[i - 1]["NV"]) + (-Math.abs(that.maths.pf(rows[i]["SV"])));
                                }
                                if (rows[i]["SP"] != null && rows[i]["BP"] != null) {
                                    rows[i]["NV"] = (that.maths.pf(rows[i - 1]["NV"]) + that.maths.pf(rows[i]["BV"])) - that.maths.pf(rows[i]["SV"]);
                                }
                                if (rows[i]["SP"] == "" && rows[i]["BP"] != null) {
                                    rows[i]["NV"] = that.maths.pf(rows[i - 1]["NV"]) + that.maths.pf(rows[i]["BV"]);

                                }
                            }

                        } else {
                            if (i == 0) {
                                if (rows[i]["BP"] === null) {
                                    rows[i]["NV"] = -Math.abs(that.maths.pf(rows[i]["SV"]));
                                } else {
                                    rows[i]["NV"] = that.maths.pf(rows[i]["BV"]) - that.maths.pf(rows[i]["SV"]);
                                }
                            } else {
                                if (rows[i]["BP"] == null && rows[i]["SP"] != null) {
                                    rows[i]["NV"] = that.maths.pf(rows[i - 1]["NV"]) + (-Math.abs(that.maths.pf(rows[i]["SV"])));
                                }
                                if (rows[i]["SP"] != null && rows[i]["BP"] != null) {
                                    rows[i]["NV"] = (that.maths.pf(rows[i - 1]["NV"]) + that.maths.pf(rows[i]["BV"])) - that.maths.pf(rows[i]["SV"]);
                                }
                                if (rows[i]["SP"] == "" && rows[i]["BP"] != null) {
                                    rows[i]["NV"] = that.maths.pf(rows[i - 1]["NV"]) + that.maths.pf(rows[i]["BV"]);

                                }
                            }
                        }
                    }

                    callback(rows, putMTM);

                } else {

                    var firstDays = [];

                    var getPreviousDate = function(i) {
                        for (var t = i - 1; t > 0; t--) {
                            if (rows[t]["Date"] !== null && rows[t]["Date"] != "") {
                                return rows[t]["Date"];
                            }
                        }
                    }

                    var getNextEntry = function(i) {
                        for (var t = i + 1; t < rows.length; t++) {
                            if (rows[t]["Date"] !== null && rows[t]["Date"] != "") {
                                return t;
                            }
                        }
                    }

                    for (var i = 1; i < rows.length; i++) {
                        if (rows[i]["Date"] != null && rows[i]["Date"] != "") {
                            if (rows[i]["Date"] != "" && rows[i]["Date"] != null) {
                                nowRealDate = rows[i]["Date"];
                                nowDate = rows[i]["Date"].substring(3, rows.length);
                                previousRealDate = getPreviousDate(i);
                                if (previousRealDate === undefined) {

                                } else {
                                    previousDate = previousRealDate.substring(3, rows.length);
                                    if (nowDate != previousDate) {
                                        firstDays.push(nowRealDate);
                                    }
                                }
                            }
                        }
                    }

                    var checkFirstDay = function(date) {
                        if (firstDays.indexOf(date) > -1) {
                            return true;
                        } else {
                            return false;
                        }
                    }


                    var lastDays = [];
                    var getNextDate = function(i) {
                        for (var t = i + 1; t < rows.length; t++) {
                            if (rows[t]["Date"] !== null && rows[t]["Date"] != "") {
                                return rows[t]["Date"];
                            }
                        }
                    }


                    for (var i = 0; i < rows.length; i++) {
                        if (i > (rows.length - 1)) {} else {
                            if (rows[i]["Date"] != null && rows[i]["Date"] != "") {

                                var nextDate = getNextDate(i);
                                if (nextDate === undefined) {

                                } else {
                                    var nowDate = rows[i]["Date"].substring(3, rows.length);
                                    var nextDate = getNextDate(i);
                                    nextDate = nextDate.substring(3, rows.length);
                                    if (nowDate != nextDate) {
                                        lastDays.push(rows[i]["Date"]);
                                    }
                                }
                            }
                        }
                    }

                    var checkLastDay = function(date) {
                        if (lastDays.indexOf(date) > -1) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                    var getPreviousDate = function(i) {
                        var i = i - 1;
                        if (rows[i]["Date"] != "") {
                            return rows[i]["Date"];
                        } else {
                            for (var t = i; t >= 0; t--) {
                                if (rows[t]["Date"] != "") {
                                    return rows[t]["Date"];
                                }
                            }
                        }
                    }

                    for (var i = 0; i < rows.length; i++) {
                        if (currency == 1) {
                            if (underlyings == 1) {
                                if (i == 0) {
                                    if (rows[i]["BP"] === null) {
                                        rows[i]["NV"] = -Math.abs(that.maths.pf(rows[i]["SV"]));
                                    } else {
                                        rows[i]["NV"] = that.maths.pf(rows[i]["BV"]) - that.maths.pf(rows[i]["SV"]);
                                    }
                                } else if ((rows[i]["Date"] != "") && (underlyingsArray.indexOf(getPreviousDate(i)) > -1)) {
                                    if (rows[i]["BP"] === null) {
                                        rows[i]["NV"] = -Math.abs(that.maths.pf(rows[i]["SV"]));
                                    } else {
                                        rows[i]["NV"] = that.maths.pf(rows[i]["BV"]) - that.maths.pf(rows[i]["SV"]);
                                    }
                                } else {
                                    if (rows[i]["BP"] == null && rows[i]["SP"] != null) {
                                        rows[i]["NV"] = that.maths.pf(rows[i - 1]["NV"]) + (-Math.abs(that.maths.pf(rows[i]["SV"])));
                                    }
                                    if (rows[i]["SP"] != null && rows[i]["BP"] != null) {
                                        rows[i]["NV"] = (that.maths.pf(rows[i - 1]["NV"]) + that.maths.pf(rows[i]["BV"])) - that.maths.pf(rows[i]["SV"]);
                                    }
                                    if (rows[i]["SP"] == "" && rows[i]["BP"] != null) {
                                        rows[i]["NV"] = that.maths.pf(rows[i - 1]["NV"]) + that.maths.pf(rows[i]["BV"]);

                                    }
                                }
                            } else {
                                if (i == 0) {
                                    if (rows[i]["BP"] === null) {
                                        rows[i]["NV"] = -Math.abs(that.maths.pf(rows[i]["SV"]));
                                    } else {
                                        rows[i]["NV"] = that.maths.pf(rows[i]["BV"]) - that.maths.pf(rows[i]["SV"]);
                                    }
                                } else if ((rows[i]["Date"] != "") && checkFirstDay(rows[i]["Date"])) {
                                    if (rows[i]["BP"] === null) {
                                        rows[i]["NV"] = -Math.abs(that.maths.pf(rows[i]["SV"]));
                                    } else {
                                        rows[i]["NV"] = that.maths.pf(rows[i]["BV"]) - that.maths.pf(rows[i]["SV"]);
                                    }
                                } else {
                                    if (rows[i]["BP"] == null && rows[i]["SP"] != null) {
                                        rows[i]["NV"] = that.maths.pf(rows[i - 1]["NV"]) + (-Math.abs(that.maths.pf(rows[i]["SV"])));
                                    }
                                    if (rows[i]["SP"] != null && rows[i]["BP"] != null) {
                                        rows[i]["NV"] = (that.maths.pf(rows[i - 1]["NV"]) + that.maths.pf(rows[i]["BV"])) - that.maths.pf(rows[i]["SV"]);
                                    }
                                    if (rows[i]["SP"] == "" && rows[i]["BP"] != null) {
                                        rows[i]["NV"] = that.maths.pf(rows[i - 1]["NV"]) + that.maths.pf(rows[i]["BV"]);

                                    }
                                }
                            }

                        } else {
                            if (i == 0) {
                                if (rows[i]["BP"] === null) {
                                    rows[i]["NV"] = -Math.abs(that.maths.pf(rows[i]["SV"]));
                                } else {
                                    rows[i]["NV"] = that.maths.pf(rows[i]["BV"]) - that.maths.pf(rows[i]["SV"]);
                                }
                            } else if ((rows[i]["Date"] != "") && that.functions.checkLastWednesday(getPreviousDate(i))) {
                                if (rows[i]["BP"] === null) {
                                    rows[i]["NV"] = -Math.abs(that.maths.pf(rows[i]["SV"]));
                                } else {
                                    rows[i]["NV"] = that.maths.pf(rows[i]["BV"]) - that.maths.pf(rows[i]["SV"]);
                                }
                            } else {
                                if (rows[i]["BP"] == null && rows[i]["SP"] != null) {
                                    rows[i]["NV"] = that.maths.pf(rows[i - 1]["NV"]) + (-Math.abs(that.maths.pf(rows[i]["SV"])));
                                }
                                if (rows[i]["SP"] != null && rows[i]["BP"] != null) {
                                    rows[i]["NV"] = (that.maths.pf(rows[i - 1]["NV"]) + that.maths.pf(rows[i]["BV"])) - that.maths.pf(rows[i]["SV"]);
                                }
                                if (rows[i]["SP"] == "" && rows[i]["BP"] != null) {
                                    rows[i]["NV"] = that.maths.pf(rows[i - 1]["NV"]) + that.maths.pf(rows[i]["BV"]);

                                }
                            }
                        }
                    }
                    callback(rows, putMTM);
                }
            }

            var putNQ = function(rows, callback) {

                var firstDays = [];

                var getPreviousDate = function(i) {
                    for (var t = i - 1; t > 0; t--) {
                        if (rows[t]["Date"] !== null && rows[t]["Date"] != "") {
                            return rows[t]["Date"];
                        }
                    }
                }

                var getNextEntry = function(i) {
                    for (var t = i + 1; t < rows.length; t++) {
                        if (rows[t]["Date"] !== null && rows[t]["Date"] != "") {
                            return t;
                        }
                    }
                }

                for (var i = 1; i < rows.length; i++) {
                    if (rows[i]["Date"] != null && rows[i]["Date"] != "") {
                        if (rows[i]["Date"] != "" && rows[i]["Date"] != null) {
                            nowRealDate = rows[i]["Date"];
                            nowDate = rows[i]["Date"].substring(3, rows.length);
                            previousRealDate = getPreviousDate(i);
                            if (previousRealDate === undefined) {

                            } else {
                                previousDate = previousRealDate.substring(3, rows.length);
                                if (nowDate != previousDate) {
                                    firstDays.push(nowRealDate);
                                }
                            }
                        }
                    }
                }

                var checkFirstDay = function(date) {
                    if (firstDays.indexOf(date) > -1) {
                        return true;
                    } else {
                        return false;
                    }
                }


                var lastDays = [];

                for (var i = 0; i < rows.length; i++) {
                    if (i == (rows.length - 1)) {} else {
                        var getMonthSixteenThisDay = rows[i]["Date"].substring(3, 6);
                        var getMonthSixteenNextDay = rows[i + 1]["Date"].substring(3, 6);
                        if (getMonthSixteenThisDay != getMonthSixteenNextDay) {
                            lastDays.push(rows[i]["Date"]);
                        }
                    }
                }

                var checkLastDay = function(date) {
                    if (lastDays.indexOf(date) > -1) {
                        return true;
                    } else {
                        return false;
                    }
                }

                var getPreviousDate = function(i) {
                    var i = i - 1;
                    if (rows[i]["Date"] != "") {
                        return rows[i]["Date"];
                    } else {
                        for (var t = i; t >= 0; t--) {
                            if (rows[t]["Date"] != "") {
                                return rows[t]["Date"];
                            }
                        }
                    }
                }

                for (var i = 0; i < rows.length; i++) {

                    if (dontSquare == 1) {
                        for (var i = 0; i < rows.length; i++) {
                            if (i == 0) {
                                if (rows[i]["BP"] === null) {
                                    rows[i]["NQ"] = -Math.abs(that.maths.pi(rows[i]["SQ"]));
                                } else {
                                    rows[i]["NQ"] = that.maths.pi(rows[i]["BQ"]) - that.maths.pi(rows[i]["SQ"]);
                                }
                            } else {
                                if (rows[i]["BP"] == null && rows[i]["SP"] != null) {
                                    rows[i]["NQ"] = -Math.abs(that.maths.pi(rows[i]["SQ"])) + that.maths.pi(rows[i - 1]["NQ"]);
                                }
                                if (rows[i]["SP"] != null && rows[i]["BP"] != null) {
                                    rows[i]["NQ"] = (that.maths.pi(rows[i - 1]["NQ"]) + that.maths.pi(rows[i]["BQ"])) - that.maths.pi(rows[i]["SQ"]);
                                }
                                if (rows[i]["SP"] == "" && rows[i]["BP"] != null) {
                                    rows[i]["NQ"] = that.maths.pi(rows[i - 1]["NQ"]) + that.maths.pi(rows[i]["BQ"]);
                                }
                            }
                        }
                    } else {
                        if (currency == 1) {

                            if (underlyings == 1) {

                                if (i == 0) {
                                    if (rows[i]["BP"] === null) {
                                        rows[i]["NQ"] = -Math.abs(that.maths.pi(rows[i]["SQ"]));
                                    } else {
                                        rows[i]["NQ"] = that.maths.pi(rows[i]["BQ"]) - that.maths.pi(rows[i]["SQ"]);
                                    }
                                } else if ((rows[i]["Date"] != "") && (underlyingsArray.indexOf(getPreviousDate(i)) > -1)) {
                                    if (rows[i]["BP"] === null) {
                                        rows[i]["NQ"] = -Math.abs(that.maths.pi(rows[i]["SQ"]));
                                    } else {
                                        rows[i]["NQ"] = (that.maths.pi(rows[i - 1]["NQ"]) + that.maths.pi(rows[i]["BQ"])) - that.maths.pi(rows[i]["SQ"]);
                                    }
                                } else {
                                    if (rows[i]["BP"] == null && rows[i]["SP"] != null) {
                                        rows[i]["NQ"] = -Math.abs(that.maths.pi(rows[i]["SQ"])) + that.maths.pi(rows[i - 1]["NQ"]);
                                    }
                                    if (rows[i]["SP"] != null && rows[i]["BP"] != null) {
                                        rows[i]["NQ"] = (that.maths.pi(rows[i - 1]["NQ"]) + that.maths.pi(rows[i]["BQ"])) - that.maths.pi(rows[i]["SQ"]);
                                    }
                                    if (rows[i]["SP"] == "" && rows[i]["BP"] != null) {
                                        rows[i]["NQ"] = that.maths.pi(rows[i - 1]["NQ"]) + that.maths.pi(rows[i]["BQ"]);

                                    }
                                }


                            } else {

                                if (i == 0) {
                                    if (rows[i]["BP"] === null) {
                                        rows[i]["NQ"] = -Math.abs(that.maths.pi(rows[i]["SQ"]));
                                    } else {
                                        rows[i]["NQ"] = that.maths.pi(rows[i]["BQ"]) - that.maths.pi(rows[i]["SQ"]);
                                    }
                                } else if ((rows[i]["Date"] != "") && checkFirstDay(rows[i]["Date"])) {
                                    if (rows[i]["BP"] === null) {
                                        rows[i]["NQ"] = -Math.abs(that.maths.pi(rows[i]["SQ"]));
                                    } else {
                                        rows[i]["NQ"] = (that.maths.pi(rows[i - 1]["NQ"]) + that.maths.pi(rows[i]["BQ"])) - that.maths.pi(rows[i]["SQ"]);
                                    }
                                } else {
                                    if (rows[i]["BP"] == null && rows[i]["SP"] != null) {
                                        rows[i]["NQ"] = -Math.abs(that.maths.pi(rows[i]["SQ"])) + that.maths.pi(rows[i - 1]["NQ"]);
                                    }
                                    if (rows[i]["SP"] != null && rows[i]["BP"] != null) {
                                        rows[i]["NQ"] = (that.maths.pi(rows[i - 1]["NQ"]) + that.maths.pi(rows[i]["BQ"])) - that.maths.pi(rows[i]["SQ"]);
                                    }
                                    if (rows[i]["SP"] == "" && rows[i]["BP"] != null) {
                                        rows[i]["NQ"] = that.maths.pi(rows[i - 1]["NQ"]) + that.maths.pi(rows[i]["BQ"]);

                                    }
                                }

                            }

                        } else {
                            if (i == 0) {
                                if (rows[i]["BP"] === null) {
                                    rows[i]["NQ"] = -Math.abs(that.maths.pi(rows[i]["SQ"]));
                                } else {
                                    rows[i]["NQ"] = that.maths.pi(rows[i]["BQ"]) - that.maths.pi(rows[i]["SQ"]);
                                }
                            } else if ((rows[i]["Date"] != "") && that.functions.checkLastWednesday(getPreviousDate(i))) {
                                if (rows[i]["BP"] === null) {
                                    rows[i]["NQ"] = -Math.abs(that.maths.pi(rows[i]["SQ"]));
                                } else {
                                    rows[i]["NQ"] = (that.maths.pi(rows[i - 1]["NQ"]) + that.maths.pi(rows[i]["BQ"])) - that.maths.pi(rows[i]["SQ"]);
                                }
                            } else {
                                if (rows[i]["BP"] == null && rows[i]["SP"] != null) {
                                    rows[i]["NQ"] = -Math.abs(that.maths.pi(rows[i]["SQ"])) + that.maths.pi(rows[i - 1]["NQ"]);
                                }
                                if (rows[i]["SP"] != null && rows[i]["BP"] != null) {
                                    rows[i]["NQ"] = (that.maths.pi(rows[i - 1]["NQ"]) + that.maths.pi(rows[i]["BQ"])) - that.maths.pi(rows[i]["SQ"]);
                                }
                                if (rows[i]["SP"] == "" && rows[i]["BP"] != null) {
                                    rows[i]["NQ"] = that.maths.pi(rows[i - 1]["NQ"]) + that.maths.pi(rows[i]["BQ"]);

                                }
                            }
                        }
                    }
                }

                callback(rows, putAverage);
            }

            var returnJoin = function() {

                con.query('CREATE TEMPORARY TABLE logger2 LIKE logs2', function(err, response) {
                    if (err) {
                        throw err;
                    } else {
                        con.query('INSERT INTO logger2 SELECT * FROM logs2', function(err, response) {
                            if (err) {
                                throw err;
                            } else {
                                var query = "SELECT tab.Date, tab.Open, tab.High, tab.Low, tab.LTP, tab.BP, tab.BQ,(SELECT tab.BP* tab.BQ) AS BV, tab.toDate, (SELECT logger2.Open FROM logger2 WHERE logger2.Date = tab.toDate) AS toSP,sellall.SP AS SP,sellall.SQ AS SQ,(SELECT sellall.SP*sellall.SQ) AS SV FROM sellall RIGHT JOIN (SELECT logs2.id, logs2.Date, logs2.Open, logs2.High, logs2.Low, logs2.LTP, logs2.Transid, buyagain.fromopen as BP, buyagain.boughtquantity AS BQ, buyagain.toDate, buyagain.toOpen AS toOpen  FROM logs2 LEFT JOIN buyagain ON logs2.Transid = buyagain.fromTransid ORDER BY logs2.id) AS tab ON sellall.Transid = tab.Transid ORDER BY tab.id";
                                con.query(query, function(err, rows, fields) {
                                    if (err) {

                                        throw err;
                                    } else {
                                        var rows = that.functions.removeRepeatedDates(rows, 2);
                                        putNQ(rows, putNV);
                                    }
                                });
                            }
                        });
                    }
                });
            }

            var applyLogicDb = function(arr) {

                if (dontSquare == 1) {

                    var buyAgain = [];
                    var setIt = 0;

                    for (var i = setIt; i < arr.length; i++) {
                        if ((that.maths.pf(arr[i]['LTP'])) <= that.maths.pf(arr[i]['Open'])) {
                            arr[i]["status"] = 1;
                            buyAgain.push([arr[i]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["Open"]), that.maths.pf(arr[i]["LTP"]), boughtQuantity, arr[i]["Transid"], arr[i]["Transid"]]);
                        }

                        var date = arr[i]["Date"];

                        if (currency == 1) {
                            for (var j = 0; j <= i; j++) {
                                if (arr[j]["status"] == 1) {
                                    continue;
                                } else {
                                    if ((that.maths.pf(arr[i]['Open'] + toCheck)) <= that.maths.pf(arr[j]['Open'])) {
                                        arr[j]["status"] = 1;
                                        buyAgain.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[j]["Open"]), that.maths.pf(arr[i]["Open"]), boughtQuantity, arr[j]["Transid"], arr[i]["Transid"]]);
                                    } else if (((that.maths.pf(arr[i]["Low"] + toCheck)) <= that.maths.pf(arr[j]['Open'])) && (i != j)) {
                                        arr[j]["status"] = 1;
                                        buyAgain.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["Open"]), that.maths.pf(arr[j]["Open"]) - toCheck, boughtQuantity, arr[j]["Transid"], arr[i]["Transid"]]);
                                    }
                                }
                            }
                        } else {
                            for (var j = 0; j <= i; j++) {
                                if (arr[j]["status"] == 1) {
                                    continue;
                                } else {
                                    if ((that.maths.pf(arr[i]['Open'] + toCheck)) <= that.maths.pf(arr[j]['Open'])) {
                                        arr[j]["status"] = 1;
                                        buyAgain.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[j]["Open"]), that.maths.pf(arr[i]["Open"]), boughtQuantity, arr[j]["Transid"], arr[i]["Transid"]]);
                                    } else if (((that.maths.pf(arr[i]["Low"] + toCheck)) <= that.maths.pf(arr[j]['Open'])) && (i != j)) {
                                        arr[j]["status"] = 1;
                                        buyAgain.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["Open"]), that.maths.pf(arr[j]["Open"]) - toCheck, boughtQuantity, arr[j]["Transid"], arr[i]["Transid"]]);
                                    }
                                }
                            }
                        }
                    }
                    var query = "CREATE TEMPORARY TABLE IF NOT EXISTS `buyagain` (`id` int(11) NOT NULL AUTO_INCREMENT,`todate` text COLLATE utf8_unicode_ci NOT NULL,`fromdate` text COLLATE utf8_unicode_ci NOT NULL,`toopen` float NOT NULL,`fromopen` float NOT NULL,`boughtquantity` int(11) NOT NULL,`toTransid` varchar(32) COLLATE utf8_unicode_ci NOT NULL,`fromTransid` varchar(32) COLLATE utf8_unicode_ci NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci";
                    con.query(query, function(err, response) {
                        if (err) {
                            throw err;
                            console.log("Error occured in populating buy again.");
                        } else {
                            con.query('INSERT INTO buyagain (todate, fromdate, toopen, fromopen, boughtquantity, toTransid, fromTransid ) VALUES ?', [buyAgain], function(err, response) {
                                if (err) {
                                    throw err;
                                } else {
                                    returnJoin();
                                }
                            });
                        }
                    });

                } else {

                    var lastDays = [];

                    var getNextDate = function(i) {
                        for (var t = i + 1; t < arr.length; t++) {
                            if (arr[t]["Date"] !== null && arr[t]["Date"] != "") {
                                return arr[t]["Date"];
                            }
                        }
                    }

                    for (var i = 0; i < arr.length; i++) {
                        if (i > (arr.length - 1)) {} else {
                            if (arr[i]["Date"] != null && arr[i]["Date"] != "") {

                                var nextDate = getNextDate(i);
                                if (nextDate === undefined) {

                                } else {
                                    var nowDate = arr[i]["Date"].substring(3, arr.length);
                                    var nextDate = getNextDate(i);
                                    nextDate = nextDate.substring(3, arr.length);
                                    if (nowDate != nextDate) {
                                        lastDays.push(arr[i]["Date"]);
                                    }
                                }
                            }
                        }
                    }

                    var checkLastDay = function(date) {
                        if (lastDays.indexOf(date) > -1) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                    var buyAgain = [];
                    var setIt = 0;
                    for (var i = setIt; i < arr.length; i++) {
                        if ((that.maths.pf(arr[i]['LTP'])) <= that.maths.pf(arr[i]['Open'])) {
                            arr[i]["status"] = 1;
                            buyAgain.push([arr[i]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["Open"]), that.maths.pf(arr[i]["LTP"]), boughtQuantity, arr[i]["Transid"], arr[i]["Transid"]]); //is wale ko is wale ne                                
                        }

                        var date = arr[i]["Date"];

                        if (currency == 1) {

                            if (underlyings == 1) {

                                if ((date != "") && (underlyingsArray.indexOf(date) > -1)) {
                                    for (var j = 0; j <= i; j++) {
                                        if (arr[j]["status"] == 1) {
                                            continue;
                                        } else {

                                            if ((that.maths.pf(arr[i]['Open'] + toCheck)) <= that.maths.pf(arr[j]['Open'])) {
                                                arr[j]["status"] = 1;
                                                buyAgain.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[j]["Open"]), that.maths.pf(arr[i]["Open"]), boughtQuantity, arr[j]["Transid"], arr[i]["Transid"]]); //is wale ko is wale ne
                                            } else {
                                                arr[j]["status"] = 1;
                                                buyAgain.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[j]["Open"]), that.maths.pf(arr[i]["LTP"]), boughtQuantity, arr[j]["Transid"], arr[i]["Transid"]]);
                                            }

                                        }

                                    }
                                    setIt = i + 1;
                                } else {
                                    for (var j = 0; j <= i; j++) {
                                        if (arr[j]["status"] == 1) {
                                            continue;
                                        } else {
                                            if ((that.maths.pf(arr[i]['Open'] + toCheck)) <= that.maths.pf(arr[j]['Open'])) {
                                                arr[j]["status"] = 1;
                                                buyAgain.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[j]["Open"]), that.maths.pf(arr[i]["Open"]), boughtQuantity, arr[j]["Transid"], arr[i]["Transid"]]); //is wale ko is wale ne
                                            } else if (((that.maths.pf(arr[i]["Low"] + toCheck)) <= that.maths.pf(arr[j]['Open'])) && (i != j)) {
                                                arr[j]["status"] = 1;
                                                buyAgain.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["Open"]), that.maths.pf(arr[j]["Open"]) - toCheck, boughtQuantity, arr[j]["Transid"], arr[i]["Transid"]]); //is wale ko is wale ne                                    
                                            }
                                        }
                                    }
                                }

                            } else {
                                if (checkLastDay(arr[i]["Date"])) {
                                    for (var j = 0; j <= i; j++) {
                                        if (arr[j]["status"] == 1) {
                                            continue;
                                        } else {

                                            if ((that.maths.pf(arr[i]['Open'] + toCheck)) <= that.maths.pf(arr[j]['Open'])) {
                                                arr[j]["status"] = 1;
                                                buyAgain.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[j]["Open"]), that.maths.pf(arr[i]["Open"]), boughtQuantity, arr[j]["Transid"], arr[i]["Transid"]]); //is wale ko is wale ne
                                            } else {
                                                arr[j]["status"] = 1;
                                                buyAgain.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[j]["Open"]), that.maths.pf(arr[i]["LTP"]), boughtQuantity, arr[j]["Transid"], arr[i]["Transid"]]);
                                            }

                                        }

                                    }
                                    setIt = i + 1;
                                } else {
                                    for (var j = 0; j <= i; j++) {
                                        if (arr[j]["status"] == 1) {
                                            continue;
                                        } else {
                                            if ((that.maths.pf(arr[i]['Open'] + toCheck)) <= that.maths.pf(arr[j]['Open'])) {
                                                arr[j]["status"] = 1;
                                                buyAgain.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[j]["Open"]), that.maths.pf(arr[i]["Open"]), boughtQuantity, arr[j]["Transid"], arr[i]["Transid"]]); //is wale ko is wale ne
                                            } else if (((that.maths.pf(arr[i]["Low"] + toCheck)) <= that.maths.pf(arr[j]['Open'])) && (i != j)) {
                                                arr[j]["status"] = 1;
                                                buyAgain.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["Open"]), that.maths.pf(arr[j]["Open"]) - toCheck, boughtQuantity, arr[j]["Transid"], arr[i]["Transid"]]); //is wale ko is wale ne                                    
                                            }
                                        }
                                    }
                                }
                            }

                        } else {
                            if (that.functions.checkLastWednesday(arr[i]["Date"])) {
                                for (var j = 0; j <= i; j++) {
                                    if (arr[j]["status"] == 1) {
                                        continue;
                                    } else {

                                        if ((that.maths.pf(arr[i]['Open'] + toCheck)) <= that.maths.pf(arr[j]['Open'])) {
                                            arr[j]["status"] = 1;
                                            buyAgain.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[j]["Open"]), that.maths.pf(arr[i]["Open"]), boughtQuantity, arr[j]["Transid"], arr[i]["Transid"]]); //is wale ko is wale ne
                                        } else {
                                            arr[j]["status"] = 1;
                                            buyAgain.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[j]["Open"]), that.maths.pf(arr[i]["LTP"]), boughtQuantity, arr[j]["Transid"], arr[i]["Transid"]]);
                                        }

                                    }

                                }
                                setIt = i + 1;
                            } else {
                                for (var j = 0; j <= i; j++) {
                                    if (arr[j]["status"] == 1) {
                                        continue;
                                    } else {
                                        if ((that.maths.pf(arr[i]['Open'] + toCheck)) <= that.maths.pf(arr[j]['Open'])) {
                                            arr[j]["status"] = 1;
                                            buyAgain.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[j]["Open"]), that.maths.pf(arr[i]["Open"]), boughtQuantity, arr[j]["Transid"], arr[i]["Transid"]]); //is wale ko is wale ne
                                        } else if (((that.maths.pf(arr[i]["Low"] + toCheck)) <= that.maths.pf(arr[j]['Open'])) && (i != j)) {
                                            arr[j]["status"] = 1;
                                            buyAgain.push([arr[j]["Date"], arr[i]["Date"], that.maths.pf(arr[i]["Open"]), that.maths.pf(arr[j]["Open"]) - toCheck, boughtQuantity, arr[j]["Transid"], arr[i]["Transid"]]); //is wale ko is wale ne                                    
                                        }
                                    }
                                }
                            }
                        }
                    }
                    var query = "CREATE TEMPORARY TABLE IF NOT EXISTS `buyagain` (`id` int(11) NOT NULL AUTO_INCREMENT,`todate` text COLLATE utf8_unicode_ci NOT NULL,`fromdate` text COLLATE utf8_unicode_ci NOT NULL,`toopen` float NOT NULL,`fromopen` float NOT NULL,`boughtquantity` int(11) NOT NULL,`toTransid` varchar(32) COLLATE utf8_unicode_ci NOT NULL,`fromTransid` varchar(32) COLLATE utf8_unicode_ci NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci";
                    con.query(query, function(err, response) {
                        if (err) {
                            throw err;
                            console.log("Error occured in populating buy again.");
                        } else {
                            con.query('INSERT INTO buyagain (todate, fromdate, toopen, fromopen, boughtquantity, toTransid, fromTransid ) VALUES ?', [buyAgain], function(err, response) {
                                if (err) {
                                    throw err;
                                } else {
                                    returnJoin();
                                }
                            });
                        }
                    });
                }
            }

            var sellAllDb = function(arr, callback) {
                var sellAll = [];
                arr.forEach(function(a, i) {
                    sellAll.push([arr[i]["Date"], arr[i]["Open"], boughtQuantity, arr[i]["Transid"]]);
                });
                con.query('CREATE TEMPORARY TABLE IF NOT EXISTS `sellall` (`id` int(11) NOT NULL AUTO_INCREMENT,`Date` text NOT NULL,`SP` float NOT NULL,`SQ` float NOT NULL,`Transid` varchar(32)NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1', function(err, response) {
                    if (err) {
                        throw err;
                        cnsole.log("error in aelling all");
                    } else {
                        con.query('INSERT INTO sellall (Date, SP, SQ, Transid) VALUES ?', [sellAll], function(err, response) {
                            if (err) {
                                throw err;
                            } else {
                                callback(arr);
                            }
                        });
                    }
                });
            }

            var getDataBack = function() {
                con.query('SELECT Date,Open,High,Low,LTP,Transid FROM logs2 ORDER BY id', function(err, rows, fields) {
                    if (err) throw err;
                    sellAllDb(rows, applyLogicDb);
                });
            }

            var sortIt = function(arr, callback, type) {
                var arr = that.functions.dataSort(arr);
                callback(arr, getDataBack, type);
            }

            var cleanIt = function(arr, callback) {
                var clArray = that.functions.dataClean(arr);
                callback(clArray, that.functions.uploadToMysql, 2);
            }

            var trimData = function(arr, callback) {
                var arr = that.functions.dataTrimmer(result);
                callback(arr, sortIt);
            }

            trimData(result, cleanIt);
        },
        algoThree: function() {

            console.log("coming here");

            var pi = function(a) {
                return parseInt(a);
            }

            var pf = function(a) {
                return parseFloat(a);
            }

            var returnProperDate = function(date) {

                var patt = /-/;
                var pos = date.search(patt);
                var day = date.substring(0, pos);
                var mon = date.substring(pos + 1, pos + 4);
                var patt = /-/;
                var pos = date.search(patt);
                var remainingString = date.substring(pos + 1, date.length);
                var yea = Math.abs(remainingString.substring(pos + 2, remainingString.length));

                if (day.length == 1) {
                    day = "0" + day;
                }

                dateToBeReturned = day + "-" + mon + "-" + yea;

                return dateToBeReturned;

            }

            plusValue = parseInt(plusvalue);
            inputQuan = parseInt(inputQuan);

            var getCEThisMonthUSDINR = function(date, strikePrice, check) {

                date = returnProperDate(date);

                for (var i = 0; i < ceDataThisMonth.length; i++) {
                    var day = ceDataThisMonth[i]["Trade Date"].substring(0, 2);
                    var month = ceDataThisMonth[i]["Trade Date"].substring(3, 6);
                    var year = ceDataThisMonth[i]["Trade Date"].substring(9, 11);
                    var compareDate = day + "-" + month + "-" + year;
                    var compareStrikePrice = ceDataThisMonth[i]["Strike Price"];
                    if ((date == compareDate) && (strikePrice == ceDataThisMonth[i]["Strike Price"])) {
                        return ceDataThisMonth[i]["Close Price"];
                    }
                }

            }

            var getPEThisMonthUSDINR = function(date, strikePrice, check) {

                date = returnProperDate(date);

                for (var i = 0; i < peDataThisMonth.length; i++) {
                    var day = peDataThisMonth[i]["Trade Date"].substring(0, 2);
                    var month = peDataThisMonth[i]["Trade Date"].substring(3, 6);
                    var year = peDataThisMonth[i]["Trade Date"].substring(9, 11);
                    var compareDate = day + "-" + month + "-" + year;
                    var compareStrikePrice = peDataThisMonth[i]["Strike Price"];
                    if ((date == compareDate) && (strikePrice == compareStrikePrice)) {
                        return peDataThisMonth[i]["Close Price"];
                    }
                }
            }

            var getCENextMonthUSDINR = function(date, strikePrice, check) {

                date = returnProperDate(date);

                for (var i = 0; i < ceDataNextMonth.length; i++) {
                    var day = ceDataNextMonth[i]["Trade Date"].substring(0, 2);
                    var month = ceDataNextMonth[i]["Trade Date"].substring(3, 6);
                    var year = ceDataNextMonth[i]["Trade Date"].substring(9, 11);
                    var compareDate = day + "-" + month + "-" + year;
                    var compareStrikePrice = ceDataNextMonth[i]["Strike Price"];
                    if ((date == compareDate) && (strikePrice == compareStrikePrice)) {
                        return ceDataNextMonth[i]["Close Price"];
                    }
                }
            }

            var getPENextMonthUSDINR = function(date, strikePrice, check) {

                date = returnProperDate(date);

                for (var i = 0; i < peDataNextMonth.length; i++) {
                    var day = peDataNextMonth[i]["Trade Date"].substring(0, 2);
                    var month = peDataNextMonth[i]["Trade Date"].substring(3, 6);
                    var year = peDataNextMonth[i]["Trade Date"].substring(9, 11);
                    var compareDate = day + "-" + month + "-" + year;
                    var compareStrikePrice = peDataNextMonth[i]["Strike Price"];
                    if ((date == compareDate) && (strikePrice == compareStrikePrice)) {
                        return peDataNextMonth[i]["Close Price"];
                    }
                }
            }

            var getCEThisMonthSixteen = function(date, strikePrice) {

                date = returnProperDate(date);

                for (var i = 0; i < ceDataThisMonthSixteen.length; i++) {
                    var day = ceDataThisMonthSixteen[i]["Date"].substring(0, 2);
                    var month = ceDataThisMonthSixteen[i]["Date"].substring(3, 6);
                    var year = ceDataThisMonthSixteen[i]["Date"].substring(9, 11);
                    var compareDate = day + "-" + month + "-" + year;
                    var compareStrikePrice = ceDataThisMonthSixteen[i]["Strike Price"];
                    if ((date == compareDate) && (strikePrice == ceDataThisMonthSixteen[i]["Strike Price"])) {
                        return ceDataThisMonthSixteen[i]["LTP"];
                    }
                }
            }

            var getPEThisMonthSixteen = function(date, strikePrice) {

                date = returnProperDate(date);

                for (var i = 0; i < peDataThisMonthSixteen.length; i++) {
                    var day = peDataThisMonthSixteen[i]["Date"].substring(0, 2);
                    var month = peDataThisMonthSixteen[i]["Date"].substring(3, 6);
                    var year = peDataThisMonthSixteen[i]["Date"].substring(9, 11);
                    var compareDate = day + "-" + month + "-" + year;
                    var compareStrikePrice = peDataThisMonthSixteen[i]["Strike Price"];
                    if ((date == compareDate) && (strikePrice == compareStrikePrice)) {
                        return peDataThisMonthSixteen[i]["LTP"];
                    }
                }
            }

            var getCENextMonthSixteen = function(date, strikePrice) {

                date = returnProperDate(date);

                for (var i = 0; i < ceDataNextMonthSixteen.length; i++) {
                    var day = ceDataNextMonthSixteen[i]["Date"].substring(0, 2);
                    var month = ceDataNextMonthSixteen[i]["Date"].substring(3, 6);
                    var year = ceDataNextMonthSixteen[i]["Date"].substring(9, 11);
                    var compareDate = day + "-" + month + "-" + year;
                    var compareStrikePrice = ceDataNextMonthSixteen[i]["Strike Price"];
                    if ((date == compareDate) && (strikePrice == compareStrikePrice)) {
                        return ceDataNextMonthSixteen[i]["LTP"];
                    }
                }
            }

            var getPENextMonthSixteen = function(date, strikePrice) {

                date = returnProperDate(date);

                for (var i = 0; i < peDataNextMonthSixteen.length; i++) {
                    var day = peDataNextMonthSixteen[i]["Date"].substring(0, 2);
                    var month = peDataNextMonthSixteen[i]["Date"].substring(3, 6);
                    var year = peDataNextMonthSixteen[i]["Date"].substring(9, 11);
                    var compareDate = day + "-" + month + "-" + year;
                    var compareStrikePrice = peDataNextMonthSixteen[i]["Strike Price"];
                    if ((date == compareDate) && (strikePrice == compareStrikePrice)) {
                        return peDataNextMonthSixteen[i]["LTP"];
                    }
                }
            }

            var getCEThisMonthFifteen = function(date, strikePrice) {

                date = returnProperDate(date);

                for (var i = 0; i < ceDataThisMonthFifteen.length; i++) {
                    var day = ceDataThisMonthFifteen[i]["Date"].substring(0, 2);
                    var month = ceDataThisMonthFifteen[i]["Date"].substring(3, 6);
                    var year = ceDataThisMonthFifteen[i]["Date"].substring(9, 11);
                    var compareDate = day + "-" + month + "-" + year;
                    var compareStrikePrice = ceDataThisMonthFifteen[i]["Strike Price"];
                    if ((date == compareDate) && (strikePrice == ceDataThisMonthFifteen[i]["Strike Price"])) {
                        return ceDataThisMonthFifteen[i]["LTP"];
                    }
                }
            }

            var getPEThisMonthFifteen = function(date, strikePrice) {

                date = returnProperDate(date);

                for (var i = 0; i < peDataThisMonthFifteen.length; i++) {
                    var day = peDataThisMonthFifteen[i]["Date"].substring(0, 2);
                    var month = peDataThisMonthFifteen[i]["Date"].substring(3, 6);
                    var year = peDataThisMonthFifteen[i]["Date"].substring(9, 11);
                    var compareDate = day + "-" + month + "-" + year;
                    var compareStrikePrice = peDataThisMonthFifteen[i]["Strike Price"];
                    if ((date == compareDate) && (strikePrice == compareStrikePrice)) {
                        return peDataThisMonthFifteen[i]["LTP"];
                    }
                }
            }

            var getCENextMonthFifteen = function(date, strikePrice) {

                date = returnProperDate(date);

                for (var i = 0; i < ceDataNextMonthFifteen.length; i++) {
                    var day = ceDataNextMonthFifteen[i]["Date"].substring(0, 2);
                    var month = ceDataNextMonthFifteen[i]["Date"].substring(3, 6);
                    var year = ceDataNextMonthFifteen[i]["Date"].substring(9, 11);
                    var compareDate = day + "-" + month + "-" + year;
                    var compareStrikePrice = ceDataNextMonthFifteen[i]["Strike Price"];
                    if ((date == compareDate) && (strikePrice == compareStrikePrice)) {
                        return ceDataNextMonthFifteen[i]["LTP"];
                    }
                }
            }

            var getPENextMonthFifteen = function(date, strikePrice) {

                date = returnProperDate(date);

                for (var i = 0; i < peDataNextMonthFifteen.length; i++) {
                    var day = peDataNextMonthFifteen[i]["Date"].substring(0, 2);
                    var month = peDataNextMonthFifteen[i]["Date"].substring(3, 6);
                    var year = peDataNextMonthFifteen[i]["Date"].substring(9, 11);
                    var compareDate = day + "-" + month + "-" + year;
                    var compareStrikePrice = peDataNextMonthFifteen[i]["Strike Price"];
                    if ((date == compareDate) && (strikePrice == compareStrikePrice)) {
                        return peDataNextMonthFifteen[i]["LTP"];
                    }
                }
            }

            var underlyingsArray = ["29-Jan-13", "26-Feb-13", "25-Mar-13", "26-Apr-13", "29-May-13", "26-Jun-13", "29-Jul-13", "28-Aug-13", "26-Sep-13", "29-Oct-13", "27-Nov-13", "27-Dec-13", "29-Jan-14", "26-Feb-14", "27-Mar-14", "28-Apr-14", "28-May-14", "26-Jun-14", "28-Jul-14", "26-Aug-14", "26-Sep-14", "29-Oct-14", "26-Nov-14", "29-Dec-14", "28-Jan-15", "25-Feb-15", "27-Mar-15", "28-Apr-15", "27-May-15", "26-Jun-15", "29-Jul-15", "27-Aug-15", "28-Sep-15", "28-Oct-15", "26-Nov-15", "29-Dec-15", "27-Jan-16", "25-Feb-16", "29-Mar-16", "27-Apr-16", "27-May-16", "28-Jun-16", "27-Jul-16", "29-Aug-16", "28-Sep-16", "26-Oct-16", "28-Nov-16", "28-Dec-16"];

            var pf = function(a) {
                return parseFloat(a)
            }

            var checkLastWednesday = function(date) {
                if (underlyingsArray.indexOf(date.toString()) > -1) {
                    return true;
                } else {
                    return false;
                }
            }

            supremeArray = [];

            var highest = 0;
            for (var i = 0; i < result.length; i++) {
                if ((result[i]["High"] != null) && (result[i]["High"] != "")) {
                    if (parseInt(result[i]["High"]) > highest) {
                        highest = parseInt(result[i]["High"]);
                    }
                }
            }

            var lowest = highest;
            for (var i = 0; i < result.length; i++) {
                if ((result[i]["Low"] != null) && (result[i]["Low"] != "")) {
                    if (parseInt(result[i]["Low"]) < lowest) {
                        lowest = parseInt(result[i]["Low"]);
                    }
                }
            }

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

            switch (onwhich) {
                case "/lt":
                    highest = (Math.ceil(highest / 20) * 20) + 40;
                    lowest = (Math.floor(lowest / 20) * 20) - 40;
                    looper = (highest - lowest) / 20;
                    nQuan = 20;
                    break;
                case "/tcs":
                    highest = (Math.ceil(highest / 50) * 50) + 100;
                    lowest = (Math.floor(lowest / 50) * 50) - 100;
                    looper = (highest - lowest) / 50;
                    nQuan = 50;
                    break;
                case "/nifty":
                    highest = (Math.ceil(highest / 100) * 100) + 200;
                    lowest = (Math.floor(lowest / 100) * 100) - 200;
                    looper = (highest - lowest) / 100;
                    nQuan = 100;
                    break;
                case "/usdinr2013":
                    highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                    lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                    looper = (highest - lowest) / 0.5;
                    nQuan = 0.5;
                    break;
                case "/usdinr2014":
                    highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                    lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                    looper = (highest - lowest) / 0.5;
                    nQuan = 0.5;
                    break;
                case "/usdinr2015":
                    highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                    lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                    looper = (highest - lowest) / 0.5;
                    nQuan = 0.5;
                    break;
                case "/usdinr2016":
                    highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                    lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                    looper = (highest - lowest) / 0.5;
                    nQuan = 0.5;
                    break;
            }

            for (var i = 0; i < result.length; i++) {

                oneTime = {};

                oneTime["P/L"] = null;
                oneTime["DATE"] = result[i]["Date"];
                oneTime["OPEN"] = pf(result[i]["Open"]);
                oneTime["HIGH"] = pf(result[i]["High"]);
                oneTime["LOW"] = pf(result[i]["Low"]);
                oneTime["LTP"] = pf(result[i]["LTP"]);
                oneTime["BP"] = null;
                oneTime["BQ"] = null;
                oneTime["BV"] = null;
                oneTime["SP"] = null;
                oneTime["SQ"] = null
                oneTime["SV"] = null;
                oneTime["NQ"] = null;
                oneTime["NV"] = null;
                oneTime["AVG"] = null;
                oneTime["MTM"] = null;

                if (checked == 2) {

                    for (var k = looper; k >= 0; k--) {

                        oneTime["PE STK " + ((lowest + (k * nQuan)))] = null;
                        oneTime["PE BP " + ((lowest + (k * nQuan)))] = null;
                        oneTime["PE BQ " + ((lowest + (k * nQuan)))] = null;
                        oneTime["PE BV " + ((lowest + (k * nQuan)))] = null;

                        oneTime["PE sp " + ((lowest + (k * nQuan)))] = null;
                        oneTime["PE sq " + ((lowest + (k * nQuan)))] = null;
                        oneTime["PE sv " + ((lowest + (k * nQuan)))] = null;
                        oneTime["PE nq " + ((lowest + (k * nQuan)))] = null;
                        oneTime["PE nv " + ((lowest + (k * nQuan)))] = null;
                        oneTime["PE avg " + ((lowest + (k * nQuan)))] = null;

                        oneTime["PE stk " + ((lowest + (k * nQuan)))] = null;
                        oneTime["PE bp " + ((lowest + (k * nQuan)))] = null;
                        oneTime["PE bq " + ((lowest + (k * nQuan)))] = null;
                        oneTime["PE bv " + ((lowest + (k * nQuan)))] = null;

                        oneTime["PE SP " + ((lowest + (k * nQuan)))] = null;
                        oneTime["PE SQ " + ((lowest + (k * nQuan)))] = null;
                        oneTime["PE SV " + ((lowest + (k * nQuan)))] = null;
                        oneTime["PE NQ " + ((lowest + (k * nQuan)))] = null;
                        oneTime["PE NV " + ((lowest + (k * nQuan)))] = null;
                        oneTime["PE AVG1 " + ((lowest + (k * nQuan)))] = null;

                    }
                }

                oneTime["bp"] = null;
                oneTime["bq"] = null;
                oneTime["bv"] = null;
                oneTime["sp"] = null;
                oneTime["sq"] = null;
                oneTime["sv"] = null;
                oneTime["nq"] = null;
                oneTime["nv"] = null;
                oneTime["avg"] = null;
                oneTime["mtm"] = null;

                if (checked == 2) {

                    for (var k = 0; k <= looper; k++) {

                        oneTime["CE STK " + ((lowest + (k * nQuan)))] = null;
                        oneTime["CE BP " + ((lowest + (k * nQuan)))] = null;
                        oneTime["CE BQ " + ((lowest + (k * nQuan)))] = null;
                        oneTime["CE BV " + ((lowest + (k * nQuan)))] = null;

                        oneTime["CE sp " + ((lowest + (k * nQuan)))] = null;
                        oneTime["CE sq " + ((lowest + (k * nQuan)))] = null;
                        oneTime["CE sv " + ((lowest + (k * nQuan)))] = null;
                        oneTime["CE nq " + ((lowest + (k * nQuan)))] = null;
                        oneTime["CE nv " + ((lowest + (k * nQuan)))] = null;
                        oneTime["CE avg " + ((lowest + (k * nQuan)))] = null;

                        oneTime["CE stk " + ((lowest + (k * nQuan)))] = null;
                        oneTime["CE bp " + ((lowest + (k * nQuan)))] = null;
                        oneTime["CE bq " + ((lowest + (k * nQuan)))] = null;
                        oneTime["CE bv " + ((lowest + (k * nQuan)))] = null;

                        oneTime["CE SP " + ((lowest + (k * nQuan)))] = null;
                        oneTime["CE SQ " + ((lowest + (k * nQuan)))] = null;
                        oneTime["CE SV " + ((lowest + (k * nQuan)))] = null;
                        oneTime["CE NQ " + ((lowest + (k * nQuan)))] = null;
                        oneTime["CE NV " + ((lowest + (k * nQuan)))] = null;
                        oneTime["CE AVG1 " + ((lowest + (k * nQuan)))] = null;
                    }
                }

                oneTime["TNQ"] = null;
                oneTime["TNV"] = null;
                oneTime["TAVG"] = null;
                oneTime["NMTM"] = null;
                oneTime["MARGIN"] = null;
                oneTime["MAX MARGIN"] = "";
                supremeArray.push(oneTime);
                oneTime = {};
            }

            for (var i = 0; i < supremeArray.length; i++) {

                if (i == 0) {

                    currentPrice = pf(supremeArray[i]["OPEN"]);

                    switch (onwhich) {
                        case "/lt":
                            basePrice = Math.floor(currentPrice / 20) * 20;
                            break;
                        case "/tcs":
                            basePrice = Math.floor(currentPrice / 50) * 50;
                            break;
                        case "/nifty":
                            basePrice = Math.floor(currentPrice / 100) * 100;
                            break;
                        case "/usdinr2013":
                            basePrice = Math.floor(currentPrice / 0.5) * 0.5;
                            break;
                        case "/usdinr2014":
                            basePrice = Math.floor(currentPrice / 0.5) * 0.5;
                            break;
                        case "/usdinr2015":
                            basePrice = Math.floor(currentPrice / 0.5) * 0.5;
                            break;
                        case "/usdinr2016":
                            basePrice = Math.floor(currentPrice / 0.5) * 0.5;
                            break;
                    }



                    defendingStrikePrice = basePrice + 0.50;
                    supremeArray[i]["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                    if (towhich == 1) {
                        supremeArray[i]["PE sp " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(supremeArray[i]["DATE"], defendingStrikePrice));
                    } else {
                        supremeArray[i]["PE sp " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(supremeArray[i]["DATE"], defendingStrikePrice)) : pf(getPEThisMonthUSDINR(supremeArray[i]["DATE"], defendingStrikePrice));
                    }
                    supremeArray[i]["PE sq " + defendingStrikePrice] = 100;
                    supremeArray[i]["PE sv " + defendingStrikePrice] = pf(supremeArray[i]["PE sp " + defendingStrikePrice]) * pf(supremeArray[i]["PE sq " + defendingStrikePrice]);



                    defendingStrikePrice = basePrice - 1;
                    supremeArray[i]["PE STK " + defendingStrikePrice] = defendingStrikePrice;
                    if (towhich == 1) {
                        supremeArray[i]["PE BP " + defendingStrikePrice] = pf(getPEThisMonthUSDINR(supremeArray[i]["DATE"], defendingStrikePrice));
                    } else {
                        supremeArray[i]["PE BP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(supremeArray[i]["DATE"], defendingStrikePrice)) : pf(getPEThisMonthUSDINR(supremeArray[i]["DATE"], defendingStrikePrice));
                    }
                    supremeArray[i]["PE BQ " + defendingStrikePrice] = 100;
                    supremeArray[i]["PE BV " + defendingStrikePrice] = pf(supremeArray[i]["PE BP " + defendingStrikePrice]) * pf(supremeArray[i]["PE BQ " + defendingStrikePrice]);


                    defendingStrikePrice = basePrice - 0.50;
                    supremeArray[i]["CE STK " + (defendingStrikePrice)] = defendingStrikePrice;

                    if (towhich == 1) {
                        premiumPrice = pf(getCEThisMonthUSDINR(supremeArray[i]["DATE"], defendingStrikePrice));
                        console.log("premium is " + premiumPrice);
                    } else {
                        premiumPrice = (nseYear == 2015) ? pf(getCEThisMonthFifteen(supremeArray[i]["DATE"], defendingStrikePrice)) : pf(getCEThisMonthSixteen(supremeArray[i]["DATE"], defendingStrikePrice));
                    }

                    supremeArray[i]["CE BP " + (defendingStrikePrice)] = Math.abs(premiumPrice).toFixed(2);
                    supremeArray[i]["CE BQ " + (defendingStrikePrice)] = 100;
                    supremeArray[i]["CE BV " + (defendingStrikePrice)] = pf(supremeArray[i]["CE BP " + (defendingStrikePrice)]) * pf(supremeArray[i]["CE BQ " + (defendingStrikePrice)]);



                    defendingStrikePrice = basePrice + 0.50;
                    supremeArray[i]["CE STK " + (defendingStrikePrice)] = defendingStrikePrice;

                    if (towhich == 1) {
                        premiumPrice = pf(getCEThisMonthUSDINR(supremeArray[i]["DATE"], defendingStrikePrice));
                        console.log("premium is " + premiumPrice);
                    } else {
                        premiumPrice = (nseYear == 2015) ? pf(getCEThisMonthFifteen(supremeArray[i]["DATE"], defendingStrikePrice)) : pf(getCEThisMonthSixteen(supremeArray[i]["DATE"], defendingStrikePrice));
                    }

                    supremeArray[i]["CE BP " + (defendingStrikePrice)] = Math.abs(premiumPrice).toFixed(2);
                    supremeArray[i]["CE BQ " + (defendingStrikePrice)] = 100;
                    supremeArray[i]["CE BV " + (defendingStrikePrice)] = pf(supremeArray[i]["CE BP " + (defendingStrikePrice)]) * pf(supremeArray[i]["CE BQ " + (defendingStrikePrice)]);

                    defendingStrikePrice = basePrice;
                    supremeArray[i]["CE stk " + defendingStrikePrice] = defendingStrikePrice;
                    if (towhich == 1) {
                        supremeArray[i]["CE SP " + defendingStrikePrice] = pf(getCENextMonthUSDINR(supremeArray[i]["DATE"], defendingStrikePrice));
                    } else {
                        supremeArray[i]["CE SP " + defendingStrikePrice] = (nseYear == 2015) ? pf(getCENextMonthFifteen(supremeArray[i]["DATE"], defendingStrikePrice)) : pf(getCENextMonthSixteen(supremeArray[i]["DATE"], defendingStrikePrice));
                    }
                    supremeArray[i]["CE SQ " + defendingStrikePrice] = 100;
                    supremeArray[i]["CE SV " + defendingStrikePrice] = pf(supremeArray[i]["CE SP " + defendingStrikePrice]) * pf(supremeArray[i]["CE SQ " + defendingStrikePrice]);

                }
            }

            var doThings = function(supremeArry, callback) {

                for (var i = 0; i < supremeArry.length; i++) {
                    if (i == 0) {
                        if (supremeArray[i]["BP"] == null) {
                            supremeArray[i]["BP"] = 0;
                            supremeArray[i]["BQ"] = 0;
                            supremeArray[i]["BV"] = 0;
                            supremeArray[i]["SP"] = 0;
                            supremeArray[i]["SQ"] = 0;
                            supremeArray[i]["SV"] = 0;
                            supremeArray[i]["NQ"] = 0;
                            supremeArray[i]["NV"] = 0;
                            supremeArray[i]["AVG"] = 0;
                            supremeArray[i]["MTM"] = 0;
                        } else {
                            supremeArray[i]["NQ"] = supremeArray[i]["BQ"];
                            supremeArray[i]["NV"] = supremeArray[i]["BV"];
                            supremeArray[i]["AVG"] = (parseFloat(supremeArray[i]["NV"]) / parseFloat(supremeArray[i]["NQ"])).toFixed(2);
                            supremeArray[i]["MTM"] = ((parseFloat(supremeArray[i]["AVG"]) - parseFloat(supremeArray[i]["LTP"])) * parseFloat(supremeArray[i]["NQ"])).toFixed(2);
                        }

                        if (supremeArray[i]["sp"] == null) {
                            supremeArray[i]["bp"] = 0;
                            supremeArray[i]["bq"] = 0;
                            supremeArray[i]["bv"] = 0;
                            supremeArray[i]["sp"] = 0;
                            supremeArray[i]["sq"] = 0;
                            supremeArray[i]["sv"] = 0;
                            supremeArray[i]["nq"] = 0;
                            supremeArray[i]["nv"] = 0;
                            supremeArray[i]["avg"] = 0;
                            supremeArray[i]["mtm"] = 0;
                        } else {
                            supremeArray[i]["nq"] = supremeArray[i]["sq"];
                            supremeArray[i]["nv"] = supremeArray[i]["sv"];
                            supremeArray[i]["avg"] = (parseFloat(supremeArray[i]["nv"]) / parseFloat(supremeArray[i]["nq"])).toFixed(2);
                            supremeArray[i]["mtm"] = ((parseFloat(supremeArray[i]["avg"]) - parseFloat(supremeArray[i]["LTP"])) * parseFloat(supremeArray[i]["nq"])).toFixed(2);
                        }

                    } else {

                    }

                }

                var firstDays = [];

                var getPreviousDate = function(i) {
                    for (var t = i - 1; t > 0; t--) {
                        if (supremeArray[t]["DATE"] !== null && supremeArray[t]["DATE"] != "") {
                            return supremeArray[t]["DATE"];
                        }
                    }
                }

                var getNextEntry = function(i) {
                    for (var t = i + 1; t < supremeArray.length; t++) {
                        if (supremeArray[t]["DATE"] !== null && supremeArray[t]["DATE"] != "") {
                            return t;
                        }
                    }
                }

                for (var i = 1; i < supremeArray.length; i++) {
                    if (supremeArray[i]["DATE"] != null && supremeArray[i]["DATE"] != "") {
                        if (supremeArray[i]["DATE"] != "" && supremeArray[i]["DATE"] != null) {
                            nowRealDate = supremeArray[i]["DATE"];
                            nowDate = supremeArray[i]["DATE"].substring(3, supremeArray.length);
                            previousRealDate = getPreviousDate(i);
                            if (previousRealDate === undefined) {

                            } else {
                                previousDate = previousRealDate.substring(3, supremeArray.length);
                                if (nowDate != previousDate) {
                                    firstDays.push(nowRealDate);
                                }
                            }
                        }
                    }
                }

                var checkFirstDay = function(date) {
                    if (firstDays.indexOf(date) > -1) {
                        return true;
                    } else {
                        return false;
                    }
                }

                var checkLastWednesday = function(date) {
                    if (underlyingsArray.indexOf(date.toString()) > -1) {
                        return true;
                    } else {
                        return false;
                    }
                }

                var getPreviousLNV = function(i) {
                    var i = i - 1;
                    if (supremeArray[i]["NV"] != "") {
                        return supremeArray[i]["NV"];
                    } else {
                        for (var t = i; t >= 0; t--) {
                            if (supremeArray[t]["NV"] != "") {
                                return supremeArray[t]["NV"];
                            }
                        }
                    }
                }

                var getNextRNV = function(i) {
                    var i = i - 1;
                    if (supremeArray[i]["nv"] != "") {
                        return supremeArray[i]["nv"];
                    } else {
                        for (var t = i; t >= 0; t--) {
                            if (supremeArray[t]["nv"] != "") {
                                return supremeArray[t]["nv"];
                            }
                        }
                    }
                }

                var getPreviousDate = function(i) {
                    var i = i - 1;
                    if (supremeArray[i]["DATE"] != "") {
                        return supremeArray[i]["DATE"];
                    } else {
                        for (var t = i; t >= 0; t--) {
                            if (supremeArray[t]["DATE"] != "") {
                                return supremeArray[t]["DATE"];
                            }
                        }
                    }
                }

                var getPreviousRNV = function(i) {
                    var i = i - 1;
                    if (supremeArray[i]["nv"] != "") {
                        return supremeArray[i]["nv"];
                    } else {
                        for (var t = i; t >= 0; t--) {
                            if (supremeArray[t]["nv"] != "") {
                                return supremeArray[t]["nv"];
                            }
                        }
                    }
                }

                for (var i = 1; i < supremeArray.length; i++) {

                    if (currency == 1) {

                        if (underlyings == 1) {

                            if (supremeArray[i]["DATE"] != "") {
                                if (underlyingsArray.indexOf(getPreviousDate(i)) > -1) {
                                    monthEnd["left"] = getPreviousLNV(i);
                                    monthEnd["right"] = getPreviousRNV(i);
                                }
                            }

                        } else {
                            if ((supremeArray[i]["DATE"] != "") && checkFirstDay(supremeArray[i]["DATE"])) {
                                monthEnd["left"] = getPreviousLNV(i);
                                monthEnd["right"] = getPreviousRNV(i);
                            }
                        }

                    } else {
                        if ((supremeArray[i]["DATE"] != "") && checkLastWednesday(getPreviousDate(i))) {
                            if (towhich == 1) {
                                if (firstDays.indexOf(supremeArray[i]["DATE"]) == 0) {
                                    if (firstDays.length == 1) {
                                        monthEnd["left"] = getPreviousLNV(i);
                                        monthEnd["right"] = getPreviousRNV(i);
                                    } else {

                                    }
                                } else {
                                    monthEnd["left"] = getPreviousLNV(i);
                                    monthEnd["right"] = getPreviousRNV(i);
                                }
                            } else {
                                monthEnd["left"] = getPreviousLNV(i);
                                monthEnd["right"] = getPreviousRNV(i);
                            }
                        }
                    }
                }

                var firstDays = [];

                var getNextEntry = function(i) {
                    for (var t = i + 1; t < supremeArray.length; t++) {
                        if ((supremeArray[t]["DATE"] !== null) && (supremeArray[t]["DATE"] != "") && (supremeArray[t]["DATE"] !== undefined)) {
                            return t;
                        }
                    }
                }

                var checkLastWednesday = function(date) {
                    if (underlyingsArray.indexOf(date.toString()) > -1) {
                        return true;
                    } else {
                        return false;
                    }
                }

                for (var v = 0; v < supremeArray.length; v++) {
                    var date = supremeArray[v]["DATE"];
                    if (date != "" && date != null && date !== undefined) {
                        if (checkLastWednesday(supremeArray[v]["DATE"])) {
                            firstDays.push(supremeArray[getNextEntry(v)]["DATE"]);
                        }
                    }
                }

                var checkFirstDay = function(date, cepechecker) {
                    if (towhich == 1) {
                        if (cepechecker == 1) {
                            if (firstDays.length == 1) {
                                if (firstDays.indexOf(date) > -1) {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                if (firstDays.indexOf(date) > 0) {
                                    return true;
                                }
                                if (firstDays.indexOf(date) == 0) {
                                    return false;
                                }
                            }
                        }
                    }
                    if (firstDays.indexOf(date) > -1) {
                        return true;
                    } else {
                        return false;
                    }
                }

                var toRetNQBuy = function(i, whereat, amount) {

                    if (i > supremeArray.length) {
                        return 0;
                    }

                    if (i == 0) {
                        return 0;
                    }

                    if ((supremeArray[i]["DATE"] != null) && (supremeArray[i]["DATE"] !== undefined) && (checkFirstDay(supremeArray[i]["DATE"]))) {
                        return 0;
                    }

                    var boughtQuan = supremeArray[i]["PE BQ " + amount];
                    var soldQuan = supremeArray[i]["PE sq " + amount];

                    if (boughtQuan != null && soldQuan == null) {
                        return pi(boughtQuan);
                    }
                    if (boughtQuan == null && soldQuan != null) {
                        return -Math.abs(pi(soldQuan));
                    }
                    if (boughtQuan != null && soldQuan != null) {
                        return (pi(boughtQuan) - pi(soldQuan))
                    }
                    if (boughtQuan == null && soldQuan == null) {
                        return 0;
                    }
                }

                var toRetNVBuy = function(i, whereat, amount) {

                    if (i == 0) {
                        return 0;
                    }

                    if ((supremeArray[i]["DATE"] != null) && (supremeArray[i]["DATE"] !== undefined) && (checkFirstDay(supremeArray[i]["DATE"]))) {
                        return 0;
                    }

                    var boughtValue = supremeArray[i]["PE BV " + amount];
                    var soldValue = supremeArray[i]["PE sv " + amount];

                    if (boughtValue != null && soldValue == null) {
                        return pi(boughtValue);
                    }
                    if (boughtValue == null && soldValue != null) {
                        return -Math.abs(pi(soldValue));
                    }
                    if (boughtValue != null && soldValue != null) {
                        return (pi(boughtValue) - pi(soldValue))
                    }
                    if (boughtValue == null && soldValue == null) {
                        return 0;
                    }
                }

                var toRetNQBuyS = function(i, whereat, amount) {

                    if (i == 0) {
                        return 0;
                    }

                    if ((supremeArray[i]["DATE"] != null) && (supremeArray[i]["DATE"] !== undefined) && (checkFirstDay(supremeArray[i]["DATE"]))) {
                        return 0;
                    }

                    var boughtQuan = supremeArray[i]["PE bq " + amount];
                    var soldQuan = supremeArray[i]["PE SQ " + amount];

                    if (boughtQuan != null && soldQuan == null) {
                        return pi(boughtQuan);
                    }
                    if (boughtQuan == null && soldQuan != null) {
                        return -Math.abs(pi(soldQuan));
                    }
                    if (boughtQuan != null && soldQuan != null) {
                        return (pi(boughtQuan) - pi(soldQuan))
                    }
                    if (boughtQuan == null && soldQuan == null) {
                        return 0;
                    }
                }

                var toRetNVBuyS = function(i, whereat, amount) {

                    if (i == 0) {
                        return 0;
                    }

                    if ((supremeArray[i]["DATE"] != null) && (supremeArray[i]["DATE"] !== undefined) && (checkFirstDay(supremeArray[i]["DATE"]))) {
                        return 0;
                    }

                    var boughtValue = supremeArray[i]["PE bv " + amount];
                    var soldValue = supremeArray[i]["PE SV " + amount];

                    if (boughtValue != null && soldValue == null) {
                        return pi(boughtValue);
                    }
                    if (boughtValue == null && soldValue != null) {
                        return -Math.abs(pi(soldValue));
                    }
                    if (boughtValue != null && soldValue != null) {
                        return (pi(boughtValue) - pi(soldValue))
                    }
                    if (boughtValue == null && soldValue == null) {
                        return 0;
                    }
                }

                var getBuyNQ = function(i, whereat, amount) {
                    if (i == 0) {

                        var boughtQuan = supremeArray[i]["PE BQ " + amount];
                        var soldQuan = supremeArray[i]["PE sq " + amount];

                        if (boughtQuan != null && soldQuan == null) {
                            return pi(boughtQuan);
                        }
                        if (boughtQuan == null && soldQuan != null) {
                            return -Math.abs(pi(soldQuan));
                        }
                        if (boughtQuan != null && soldQuan != null) {
                            return (pi(boughtQuan) - pi(soldQuan));
                        }
                        if (boughtQuan == null && soldQuan == null) {
                            return 0;
                        }

                    } else if ((supremeArray[i]["DATE"] != null) && (supremeArray[i]["DATE"] !== undefined) && (checkFirstDay(supremeArray[i]["DATE"]))) {

                        var boughtQuan = supremeArray[i]["PE BQ " + amount];
                        var soldQuan = supremeArray[i]["PE sq " + amount];

                        if (boughtQuan != null && soldQuan == null) {
                            return pi(boughtQuan);
                        }
                        if (boughtQuan == null && soldQuan != null) {
                            return -Math.abs(pi(soldQuan));
                        }
                        if (boughtQuan != null && soldQuan != null) {
                            return (pi(boughtQuan) - pi(soldQuan));
                        }
                        if (boughtQuan == null && soldQuan == null) {
                            return 0;
                        }

                    } else {
                        return supremeArray[i - 1][whereat];
                    }
                }

                var getBuyNV = function(i, whereat, amount) {
                    if (i == 0) {
                        var boughtValue = supremeArray[i]["PE BV " + amount];
                        var soldValue = supremeArray[i]["PE sv " + amount];

                        if (boughtValue != null && soldValue == null) {
                            return pi(boughtValue);
                        }
                        if (boughtValue == null && soldValue != null) {
                            return -Math.abs(pi(soldValue));
                        }
                        if (boughtValue != null && soldValue != null) {
                            return (pi(boughtValue) - pi(soldValue));
                        }
                        if (boughtValue == null && soldValue == null) {
                            return 0;
                        }

                    } else if ((supremeArray[i]["DATE"] != null) && (supremeArray[i]["DATE"] !== undefined) && (checkFirstDay(supremeArray[i]["DATE"]))) {
                        var boughtValue = supremeArray[i]["PE BV " + amount];
                        var soldValue = supremeArray[i]["PE sv " + amount];

                        if (boughtValue != null && soldValue == null) {
                            return pi(boughtValue);
                        }
                        if (boughtValue == null && soldValue != null) {
                            return -Math.abs(pi(soldValue));
                        }
                        if (boughtValue != null && soldValue != null) {
                            return (pi(boughtValue) - pi(soldValue));
                        }
                        if (boughtValue == null && soldValue == null) {
                            return 0;
                        }
                    } else {
                        return supremeArray[i - 1][whereat];
                    }
                }

                var getBuyAVG = function(i, whereat, amount) {
                    if (pi(supremeArray[i]["PE nq " + amount]) == 0) {
                        return 0;
                    }
                    if (pi(supremeArray[i]["PE nv " + amount]) == 0) {
                        return 0;
                    } else {
                        return (pi(supremeArray[i]["PE nv " + amount]) / pi(supremeArray[i]["PE nq " + amount]));
                    }
                }

                var getSellNQ = function(i, whereat, amount) {

                    if (i == 0) {

                        var boughtQuan = supremeArray[i]["PE bq " + amount];
                        var soldQuan = supremeArray[i]["PE SQ " + amount];

                        if (boughtQuan != null && soldQuan == null) {
                            return pi(boughtQuan);
                        }
                        if (boughtQuan == null && soldQuan != null) {
                            return -Math.abs(pi(soldQuan));
                        }
                        if (boughtQuan != null && soldQuan != null) {
                            return (pi(boughtQuan) - pi(soldQuan));
                        }
                        if (boughtQuan == null && soldQuan == null) {
                            return 0;
                        }

                    } else if ((supremeArray[i]["DATE"] != null) && (supremeArray[i]["DATE"] !== undefined) && (checkFirstDay(supremeArray[i]["DATE"]))) {
                        var boughtQuan = supremeArray[i]["PE bq " + amount];
                        var soldQuan = supremeArray[i]["PE SQ " + amount];

                        if (boughtQuan != null && soldQuan == null) {
                            return pi(boughtQuan);
                        }
                        if (boughtQuan == null && soldQuan != null) {
                            return -Math.abs(pi(soldQuan));
                        }
                        if (boughtQuan != null && soldQuan != null) {
                            return (pi(boughtQuan) - pi(soldQuan));
                        }
                        if (boughtQuan == null && soldQuan == null) {
                            return 0;
                        }

                    } else {
                        return supremeArray[i - 1][whereat];
                    }

                }

                var getSellNV = function(i, whereat, amount) {

                    if (i == 0) {

                        var boughtValue = supremeArray[i]["PE bv " + amount];
                        var soldValue = supremeArray[i]["PE SV " + amount];

                        if (boughtValue != null && soldValue == null) {
                            return pi(boughtValue);
                        }
                        if (boughtValue == null && soldValue != null) {
                            return -Math.abs(pi(soldValue));
                        }
                        if (boughtValue != null && soldValue != null) {
                            return (pi(boughtValue) - pi(soldValue));
                        }
                        if (boughtValue == null && soldValue == null) {
                            return 0;
                        }

                    } else if ((supremeArray[i]["DATE"] != null) && (supremeArray[i]["DATE"] !== undefined) && (checkFirstDay(supremeArray[i]["DATE"]))) {
                        var boughtValue = supremeArray[i]["PE bv " + amount];
                        var soldValue = supremeArray[i]["PE SV " + amount];

                        if (boughtValue != null && soldValue == null) {
                            return pi(boughtValue);
                        }
                        if (boughtValue == null && soldValue != null) {
                            return -Math.abs(pi(soldValue));
                        }
                        if (boughtValue != null && soldValue != null) {
                            return (pi(boughtValue) - pi(soldValue));
                        }
                        if (boughtValue == null && soldValue == null) {
                            return 0;
                        }
                    } else {
                        return supremeArray[i - 1][whereat];
                    }

                }

                var getSellAVG = function(i, whereat, amount) {

                    if (pi(supremeArray[i]["PE NQ " + amount]) == 0) {
                        return 0;
                    }

                    if (pi(supremeArray[i]["PE NV " + amount]) == 0) {
                        return 0;
                    } else {
                        return (pi(supremeArray[i]["PE NV " + amount]) / pi(supremeArray[i]["PE NQ " + amount]));
                    }
                }

                var highest = 0;
                for (var i = 0; i < supremeArray.length; i++) {
                    if ((supremeArray[i]["HIGH"] != null) && (supremeArray[i]["HIGH"] != "")) {
                        if (parseInt(supremeArray[i]["HIGH"]) > highest) {
                            highest = parseInt(supremeArray[i]["HIGH"]);
                        }
                    }
                }

                var lowest = highest;

                for (var i = 0; i < supremeArray.length; i++) {
                    if ((supremeArray[i]["LOW"] != null) && (supremeArray[i]["LOW"] != "")) {
                        if (parseInt(supremeArray[i]["LOW"]) < lowest) {
                            lowest = parseInt(supremeArray[i]["LOW"]);
                        }
                    }
                }

                switch (onwhich) {
                    case "/lt":
                        highest = (Math.ceil(highest / 20) * 20) + 40;
                        lowest = (Math.floor(lowest / 20) * 20) - 40;
                        looper = (highest - lowest) / 20;
                        nQuan = 20;
                        break;
                    case "/tcs":
                        highest = (Math.ceil(highest / 50) * 50) + 100;
                        lowest = (Math.floor(lowest / 50) * 50) - 100;
                        looper = (highest - lowest) / 50;
                        nQuan = 50;
                        break;
                    case "/nifty":
                        highest = (Math.ceil(highest / 100) * 100) + 200;
                        lowest = (Math.floor(lowest / 100) * 100) - 200;
                        looper = (highest - lowest) / 100;
                        nQuan = 100;
                        break;
                    case "/usdinr2013":
                        highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                        lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                        looper = (highest - lowest) / 0.5;
                        nQuan = 0.5;
                        break;
                    case "/usdinr2014":
                        highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                        lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                        looper = (highest - lowest) / 0.5;
                        nQuan = 0.5;
                        break;
                    case "/usdinr2015":
                        highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                        lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                        looper = (highest - lowest) / 0.5;
                        nQuan = 0.5;
                        break;
                    case "/usdinr2016":
                        highest = (Math.ceil(highest / 0.5) * 0.5) + 2;
                        lowest = (Math.floor(lowest / 0.5) * 0.5) - 2;
                        looper = (highest - lowest) / 0.5;
                        nQuan = 0.5;
                        break;
                }

                var getPreviousDate = function(i) {
                    for (var t = i - 1; t > 0; t--) {
                        if (supremeArray[t]["DATE"] !== null && supremeArray[t]["DATE"] != "" && supremeArray[t]["DATE"] !== undefined) {
                            return supremeArray[t]["DATE"];
                        }
                    }
                }

                for (var i = 0; i < supremeArray.length; i++) {

                    for (var k = looper; k >= 0; k--) {

                        var toAddNQ = pi(getBuyNQ(i, "PE nq " + ((lowest + (k * nQuan))), (lowest + (k * nQuan))));

                        var toRetNQ = pi(toRetNQBuy(i, "PE nq " + ((lowest + (k * nQuan))), (lowest + (k * nQuan))));

                        supremeArray[i]["PE nq " + ((lowest + (k * nQuan)))] = toAddNQ + toRetNQ;

                        var toAddNV = pi(getBuyNV(i, "PE nv " + ((lowest + (k * nQuan))), (lowest + (k * nQuan))));

                        var toRetNV = pi(toRetNVBuy(i, "PE nv " + ((lowest + (k * nQuan))), (lowest + (k * nQuan))));

                        supremeArray[i]["PE nv " + ((lowest + (k * nQuan)))] = toAddNV + toRetNV;

                        supremeArray[i]["PE avg " + ((lowest + (k * nQuan)))] = getBuyAVG(i, "PE avg " + ((lowest + (k * nQuan))), ((lowest + (k * nQuan))));

                        var toAddNQS = pi(getSellNQ(i, "PE NQ " + ((lowest + (k * nQuan))), (lowest + (k * nQuan))));

                        var toRetNQS = pi(toRetNQBuyS(i, "PE NQ " + ((lowest + (k * nQuan))), (lowest + (k * nQuan))));

                        supremeArray[i]["PE NQ " + ((lowest + (k * nQuan)))] = toAddNQS + toRetNQS;

                        var toAddNVS = pi(getSellNV(i, "PE NV " + ((lowest + (k * nQuan))), (lowest + (k * nQuan))));

                        var toRetNVS = pi(toRetNVBuyS(i, "PE NV " + ((lowest + (k * nQuan))), (lowest + (k * nQuan))));

                        supremeArray[i]["PE NV " + ((lowest + (k * nQuan)))] = toAddNVS + toRetNVS;

                        supremeArray[i]["PE AVG1 " + ((lowest + (k * nQuan)))] = getSellAVG(i, "PE AVG1 " + ((lowest + (k * nQuan))), ((lowest + (k * nQuan))));

                    }

                    var date = supremeArray[i]["DATE"];

                    if (date != null && date != "" && date !== undefined) {

                        if (checkFirstDay(date, 1)) {

                            var totalnqPE = 0;
                            var totalnvPE = 0;
                            var totalNQPE = 0;
                            var totalNVPE = 0;


                            for (var k = looper; k >= 0; k--) {

                                var nq = supremeArray[i - 1]["PE nq " + ((lowest + (k * nQuan)))];

                                var NQ = supremeArray[i - 1]["PE NQ " + ((lowest + (k * nQuan)))];

                                if (nq < 0) {

                                    var date = getPreviousDate(i - 1);

                                    var defendingStrikePrice = ((lowest + (k * nQuan)));
                                    if (towhich == 1) {
                                        supremeArray[i - 1]["PE BP " + ((lowest + (k * nQuan)))] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice, 1));
                                    } else {
                                        supremeArray[i - 1]["PE BP " + ((lowest + (k * nQuan)))] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                    }
                                    supremeArray[i - 1]["PE BQ " + ((lowest + (k * nQuan)))] = Math.abs(nq);
                                    supremeArray[i - 1]["PE BV " + ((lowest + (k * nQuan)))] = parseFloat(supremeArray[i - 1]["PE BP " + ((lowest + (k * nQuan)))]) * parseInt(supremeArray[i - 1]["PE BQ " + ((lowest + (k * nQuan)))]);

                                }

                                if (nq > 0) {

                                    var date = getPreviousDate(i - 1);

                                    var defendingStrikePrice = ((lowest + (k * nQuan)));
                                    if (towhich == 1) {
                                        supremeArray[i - 1]["PE sp " + ((lowest + (k * nQuan)))] = pf(getPEThisMonthUSDINR(date, defendingStrikePrice, 1));
                                    } else {
                                        supremeArray[i - 1]["PE sp " + ((lowest + (k * nQuan)))] = (nseYear == 2015) ? pf(getPEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                    }
                                    supremeArray[i - 1]["PE sq " + ((lowest + (k * nQuan)))] = -Math.abs(nq);
                                    supremeArray[i - 1]["PE sv " + ((lowest + (k * nQuan)))] = parseFloat(supremeArray[i - 1]["PE sp " + ((lowest + (k * nQuan)))]) * parseInt(supremeArray[i - 1]["PE sq " + ((lowest + (k * nQuan)))]);

                                }

                                if (NQ < 0) {

                                    var date = getPreviousDate(i - 1);

                                    var defendingStrikePrice = ((lowest + (k * nQuan)));
                                    if (towhich == 1) {
                                        supremeArray[i - 1]["PE bp " + ((lowest + (k * nQuan)))] = pf(getPENextMonthUSDINR(date, defendingStrikePrice, 1));
                                    } else {
                                        supremeArray[i - 1]["PE bp " + ((lowest + (k * nQuan)))] = (nseYear == 2015) ? pf(getPENextMonthFifteen(date, defendingStrikePrice)) : pf(getPENextMonthSixteen(date, defendingStrikePrice));
                                    }
                                    supremeArray[i - 1]["PE bq " + ((lowest + (k * nQuan)))] = Math.abs(NQ);
                                    supremeArray[i - 1]["PE bv " + ((lowest + (k * nQuan)))] = parseFloat(supremeArray[i - 1]["PE bp " + ((lowest + (k * nQuan)))]) * parseInt(supremeArray[i - 1]["PE bq " + ((lowest + (k * nQuan)))]);

                                }

                                if (NQ > 0) {

                                    var date = getPreviousDate(i - 1);

                                    var defendingStrikePrice = ((lowest + (k * nQuan)));
                                    if (towhich == 1) {
                                        supremeArray[i - 1]["PE SP " + ((lowest + (k * nQuan)))] = pf(getPENextMonthUSDINR(date, defendingStrikePrice, 1));
                                    } else {
                                        supremeArray[i - 1]["PE SP " + ((lowest + (k * nQuan)))] = (nseYear == 2015) ? pf(getPENextMonthFifteen(date, defendingStrikePrice)) : pf(getPENextMonthSixteen(date, defendingStrikePrice));
                                    }
                                    supremeArray[i - 1]["PE SQ " + ((lowest + (k * nQuan)))] = -Math.abs(NQ);
                                    supremeArray[i - 1]["PE SV " + ((lowest + (k * nQuan)))] = parseFloat(supremeArray[i - 1]["PE SP " + ((lowest + (k * nQuan)))]) * parseInt(supremeArray[i - 1]["PE SQ " + ((lowest + (k * nQuan)))]);

                                }


                                if (supremeArray[i - 1]["PE nq " + ((lowest + (k * nQuan)))] == 0) {
                                    totalnqPE += supremeArray[i - 1]["PE nq " + ((lowest + (k * nQuan)))];
                                    totalnvPE += supremeArray[i - 1]["PE nv " + ((lowest + (k * nQuan)))];
                                } else {
                                    supremeArray[i - 1]["PE nq " + ((lowest + (k * nQuan)))] = ((supremeArray[i - 1]["PE nq " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["PE nq " + ((lowest + (k * nQuan)))]) + (supremeArray[i - 1]["PE BQ " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["PE BQ " + ((lowest + (k * nQuan)))]) + (supremeArray[i - 1]["PE sq " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["PE sq " + ((lowest + (k * nQuan)))]));

                                    totalnqPE += supremeArray[i - 1]["PE nq " + ((lowest + (k * nQuan)))];

                                    supremeArray[i - 1]["PE nv " + ((lowest + (k * nQuan)))] = ((supremeArray[i - 1]["PE nv " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["PE nv " + ((lowest + (k * nQuan)))]) + (supremeArray[i - 1]["PE BV " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["PE BV " + ((lowest + (k * nQuan)))]) + (supremeArray[i - 1]["PE sv " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["PE sv " + ((lowest + (k * nQuan)))]));

                                    totalnvPE += supremeArray[i - 1]["PE nv " + ((lowest + (k * nQuan)))];
                                }

                                if (supremeArray[i - 1]["PE NQ " + ((lowest + (k * nQuan)))] == 0) {
                                    totalNQPE += supremeArray[i - 1]["PE NQ " + ((lowest + (k * nQuan)))];
                                    totalNVPE += supremeArray[i - 1]["PE NV " + ((lowest + (k * nQuan)))];
                                } else {
                                    supremeArray[i - 1]["PE NQ " + ((lowest + (k * nQuan)))] = ((supremeArray[i - 1]["PE NQ " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["PE NQ " + ((lowest + (k * nQuan)))]) + (supremeArray[i - 1]["PE bq " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["PE bq " + ((lowest + (k * nQuan)))]) + (supremeArray[i - 1]["PE SQ " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["PE SQ " + ((lowest + (k * nQuan)))]));

                                    totalNQPE += supremeArray[i - 1]["PE NQ " + ((lowest + (k * nQuan)))];

                                    supremeArray[i - 1]["PE NV " + ((lowest + (k * nQuan)))] = ((supremeArray[i - 1]["PE NV " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["PE NV " + ((lowest + (k * nQuan)))]) + (supremeArray[i - 1]["PE bv " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["PE bv " + ((lowest + (k * nQuan)))]) + (supremeArray[i - 1]["PE SV " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["PE SV " + ((lowest + (k * nQuan)))]));

                                    totalNVPE += supremeArray[i - 1]["PE NV " + ((lowest + (k * nQuan)))];
                                }
                            }

                            var totalNetValuePE = totalNVPE + totalnvPE;
                            monthEnd["pe"] = totalNetValuePE;
                        }
                    }
                }

                var getBuyNQC = function(i, whereat, amount) {

                    if (i == 0) {
                        var boughtQuan = supremeArray[i]["CE BQ " + amount];
                        var soldQuan = supremeArray[i]["CE sq " + amount];

                        if (boughtQuan != null && soldQuan == null) {
                            return pi(boughtQuan);
                        }
                        if (boughtQuan == null && soldQuan != null) {
                            return -Math.abs(pi(soldQuan));
                        }
                        if (boughtQuan != null && soldQuan != null) {
                            return (pi(boughtQuan) - pi(soldQuan));
                        }
                        if (boughtQuan == null && soldQuan == null) {
                            return 0;
                        }
                    } else if ((supremeArray[i]["DATE"] != null) && (supremeArray[i]["DATE"] !== undefined) && (checkFirstDay(supremeArray[i]["DATE"]))) {
                        var boughtQuan = supremeArray[i]["CE BQ " + amount];
                        var soldQuan = supremeArray[i]["CE sq " + amount];

                        if (boughtQuan != null && soldQuan == null) {
                            return pi(boughtQuan);
                        }
                        if (boughtQuan == null && soldQuan != null) {
                            return -Math.abs(pi(soldQuan));
                        }
                        if (boughtQuan != null && soldQuan != null) {
                            return (pi(boughtQuan) - pi(soldQuan));
                        }
                        if (boughtQuan == null && soldQuan == null) {
                            return 0;
                        }
                    } else {
                        return supremeArray[i - 1][whereat];
                    }
                }

                var getRetNQCVS = function(i, whereat, amount) {

                    if (i == 0) {
                        return 0;
                    }

                    if ((supremeArray[i]["DATE"] != null) && (supremeArray[i]["DATE"] !== undefined) && (checkFirstDay(supremeArray[i]["DATE"]))) {
                        return 0;
                    }

                    var boughtQuan = supremeArray[i]["CE bq " + amount];
                    var soldQuan = supremeArray[i]["CE SQ " + amount];

                    if (boughtQuan != null && soldQuan == null) {
                        return pi(boughtQuan);
                    }
                    if (boughtQuan == null && soldQuan != null) {
                        return -Math.abs(pi(soldQuan));
                    }
                    if (boughtQuan != null && soldQuan != null) {
                        return (pi(boughtQuan) - pi(soldQuan));
                    }
                    if (boughtQuan == null && soldQuan == null) {
                        return 0;
                    }

                }

                var getRetNVCVS = function(i, whereat, amount) {

                    if (i == 0) {
                        return 0;
                    }

                    if ((supremeArray[i]["DATE"] != null) && (supremeArray[i]["DATE"] !== undefined) && (checkFirstDay(supremeArray[i]["DATE"]))) {
                        return 0;
                    }

                    var boughtValue = supremeArray[i]["CE bv " + amount];
                    var soldValue = supremeArray[i]["CE SV " + amount];

                    if (boughtValue != null && soldValue == null) {
                        return pi(boughtValue);
                    }
                    if (boughtValue == null && soldValue != null) {
                        return -Math.abs(pi(soldValue));
                    }
                    if (boughtValue != null && soldValue != null) {
                        return (pi(boughtValue) - pi(soldValue));
                    }
                    if (boughtValue == null && soldValue == null) {
                        return 0;
                    }

                }

                var getRetNQCV = function(i, whereat, amount) {

                    if (i == 0) {
                        return 0;
                    }

                    if ((supremeArray[i]["DATE"] != null) && (supremeArray[i]["DATE"] !== undefined) && (checkFirstDay(supremeArray[i]["DATE"]))) {
                        return 0;
                    }

                    var boughtQuan = supremeArray[i]["CE BQ " + amount];
                    var soldQuan = supremeArray[i]["CE sq " + amount];

                    if (boughtQuan != null && soldQuan == null) {
                        return pi(boughtQuan);
                    }
                    if (boughtQuan == null && soldQuan != null) {
                        return -Math.abs(pi(soldQuan));
                    }
                    if (boughtQuan != null && soldQuan != null) {
                        return (pi(boughtQuan) - pi(soldQuan));
                    }
                    if (boughtQuan == null && soldQuan == null) {
                        return 0;
                    }

                }

                var getRetNVCV = function(i, whereat, amount) {

                    if (i == 0) {
                        return 0;
                    }

                    if ((supremeArray[i]["DATE"] != null) && (supremeArray[i]["DATE"] !== undefined) && (checkFirstDay(supremeArray[i]["DATE"]))) {
                        return 0;
                    }

                    var boughtValue = supremeArray[i]["CE BV " + amount];
                    var soldValue = supremeArray[i]["CE sv " + amount];

                    if (boughtValue != null && soldValue == null) {
                        return pi(boughtValue);
                    }
                    if (boughtValue == null && soldValue != null) {
                        return -Math.abs(pi(soldValue));
                    }
                    if (boughtValue != null && soldValue != null) {
                        return (pi(boughtValue) - pi(soldValue));
                    }
                    if (boughtValue == null && soldValue == null) {
                        return 0;
                    }

                }

                var getBuyNVC = function(i, whereat, amount) {

                    if (i == 0) {
                        var boughtValue = supremeArray[i]["CE BV " + amount];
                        var soldValue = supremeArray[i]["CE sv " + amount];

                        if (boughtValue != null && soldValue == null) {
                            return pi(boughtValue);
                        }
                        if (boughtValue == null && soldValue != null) {
                            return -Math.abs(pi(soldValue));
                        }
                        if (boughtValue != null && soldValue != null) {
                            return (pi(boughtValue) - pi(soldValue));
                        }
                        if (boughtValue == null && soldValue == null) {
                            return 0;
                        }
                    } else if ((supremeArray[i]["DATE"] != null) && (supremeArray[i]["DATE"] !== undefined) && (checkFirstDay(supremeArray[i]["DATE"]))) {
                        var boughtValue = supremeArray[i]["CE BV " + amount];
                        var soldValue = supremeArray[i]["CE sv " + amount];

                        if (boughtValue != null && soldValue == null) {
                            return pi(boughtValue);
                        }
                        if (boughtValue == null && soldValue != null) {
                            return -Math.abs(pi(soldValue));
                        }
                        if (boughtValue != null && soldValue != null) {
                            return (pi(boughtValue) - pi(soldValue));
                        }
                        if (boughtValue == null && soldValue == null) {
                            return 0;
                        }
                    } else {
                        return supremeArray[i - 1][whereat];
                    }

                }

                var getBuyAVGC = function(i, whereat, amount) {

                    if (pi(supremeArray[i]["CE nq " + amount]) == 0) {
                        return 0;
                    }
                    if (pi(supremeArray[i]["CE nv " + amount]) == 0) {
                        return 0;
                    } else {
                        return (pi(supremeArray[i]["CE nv " + amount]) / pi(supremeArray[i]["CE nq " + amount]));
                    }

                }

                var getSellNQC = function(i, whereat, amount) {

                    if (i == 0) {

                        var boughtQuan = supremeArray[i]["CE bq " + amount];
                        var soldQuan = supremeArray[i]["CE SQ " + amount];

                        if (boughtQuan != null && soldQuan == null) {
                            return pi(boughtQuan);
                        }
                        if (boughtQuan == null && soldQuan != null) {
                            return -Math.abs(pi(soldQuan));
                        }
                        if (boughtQuan != null && soldQuan != null) {
                            return (pi(boughtQuan) - pi(soldQuan));
                        }
                        if (boughtQuan == null && soldQuan == null) {
                            return 0;
                        }
                    } else if ((supremeArray[i]["DATE"] != null) && (supremeArray[i]["DATE"] !== undefined) && (checkFirstDay(supremeArray[i]["DATE"]))) {
                        var boughtQuan = supremeArray[i]["CE bq " + amount];
                        var soldQuan = supremeArray[i]["CE SQ " + amount];

                        if (boughtQuan != null && soldQuan == null) {
                            return pi(boughtQuan);
                        }
                        if (boughtQuan == null && soldQuan != null) {
                            return -Math.abs(pi(soldQuan));
                        }
                        if (boughtQuan != null && soldQuan != null) {
                            return (pi(boughtQuan) - pi(soldQuan));
                        }
                        if (boughtQuan == null && soldQuan == null) {
                            return 0;
                        }
                    } else {
                        return supremeArray[i - 1][whereat];
                    }

                }

                var getSellNVC = function(i, whereat, amount) {

                    if (i == 0) {

                        var boughtValue = supremeArray[i]["CE bv " + amount];
                        var soldValue = supremeArray[i]["CE SV " + amount];

                        if (boughtValue != null && soldValue == null) {
                            return pi(boughtValue);
                        }
                        if (boughtValue == null && soldValue != null) {
                            return -Math.abs(pi(soldValue));
                        }
                        if (boughtValue != null && soldValue != null) {
                            return (pi(boughtValue) - pi(soldValue));
                        }
                        if (boughtValue == null && soldValue == null) {
                            return 0;
                        }

                    } else if ((supremeArray[i]["DATE"] != null) && (supremeArray[i]["DATE"] !== undefined) && (checkFirstDay(supremeArray[i]["DATE"]))) {

                        var boughtValue = supremeArray[i]["CE bv " + amount];
                        var soldValue = supremeArray[i]["CE SV " + amount];

                        if (boughtValue != null && soldValue == null) {
                            return pi(boughtValue);
                        }
                        if (boughtValue == null && soldValue != null) {
                            return -Math.abs(pi(soldValue));
                        }
                        if (boughtValue != null && soldValue != null) {
                            return (pi(boughtValue) - pi(soldValue));
                        }
                        if (boughtValue == null && soldValue == null) {
                            return 0;
                        }

                    } else {
                        return supremeArray[i - 1][whereat];
                    }

                }

                var getSellAVGC = function(i, whereat, amount) {
                    if (pi(supremeArray[i]["CE NQ " + amount]) == 0) {
                        return 0;
                    }
                    if (pi(supremeArray[i]["CE NV " + amount]) == 0) {
                        return 0;
                    } else {
                        return (pi(supremeArray[i]["CE NV " + amount]) / pi(supremeArray[i]["CE NQ " + amount]));
                    }
                }

                for (var i = 0; i < supremeArray.length; i++) {

                    for (var k = looper; k >= 0; k--) {

                        //BUY BEGINS
                        var toAddNQC = pi(getBuyNQC(i, "CE nq " + (lowest + (k * nQuan)), (lowest + (k * nQuan))));

                        var toRetNQC = pi(getRetNQCV(i, "CE nq " + (lowest + (k * nQuan)), (lowest + (k * nQuan))));

                        supremeArray[i]["CE nq " + ((lowest + (k * nQuan)))] = toAddNQC + toRetNQC;

                        var toAddNVC = pi(getBuyNVC(i, "CE nv " + (lowest + (k * nQuan)), (lowest + (k * nQuan))));

                        var toRetNVC = pi(getRetNVCV(i, "CE nq " + (lowest + (k * nQuan)), (lowest + (k * nQuan))));

                        supremeArray[i]["CE nv " + (lowest + (k * nQuan))] = toAddNVC + toRetNVC;

                        supremeArray[i]["CE avg " + (lowest + (k * nQuan))] = getBuyAVGC(i, "CE avg " + (lowest + (k * nQuan)), (lowest + (k * nQuan)));

                        //SELL BEGINS
                        var toAddNQSC = pi(getSellNQC(i, "CE NQ " + (lowest + (k * nQuan)), (lowest + (k * nQuan))));

                        var toRetNQSC = pi(getRetNQCVS(i, "CE NQ " + (lowest + (k * nQuan)), (lowest + (k * nQuan))));

                        supremeArray[i]["CE NQ " + (lowest + (k * nQuan))] = toAddNQSC + toRetNQSC;

                        var toAddNVSC = pi(getSellNVC(i, "CE NV " + (lowest + (k * nQuan)), (lowest + (k * nQuan))));

                        var toRetNVSC = pi(getRetNVCVS(i, "CE NQ " + (lowest + (k * nQuan)), (lowest + (k * nQuan))));

                        supremeArray[i]["CE NV " + (lowest + (k * nQuan))] = toAddNVSC + toRetNVSC;

                        supremeArray[i]["CE AVG1 " + (lowest + (k * nQuan))] = getSellAVGC(i, "CE AVG1 " + (lowest + (k * nQuan)), (lowest + (k * nQuan)));

                    }

                    var date = supremeArray[i]["DATE"];

                    if (date != null && date != "" && date !== undefined) {

                        if ((supremeArray[i]["DATE"] != null) && (supremeArray[i]["DATE"] !== undefined) && (checkFirstDay(supremeArray[i]["DATE"], 1))) {

                            var totalnqCE = 0;
                            var totalnvCE = 0;
                            var totalNQCE = 0;
                            var totalNVCE = 0;

                            for (var k = looper; k >= 0; k--) {

                                var nq = supremeArray[i - 1]["CE nq " + ((lowest + (k * nQuan)))];

                                var NQ = supremeArray[i - 1]["CE NQ " + ((lowest + (k * nQuan)))];

                                if (nq < 0) {

                                    var date = getPreviousDate(i - 1);
                                    var defendingStrikePrice = ((lowest + (k * nQuan)));
                                    if (towhich == 1) {
                                        supremeArray[i - 1]["CE BP " + ((lowest + (k * nQuan)))] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                    } else {
                                        supremeArray[i - 1]["CE BP " + ((lowest + (k * nQuan)))] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                    }
                                    supremeArray[i - 1]["CE BQ " + ((lowest + (k * nQuan)))] = Math.abs(nq);
                                    supremeArray[i - 1]["CE BV " + ((lowest + (k * nQuan)))] = parseFloat(supremeArray[i - 1]["CE BP " + ((lowest + (k * nQuan)))]) * parseInt(supremeArray[i - 1]["CE BQ " + ((lowest + (k * nQuan)))]);

                                }

                                if (nq > 0) {

                                    var date = getPreviousDate(i - 1);
                                    var defendingStrikePrice = ((lowest + (k * nQuan)));
                                    if (towhich == 1) {
                                        supremeArray[i - 1]["CE sp " + ((lowest + (k * nQuan)))] = pf(getCEThisMonthUSDINR(date, defendingStrikePrice));
                                    } else {
                                        supremeArray[i - 1]["CE sp " + ((lowest + (k * nQuan)))] = (nseYear == 2015) ? pf(getCEThisMonthFifteen(date, defendingStrikePrice)) : pf(getPEThisMonthSixteen(date, defendingStrikePrice));
                                    }
                                    supremeArray[i - 1]["CE sq " + ((lowest + (k * nQuan)))] = -Math.abs(nq);
                                    supremeArray[i - 1]["CE sv " + ((lowest + (k * nQuan)))] = parseFloat(supremeArray[i - 1]["CE sp " + ((lowest + (k * nQuan)))]) * parseInt(supremeArray[i - 1]["CE sq " + ((lowest + (k * nQuan)))]);

                                }

                                if (NQ < 0) {

                                    var date = getPreviousDate(i - 1);
                                    var defendingStrikePrice = ((lowest + (k * nQuan)));
                                    if (towhich == 1) {
                                        supremeArray[i - 1]["CE bp " + ((lowest + (k * nQuan)))] = pf(getCENextMonthUSDINR(date, defendingStrikePrice));
                                    } else {
                                        supremeArray[i - 1]["CE bp " + ((lowest + (k * nQuan)))] = (nseYear == 2015) ? pf(getCENextMonthFifteen(date, defendingStrikePrice)) : pf(getPENextMonthSixteen(date, defendingStrikePrice));
                                    }
                                    supremeArray[i - 1]["CE bq " + ((lowest + (k * nQuan)))] = Math.abs(NQ);
                                    supremeArray[i - 1]["CE bv " + ((lowest + (k * nQuan)))] = parseFloat(supremeArray[i - 1]["CE bp " + ((lowest + (k * nQuan)))]) * parseInt(supremeArray[i - 1]["CE bq " + ((lowest + (k * nQuan)))]);

                                }

                                if (NQ > 0) {

                                    var date = getPreviousDate(i - 1);
                                    var defendingStrikePrice = ((lowest + (k * nQuan)));
                                    if (towhich == 1) {
                                        supremeArray[i - 1]["CE SP " + ((lowest + (k * nQuan)))] = pf(getCENextMonthUSDINR(date, defendingStrikePrice));
                                    } else {
                                        supremeArray[i - 1]["CE SP " + ((lowest + (k * nQuan)))] = (nseYear == 2015) ? pf(getCENextMonthFifteen(date, defendingStrikePrice)) : pf(getPENextMonthSixteen(date, defendingStrikePrice));
                                    }
                                    supremeArray[i - 1]["CE SQ " + ((lowest + (k * nQuan)))] = -Math.abs(NQ);
                                    supremeArray[i - 1]["CE SV " + ((lowest + (k * nQuan)))] = parseFloat(supremeArray[i - 1]["CE SP " + ((lowest + (k * nQuan)))]) * parseInt(supremeArray[i - 1]["CE SQ " + ((lowest + (k * nQuan)))]);

                                }


                                if (supremeArray[i - 1]["CE nq " + ((lowest + (k * nQuan)))] == 0) {
                                    totalnqCE += supremeArray[i - 1]["CE nq " + ((lowest + (k * nQuan)))];
                                    totalnvCE += supremeArray[i - 1]["CE nv " + ((lowest + (k * nQuan)))];
                                } else {
                                    supremeArray[i - 1]["CE nq " + ((lowest + (k * nQuan)))] = ((supremeArray[i - 1]["CE nq " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["CE nq " + ((lowest + (k * nQuan)))]) + (supremeArray[i - 1]["CE BQ " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["CE BQ " + ((lowest + (k * nQuan)))]) + (supremeArray[i - 1]["CE sq " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["CE sq " + ((lowest + (k * nQuan)))]));

                                    totalnqCE += supremeArray[i - 1]["CE nq " + ((lowest + (k * nQuan)))];

                                    supremeArray[i - 1]["CE nv " + ((lowest + (k * nQuan)))] = ((supremeArray[i - 1]["CE nv " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["CE nv " + ((lowest + (k * nQuan)))]) + (supremeArray[i - 1]["CE BV " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["CE BV " + ((lowest + (k * nQuan)))]) + (supremeArray[i - 1]["CE sv " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["CE sv " + ((lowest + (k * nQuan)))]));

                                    totalnvCE += supremeArray[i - 1]["CE nv " + ((lowest + (k * nQuan)))];
                                }

                                if (supremeArray[i - 1]["CE NQ " + ((lowest + (k * nQuan)))] == 0) {
                                    totalNQCE += supremeArray[i - 1]["CE NQ " + ((lowest + (k * nQuan)))];
                                    totalNVCE += supremeArray[i - 1]["CE NV " + ((lowest + (k * nQuan)))];
                                } else {
                                    supremeArray[i - 1]["CE NQ " + ((lowest + (k * nQuan)))] = ((supremeArray[i - 1]["CE NQ " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["CE NQ " + ((lowest + (k * nQuan)))]) + (supremeArray[i - 1]["CE bq " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["CE bq " + ((lowest + (k * nQuan)))]) + (supremeArray[i - 1]["CE SQ " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["CE SQ " + ((lowest + (k * nQuan)))]));

                                    totalNQCE += supremeArray[i - 1]["CE NQ " + ((lowest + (k * nQuan)))];

                                    supremeArray[i - 1]["CE NV " + ((lowest + (k * nQuan)))] = ((supremeArray[i - 1]["CE NV " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["CE NV " + ((lowest + (k * nQuan)))]) + (supremeArray[i - 1]["CE bv " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["CE bv " + ((lowest + (k * nQuan)))]) + (supremeArray[i - 1]["CE SV " + ((lowest + (k * nQuan)))] === undefined ? null : supremeArray[i - 1]["CE SV " + ((lowest + (k * nQuan)))]));

                                    totalNVCE += supremeArray[i - 1]["CE NV " + ((lowest + (k * nQuan)))];
                                }
                            }

                            var totalNetValueCE = totalNVCE + totalnvCE;
                            monthEnd["ce"] = totalNetValueCE;
                        }
                    }

                }

                for (var i = 0; i < supremeArray.length; i++) {

                    if ((supremeArray[i]["DATE"] != null) && (supremeArray[i]["DATE"] !== undefined) && (checkFirstDay(supremeArray[i]["DATE"], 1))) {

                        supremeArray[i - 1]["P/L"] = monthEnd["ce"] + monthEnd["pe"] + monthEnd["left"] + monthEnd["right"];
                        supremeArray[i - 2]["P/L"] = "MONTH END";
                        supremeArray[i - 3]["P/L"] = monthEnd["pe"];
                        supremeArray[i - 4]["P/L"] = "PE";
                        supremeArray[i - 5]["P/L"] = monthEnd["ce"];
                        supremeArray[i - 6]["P/L"] = "CE";
                        supremeArray[i - 7]["P/L"] = monthEnd["right"];
                        supremeArray[i - 8]["P/L"] = "RIGHT";
                        supremeArray[i - 9]["P/L"] = monthEnd["left"];
                        supremeArray[i - 10]["P/L"] = "LEFT";
                        supremeArray[i - 11]["P/L"] = monthEnd["left"] + monthEnd["right"];
                        supremeArray[i - 12]["P/L"] = "NET FO";
                    }
                }

                callback(supremeArray, 1); //createFile in callback

            }

            doThings(supremeArray, createFile); //callback 

        } //three ends here
    }
}