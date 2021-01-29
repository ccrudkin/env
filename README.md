# Temperature and Humidity Monitor

## TODO:
* Stabilize unsupervised running.
  * Why does it fail? WiFi/Internet disconnect? How to resolve?
  * CXN to mongoDB fails. On fail, try to connect to something else reliable, e.g., Google, to rule out network issues.
* Chart aeshetics and readability
  * Parse timestamps.  
  * Colors.  
  * Mobile.

## Main Features Desired

### Phase 1
Webpage displaying most recent temperature and humidity (T&H) datapoint.  
~~T&H read every 60 seconds.~~  
~~Served via Express and a simple variable held and updated in Node.~~  

### Phase 2
Webpage displaying current T&H as a number, and **historical T&H data as a graph.**  
~~Served via Express, but need database to persist old data.~~  
T&H recorded every 60 seconds, yielding 1,440 datapoints per day.  
Graph via chart.js (?) ~~Or just use MongoDB Atlas visualizations (?)~~  

### Phase 3
Run from headless startup/disconnected from SSH.  
Recover from power failure. 
Add reboot button.  
Push updates to page.  
Requests beyond last 48-hour period, server-side scripts will handle.  

## Notes
To keep running after exiting PuTTY, use `nohup npm start &` then `exit` before closing.  
Check on background processes issue with this solution.

## Resources
* [RPIO](https://www.npmjs.com/package/rpio)  
* [ExpressJS](https://expressjs.com/)  
* [EJS](https://ejs.co/)  
* [socket.io](https://socket.io/)  
* [Raspberry Pi Pinout](https://pinout.xyz/)  
* [DHT Module](https://github.com/momenso/node-dht-sensor)  
* [mongoDB Node Fundamentals](https://docs.mongodb.com/drivers/node/fundamentals)  
* [chart.js](https://www.chartjs.org)  