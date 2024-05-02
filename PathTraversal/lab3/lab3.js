const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/vuln', (req, res) => {
  let filename = req.query.file;
  
  if (!filename) {
    res.status(400).send('You need a parameter called file.');
    return;
  }

  // Mitigate path traversal by removing traversal sequences once
  filename = filename.replace(/\.\.\//g, '');

  const filePath = path.join(__dirname, filename);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.status(404).send('File not found');
      } else {
        res.status(500).send('Internal server error');
      }
    } else {
      res.send(`${data}`);
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
