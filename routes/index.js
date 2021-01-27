var express = require('express');
var router = express.Router();
const uri = process.env.mongodbUrl;
console.log(uri);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Environment Monitor', tempF: tf, 
  humidity: hum, date: date });
});

module.exports = router;

// TH handling
// sample from https://github.com/momenso/node-dht-sensor

var sensor = require("node-dht-sensor");
let tf;
let hum;
let date;
let location = "office";
let mdbData;

function getDate() {
    return new Date();
}

function readSensor() {
  sensor.read(22, 4, function(err, temperature, humidity) {
    if (!err) {
      let tempF = (temperature * ( 9 / 5 )) + 32;
      tf = `${tempF.toFixed(1)}`;
      hum = `${humidity.toFixed(1)}`;
      date = `${getDate()}`;      
      console.log(`temp: ${temperature.toFixed(1)}°C / ${tf}°F, humidity: ${hum}% 
      @ ${date}`);

      mdbData = {
          "time": date,
          "data": {
              "temp": temperature,
              "humidity": humidity
          },
          "location": location
      }      

      postData(d);
    }
  });  
}

readSensor();
setInterval(readSensor, 60000);

// MongoDB connection *TEMP*
function postData() {
  const MongoClient = require('mongodb').MongoClient;
  const client = new MongoClient(uri, { useNewUrlParser: false });
  async function run() {
    try {
      await client.connect();

      const database = client.db("env_logs");
      const collection = database.collection("env");

      // create a document to be inserted
      const doc = d;
      const result = await collection.insertOne(doc);

      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
      );
    } finally {
      await client.close();
    }
  }

  run().catch(console.dir);
}
