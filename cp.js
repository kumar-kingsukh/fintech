var mongo = require('mongodb').MongoClient;
var request = require('request');
//var symbols = ["3IINFOTECH", "ABAN", "ABB", "ABGSHIP", "ABIRLANUVO", "ACC", "ADANIENT", "ADANIPORTS", "ADANIPOWER", "ADLABSFILM", "AIRDECCAN", "AJANTPHARM", "AKRUTI", "ALBK", "ALOKTEXT", "ALSTOMT&amp;D", "AMARAJABAT", "AMBUJACEM", "AMTEKAUTO", "ANDHRABANK", "ANSALINFRA", "APIL", "APOLLOHOSP", "APOLLOTYRE", "AREVAT&amp;D", "ARVIND", "ARVINDMILL", "ASHOKLEY", "ASIANPAINT", "AUROPHARMA", "AXISBANK", "BAJAJ-AUTO", "BAJAJAUTO", "BAJAJHIND", "BAJAJHLDNG", "BAJFINANCE", "BALAJITELE", "BALLARPUR", "BALRAMCHIN", "BANKBARODA", "BANKINDIA", "BATAINDIA", "BEL", "BEML", "BFUTILITIE", "BGRENERGY", "BHARATFORG", "BHARTI", "BHARTIARTL", "BHEL", "BHUSANSTL", "BILT", "BINDALAGRO", "BIOCON", "BIRLACORPN", "BIRLAJUTE", "BOMDYEING", "BONGAIREFN", "BOSCHLTD", "BPCL", "BRFL", "BRIGADE", "BRITANNIA", "BSES", "CADILAHC", "CAIRN", "CANBK", "CASTROLIND", "CEATLTD", "CENTRALBK", "CENTURYTEX", "CESC", "CHAMBLFERT", "CHENNPETRO", "CIPLA", "CMC", "COALINDIA", "COCHINREFN", "COLGATE", "COLPAL", "CONCOR", "COREEDUTEC", "COREPROTEC", "CORPBANK", "CROMPGREAV", "CUMMINSIND", "DABUR", "DCB", "DCBBANK", "DCHL", "DELTACORP", "DENABANK", "DHANBANK", "DHFL", "DIGITALEQP", "DISHTV", "DIVISLAB", "DLF", "DRREDDY", "EDELWEISS", "EDUCOMP", "EICHERMOT", "EKC", "ENGINERSIN", "ESCORTS", "ESSAROIL", "EVERONN", "EXIDEIND", "FEDERALBNK", "FINANTECH", "FORTIS", "FRL", "FSL", "GAIL", "GBN", "GDL", "GESCOCORP", "GESHIP", "GESHIPPING", "GITANJALI", "GLAXO", "GLENMARK", "GMDCLTD", "GMRINFRA", "GNFC", "GODREJCP", "GODREJIND", "GRASIM", "GRANULES", "GSKCONS", "GSPL", "GTL", "GTLINFRA", "GTOFFSHORE", "GUJALKALI", "GUJAMBCEM", "GUJFLUORO", "GVKPIL", "HAVELLS", "HCC", "HCL-INSYS", "HCLTECH", "HDFC", "HDFCBANK", "HDIL", "HEROHONDA", "HEROMOTOCO", "HEXAWARE", "HINDALCO", "HINDLEVER", "HINDOILEXP", "HINDPETRO", "HINDUJATMT", "HINDUJAVEN", "HINDUNILVR", "HINDZINC", "HOTELEELA", "HTMT", "HTMTGLOBAL", "I-FLEX", "IBN18", "IBREALEST", "IBULHSGFIN", "ICICI", "ICICIBANK", "ICIL", "ICSA", "IDBI", "IDEA", "IDFC", "IDFCBANK", "IFCI", "IGL", "INDHOTEL", "INDIACEM", "INDIAINFO", "INDIANB", "INDRAYON", "INDUSINDBK", "INFOSYSTCH", "INFRATEL", "INFY", "IOB", "IOC", "IPCL", "IRB", "ISPATIND", "ITC", "IVRCLINFRA", "IVRPRIME", "J&amp;KBANK", "JETAIRWAYS", "JINDALSAW", "JINDALSTEL", "JINDALSWHL", "JISLJALEQS", "JPASSOCIAT", "JPHYDRO", "JPPOWER", "JSL", "JSTAINLESS", "JSWENERGY", "JSWISPAT", "JSWSTEEL", "JUBLFOOD", "JUSTDIAL", "KESORAMIND", "KFA", "KIRLOSKCUM", "KLGSYSTEL", "KOTAKBANK", "KPIT", "KSCL", "KSK", "KSOILS", "KTKBANK", "L&amp;T", "L&amp;TFH", "LAXMIMACH", "LICHSGFIN", "LITL", "LT", "LUPIN", "M&amp;M", "M&amp;MFIN", "MAHLIFE", "MAHSEAMLES", "MARICO", "MARUTI", "MASTEK", "MATRIXLABS", "MAX", "MCDOWELL-N", "MCLEODRUSS", "MERCATOR", "MIC", "MICO", "MINDTREE", "MLL", "MONNETISPA", "MOSERBAER", "MOTHERSUMI", "MPHASIS", "MPHASISBFL", "MRF", "MRPL", "MTNL", "MUNDRAPORT", "NAGARCONST", "NAGARFERT", "NAGAROIL", "NATIONALUM", "NAUKRI", "NBVENTURES", "NCC", "NDTV", "NETWORK18", "NEYVELILIG", "NHPC", "NICOLASPIR", "NIIT", "NIITLTD", "NIITTECH", "NIPPONDENR", "NMDC", "NOIDATOLL", "NTPC", "NUCLEUS", "OFSS", "OIL", "OMAXE", "ONGC", "ONMOBILE", "OPTOCIRCUI", "ORBITCORP", "ORCHIDCHEM", "ORIENTBANK", "PAGEIND", "PANTALOONR", "PARSVNATH", "PATELENG", "PATNI", "PCJEWELLER", "PENINLAND", "PETRONET", "PFC", "PFIZER", "PIDILITIND", "PIRHEALTH", "PNB", "POLARIS", "POWERGRID", "PRAJIND", "PRISMCEM", "PTC", "PUNJLLOYD", "PURVA", "RAJESHEXPO", "RANBAXY", "RAYMOND", "RCOM", "RECLTD", "REDINGTON", "REL", "RELCAPITAL", "RELIANCE", "RELINFRA", "RELMEDIA", "RELPETRO", "RENUKA", "RIIL", "RNRL", "ROLTA", "RPL", "RPOWER", "RUCHISOYA", "SAIL", "SAMRUDDHI", "SASKEN", "SATYAMCOMP", "SBIN", "SCI", "SESAGOA", "SHREECEM", "SIEMENS", "SINTEX", "SKSMICRO", "SKUMARSYNF", "SOBHA", "SOUTHBANK", "SREINFRA", "SREINTFIN", "SRF", "SRTRANSFIN", "SSLT", "STAR", "STER", "STERLINBIO", "STROPTICAL", "STRTECH", "SUNPHARMA", "SUNTV", "SUZLON", "SYNDIBANK", "TATACHEM", "TATACOFFEE", "TATACOMM", "TATAELXSI", "TATAGLOBAL", "TATAMOTORS", "TATAMTRDVR", "TATAPOWER", "TATASTEEL", "TATATEA", "TCS", "TECHM", "TELCO", "THERMAX", "TISCO", "TITAN", "TORNTPHARM", "TORNTPOWER", "TRIVENI", "TTKPRESTIG", "TTML", "TULIP", "TV-18", "TV18BRDCST", "TVSMOTOR", "UBL", "UCOBANK", "ULTRACEMCO", "UNIONBANK", "UNIPHOS", "UNITECH", "UPL", "UTIBANK", "UTVSOF", "VDOCONINTL", "VEDL", "VIDEOIND", "VIJAYABANK", "VIPIND", "VOLTAMP", "VOLTAS", "VSNL", "WALCHANNAG", "WELCORP", "WELGUJ", "WIPRO", "WOCKPHARMA", "WWIL", "YESBANK", "ZEEL", "ZEETELE"];
var firstArray = ["01-Jan-2016", "01-Feb-2016", "01-Mar-2016", "01-Apr-2016", "01-May-2016", "01-Jun-2016", "01-Jul-2016", "01-Aug-2016", "01-Sep-2016", "01-Oct-2016", "01-Nov-2016", "01-Dec-2016"];
var expiryArray = ["28-01-2016", "25-02-2016", "31-03-2016", "28-04-2016", "26-05-2016", "30-06-2016", "28-07-2016", "25-08-2016", "29-09-2016", "27-10-2016", "24-11-2016", "29-12-2016"];
var lastArray = ["28-Jan-16", "25-Feb-2016", "31-Mar-2016", "28-Apr-2016", "26-May-2016", "30-Jun-2016", "28-Jul-2016", "25-Aug-2016", "29-Sep-2016", "27-Oct-2016", "24-Nov-2016", "29-Dec-2016"];

function insertInMongo(dataPE) {
    if (dataPE == "No Insert") {
        console.log("No Insert");
    } else {
        mongo.connect('mongodb://stonexapp:stonexapp@ds033126.mlab.com:33126/stonexapp', function(err, db) {
            if (err) {
                throw err;
                return false;
            }
            if (!err) {
                var coll = db.collection("LT");
                coll.insert(dataPE, function() {
                    console.log("Data Inserted.");
                });
            } else {
                console.log("SOMETHING WENT WRONG");
                return false;
            }
        });
    }
}

function hitIt() {
    var instrumentType = "OPTSTK";
    var symbol = "LT";
    var year = 2016;
    var expiryDate = expiryArray[0];
    var fromDate = firstArray[0];
    var toDate = lastArray[0];

    // var getCalls = new Promise(function(resolve, reject) {
    //     console.log("Calls called");
    //     request.post({
    //         headers: {
    //             'content-type': 'application/x-www-form-urlencoded'
    //         },
    //         url: 'http://kuchbhi.net16.net/',
    //         form: {
    //             "instrumentType": instrumentType,
    //             "symbol": symbol,
    //             "year": year,
    //             "expiryDate": expiryDate,
    //             "optionType": "CE",
    //             "fromDate": fromDate,
    //             "toDate": toDate
    //         }
    //     }, function(error, response, body) {
    //         console.log(body);
    //         if (!error && response.statusCode == 200) {
    //             var cheerio = require("cheerio");
    //             var $ = cheerio.load(body);
    //             $('table').filter(function() {
    //                 var nore = $(this).children().html().trim();
    //                 if (nore == '<th colspan="4">* Click on old symbol or company name to view history</th>') {
    //                     resolve("No Insert");
    //                 } else {

    //                     $('table tr:nth-child(3)').filter(function() {
    //                         var nore = $(this).children().html().trim();
    //                         if (nore == "No Records") {
    //                             resolve("No Insert");
    //                         } else {
    //                             $('#csvContentDiv').filter(function() {
    //                                 var mainContent = $(this).text();
    //                                 var Entities = require('html-entities').AllHtmlEntities;
    //                                 entities = new Entities();
    //                                 mainContent = entities.decode(mainContent);
    //                                 var Converter = require("csvtojson").Converter;
    //                                 var converter = new Converter({});
    //                                 mainContent = mainContent.replace(/\:/g, "\n");
    //                                 converter.fromString(mainContent.toString(), function(err, result) {
    //                                     resolve(result);
    //                                 });
    //                             });
    //                         }
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // });

    var getPuts = new Promise(function(resolve, reject) {
        console.log("Puts called");
        request.post({
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            url: 'http://kuchbhi.net16.net/',
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
                $('table').filter(function() {
                    var nore = $(this).children().html().trim();
                    if (nore == '<th colspan="4">* Click on old symbol or company name to view history</th>') {
                        resolve("No Insert");
                    } else {
                        $('table tr:nth-child(3)').filter(function() {
                            var nore = $(this).children().html().trim();
                            if (nore == "No Records") {
                                resolve("No Insert");
                            } else {
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
                    }
                });
            }
        });
    });

    Promise.all([getPuts]).then(values => {
        console.log(values[0]);
        console.log("Came Here");
        insertInMongo(values[0]);
    });

}

hitIt();




            mongo = require('mongodb').MongoClient;

            var insertInMongo = function(data){
                mongo.connect('mongodb://stonexapp:stonexapp@ds033126.mlab.com:33126/stonexapp', function(err, db) {
                    if (err) {
                        throw err;
                        return false;
                    }
                    if (!err) {
                        var coll = db.collection("LT");
                        coll.insert(data, function() {
                            console.log("DATA INSERTED.");
                        });
                    } else {
                        console.log("SOMETHING WENT WRONG.");
                        return false;
                    }
                });
            } 

            mongo.connect('mongodb://stonexapp:stonexapp@ds033126.mlab.com:33126/stonexapp', function(err, db) {
                if (err) {
                    throw err;
                    return false;
                }
                if (!err) {
                    var coll = db.collection('nextMonthLTSixteen');
                    coll.find({}, {
                        _id: 0,
                        "Symbol": 0,
                        "Settle Price": 0,
                        "No": 0,
                        "Turnover in Lacs": 0,
                        "Premium Turnover in Lacs": 0,
                        "Open Int": 0,
                        "Change in OI": 0,
                        "Underlying Value": 0
                    }).toArray(function(err, arr) {
                        if (err) {
                            throw err;
                            return false;
                        }
                        console.log(arr);
                        insertInMongo(arr);
                    });
                } else {
                    return false;
                }
            });