const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

let runners = new Map();

app.get("/", (req, res) => {
  const { user, state, scope, code } = req.query;
  console.log(`User: ${user}, State: ${state}, Scope: ${scope}, Code: ${code}`);
  runners.set(user, code);
  res.send(`Code: ${code}`);
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