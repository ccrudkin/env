# Temperature and Humidity Monitor

## Main Features Desired

### Phase 1
Webpage displaying most recent temperature and humidity (T&H) datapoint.  
T&H read every 60 seconds.  
Served via Express and a simple variable held and updated in Node.  

### Phase 2
Webpage displaying current T&H as a number, and historical T&H data as a graph.  
Served via Express, but need local storage to persist old data.  
T&H recorded every 60 seconds, yielding 1,440 datapoints per day.  
Server-side scripts will handle data requests beyond last 24-hour period.  
Graph via chart.js (?)  
Run from headless startup.  
Recover from power failure.  

## Resources
* [RPIO](https://www.npmjs.com/package/rpio)  
* [ExpressJS](https://expressjs.com/)  
* [EJS](https://ejs.co/)  
* [socket.io](https://socket.io/)  
* [Raspberry Pi Pinout](https://pinout.xyz/)  
* [DHT Module](https://github.com/momenso/node-dht-sensor)  