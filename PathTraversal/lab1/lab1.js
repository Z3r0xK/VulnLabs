const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/vuln', (req, res) => {
  const filename = req.query.file;

  if (!filename) {
    res.status(400).send('You need a parameter called file.');
    return;
  }

  const filePath = path.join(__dirname, filename);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
    } else {
      res.send(data);
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hi to 1st Lab Path Traversal, the /vuln endpoint is what you want');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
