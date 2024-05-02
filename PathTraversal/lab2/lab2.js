
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/vuln', (req, res) => {
  let filePath = req.query.file;
  
  if (!filePath) {
    res.status(400).send('You need a parameter called file.');
    return;
  }

  if (filePath.includes('../')) {
    res.send('Hacker caught!');
    return;
  }

// look here
  filePath = path.resolve(__dirname, filePath);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.send('Error reading file.');
    } else {
      res.send(data);
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hi to 2nd Lab Path Traversal, the /vuln endpoint is what you want');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
