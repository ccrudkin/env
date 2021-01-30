# Temperature and Humidity Monitor

## TODO:
* Stabilize unsupervised running.
  * Why does it fail? WiFi/Internet disconnect? How to resolve?
  * CXN to mongoDB fails. On fail, try to connect to something else reliable, e.g., Google, to rule out network issues.
  * Logging:
    * use logger (Winston?)
    * add DEBUG=app:* to cron task
    * log file
* Chart aeshetics and readability
  * Parse timestamps. For tooltips, use [tooltip callback function](https://www.chartjs.org/docs/latest/configuration/tooltip.html).  
  * Colors.  
  * Mobile: don't display, display warning, or otherwise adapt to be readable.

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
Run disconnected from SSH.  
Run from headless startup.  
Recover from power failure. 
Add reboot button.  
Push updates to page.  
Requests beyond last 48-hour period, server-side scripts will handle.  
Refactor code.  
Add "table" mode with reduced number of data points.  

## Notes
1. To keep running after exiting PuTTY, use `nohup npm start &` then `exit` before closing. Add `DEBUG=app:*` prior, as a discreet command, to turn on debugging.    
Check on background processes issue with this solution.  
2. Noticed failure to connect BEFORE an initial failed post to mdb. So it seems to be the network.
3. Strategy to catch failures: 
  1. If server fails to connect to mongoDB Atlas, reboot. (Opt.: check another connection, like google)
  2. Run server script on boot.
  3. Wait 60 seconds after script start before trying to send requests to allow for wifi connection.

## Resources
* [RPIO](https://www.npmjs.com/package/rpio)  
* [ExpressJS](https://expressjs.com/)  
* [EJS](https://ejs.co/)  
* [socket.io](https://socket.io/)  
* [Raspberry Pi Pinout](https://pinout.xyz/)  
* [DHT Module](https://github.com/momenso/node-dht-sensor)  
* [mongoDB Node Fundamentals](https://docs.mongodb.com/drivers/node/fundamentals)  
* [chart.js](https://www.chartjs.org)  