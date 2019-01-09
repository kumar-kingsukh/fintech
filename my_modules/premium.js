module.exports = function() { //
    return {


        blackScholes: function(currentPrice, strikePrice, interestRate, currentVolatility, timeLeft) {
            console.log(currentPrice+" "+strikePrice+" "+interestRate+" "+currentVolatility+" "+timeLeft);
            var pi = function(a) {
                return parseInt(a);
            }
            var pf = function(a) {
                return parseFloat(a);
            }
            var d1 = pf((Math.log(currentPrice / strikePrice) + ((interestRate + (Math.pow(currentVolatility, 2) / 2)) * timeLeft)) / (currentVolatility * Math.sqrt(timeLeft))).toFixed(2);
            var d2 = pf(d1 - (currentVolatility * Math.sqrt(timeLeft))).toFixed(2);
            var premiumPrice = (currentPrice * this.getNormalDistributionValue(d1)) - (this.getNormalDistributionValue(d2) * strikePrice * Math.exp(-Math.abs(interestRate) * timeLeft));
            return Math.abs(premiumPrice);
        },

        blackScholesPut: function(currentPrice, strikePrice, interestRate, currentVolatility, timeLeft) {
            var pi = function(a) {
                return parseInt(a);
            }
            var pf = function(a) {
                return parseFloat(a);
            }
            var d1 = pf((Math.log(currentPrice / strikePrice) + ((interestRate + (Math.pow(currentVolatility, 2) / 2)) * timeLeft)) / (currentVolatility * Math.sqrt(timeLeft))).toFixed(2);
            var d2 = pf(d1 - (currentVolatility * Math.sqrt(timeLeft))).toFixed(2);
            var premiumPrice = (currentPrice * this.getNormalDistributionValue(d1)) - (this.getNormalDistributionValue(d2) * strikePrice * Math.exp(-Math.abs(interestRate) * timeLeft));
            var putPrice = strikePrice * Math.exp(-Math.abs(interestRate) * timeLeft) - currentPrice + pf(premiumPrice);
            return Math.abs(putPrice);
        },

        getNormalDistributionValue : function(d) {
            console.log("d is "+d);
                    if (d === "Infinity") {
                        return 1;
                    }
                    if (d === "-Infinity") {
                        return 0.0001;
                    }
                    if(d > 3.49){
                        return 1;
                    }
                    if(d < -3.49){
                        return 0.0001;
                    }
                    switch (parseFloat(d)) {
                        case (-3.40):
                            nD = 0.0003;
                            break;
                        case (-3.41):
                            nD = 0.0003;
                            break;
                        case (-3.42):
                            nD = 0.0003;
                            break;
                        case (-3.43):
                            nD = 0.0003;
                            break;
                        case (-3.45):
                            nD = 0.0003;
                            break;
                        case (-3.46):
                            nD = 0.0003;
                            break;
                        case (-3.47):
                            nD = 0.0003;
                            break;
                        case (-3.48):
                            nD = 0.0003;
                            break;
                        case (-3.49):
                            nD = 0.0002;
                            break;
                        case (-3.30):
                            nD = 0.0005;
                            break;
                        case (-3.31):
                            nD = 0.0005;
                            break;
                        case (-3.32):
                            nD = 0.0005;
                            break;
                        case (-3.33):
                            nD = 0.0004;
                            break;
                        case (-3.34):
                            nD = 0.0004;
                            break;
                        case (-3.35):
                            nD = 0.0004;
                            break;
                        case (-3.36):
                            nD = 0.0004;
                            break;
                        case (-3.37):
                            nD = 0.0004;
                            break;
                        case (-3.38):
                            nD = 0.0004;
                            break;
                        case (-3.39):
                            nD = 0.0003;
                            break;
                        case (-3.20):
                            nD = 0.0007;
                            break;
                        case (-3.21):
                            nD = 0.0007;
                            break;
                        case (-3.22):
                            nD = 0.0006;
                            break;
                        case (-3.23):
                            nD = 0.0006;
                            break;
                        case (-3.24):
                            nD = 0.0006;
                            break;
                        case (-3.25):
                            nD = 0.0006;
                            break;
                        case (-3.26):
                            nD = 0.0006;
                            break;
                        case (-3.27):
                            nD = 0.0005;
                            break;
                        case (-3.28):
                            nD = 0.0005;
                            break;
                        case (-3.29):
                            nD = 0.0005;
                            break;
                        case (-3.10):
                            nD = 0.0010;
                            break;
                        case (-3.11):
                            nD = 0.0009;
                            break;
                        case (-3.12):
                            nD = 0.0009;
                            break;
                        case (-3.13):
                            nD = 0.0008;
                            break;
                        case (-3.14):
                            nD = 0.0008;
                            break;
                        case (-3.15):
                            nD = 0.0008;
                            break;
                        case (-3.16):
                            nD = 0.0008;
                            break;
                        case (-3.17):
                            nD = 0.0007;
                            break;
                        case (-3.18):
                            nD = 0.0007;
                            break;
                        case (-3.19):
                            nD = 0.0003;
                            break;
                        case (-3.00):
                            nD = 0.0013;
                            break;
                        case (-3.01):
                            nD = 0.0013;
                            break;
                        case (-3.02):
                            nD = 0.0013;
                            break;
                        case (-3.03):
                            nD = 0.0012;
                            break;
                        case (-3.04):
                            nD = 0.0012;
                            break;
                        case (-3.05):
                            nD = 0.0011;
                            break;
                        case (-3.06):
                            nD = 0.0011;
                            break;
                        case (-3.07):
                            nD = 0.0011;
                            break;
                        case (-3.08):
                            nD = 0.0010;
                            break;
                        case (-3.09):
                            nD = 0.0010;
                            break;
                        case (-2.99):
                            nD = 0.0014;
                            break;
                        case (-2.98):
                            nD = 0.0014;
                            break;
                        case (-2.97):
                            nD = 0.0015;
                            break;
                        case (-2.96):
                            nD = 0.0015;
                            break;
                        case (-2.95):
                            nD = 0.0016;
                            break;
                        case (-2.94):
                            nD = 0.0016;
                            break;
                        case (-2.93):
                            nD = 0.0017;
                            break;
                        case (-2.92):
                            nD = 0.0018;
                            break;
                        case (-2.91):
                            nD = 0.0018;
                            break;
                        case (-2.90):
                            nD = 0.0019;
                            break;
                        case (-2.89):
                            nD = 0.0019;
                            break;
                        case (-2.88):
                            nD = 0.0020;
                            break;
                        case (-2.87):
                            nD = 0.0021;
                            break;
                        case (-2.86):
                            nD = 0.0021;
                            break;
                        case (-2.85):
                            nD = 0.0022;
                            break;
                        case (-2.84):
                            nD = 0.0023;
                            break;
                        case (-2.83):
                            nD = 0.0023;
                            break;
                        case (-2.82):
                            nD = 0.0024;
                            break;
                        case (-2.81):
                            nD = 0.0025;
                            break;
                        case (-2.80):
                            nD = 0.0026;
                            break;
                        case (-2.79):
                            nD = 0.0026;
                            break;
                        case (-2.78):
                            nD = 0.0027;
                            break;
                        case (-2.77):
                            nD = 0.0028;
                            break;
                        case (-2.76):
                            nD = 0.0029;
                            break;
                        case (-2.75):
                            nD = 0.0030;
                            break;
                        case (-2.74):
                            nD = 0.0031;
                            break;
                        case (-2.73):
                            nD = 0.0032;
                            break;
                        case (-2.72):
                            nD = 0.0033;
                            break;
                        case (-2.71):
                            nD = 0.0034;
                            break;
                        case (-2.70):
                            nD = 0.0035;
                            break;
                        case (-2.69):
                            nD = 0.0036;
                            break;
                        case (-2.68):
                            nD = 0.0037;
                            break;
                        case (-2.67):
                            nD = 0.0038;
                            break;
                        case (-2.66):
                            nD = 0.0039;
                            break;
                        case (-2.65):
                            nD = 0.0040;
                            break;
                        case (-2.64):
                            nD = 0.0041;
                            break;
                        case (-2.63):
                            nD = 0.0043;
                            break;
                        case (-2.62):
                            nD = 0.0044;
                            break;
                        case (-2.61):
                            nD = 0.0045;
                            break;
                        case (-2.60):
                            nD = 0.0047;
                            break;
                        case (-2.59):
                            nD = 0.0048;
                            break;
                        case (-2.58):
                            nD = 0.0049;
                            break;
                        case (-2.57):
                            nD = 0.0051;
                            break;
                        case (-2.56):
                            nD = 0.0052;
                            break;
                        case (-2.55):
                            nD = 0.0054;
                            break;
                        case (-2.54):
                            nD = 0.0055;
                            break;
                        case (-2.53):
                            nD = 0.0057;
                            break;
                        case (-2.52):
                            nD = 0.0059;
                            break;
                        case (-2.51):
                            nD = 0.0060;
                            break;
                        case (-2.50):
                            nD = 0.0062;
                            break;
                        case (-2.49):
                            nD = 0.0064;
                            break;
                        case (-2.48):
                            nD = 0.0066;
                            break;
                        case (-2.47):
                            nD = 0.0068;
                            break;
                        case (-2.46):
                            nD = 0.0069;
                            break;
                        case (-2.45):
                            nD = 0.0071;
                            break;
                        case (-2.44):
                            nD = 0.0073;
                            break;
                        case (-2.43):
                            nD = 0.0075;
                            break;
                        case (-2.42):
                            nD = 0.0078;
                            break;
                        case (-2.41):
                            nD = 0.0080;
                            break;
                        case (-2.40):
                            nD = 0.0082;
                            break;
                        case (-2.39):
                            nD = 0.0084;
                            break;
                        case (-2.38):
                            nD = 0.0087;
                            break;
                        case (-2.37):
                            nD = 0.0089;
                            break;
                        case (-2.36):
                            nD = 0.0091;
                            break;
                        case (-2.35):
                            nD = 0.0094;
                            break;
                        case (-2.34):
                            nD = 0.0096;
                            break;
                        case (-2.33):
                            nD = 0.0099;
                            break;
                        case (-2.32):
                            nD = 0.0102;
                            break;
                        case (-2.31):
                            nD = 0.0104;
                            break;
                        case (-2.30):
                            nD = 0.0107;
                            break;
                        case (-2.29):
                            nD = 0.0110;
                            break;
                        case (-2.28):
                            nD = 0.0113;
                            break;
                        case (-2.27):
                            nD = 0.0116;
                            break;
                        case (-2.26):
                            nD = 0.0119;
                            break;
                        case (-2.25):
                            nD = 0.0122;
                            break;
                        case (-2.24):
                            nD = 0.0125;
                            break;
                        case (-2.23):
                            nD = 0.0129;
                            break;
                        case (-2.22):
                            nD = 0.0132;
                            break;
                        case (-2.21):
                            nD = 0.0136;
                            break;
                        case (-2.20):
                            nD = 0.0139;
                            break;
                        case (-2.19):
                            nD = 0.0143;
                            break;
                        case (-2.18):
                            nD = 0.0146;
                            break;
                        case (-2.17):
                            nD = 0.0150;
                            break;
                        case (-2.16):
                            nD = 0.0154;
                            break;
                        case (-2.15):
                            nD = 0.0158;
                            break;
                        case (-2.14):
                            nD = 0.0162;
                            break;
                        case (-2.13):
                            nD = 0.0166;
                            break;
                        case (-2.12):
                            nD = 0.0170;
                            break;
                        case (-2.11):
                            nD = 0.0174;
                            break;
                        case (-2.10):
                            nD = 0.0179;
                            break;
                        case (-2.09):
                            nD = 0.0182;
                            break;
                        case (-2.08):
                            nD = 0.0187;
                            break;
                        case (-2.07):
                            nD = 0.0192;
                            break;
                        case (-2.06):
                            nD = 0.0197;
                            break;
                        case (-2.05):
                            nD = 0.0202;
                            break;
                        case (-2.04):
                            nD = 0.0207;
                            break;
                        case (-2.03):
                            nD = 0.0212;
                            break;
                        case (-2.02):
                            nD = 0.0217;
                            break;
                        case (-2.01):
                            nD = 0.0222;
                            break;
                        case (-2.00):
                            nD = 0.0228;
                            break;
                        case (-1.99):
                            nD = 0.0233;
                            break;
                        case (-1.98):
                            nD = 0.0239;
                            break;
                        case (-1.97):
                            nD = 0.0244;
                            break;
                        case (-1.96):
                            nD = 0.0250;
                            break;
                        case (-1.95):
                            nD = 0.0256;
                            break;
                        case (-1.94):
                            nD = 0.0262;
                            break;
                        case (-1.93):
                            nD = 0.0268;
                            break;
                        case (-1.92):
                            nD = 0.0274;
                            break;
                        case (-1.91):
                            nD = 0.0281;
                            break;
                        case (-1.90):
                            nD = 0.0287;
                            break;
                        case (-1.89):
                            nD = 0.0294;
                            break;
                        case (-1.88):
                            nD = 0.0301;
                            break;
                        case (-1.87):
                            nD = 0.0307;
                            break;
                        case (-1.86):
                            nD = 0.0314;
                            break;
                        case (-1.85):
                            nD = 0.0322;
                            break;
                        case (-1.84):
                            nD = 0.0329;
                            break;
                        case (-1.83):
                            nD = 0.0336;
                            break;
                        case (-1.82):
                            nD = 0.0344;
                            break;
                        case (-1.81):
                            nD = 0.0351;
                            break;
                        case (-1.80):
                            nD = 0.0359;
                            break;
                        case (-1.79):
                            nD = 0.0367;
                            break;
                        case (-1.78):
                            nD = 0.0375;
                            break;
                        case (-1.77):
                            nD = 0.0384;
                            break;
                        case (-1.76):
                            nD = 0.0392;
                            break;
                        case (-1.75):
                            nD = 0.0401;
                            break;
                        case (-1.74):
                            nD = 0.0409;
                            break;
                        case (-1.73):
                            nD = 0.0418;
                            break;
                        case (-1.72):
                            nD = 0.0427;
                            break;
                        case (-1.71):
                            nD = 0.0436;
                            break;
                        case (-1.70):
                            nD = 0.0446;
                            break;
                        case (-1.69):
                            nD = 0.0455;
                            break;
                        case (-1.68):
                            nD = 0.0465;
                            break;
                        case (-1.67):
                            nD = 0.0475;
                            break;
                        case (-1.66):
                            nD = 0.0485;
                            break;
                        case (-1.65):
                            nD = 0.0495;
                            break;
                        case (-1.64):
                            nD = 0.0505;
                            break;
                        case (-1.63):
                            nD = 0.0516;
                            break;
                        case (-1.62):
                            nD = 0.0526;
                            break;
                        case (-1.61):
                            nD = 0.0537;
                            break;
                        case (-1.60):
                            nD = 0.0548;
                            break;
                        case (-1.59):
                            nD = 0.0559;
                            break;
                        case (-1.58):
                            nD = 0.0571;
                            break;
                        case (-1.57):
                            nD = 0.0582;
                            break;
                        case (-1.56):
                            nD = 0.0594;
                            break;
                        case (-1.55):
                            nD = 0.0606;
                            break;
                        case (-1.54):
                            nD = 0.0618;
                            break;
                        case (-1.53):
                            nD = 0.0630;
                            break;
                        case (-1.52):
                            nD = 0.0643;
                            break;
                        case (-1.51):
                            nD = 0.0655;
                            break;
                        case (-1.50):
                            nD = 0.0668;
                            break;
                        case (-1.49):
                            nD = 0.0681;
                            break;
                        case (-1.48):
                            nD = 0.0694;
                            break;
                        case (-1.47):
                            nD = 0.0708;
                            break;
                        case (-1.46):
                            nD = 0.0721;
                            break;
                        case (-1.45):
                            nD = 0.0735;
                            break;
                        case (-1.44):
                            nD = 0.0749;
                            break;
                        case (-1.43):
                            nD = 0.0764;
                            break;
                        case (-1.42):
                            nD = 0.0778;
                            break;
                        case (-1.41):
                            nD = 0.0793;
                            break;
                        case (-1.40):
                            nD = 0.0808;
                            break;
                        case (-1.39):
                            nD = 0.0823;
                            break;
                        case (-1.38):
                            nD = 0.0838;
                            break;
                        case (-1.37):
                            nD = 0.0853;
                            break;
                        case (-1.36):
                            nD = 0.0869;
                            break;
                        case (-1.35):
                            nD = 0.0885;
                            break;
                        case (-1.34):
                            nD = 0.0901;
                            break;
                        case (-1.33):
                            nD = 0.0918;
                            break;
                        case (-1.32):
                            nD = 0.0934;
                            break;
                        case (-1.31):
                            nD = 0.0951;
                            break;
                        case (-1.30):
                            nD = 0.0968;
                            break;
                        case (-1.29):
                            nD = 0.0985;
                            break;
                        case (-1.28):
                            nD = 0.1003;
                            break;
                        case (-1.27):
                            nD = 0.1020;
                            break;
                        case (-1.26):
                            nD = 0.1038;
                            break;
                        case (-1.25):
                            nD = 0.1056;
                            break;
                        case (-1.24):
                            nD = 0.1075;
                            break;
                        case (-1.23):
                            nD = 0.1093;
                            break;
                        case (-1.22):
                            nD = 0.1112;
                            break;
                        case (-1.21):
                            nD = 0.1131;
                            break;
                        case (-1.20):
                            nD = 0.1151;
                            break;
                        case (-1.19):
                            nD = 0.1170;
                            break;
                        case (-1.18):
                            nD = 0.1190;
                            break;
                        case (-1.17):
                            nD = 0.1210;
                            break;
                        case (-1.16):
                            nD = 0.1230;
                            break;
                        case (-1.15):
                            nD = 0.1251;
                            break;
                        case (-1.14):
                            nD = 0.1271;
                            break;
                        case (-1.13):
                            nD = 0.1292;
                            break;
                        case (-1.12):
                            nD = 0.1314;
                            break;
                        case (-1.11):
                            nD = 0.1335;
                            break;
                        case (-1.10):
                            nD = 0.1357;
                            break;
                        case (-1.09):
                            nD = 0.1379;
                            break;
                        case (-1.08):
                            nD = 0.1401;
                            break;
                        case (-1.07):
                            nD = 0.1423;
                            break;
                        case (-1.06):
                            nD = 0.1446;
                            break;
                        case (-1.05):
                            nD = 0.1469;
                            break;
                        case (-1.04):
                            nD = 0.1492;
                            break;
                        case (-1.03):
                            nD = 0.1515;
                            break;
                        case (-1.02):
                            nD = 0.1539;
                            break;
                        case (-1.01):
                            nD = 0.1562;
                            break;
                        case (-1.00):
                            nD = 0.1587;
                            break;
                        case (-0.99):
                            nD = 0.1611;
                            break;
                        case (-0.98):
                            nD = 0.1635;
                            break;
                        case (-0.97):
                            nD = 0.1660;
                            break;
                        case (-0.96):
                            nD = 0.1685;
                            break;
                        case (-0.95):
                            nD = 0.1711;
                            break;
                        case (-0.94):
                            nD = 0.1736;
                            break;
                        case (-0.93):
                            nD = 0.1762;
                            break;
                        case (-0.92):
                            nD = 0.1788;
                            break;
                        case (-0.91):
                            nD = 0.1814;
                            break;
                        case (-0.90):
                            nD = 0.1841;
                            break;
                        case (-0.89):
                            nD = 0.1867;
                            break;
                        case (-0.88):
                            nD = 0.1984;
                            break;
                        case (-0.87):
                            nD = 0.1922;
                            break;
                        case (-0.86):
                            nD = 0.1949;
                            break;
                        case (-0.85):
                            nD = 0.1977;
                            break;
                        case (-0.84):
                            nD = 0.2005;
                            break;
                        case (-0.83):
                            nD = 0.2033;
                            break;
                        case (-0.82):
                            nD = 0.2061;
                            break;
                        case (-0.81):
                            nD = 0.2090;
                            break;
                        case (-0.80):
                            nD = 0.2119;
                            break;
                        case (-0.79):
                            nD = 0.2148;
                            break;
                        case (-0.78):
                            nD = 0.2177;
                            break;
                        case (-0.77):
                            nD = 0.2206;
                            break;
                        case (-0.76):
                            nD = 0.2236;
                            break;
                        case (-0.75):
                            nD = 0.2266;
                            break;
                        case (-0.74):
                            nD = 0.2296;
                            break;
                        case (-0.73):
                            nD = 0.2327;
                            break;
                        case (-0.72):
                            nD = 0.2358;
                            break;
                        case (-0.71):
                            nD = 0.2389;
                            break;
                        case (-0.70):
                            nD = 0.2420;
                            break;
                        case (-0.69):
                            nD = 0.2451;
                            break;
                        case (-0.68):
                            nD = 0.2483;
                            break;
                        case (-0.67):
                            nD = 0.2514;
                            break;
                        case (-0.66):
                            nD = 0.2546;
                            break;
                        case (-0.65):
                            nD = 0.2578;
                            break;
                        case (-0.64):
                            nD = 0.2611;
                            break;
                        case (-0.63):
                            nD = 0.2643;
                            break;
                        case (-0.62):
                            nD = 0.2676;
                            break;
                        case (-0.61):
                            nD = 0.2709;
                            break;
                        case (-0.60):
                            nD = 0.2743;
                            break;
                        case (-0.59):
                            nD = 0.2776;
                            break;
                        case (-0.58):
                            nD = 0.2810;
                            break;
                        case (-0.57):
                            nD = 0.2843;
                            break;
                        case (-0.56):
                            nD = 0.2877;
                            break;
                        case (-0.55):
                            nD = 0.2912;
                            break;
                        case (-0.54):
                            nD = 0.2946;
                            break;
                        case (-0.53):
                            nD = 0.2981;
                            break;
                        case (-0.52):
                            nD = 0.3015;
                            break;
                        case (-0.51):
                            nD = 0.3050;
                            break;
                        case (-0.50):
                            nD = 0.3085;
                            break;
                        case (-0.49):
                            nD = 0.3121;
                            break;
                        case (-0.48):
                            nD = 0.3156;
                            break;
                        case (-0.47):
                            nD = 0.3192;
                            break;
                        case (-0.46):
                            nD = 0.3228;
                            break;
                        case (-0.45):
                            nD = 0.3264;
                            break;
                        case (-0.44):
                            nD = 0.3300;
                            break;
                        case (-0.43):
                            nD = 0.3336;
                            break;
                        case (-0.42):
                            nD = 0.3372;
                            break;
                        case (-0.41):
                            nD = 0.3409;
                            break;
                        case (-0.40):
                            nD = 0.3446;
                            break;
                        case (-0.39):
                            nD = 0.3483;
                            break;
                        case (-0.38):
                            nD = 0.3520;
                            break;
                        case (-0.37):
                            nD = 0.3557;
                            break;
                        case (-0.36):
                            nD = 0.3594;
                            break;
                        case (-0.35):
                            nD = 0.3632;
                            break;
                        case (-0.34):
                            nD = 0.3669;
                            break;
                        case (-0.33):
                            nD = 0.3707;
                            break;
                        case (-0.32):
                            nD = 0.3745;
                            break;
                        case (-0.31):
                            nD = 0.3783;
                            break;
                        case (-0.30):
                            nD = 0.3821;
                            break;
                        case (-0.29):
                            nD = 0.3859;
                            break;
                        case (-0.28):
                            nD = 0.3897;
                            break;
                        case (-0.27):
                            nD = 0.3936;
                            break;
                        case (-0.26):
                            nD = 0.3974;
                            break;
                        case (-0.25):
                            nD = 0.4013;
                            break;
                        case (-0.24):
                            nD = 0.4052;
                            break;
                        case (-0.23):
                            nD = 0.4090;
                            break;
                        case (-0.22):
                            nD = 0.4129;
                            break;
                        case (-0.21):
                            nD = 0.4168;
                            break;
                        case (-0.20):
                            nD = 0.4207;
                            break;
                        case (-0.19):
                            nD = 0.4247;
                            break;
                        case (-0.18):
                            nD = 0.4286;
                            break;
                        case (-0.17):
                            nD = 0.4325;
                            break;
                        case (-0.16):
                            nD = 0.4364;
                            break;
                        case (-0.15):
                            nD = 0.4404;
                            break;
                        case (-0.14):
                            nD = 0.4443;
                            break;
                        case (-0.13):
                            nD = 0.4483;
                            break;
                        case (-0.12):
                            nD = 0.4522;
                            break;
                        case (-0.11):
                            nD = 0.4652;
                            break;
                        case (-0.10):
                            nD = 0.4602;
                            break;
                        case (-0.09):
                            nD = 0.4641;
                            break;
                        case (-0.08):
                            nD = 0.4681;
                            break;
                        case (-0.07):
                            nD = 0.4721;
                            break;
                        case (-0.06):
                            nD = 0.4761;
                            break;
                        case (-0.05):
                            nD = 0.4801;
                            break;
                        case (-0.04):
                            nD = 0.4840;
                            break;
                        case (-0.03):
                            nD = 0.4880;
                            break;
                        case (-0.02):
                            nD = 0.4920;
                            break;
                        case (-0.01):
                            nD = 0.4960;
                            break;
                        case (-0.00):
                            nD = 0.5000;
                            break;
                        case (3.40):
                            nD = 0.9997;
                            break;
                        case (3.41):
                            nD = 0.9997;
                            break;
                        case (3.42):
                            nD = 0.9997;
                            break;
                        case (3.43):
                            nD = 0.9997;
                            break;
                        case (3.45):
                            nD = 0.9997;
                            break;
                        case (3.46):
                            nD = 0.9997;
                            break;
                        case (3.47):
                            nD = 0.9997;
                            break;
                        case (3.48):
                            nD = 0.9997;
                            break;
                        case (3.49):
                            nD = 0.9998;
                            break;
                        case (3.30):
                            nD = 0.9995;
                            break;
                        case (3.31):
                            nD = 0.9995;
                            break;
                        case (3.32):
                            nD = 0.9995;
                            break;
                        case (3.33):
                            nD = 0.9996;
                            break;
                        case (3.34):
                            nD = 0.9996;
                            break;
                        case (3.35):
                            nD = 0.9996;
                            break;
                        case (3.36):
                            nD = 0.9996;
                            break;
                        case (3.37):
                            nD = 0.9996;
                            break;
                        case (3.38):
                            nD = 0.9996;
                            break;
                        case (3.39):
                            nD = 0.9997;
                            break;
                        case (3.20):
                            nD = 0.9993;
                            break;
                        case (3.21):
                            nD = 0.9993;
                            break;
                        case (3.22):
                            nD = 0.9993;
                            break;
                        case (3.23):
                            nD = 0.9994;
                            break;
                        case (3.24):
                            nD = 0.9994;
                            break;
                        case (3.25):
                            nD = 0.9994;
                            break;
                        case (3.26):
                            nD = 0.9994;
                            break;
                        case (3.27):
                            nD = 0.9995;
                            break;
                        case (3.28):
                            nD = 0.9995;
                            break;
                        case (3.29):
                            nD = 0.9995;
                            break;
                        case (3.10):
                            nD = 0.9990;
                            break;
                        case (3.11):
                            nD = 0.9991;
                            break;
                        case (3.12):
                            nD = 0.9991;
                            break;
                        case (3.13):
                            nD = 0.9991;
                            break;
                        case (3.14):
                            nD = 0.9992;
                            break;
                        case (3.15):
                            nD = 0.9992;
                            break;
                        case (3.16):
                            nD = 0.9992;
                            break;
                        case (3.17):
                            nD = 0.9992;
                            break;
                        case (3.18):
                            nD = 0.9993;
                            break;
                        case (3.19):
                            nD = 0.9993;
                            break;
                        case (3.00):
                            nD = 0.9987;
                            break;
                        case (3.01):
                            nD = 0.9987;
                            break;
                        case (3.02):
                            nD = 0.9987;
                            break;
                        case (3.03):
                            nD = 0.9988;
                            break;
                        case (3.04):
                            nD = 0.9988;
                            break;
                        case (3.05):
                            nD = 0.9989;
                            break;
                        case (3.06):
                            nD = 0.9989;
                            break;
                        case (3.07):
                            nD = 0.9989;
                            break;
                        case (3.08):
                            nD = 0.9990;
                            break;
                        case (3.09):
                            nD = 0.9990;
                            break;
                        case (2.99):
                            nD = 0.9986;
                            break;
                        case (2.98):
                            nD = 0.9986;
                            break;
                        case (2.97):
                            nD = 0.9985;
                            break;
                        case (2.96):
                            nD = 0.9985;
                            break;
                        case (2.95):
                            nD = 0.9984;
                            break;
                        case (2.94):
                            nD = 0.9984;
                            break;
                        case (2.93):
                            nD = 0.9983;
                            break;
                        case (2.92):
                            nD = 0.9982;
                            break;
                        case (2.91):
                            nD = 0.9982;
                            break;
                        case (2.90):
                            nD = 0.9981;
                            break;
                        case (2.89):
                            nD = 0.9981;
                            break;
                        case (2.88):
                            nD = 0.9980;
                            break;
                        case (2.87):
                            nD = 0.9979;
                            break;
                        case (2.86):
                            nD = 0.9979;
                            break;
                        case (2.85):
                            nD = 0.9978;
                            break;
                        case (2.84):
                            nD = 0.9977;
                            break;
                        case (2.83):
                            nD = 0.9977;
                            break;
                        case (2.82):
                            nD = 0.9976;
                            break;
                        case (2.81):
                            nD = 0.9975;
                            break;
                        case (2.80):
                            nD = 0.9974;
                            break;
                        case (2.79):
                            nD = 0.9974;
                            break;
                        case (2.78):
                            nD = 0.9973;
                            break;
                        case (2.77):
                            nD = 0.9972;
                            break;
                        case (2.76):
                            nD = 0.9971;
                            break;
                        case (2.75):
                            nD = 0.9970;
                            break;
                        case (2.74):
                            nD = 0.9969;
                            break;
                        case (2.73):
                            nD = 0.9968;
                            break;
                        case (2.72):
                            nD = 0.9967;
                            break;
                        case (2.71):
                            nD = 0.9966;
                            break;
                        case (2.70):
                            nD = 0.9965;
                            break;
                        case (2.69):
                            nD = 0.9964;
                            break;
                        case (2.68):
                            nD = 0.9963;
                            break;
                        case (2.67):
                            nD = 0.9962;
                            break;
                        case (2.66):
                            nD = 0.9961;
                            break;
                        case (2.65):
                            nD = 0.9960;
                            break;
                        case (2.64):
                            nD = 0.9959;
                            break;
                        case (2.63):
                            nD = 0.9957;
                            break;
                        case (2.62):
                            nD = 0.9956;
                            break;
                        case (2.61):
                            nD = 0.9955;
                            break;
                        case (2.60):
                            nD = 0.9953;
                            break;
                        case (2.59):
                            nD = 0.9952;
                            break;
                        case (2.58):
                            nD = 0.9951;
                            break;
                        case (2.57):
                            nD = 0.9949;
                            break;
                        case (2.56):
                            nD = 0.9948;
                            break;
                        case (2.55):
                            nD = 0.9946;
                            break;
                        case (2.54):
                            nD = 0.9945;
                            break;
                        case (2.53):
                            nD = 0.9943;
                            break;
                        case (2.52):
                            nD = 0.9941;
                            break;
                        case (2.51):
                            nD = 0.9940;
                            break;
                        case (2.50):
                            nD = 0.9938;
                            break;
                        case (2.40):
                            nD = 0.9918;
                            break;
                        case (2.41):
                            nD = 0.9920;
                            break;
                        case (2.42):
                            nD = 0.9922;
                            break;
                        case (2.43):
                            nD = 0.9925;
                            break;
                        case (2.44):
                            nD = 0.9927;
                            break;
                        case (2.45):
                            nD = 0.9929;
                            break;
                        case (2.46):
                            nD = 0.9931;
                            break;
                        case (2.47):
                            nD = 0.9932;
                            break;
                        case (2.48):
                            nD = 0.9934;
                            break;
                        case (2.49):
                            nD = 0.9936;
                            break;
                        case (2.30):
                            nD = 0.9893;
                            break;
                        case (2.31):
                            nD = 0.9896;
                            break;
                        case (2.32):
                            nD = 0.9898;
                            break;
                        case (2.33):
                            nD = 0.9901;
                            break;
                        case (2.34):
                            nD = 0.9904;
                            break;
                        case (2.35):
                            nD = 0.9906;
                            break;
                        case (2.36):
                            nD = 0.9909;
                            break;
                        case (2.37):
                            nD = 0.9911;
                            break;
                        case (2.38):
                            nD = 0.9913;
                            break;
                        case (2.39):
                            nD = 0.9916;
                            break;
                        case (2.20):
                            nD = 0.9861;
                            break;
                        case (2.21):
                            nD = 0.9864;
                            break;
                        case (2.22):
                            nD = 0.9868;
                            break;
                        case (2.23):
                            nD = 0.9871;
                            break;
                        case (2.24):
                            nD = 0.9875;
                            break;
                        case (2.25):
                            nD = 0.9878;
                            break;
                        case (2.26):
                            nD = 0.9881;
                            break;
                        case (2.27):
                            nD = 0.9884;
                            break;
                        case (2.28):
                            nD = 0.9887;
                            break;
                        case (2.29):
                            nD = 0.9890;
                            break;
                        case (2.10):
                            nD = 0.9821;
                            break;
                        case (2.11):
                            nD = 0.9826;
                            break;
                        case (2.12):
                            nD = 0.9830;
                            break;
                        case (2.13):
                            nD = 0.9834;
                            break;
                        case (2.14):
                            nD = 0.9838;
                            break;
                        case (2.15):
                            nD = 0.9842;
                            break;
                        case (2.16):
                            nD = 0.9846;
                            break;
                        case (2.17):
                            nD = 0.9850;
                            break;
                        case (2.18):
                            nD = 0.9854;
                            break;
                        case (2.19):
                            nD = 0.9957;
                            break;
                        case (2.00):
                            nD = 0.9772;
                            break;
                        case (2.01):
                            nD = 0.9778;
                            break;
                        case (2.02):
                            nD = 0.9783;
                            break;
                        case (2.03):
                            nD = 0.9788;
                            break;
                        case (2.04):
                            nD = 0.9793;
                            break;
                        case (2.05):
                            nD = 0.9798;
                            break;
                        case (2.06):
                            nD = 0.9803;
                            break;
                        case (2.07):
                            nD = 0.9808;
                            break;
                        case (2.08):
                            nD = 0.9812;
                            break;
                        case (2.09):
                            nD = 0.9817;
                            break;
                        case (1.99):
                            nD = 0.9767;
                            break;
                        case (1.98):
                            nD = 0.9761;
                            break;
                        case (1.97):
                            nD = 0.9756;
                            break;
                        case (1.96):
                            nD = 0.9750;
                            break;
                        case (1.95):
                            nD = 0.9744;
                            break;
                        case (1.94):
                            nD = 0.9738;
                            break;
                        case (1.93):
                            nD = 0.9732;
                            break;
                        case (1.92):
                            nD = 0.9726;
                            break;
                        case (1.91):
                            nD = 0.9719;
                            break;
                        case (1.90):
                            nD = 0.9713;
                            break;
                        case (1.89):
                            nD = 0.9706;
                            break;
                        case (1.88):
                            nD = 0.9699;
                            break;
                        case (1.87):
                            nD = 0.9693;
                            break;
                        case (1.86):
                            nD = 0.9686;
                            break;
                        case (1.85):
                            nD = 0.9678;
                            break;
                        case (1.84):
                            nD = 0.9671;
                            break;
                        case (1.83):
                            nD = 0.9664;
                            break;
                        case (1.82):
                            nD = 0.9656;
                            break;
                        case (1.81):
                            nD = 0.9649;
                            break;
                        case (1.80):
                            nD = 0.9641;
                            break;
                        case (1.79):
                            nD = 0.9633;
                            break;
                        case (1.78):
                            nD = 0.9625;
                            break;
                        case (1.77):
                            nD = 0.9616;
                            break;
                        case (1.76):
                            nD = 0.9608;
                            break;
                        case (1.75):
                            nD = 0.9599;
                            break;
                        case (1.74):
                            nD = 0.9591;
                            break;
                        case (1.73):
                            nD = 0.9582;
                            break;
                        case (1.72):
                            nD = 0.9573;
                            break;
                        case (1.71):
                            nD = 0.9564;
                            break;
                        case (1.70):
                            nD = 0.9554;
                            break;
                        case (1.69):
                            nD = 0.9545;
                            break;
                        case (1.68):
                            nD = 0.9535;
                            break;
                        case (1.67):
                            nD = 0.9525;
                            break;
                        case (1.66):
                            nD = 0.9515;
                            break;
                        case (1.65):
                            nD = 0.9505;
                            break;
                        case (1.64):
                            nD = 0.9495;
                            break;
                        case (1.63):
                            nD = 0.9484;
                            break;
                        case (1.62):
                            nD = 0.9474;
                            break;
                        case (1.61):
                            nD = 0.9463;
                            break;
                        case (1.60):
                            nD = 0.9452;
                            break;
                        case (1.59):
                            nD = 0.9441;
                            break;
                        case (1.58):
                            nD = 0.9429;
                            break;
                        case (1.57):
                            nD = 0.9418;
                            break;
                        case (1.56):
                            nD = 0.9406;
                            break;
                        case (1.55):
                            nD = 0.9394;
                            break;
                        case (1.54):
                            nD = 0.9382;
                            break;
                        case (1.53):
                            nD = 0.9370;
                            break;
                        case (1.52):
                            nD = 0.9357;
                            break;
                        case (1.51):
                            nD = 0.9345;
                            break;
                        case (1.50):
                            nD = 0.9332;
                            break;
                        case (1.40):
                            nD = 0.9192;
                            break;
                        case (1.41):
                            nD = 0.9207;
                            break;
                        case (1.42):
                            nD = 0.9222;
                            break;
                        case (1.43):
                            nD = 0.9236;
                            break;
                        case (1.44):
                            nD = 0.9251;
                            break;
                        case (1.45):
                            nD = 0.9265;
                            break;
                        case (1.46):
                            nD = 0.9279;
                            break;
                        case (1.47):
                            nD = 0.9292;
                            break;
                        case (1.48):
                            nD = 0.9306;
                            break;
                        case (1.49):
                            nD = 0.9319;
                            break;
                        case (1.30):
                            nD = 0.9032;
                            break;
                        case (1.31):
                            nD = 0.9049;
                            break;
                        case (1.32):
                            nD = 0.9066;
                            break;
                        case (1.33):
                            nD = 0.9082;
                            break;
                        case (1.34):
                            nD = 0.9099;
                            break;
                        case (1.35):
                            nD = 0.9115;
                            break;
                        case (1.36):
                            nD = 0.9131;
                            break;
                        case (1.37):
                            nD = 0.9147;
                            break;
                        case (1.38):
                            nD = 0.9162;
                            break;
                        case (1.39):
                            nD = 0.9177;
                            break;
                        case (1.20):
                            nD = 0.8849;
                            break;
                        case (1.21):
                            nD = 0.8869;
                            break;
                        case (1.22):
                            nD = 0.8888;
                            break;
                        case (1.23):
                            nD = 0.8907;
                            break;
                        case (1.24):
                            nD = 0.8925;
                            break;
                        case (1.25):
                            nD = 0.8944;
                            break;
                        case (1.26):
                            nD = 0.8962;
                            break;
                        case (1.27):
                            nD = 0.8980;
                            break;
                        case (1.28):
                            nD = 0.8997;
                            break;
                        case (1.29):
                            nD = 0.9015;
                            break;
                        case (1.10):
                            nD = 0.8643;
                            break;
                        case (1.11):
                            nD = 0.8665;
                            break;
                        case (1.12):
                            nD = 0.8686;
                            break;
                        case (1.13):
                            nD = 0.8708;
                            break;
                        case (1.14):
                            nD = 0.8729;
                            break;
                        case (1.15):
                            nD = 0.8749;
                            break;
                        case (1.16):
                            nD = 0.8770;
                            break;
                        case (1.17):
                            nD = 0.8790;
                            break;
                        case (1.18):
                            nD = 0.8810;
                            break;
                        case (1.19):
                            nD = 0.8830;
                            break;
                        case (1.00):
                            nD = 0.8413;
                            break;
                        case (1.01):
                            nD = 0.8438;
                            break;
                        case (1.02):
                            nD = 0.8461;
                            break;
                        case (1.03):
                            nD = 0.8485;
                            break;
                        case (1.04):
                            nD = 0.8508;
                            break;
                        case (1.05):
                            nD = 0.8531;
                            break;
                        case (1.06):
                            nD = 0.8554;
                            break;
                        case (1.07):
                            nD = 0.8577;
                            break;
                        case (1.08):
                            nD = 0.8599;
                            break;
                        case (1.09):
                            nD = 0.8621;
                            break;
                        case (0.99):
                            nD = 0.8389;
                            break;
                        case (0.98):
                            nD = 0.8365;
                            break;
                        case (0.97):
                            nD = 0.8340;
                            break;
                        case (0.96):
                            nD = 0.8315;
                            break;
                        case (0.95):
                            nD = 0.8289;
                            break;
                        case (0.94):
                            nD = 0.8264;
                            break;
                        case (0.93):
                            nD = 0.8238;
                            break;
                        case (0.92):
                            nD = 0.8212;
                            break;
                        case (0.91):
                            nD = 0.8186;
                            break;
                        case (0.90):
                            nD = 0.8159;
                            break;
                        case (0.89):
                            nD = 0.8133;
                            break;
                        case (0.88):
                            nD = 0.8106;
                            break;
                        case (0.87):
                            nD = 0.8078;
                            break;
                        case (0.86):
                            nD = 0.8051;
                            break;
                        case (0.85):
                            nD = 0.8023;
                            break;
                        case (0.84):
                            nD = 0.7995;
                            break;
                        case (0.83):
                            nD = 0.7967;
                            break;
                        case (0.82):
                            nD = 0.7939;
                            break;
                        case (0.81):
                            nD = 0.7910;
                            break;
                        case (0.80):
                            nD = 0.7881;
                            break;
                        case (0.79):
                            nD = 0.7852;
                            break;
                        case (0.78):
                            nD = 0.7823;
                            break;
                        case (0.77):
                            nD = 0.7794;
                            break;
                        case (0.76):
                            nD = 0.7764;
                            break;
                        case (0.75):
                            nD = 0.7734;
                            break;
                        case (0.74):
                            nD = 0.7704;
                            break;
                        case (0.73):
                            nD = 0.7793;
                            break;
                        case (0.72):
                            nD = 0.7642;
                            break;
                        case (0.71):
                            nD = 0.7611;
                            break;
                        case (0.70):
                            nD = 0.7580;
                            break;
                        case (0.69):
                            nD = 0.7549;
                            break;
                        case (0.68):
                            nD = 0.7517;
                            break;
                        case (0.67):
                            nD = 0.7486;
                            break;
                        case (0.66):
                            nD = 0.7454;
                            break;
                        case (0.65):
                            nD = 0.7422;
                            break;
                        case (0.64):
                            nD = 0.7389;
                            break;
                        case (0.63):
                            nD = 0.7357;
                            break;
                        case (0.62):
                            nD = 0.7324;
                            break;
                        case (0.61):
                            nD = 0.7291;
                            break;
                        case (0.60):
                            nD = 0.7257;
                            break;
                        case (0.59):
                            nD = 0.7224;
                            break;
                        case (0.58):
                            nD = 0.7190;
                            break;
                        case (0.57):
                            nD = 0.7157;
                            break;
                        case (0.56):
                            nD = 0.7123;
                            break;
                        case (0.55):
                            nD = 0.7088;
                            break;
                        case (0.54):
                            nD = 0.7054;
                            break;
                        case (0.53):
                            nD = 0.7019;
                            break;
                        case (0.52):
                            nD = 0.6985;
                            break;
                        case (0.51):
                            nD = 0.6950;
                            break;
                        case (0.50):
                            nD = 0.6915;
                            break;
                        case (0.40):
                            nD = 0.6554;
                            break;
                        case (0.41):
                            nD = 0.6591;
                            break;
                        case (0.42):
                            nD = 0.6628;
                            break;
                        case (0.43):
                            nD = 0.6664;
                            break;
                        case (0.44):
                            nD = 0.6700;
                            break;
                        case (0.45):
                            nD = 0.6736;
                            break;
                        case (0.46):
                            nD = 0.6772;
                            break;
                        case (0.47):
                            nD = 0.6808;
                            break;
                        case (0.48):
                            nD = 0.6844;
                            break;
                        case (0.49):
                            nD = 0.6879;
                            break;
                        case (0.30):
                            nD = 0.6179;
                            break;
                        case (0.31):
                            nD = 0.6217;
                            break;
                        case (0.32):
                            nD = 0.6255;
                            break;
                        case (0.33):
                            nD = 0.6293;
                            break;
                        case (0.34):
                            nD = 0.6331;
                            break;
                        case (0.35):
                            nD = 0.6368;
                            break;
                        case (0.36):
                            nD = 0.6406;
                            break;
                        case (0.37):
                            nD = 0.6443;
                            break;
                        case (0.38):
                            nD = 0.6480;
                            break;
                        case (0.39):
                            nD = 0.6517;
                            break;
                        case (0.20):
                            nD = 0.5793;
                            break;
                        case (0.21):
                            nD = 0.5832;
                            break;
                        case (0.22):
                            nD = 0.5871;
                            break;
                        case (0.23):
                            nD = 0.5910;
                            break;
                        case (0.24):
                            nD = 0.5948;
                            break;
                        case (0.25):
                            nD = 0.5987;
                            break;
                        case (0.26):
                            nD = 0.6026;
                            break;
                        case (0.27):
                            nD = 0.6064;
                            break;
                        case (0.28):
                            nD = 0.6103;
                            break;
                        case (0.29):
                            nD = 0.6141;
                            break;
                        case (0.10):
                            nD = 0.5398;
                            break;
                        case (0.11):
                            nD = 0.5438;
                            break;
                        case (0.12):
                            nD = 0.5478;
                            break;
                        case (0.13):
                            nD = 0.5517;
                            break;
                        case (0.14):
                            nD = 0.5557;
                            break;
                        case (0.15):
                            nD = 0.5596;
                            break;
                        case (0.16):
                            nD = 0.5636;
                            break;
                        case (0.17):
                            nD = 0.5675;
                            break;
                        case (0.18):
                            nD = 0.5714;
                            break;
                        case (0.19):
                            nD = 0.5753;
                            break;
                        case (0.00):
                            nD = 0.5000;
                            break;
                        case (0.01):
                            nD = 0.5040;
                            break;
                        case (0.02):
                            nD = 0.5080;
                            break;
                        case (0.03):
                            nD = 0.5120;
                            break;
                        case (0.04):
                            nD = 0.5160;
                            break;
                        case (0.05):
                            nD = 0.5199;
                            break;
                        case (0.06):
                            nD = 0.5239;
                            break;
                        case (0.07):
                            nD = 0.5279;
                            break;
                        case (0.08):
                            nD = 0.5319;
                            break;
                        case (0.09):
                            nD = 0.5359;
                            break;

                    }

                    return nD;

                },

        givePremium: function(res, fs, result, fixedstrike, daysuptill, type) {
            var that = this;
            var pi = function(a) {
                return parseInt(a);
            }

            var pf = function(a) {
                return parseFloat(a);
            }

            var removeHolidays = function(dateFrom, dateUptill) {
                var start = dateFrom
                finish = dateUptill,
                    dayMilliseconds = 1000 * 60 * 60 * 24;

                var weekendDays = 0;

                while (start <= finish) {
                    var day = start.getDay()
                    if (day == 0 || day == 6) {
                        weekendDays++;
                    }
                    start = new Date(+start + dayMilliseconds);
                }

                return parseInt(weekendDays);
            }

            var getTimeBetweenDates = function(date) {
                var oneDay = 24 * 60 * 60 * 1000;
                var dateFrom = new Date(date);
                var gd = dateFrom.getDate();
                var gy = dateFrom.getFullYear();
                var gm = dateFrom.getMonth() + 1;
                var d = new Date(gy, gm, 1);
                var dif = (d.getDay() + 2) % 7 + 1;
                var dateUptill = new Date(gy, gm, 1 - dif);
                // removeDays = removeHolidays();
                var diffDays = ((dateUptill.getTime() - dateFrom.getTime()) / (oneDay)); // - removeHolidays(dateFrom, dateUptill)
                if (diffDays < 0) {
                    var returnNextMonth = function(date) {
                        patt = /-/;
                        pos = date.search(patt);
                        mon = date.substring(pos + 1, pos + 4);
                        remainingString = date.substring(pos + 1, date.length);
                        patt = /-/;
                        pos = date.search(patt);
                        yea = remainingString.substring(pos + 2, remainingString.length);
                        yea = pi(currentV.replace(/\-/g, ""));
                        switch (mon) {
                            case "Jan":
                                nM = "Feb";
                                break;
                            case "Feb":
                                nM = "Mar";
                                break;
                            case "Mar":
                                nM = "Apr";
                                break;
                            case "Apr":
                                nM = "May";
                                break;
                            case "May":
                                nM = "Jun";
                                break;
                            case "Jun":
                                nM = "Jul";
                                break;
                            case "Jul":
                                nM = "Aug";
                                break;
                            case "Aug":
                                nM = "Sep";
                                break;
                            case "Sep":
                                nM = "Oct";
                                break;
                            case "Oct":
                                nM = "Nov";
                                break;
                            case "Nov":
                                nM = "Dec";
                                break;
                            case "Dec":
                                nM = "Jan";
                                break;
                        }
                        return nM;
                    }

                    var nextMonth = returnNextMonth(date);
                    if (nextMonth == "Jan") {
                        yea = yea + 1;
                    }
                    var firstDay = "01-" + nextMonth + "-" + yea;
                    var dateFrom = new Date(firstDay);
                    var gd = dateFrom.getDate();
                    var gy = dateFrom.getFullYear();
                    var gm = dateFrom.getMonth() + 1;
                    var d = new Date(gy, gm, 1);
                    var dif = (d.getDay() + 2) % 7 + 1;
                    var dateUptill = new Date(gy, gm, 1 - dif);
                    var additionalDays = ((dateUptill.getTime() - dateFrom.getTime()) / (oneDay));
                    diffDays = Math.abs(diffDays) + additionalDays;
                }
                return (diffDays / 365);
            }

            var getLeftTime = function(date) {
                var date = new Date(date);
                var gd = date.getDate();
                var gy = date.getFullYear();
                var gm = date.getMonth() + 1;
                var d = new Date(gy, gm, 1);
                var dif = (d.getDay() + 2) % 7 + 1;
                var lastThursday = new Date(gy, gm, 1 - dif);
                daysLeft = pi(lastThursday.getDate()) - pi(date.getDate());
                if (daysLeft < 0) {
                    addDays = new Date(gy, gm + 1, 0).getDate();
                    daysLeft = Math.abs(daysLeft) + addDays;
                }
                // daysLeft = (daysLeft / 365); 
                return (daysLeft / 365);
            }

            var createFile = function(arr) {
                var json2xls = require('json2xls');
                var xls = json2xls(arr);
                var fs = require("fs");
                var filename = "download.xlsx"; //Math.floor((Math.random()*10000000))+".xlsx";
                try {
                    var dir = './tmp/';
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir);
                    }
                    fs.writeFileSync(dir + filename, xls, 'binary');
                    res.end(filename);
                } catch (err) {
                    res.status(404).send("Sorry, something went wrong please try again.");
                    console.log("Error Occured In creating file");
                }
            }


            var applyPremium = function(result) {
                for (var i = 0; i < result.length; i++) {
                    for (var i = 0; i < result.length; i++) {
                        currentPrice = pf(result[i]["Open"]);
                        if (type == 1) {
                            strikePrice = Math.ceil(currentPrice / 100) * 100;
                        }

                        if (type == 2) {
                            strikePrice = Math.floor(currentPrice / 100) * 100;
                        }

                        if (type == 0) {
                            strikePrice = pf(fixedstrike);
                            timeLeft = getTimeBetweenDates(result[i]["Date"]);
                        }

                        timeLeft = pf(getLeftTime(result[i]["Date"]));
                        interestRate = 0.055;
                        currentVolatility = pf(16.59 / 100);
                        var d1 = pf((Math.log(currentPrice / strikePrice) + ((interestRate + (Math.pow(currentVolatility, 2) / 2)) * timeLeft)) / (currentVolatility * Math.sqrt(timeLeft))).toFixed(2);
                        var d2 = pf(d1 - (currentVolatility * Math.sqrt(timeLeft))).toFixed(2);

                        if (timeLeft == 0) {
                            d1 = 0;
                            d2 = 0;
                        }

                        if (currentVolatility == 0) {
                            d1 = 0;
                            d2 = 0;
                        }

                        var premiumPrice = (currentPrice * that.getNormalDistributionValue(d1)) - (that.getNormalDistributionValue(d2) * strikePrice * Math.exp(-Math.abs(interestRate) * timeLeft));
                        result[i]["Premium"] = Math.abs(premiumPrice);
                    }

                    var outputArray = [];
                    for (var i = 0; i < result.length; i++) {
                        var onePiece = {};
                        onePiece["Date"] = result[i]["Date"];
                        onePiece["Open"] = result[i]["Open"];
                        onePiece["High"] = result[i]["High"];
                        onePiece["Low"] = result[i]["Low"];
                        onePiece["LTP"] = result[i]["LTP"];
                        onePiece["Premium"] = result[i]["Premium"];
                        outputArray.push(onePiece);
                        onePiece = {};
                    }

                }

                createFile(outputArray);
            }
            applyPremium(result);
        },
        getPremium: function(socket, strikeprice, datefrom, strikedate, typo) {
            console.log("datefrom from here is "+datefrom+" uptill is "+strikedate);
            typo = typo;
            console.log("type is " + typo);
            console.log("coming here");
            var that = this;

            var pf = function(a) {
                return parseFloat(a);
            }

            var removeHolidays = function(dateFrom, dateUptill) {
                var start = dateFrom
                finish = dateUptill,
                    dayMilliseconds = 1000 * 60 * 60 * 24;

                var weekendDays = 0;

                while (start <= finish) {
                    var day = start.getDay()
                    if (day == 0 || day == 6) {
                        weekendDays++;
                    }
                    start = new Date(+start + dayMilliseconds);
                }

                return parseInt(weekendDays);
            }

            var getTimeBetweenDates = function(datefrom,strikedate) {
                var oneDay = 24 * 60 * 60 * 1000;
                var dateUptill = new Date(strikedate);
                var dateFrom = new Date(datefrom);
                removeDays = removeHolidays();
                var diffDays = Math.abs((dateUptill.getTime() - dateFrom.getTime()) / (oneDay)) - removeHolidays(dateFrom, dateUptill);
                return (diffDays / 365);
            }

            var getLeftTime = function(date) {
                var date = new Date(date);
                var gd = date.getDate();
                var gy = date.getFullYear();
                var gm = date.getMonth() + 1;
                var d = new Date(gy, gm, 1);
                var dif = (d.getDay() + 2) % 7 + 1;
                var lastThursday = new Date(gy, gm, 1 - dif);
                daysLeft = pi(lastThursday.getDate()) - pi(date.getDate());
                if (daysLeft < 0) {
                    addDays = new Date(gy, gm + 1, 0).getDate();
                    daysLeft = Math.abs(daysLeft) + addDays;
                }
                // daysLeft = (daysLeft / 365); 
                return (daysLeft / 365);
            }

            var fetchPremium = function() {
                var Volatility_url = "http://www.moneycontrol.com/indian-indices/india-vix-36.html";
                var pf = function(a) {
                    return parseFloat(a);
                }
                console.log("coming in fetch");
                var request = require("request");
                request(Volatility_url, function(error, response, body) {
                    if (!error) {
                        var cheerio = require("cheerio");
                        var $ = cheerio.load(body);
                        $(".r_35").filter(function() {
                            var currentVolatility = $(this).children().text().trim();
                            currentVolatility = parseFloat(currentVolatility / 100);
                            var stock_url = "https://in.finance.yahoo.com/q?s=%5ENSEI";
                            request(stock_url, function(error, response, body) {
                                var $ = cheerio.load(body);
                                $(".time_rtq_ticker").filter(function() {
                                    var currentV = $(this).children().text().trim();
                                    currentPrice = pf(currentV.replace(/\,/g, ""));
                                    console.log("current price is " + currentPrice);
                                    strikePrice = strikeprice;
                                    console.log("date from is "+datefrom+" date till is "+strikedate);
                                    timeLeft = getTimeBetweenDates(datefrom, strikedate);
                                    interestRate = 0.055;
                                    if (typo == 1) {
                                        premiumPrice = that.blackScholes(currentPrice, strikePrice, interestRate, currentVolatility, timeLeft);
                                    }
                                    if (typo == 2) {
                                        premiumPrice = that.blackScholesPut(currentPrice, strikePrice, interestRate, currentVolatility, timeLeft);
                                    }
                                    console.log("premium price is " + premiumPrice);
                                    socket.emit('takePremium', premiumPrice.toFixed(2));
                                });
                            });
                        });
                    }
                });
            }

            fetchPremium();

        },




        putCall: function() {
            var that = this;
            var pf = function(a) {
                return parseFloat(a);
            }
            var pi = function(a) {
                return parseInt(a);
            }

            var createFile = function(arr) {
                var json2xls = require('json2xls');
                var xls = json2xls(arr);
                var fs = require("fs");
                var filename = "download.xlsx"; //Math.floor((Math.random()*10000000))+".xlsx";
                try {
                    var dir = './tmp/';
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir);
                    }
                    fs.writeFileSync(dir + filename, xls, 'binary');
                    console.log("File created");
                    // res.end(filename);
                } catch (err) {
                    //res.status(404).send("Sorry, something went wrong please try again.");
                    console.log("Error Occured In creating file");
                }
            }


            var getTimeBetweenDates = function(date) {
                var oneDay = 24 * 60 * 60 * 1000;
                var dateFrom = new Date(date);
                var gd = dateFrom.getDate();
                var gy = dateFrom.getFullYear();
                var gm = dateFrom.getMonth() + 1;
                var d = new Date(gy, gm, 1);
                var dif = (d.getDay() + 2) % 7 + 1;
                var dateUptill = new Date(gy, gm, 1 - dif);
                // removeDays = removeHolidays();
                var diffDays = ((dateUptill.getTime() - dateFrom.getTime()) / (oneDay)); // - removeHolidays(dateFrom, dateUptill)
                if (diffDays < 0) {
                    var returnNextMonth = function(date) {
                        patt = /-/;
                        pos = date.search(patt);
                        mon = date.substring(pos + 1, pos + 4);
                        remainingString = date.substring(pos + 1, date.length);
                        patt = /-/;
                        pos = date.search(patt);

                        yea = remainingString.substring(pos + 2, remainingString.length);
                        yea = pi(yea.replace(/\-/g, ""));
                        switch (mon) {
                            case "Jan":
                                nM = "Feb";
                                break;
                            case "Feb":
                                nM = "Mar";
                                break;
                            case "Mar":
                                nM = "Apr";
                                break;
                            case "Apr":
                                nM = "May";
                                break;
                            case "May":
                                nM = "Jun";
                                break;
                            case "Jun":
                                nM = "Jul";
                                break;
                            case "Jul":
                                nM = "Aug";
                                break;
                            case "Aug":
                                nM = "Sep";
                                break;
                            case "Sep":
                                nM = "Oct";
                                break;
                            case "Oct":
                                nM = "Nov";
                                break;
                            case "Nov":
                                nM = "Dec";
                                break;
                            case "Dec":
                                nM = "Jan";
                                break;
                        }
                        return nM;
                    }

                    var nextMonth = returnNextMonth(date);
                    if (nextMonth == "Jan") {
                        yea = pi(yea) + 1;
                    }
                    var firstDay = "01-" + nextMonth + "-" + yea;
                    var firstDate = new Date(firstDay);
                    var gd = firstDate.getDate();
                    var gy = firstDate.getFullYear();
                    var gm = firstDate.getMonth() + 1;
                    var d = new Date(gy, gm, 1);
                    var dif = (d.getDay() + 2) % 7 + 1;
                    var dateUptill = new Date(gy, gm, 1 - dif);
                    var diffDays = ((dateUptill.getTime() - dateFrom.getTime()) / (oneDay));
                    diffDays = Math.abs(diffDays);
                }
                return (diffDays / 365);
            }

            var boughtQuantities = 100;
            var plusValue = 10;
            var xlsxj = require("xlsx-to-json");
            var dir = './tmp/';
            var randomjson = Math.floor(Math.random() * 1000000) + ".json";
            xlsxj({
                input: "nifty16.xlsx",
                output: dir + randomjson
            }, function(err, arr) {
                if (err) {
                    console.error(err);
                } else {

                    var applyCalls = function(result, vixData) {

                        var getNextMonthDiff = function(date) {
                            var returnNextMonth = function(date) {
                                dateFrom = new Date(date);
                                patt = /-/;
                                pos = date.search(patt);
                                mon = date.substring(pos + 1, pos + 4);
                                remainingString = date.substring(pos + 1, date.length);
                                patt = /-/;
                                pos = date.search(patt);
                                yea = remainingString.substring(pos + 2, remainingString.length);
                                yea = pi(yea.replace(/\-/g, ""));
                                switch (mon) {
                                    case "Jan":
                                        nM = "Feb";
                                        break;
                                    case "Feb":
                                        nM = "Mar";
                                        break;
                                    case "Mar":
                                        nM = "Apr";
                                        break;
                                    case "Apr":
                                        nM = "May";
                                        break;
                                    case "May":
                                        nM = "Jun";
                                        break;
                                    case "Jun":
                                        nM = "Jul";
                                        break;
                                    case "Jul":
                                        nM = "Aug";
                                        break;
                                    case "Aug":
                                        nM = "Sep";
                                        break;
                                    case "Sep":
                                        nM = "Oct";
                                        break;
                                    case "Oct":
                                        nM = "Nov";
                                        break;
                                    case "Nov":
                                        nM = "Dec";
                                        break;
                                    case "Dec":
                                        nM = "Jan";
                                        break;
                                }
                                return nM;
                            }

                            var nextMonth = returnNextMonth(date);
                            if (nextMonth == "Jan") {
                                yea = pi(yea) + 1;
                            }
                            var firstDay = "01-" + nextMonth + "-" + yea.toString();
                            // console.log(firstDay);
                            var firstDate = new Date(firstDay);
                            var gd = firstDate.getDate();
                            var gy = firstDate.getFullYear();
                            var gm = firstDate.getMonth() + 1;
                            var d = new Date(gy, gm, 1);
                            var dif = (d.getDay() + 2) % 7 + 1;
                            var dateUptill = new Date(gy, gm, 1 - dif);
                            // console.log(firstDate+" also");
                            oneDay = 24 * 60 * 60 * 1000;
                            var diffDays = ((dateUptill.getTime() - dateFrom.getTime()) / (oneDay));
                            diffDays = Math.abs(diffDays);
                            return diffDays/365;
                        }


                        var getCurrentVolatility = function(date) {
                            for (var i = 0; i < vixData.length; i++) {
                                if (vixData[i]["Date"].indexOf(date) > -1) {
                                    return vixData[i]["Open"];
                                }
                            }
                        }

                        var applyThem = function(i) {
                            date = result[i]["Date"];
                            patt = /-/;
                            pos = date.search(patt);
                            monthyear = result[i]["Date"].substring(pos + 1, result[i]["Date"].length);
                            currentVolatility = getCurrentVolatility(result[i]["Date"]) / 100;
                            // console.log("Voltility on "+result[i]["Date"]+" was "+currentVolatility);
                            currentPrice = pf(result[i]["Open"]);
                            lowStrikePrice = 8000; //Math.floor(currentPrice / 100) * 100;
                            result[i]["CE STK 8000"] = lowStrikePrice;
                            timeLeft = getTimeBetweenDates(result[i]["Date"]);
                            interestRate = 0.055;
                            console.log((getNextMonthDiff(result[i]["Date"])));
                            lowPremiumPrice = that.blackScholes(currentPrice, lowStrikePrice, interestRate, currentVolatility, timeLeft);
                            result[i]["CE BP 8000"] = Math.abs(lowPremiumPrice);
                            result[i]["CE BQ 8000"] = 100;
                            result[i]["CE SP 8100"] = that.blackScholes(currentPrice, 8100, interestRate, currentVolatility, (pf(getNextMonthDiff(result[i]["Date"]))/100));
                            result[i]["CE SQ 8100"] = 100;

                            highStrikePrice = 8200; //Math.ceil(currentPrice / 100) * 100;
                            result[i]["CE STK 8200"] = highStrikePrice;
                            highPremiumPrice = that.blackScholes(currentPrice, highStrikePrice, interestRate, currentVolatility, timeLeft);
                            result[i]["CE BP 8200"] = Math.abs(highPremiumPrice);
                            result[i]["CE BQ 8200"] = 200;

                            result[i]["CE SP 8200"] = that.blackScholes(currentPrice, 8200, interestRate, currentVolatility, (pf(getNextMonthDiff(result[i]["Date"]))/100));
                            result[i]["CE SQ 8200"] = 100;
                            // fixedVar = 40;
                            // atfixedVarStrikePrice = (Math.floor(currentPrice / 100) * 100) + fixedVar;
                            atfixedVarStrikePrice = 8300;
                            // result[i]["At 40 Strike"] = atfixedVarStrikePrice;
                            result[i]["CE STK 8300"] = 8300;
                            atfixedVarPremiumPrice = that.blackScholes(currentPrice, atfixedVarStrikePrice, interestRate, currentVolatility, timeLeft);
                            result[i]["CE BP 8300"] = Math.abs(atfixedVarPremiumPrice);
                            result[i]["CE BQ 8300"] = 300;
                            result[i]["CE SP 8300"] = that.blackScholes(currentPrice, 8300, interestRate, currentVolatility, (pf(getNextMonthDiff(result[i]["Date"]))/100));
                            result[i]["CE SQ 8300"] = 100;



                            lowStrikePrice = 8100; //Math.floor(currentPrice / 100) * 100;
                            result[i]["PE STK 8100"] = lowStrikePrice;
                            timeLeft = getTimeBetweenDates(result[i]["Date"]);
                            interestRate = 0.055;
                            lowPremiumPrice = that.blackScholesPut(currentPrice, lowStrikePrice, interestRate, currentVolatility, timeLeft);
                            result[i]["PE BP 8100"] = Math.abs(lowPremiumPrice);
                            result[i]["PE BQ 8100"] = 100;

                            result[i]["PE SP 8000"] = that.blackScholesPut(currentPrice, atfixedVarStrikePrice, interestRate, currentVolatility, (pf(getNextMonthDiff(result[i]["Date"]))/100));
                            result[i]["PE SQ 8000"] = 100;

                            highStrikePrice = 7900; //Math.ceil(currentPrice / 100) * 100;
                            result[i]["PE STK 7900"] = highStrikePrice;
                            highPremiumPrice = that.blackScholesPut(currentPrice, highStrikePrice, interestRate, currentVolatility, timeLeft);
                            result[i]["PE BP 7900"] = Math.abs(highPremiumPrice);
                            result[i]["PE BQ 7900"] = 200;

                            result[i]["PE SP 7900"] = that.blackScholesPut(currentPrice, atfixedVarStrikePrice, interestRate, currentVolatility, (pf(getNextMonthDiff(result[i]["Date"]))/100));;
                            result[i]["PE SQ 7900"] = 100;
                            // fixedVar = 40;
                            // atfixedVarStrikePrice = (Math.floor(currentPrice / 100) * 100) + fixedVar;
                            atfixedVarStrikePrice = 7800;
                            // result[i]["At 40 Strike"] = atfixedVarStrikePrice;
                            result[i]["PE STK 7800"] = 7800;
                            atfixedVarPremiumPrice = that.blackScholesPut(currentPrice, atfixedVarStrikePrice, interestRate, currentVolatility, timeLeft);
                            result[i]["PE BP 7800"] = Math.abs(atfixedVarPremiumPrice);
                            result[i]["PE BQ 7800"] = 300;


                            result[i]["PE SP 7800"] = that.blackScholesPut(currentPrice, atfixedVarStrikePrice, interestRate, currentVolatility, (pf(getNextMonthDiff(result[i]["Date"]))/100));
                            result[i]["PE SQ 7800"] = 100;


                        }

                        for (var i = 1; i < result.length; i++) {

                            if (pf(result[i]["Open"]) > pf(result[i - 1]["Open"])) {
                                result[i]["SP"] = pf(result[i]["Open"]) - pf(0.0002 * pf(result[i]["Open"]));
                                result[i]["SQ"] = boughtQuantities;
                                result[i]["SV"] = pf(result[i]["SP"]) * pf(result[i]["SQ"]);
                                applyThem(i); 
                            }else{
                                // if((pf(result[i]["Open"]) >= 8000) && (pf(result[i]["Open"]) < 8100)){
                         
                                // }
                            }

                        }

                        for (var i = 0; i < result.length; i++) {


                            for (var i = 0; i < result.length; i++) {
                                if (i == 0) {
                                    if (result[i]["BP"] == null && result[i]["SP"] == null) {
                                        result[i]["NQ"] = 0;
                                    }
                                    if (result[i]["BP"] != null && result[i]["SP"] == null) {
                                        result[i]["NQ"] = pi(result[i]["BQ"]);
                                    }
                                    if (result[i]["BP"] == null && result[i]["SP"] != null) {
                                        result[i]["NQ"] = pi(result[i]["SQ"]);
                                    }
                                    if (result[i]["BP"] != null && result[i]["SP"] != null) {
                                        result[i]["NQ"] = pi(result[i]["BQ"]) - pi(result[i]["SQ"]);
                                    }
                                } else {
                                    if (result[i]["BP"] == null && result[i]["SP"] == null) {
                                        result[i]["NQ"] = pi(result[i - 1]["NQ"]);
                                    }
                                    if (result[i]["BP"] != null && result[i]["SP"] == null) {
                                        result[i]["NQ"] = pi(result[i - 1]["NQ"]) + pi(result[i]["BQ"]);
                                    }
                                    if (result[i]["BP"] == null && result[i]["SP"] != null) {
                                        result[i]["NQ"] = pi(result[i - 1]["NQ"]) - pi(result[i]["SQ"]);
                                    }
                                    if (result[i]["BP"] != null && result[i]["SP"] != null) {
                                        result[i]["NQ"] = pi(result[i - 1]["NQ"]) + (pi(result[i]["BQ"]) - pi(result[i]["SQ"]));
                                    }
                                }
                            }

                            for (var i = 0; i < result.length; i++) {
                                if (i == 0) {
                                    if (result[i]["BP"] == null && result[i]["SP"] == null) {
                                        result[i]["NV"] = 0;
                                    }
                                    if (result[i]["BP"] != null && result[i]["SP"] == null) {
                                        result[i]["NV"] = pf(result[i]["BV"]);
                                    }
                                    if (result[i]["BP"] == null && result[i]["SP"] != null) {
                                        result[i]["NV"] = pf(result[i]["SV"]);
                                    }
                                    if (result[i]["BP"] != null && result[i]["SP"] != null) {
                                        result[i]["NV"] = pf(result[i]["BV"]) - pf(result[i]["SV"]);
                                    }
                                } else {
                                    if (result[i]["BP"] == null && result[i]["SP"] == null) {
                                        result[i]["NV"] = pf(result[i - 1]["NV"]);
                                    }
                                    if (result[i]["BP"] != null && result[i]["SP"] == null) {
                                        result[i]["NV"] = pf(result[i - 1]["NV"]) + pf(result[i]["BV"]);
                                    }
                                    if (result[i]["BP"] == null && result[i]["SP"] != null) {
                                        result[i]["NV"] = pf(result[i - 1]["NV"]) - pf(result[i]["SV"]);
                                    }
                                    if (result[i]["BP"] != null && result[i]["SP"] != null) {
                                        result[i]["NV"] = pf(result[i - 1]["NV"]) + (pf(result[i]["BV"]) - pf(result[i]["SV"]));
                                    }
                                }
                            }

                            for (var i = 0; i < result.length; i++) {
                                if (result[i]["NQ"] == 0) {
                                    result[i]["AVG"] = 0;
                                } else {
                                    result[i]["AVG"] = (parseFloat(result[i]["NV"]) / parseFloat(result[i]["NQ"])).toFixed(2);
                                }
                            }

                            for (var i = 0; i < result.length; i++) {
                                if (i == 0) {
                                    result[i]["MTM"] = (parseFloat(result[i]["AVG"]) - (result[i]["LTP"])) * parseFloat(result[i]["NQ"]);
                                } else {
                                    result[i]["MTM"] = (parseFloat(result[i]["AVG"]) - (result[i]["LTP"])) * parseFloat(result[i]["NQ"]);
                                }
                            }

                        }



                        createFile(result);
                    }

                    var buyAll = function(result, callback) {
                        console.log(result.length);
                        for (var i = 0; i < result.length; i++) {
                            result[i]["BP"] = pf(result[i]["Open"]) + pf(0.0002 * pf(result[i]["Open"]));
                            result[i]["BQ"] = boughtQuantities;
                            result[i]["BV"] = pf(result[i]["BP"]) * pf(result[i]["BQ"]);
                            result[i]["SP"] = null;
                            result[i]["SQ"] = null;
                            result[i]["SV"] = null;
                            result[i]["NQ"] = null;
                            result[i]["NV"] = null;
                            result[i]["AVG"] = null;
                            result[i]["MTM"] = null;

                            result[i]["CE STK 8000"] = null;
                            result[i]["CE BP 8000"] = null;
                            result[i]["CE BQ 8000"] = null;
                            result[i]["CE SP 8100"] = null;
                            result[i]["CE SQ 8100"] = null;

                            result[i]["CE STK 8200"] = null;
                            result[i]["CE BP 8200"] = null;
                            result[i]["CE BQ 8200"] = null;
                            result[i]["CE SP 8200"] = null;
                            result[i]["CE SQ 8200"] = null;

                            result[i]["CE STK 8300"] = null;
                            result[i]["CE BP 8300"] = null;
                            result[i]["CE BQ 8300"] = null;
                            result[i]["CE SP 8300"] = null;
                            result[i]["CE SQ 8300"] = null;

                            result[i]["PE STK 8100"] = null;
                            result[i]["PE BP 8100"] = null;
                            result[i]["PE BQ 8100"] = null;
                            result[i]["PE SP 8000"] = null;
                            result[i]["PE SQ 8000"] = null;

                            result[i]["PE STK 7900"] = null;
                            result[i]["PE BP 7900"] = null;
                            result[i]["PE BQ 7900"] = null;
                            result[i]["PE SP 7900"] = null;
                            result[i]["PE SQ 7900"] = null;

                            result[i]["PE STK 7800"] = null;
                            result[i]["PE BP 7800"] = null;
                            result[i]["PE BQ 7800"] = null;
                            result[i]["PE SP 7800"] = null;
                            result[i]["PE SQ 7800"] = null;
                        }


                        var jsonfile = require('jsonfile');
                        var file = 'vixhistory.json';
                        jsonfile.readFile(file, function(err, obj) {
                            console.log("Coming here");
                            vixData = obj;
                            callback(result, vixData);
                        });
                    }

                    var dataClean = function(arr) {
                        var clArray = [];
                        for (var i = 0; i < arr.length; i++) {
                            var obj = arr[i];
                            if (obj.Date == "" || obj.Date == "Date" || obj.Date == null) {} else {
                                clArray.push(obj);
                            }
                        }
                        return clArray;
                    }


                    var dataTrimmer = function(arr) {
                        for (var i = 0; i < arr.length; i++) {
                            for (key in arr[i]) {
                                if (!((key.indexOf('Date') > -1) || (key.indexOf('Expiry') > -1) || (key.indexOf('Open') > -1) || (key.indexOf('High') > -1) || (key.indexOf('Low') > -1) || (key.indexOf('LTP') > -1) || (key.indexOf('Last') > -1))) {
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
                    }

                    buyAll(dataTrimmer(dataClean(arr)), applyCalls);
                }
            });
        }
    }
}