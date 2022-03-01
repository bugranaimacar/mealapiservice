var XLSX = require('xlsx')
var workbook = XLSX.readFile('yemek.xlsx');
var sheet_name_list = workbook.SheetNames;
var yemeklistejson = JSON.parse(JSON.stringify(workbook.Sheets[sheet_name_list[0]]));
var yemekliste = JSON.stringify(workbook.Sheets[sheet_name_list[0]]);
let ts = new Date();
let tw = new Date(ts.getTime() + (24 * 60 * 60 * 1000));


var weekday=new Array(8);
weekday[0]="Sunday";
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";
weekday[7]="Sunday";

var months=new Array(12);
months[0]="January";
months[1]="February";
months[2]="March";
months[3]="April";
months[4]="May";
months[5]="June";
months[6]="July";
months[7]="August";
months[8]="September";
months[9]="October";
months[10]="November";
months[11]="December";

let bugunungunu, yariningunu;

function isDigit(val) {
    return String(+val).charAt(0) == val;
  }

  if(isDigit(ts.getDate())) bugunungunu = '0' + ts.getDate();
  if(isDigit(tw.getDate())) yariningunu = '0' + tw.getDate();

let bugununstringi = weekday[parseInt(ts.getDay())] + ", " + months[ts.getMonth()] + " " + bugunungunu + ", " + ts.getFullYear();
let yarininstringi = weekday[parseInt(tw.getDay())] + ", " + months[tw.getMonth()] + " " + yariningunu + ", " + tw.getFullYear();
let yemekanahtar = new Array(8)
let yemekstringi = "";
let yazilacakstring;


module.exports.zamangetir = function(zamangetir){
    if(zamangetir == 0) return bugununstringi;
    else return yarininstringi;
}

module.exports.yemeklisteyukle = function(zaman){
    if(zaman == 0) yazilacakstring = bugununstringi;
    else yazilacakstring = yarininstringi;
    anahtar = "";
    yemekstringi = "";
    for (var key in yemeklistejson) {
        if (yemeklistejson.hasOwnProperty(key)) {
           if(yemeklistejson[key].w == yazilacakstring) {
              //  anahtar = "Key:" + key.charAt(0) + parseInt(key.substring('1')) + " -> " + yemeklistejson[key].w;    
            for(var i = 0; i < yemekanahtar.length; i++){
                    let artis = i+1
                    yemekanahtar[i] = parseInt(key.substring(1))+artis
                    let mainkey = key.charAt(0) + yemekanahtar[i];
                    yemekstringi = yemekstringi.concat(yemeklistejson[mainkey]['w'], "\n");
                }
           }
        }
        else{
            return "Bu gün için tanımlanmış bir yemek bulunamadı!";
        }
    }
    return yemekstringi || "Bu gün için tanımlanmış bir yemek bulunamadı!";
}
