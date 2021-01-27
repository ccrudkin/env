# Temperature and Humidity Monitor

## TODO:
Verify db connection to env_logs and env_logs.env collection.  
Write and read from db.  
Write new rows to db with each sensor reading.  
Read most recent data from db and send to webpage (instead of sending data directly when collected).  

## Main Features Desired

### Phase 1
Webpage displaying most recent temperature and humidity (T&H) datapoint.  
T&H read every 60 seconds.  
Served via Express and a simple variable held and updated in Node.  

### Phase 2
Webpage displaying current T&H as a number, and historical T&H data as a graph.  
Served via Express, but need database to persist old data.  
T&H recorded every 60 seconds, yielding 1,440 datapoints per day.  
Server-side scripts will handle data requests beyond last 24-hour period.  
Graph via chart.js (?) Or just use MongoDB Atlas visualizations (?)  

### Phase 3
Run from headless startup/disconnected from SSH.  
Recover from power failure. 
Add reboot button.  
Push updates to page.  

## Resources
* [RPIO](https://www.npmjs.com/package/rpio)  
* [ExpressJS](https://expressjs.com/)  
* [EJS](https://ejs.co/)  
* [socket.io](https://socket.io/)  
* [Raspberry Pi Pinout](https://pinout.xyz/)  
* [DHT Module](https://github.com/momenso/node-dht-sensor)  
* [mongoDB Node Fundamentals](https://docs.mongodb.com/drivers/node/fundamentals)