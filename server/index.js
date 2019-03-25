const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3000;
const redis = require("redis"); 
const client = redis.createClient();
 
// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });
 
client.on("error", function (err) { 
    console.log("Error " + err);
});
 
// client.set("string key", "string val", redis.print);
// client.hset("hash key", "hashtest 1", "some value", redis.print);
// client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.quit();
});

// Temp script to generate data for testing
const DIR_TO_SERVE = path.join(__dirname, '../reactStuff/dist');
const app = express();
app.use(express.static(DIR_TO_SERVE));
// For when/if we send data to client we can practice sending it in a body
app.use(bodyParser({extended: true})); 
// So we don't have to specify a bunch of headers
app.use(cors());

app.get('*', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <head>
    <title>Time to die</title>
    <link rel='stylesheet' href='./index.css'>
  </head>
  <body>
    <div id='root'>Loading...</div>
    <script src='./bundle.js'></script>
  </body>
  `);
});

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});