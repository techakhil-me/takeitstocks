const express = require('express');
const path = require('path');
const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));


const rp = require('request-promise');
const ch = require('cheerio');
// const url = 'http://www.a1intradaytips.in/';
// var cardVal = {}
// rp(url).then(function(html) {
    
//     for (var i = 2; i < 7; i++) {
//     cardVal[`stock${i-1}`] = ch(`div.divTableRow:nth-child(${i}) > div:nth-child(1) > a:nth-child(1) > b:nth-child(1) > font:nth-child(1)`, html).text()
// } 
//     console.log(cardVal);
//     app.get('/', (req, res) => {
//   res.render('index',cardVal);
// });
//   })


const url = 'https://www.stocklinedirect.com/stock-tips.html';
var stockVal = {}
rp(url).then(function(html) {
    
    for (var i = 1; i < 6; i++) {
    stockVal[`stock${i}`] = {'code':ch(`.table > tbody:nth-child(3) > tr:nth-child(${i}) > td:nth-child(2) > a:nth-child(1)`, html).text(),
    'company':ch(`.table > tbody:nth-child(3) > tr:nth-child(${i}) > td:nth-child(3) > a:nth-child(1)`, html).text(),
    'desc':ch(`.table > tbody:nth-child(3) > tr:nth-child(${i}) > td:nth-child(4) > a:nth-child(1)`, html).text(),
    'price':ch(`.table > tbody:nth-child(3) > tr:nth-child(${i}) > td:nth-child(5) > a:nth-child(1)`, html).text()}
} 
    console.log(stockVal);
    app.get('/', (req, res) => {
  res.render('index',stockVal);
});
  })



app.listen(5000, () => {
  console.log('server started');
  
});
