// server.js

const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET request handler
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// POST request handler
app.post('/data', (req, res) => {
  const data = req.body;
  res.send(`Received data: ${JSON.stringify(data)}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on`);
});