require('dotenv').config();
var express = require('express');
var router = express.Router();
const uri = process.env.mongodbUrl;

/* GET home page. */
router.get('/', function(req, res, next) {
  retrieveData()
  .then((rData) => { 
    let currentTemp = (((rData[rData.length - 1]['data']['temp']) * ( 9 / 5 )) + 32).toFixed(1);
    let currentHum = rData[rData.length - 1]['data']['humidity'].toFixed(1);
    let currentTimestamp = rData[rData.length - 1]['datetime']['timestamp'];
    res.render('index', { 
      title: 'Home Environment Monitor', tempF: currentTemp, humidity: currentHum, date: currentTimestamp }); 
  })
  .catch((err) => { 
    res.render('portfolio', { 
      title: 'Home Environment Monitor', tempF: 'err', humidity: 'err', date: 'err' }); 
  }); // change to be more useful!
});

router.get('/data', (req, res, next) => {
  retrieveData()
  .then((rData) => {
    res.send(rData);
  })
  .catch((err) => {
    res.send([ 'error', 'Error getting graph data.', err ]);
  });
});

// read sensor
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
          "datetime": {
              "timestamp": date,
              "ms": Date.parse(date)
          },
          "data": {
              "temp": temperature,
              "humidity": humidity
          },
          "location": location
      }      

      postData(mdbData);
    }
  });  
}

readSensor();
setInterval(readSensor, 60000);

// post to mongoDB
function postData(d) {
  const MongoClient = require('mongodb').MongoClient;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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

// read from mongoDB
function retrieveData() {
  let prom = new Promise((resolve, reject) => {
    const { MongoClient } = require("mongodb");
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    
    async function run() {
      try {
        await client.connect();
  
        const database = client.db("env_logs");
        const collection = database.collection("env");
  
        // CREATE query for the last 48 hours
        let timeNow = new Date();
        timeNow = Date.parse(timeNow);
        timeWindow = timeNow - 172800000;
        const query = { "datetime.ms": { $gt: timeWindow } };
        const sort = { "datetime.ms": 1 };
        const options = {
          projection: { _id: 0 },
        };      
  
        const cursor = collection.find(query, options).sort(sort);
        // print a message if no documents were found
        if ((await cursor.count()) === 0) {
          console.log("No documents found!");
          reject('Retrieval error.');
        }
        // await cursor.forEach(console.dir);
        const allValues = await cursor.toArray();
        // console.log (`All values:\n${allValues}`);
        resolve(allValues);
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);    
  });
  return prom;
}

module.exports = router;