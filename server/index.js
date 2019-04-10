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
// client.hset("hash key", "myval", "some value", redis.print);
client.hset(["hash key", "another 2", "death other value"], redis.print);
client.hkeys("hash key", function (err, res) {
    console.log(res.length + " res:");
    res.forEach(function (res, i) {
        console.log("    " + i + ": " + res);
    });
    client.hget('hash key', 'another 2', (err, res) => {
      console.log(res || err);
    });
    client.quit();
});
client.hget('hash key', 'another 2', (err, res) => {
  
});
const DIR_TO_SERVE = path.join(__dirname, '../reactStuff/dist');
const app = express();
app.use(express.static(DIR_TO_SERVE));
// For when/if we send data to client we can practice sending it in a body
app.use(bodyParser({extended: true})); 
// So we don't have to specify a bunch of headers
app.use(cors());

app.put('/signup', (req, res) => {
  const {username, password, playerData} = req.body;
  client.hget('userdata', 'username', (err, reply) => {
    if (username !== reply) {
      client.hset('userdata', 'username', username, 'password', password, 'player_json', playerData, () => {
        client.hget('userdata', 'username', (err, reply) => {
          console.log(reply || err);
        });
      });
      // res.sendStatus(301);
    } else {
      // res.sendStatus(400);
    }
  });
});

app.post('/login', (req, res) => {
  const {username, password} = req.body;
  client.hget('userdata', 'username', 'password', (err, res) => {
    if (username === res) {
      client.hget('userdata', 'username', username, 'password', password, 'player_json', playerData);
      res.status(301).send();
    } else {
      res.status(400).send();
    }
  });
});

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