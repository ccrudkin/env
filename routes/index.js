var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Environment Readout', tempF: tf, 
  humidity: hum, date: date });
});

module.exports = router;

// TH handling
// sample from https://github.com/momenso/node-dht-sensor

var sensor = require("node-dht-sensor");
let tf;
let hum;
let date;

function getDate() {
    return new Date();
}

function readSensor() {
  sensor.read(22, 4, function(err, temperature, humidity) {
    if (!err) {
      let tempF = (temperature * ( 9 / 5 )) + 32;
      console.log(`temp: ${temperature.toFixed(1)}°C / ${tempF.toFixed(1)}°F, humidity: ${humidity.toFixed(1)}%`);
      tf = `${tempF.toFixed(1)}`;
      hum = `${humidity.toFixed(1)}`;
      date = `${getDate()}`;
    }
  });  
}

setInterval(readSensor, 5000);
