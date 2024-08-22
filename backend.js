const express = require("express");
const mqtt = require("mqtt")

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

let runners = new Map();

app.get("/", (req, res) => {

  const { user, state, scope, code } = req.query;
  console.log(`User: ${user}, State: ${state}, Scope: ${scope}, Code: ${code}`);
  if (user!=undefined && code!=undefined) {
    runners.set(user, code);
    res.send(`Code: ${code}`);
  }
  res.send("Hello World!");
});

app.get("/runners", (req, res) => {
  const { user } = req.query; 
  console.log(runners);
  res.send(JSON.stringify({ name: user, code: runners.get(user) }));
});

app.get("/authenticated", (req, res) => {
  const { user } = req.query;
  runners.delete(user);
  res.end();
});

app.get("/webhook", (req, res) => {
  console.log(req.query)
  const verify_token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  console.log(verify_token)
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ 'hub.challenge': challenge }));
})

app.post("/webhook", (req, res) => {
  console.log(req.body);

  const opts = {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
  }

  client = mqtt.connect(process.env.MQTT_URL, opts)

  client.on("error", (error) => {
    console.log(error);
  })

  client.publish("Strava/activities", JSON.stringify(req.body));

  // client.end()

  res.end();
})

app.get("/ping", (req, res) => {
  res.end('pong!')
})
