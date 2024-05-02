const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Define the base folder
const baseFolder = '/home/kali/VulnerableLabs/PathTraversal/lab5';

// Vulnerable endpoint
app.get('/vuln', (req, res) => {
    // Get the filename parameter from the query string
    const filename = req.query.filename;
    
    if (!filename) {
        return res.status(400).send('Provide filename parameter \n\n your working directory is /home/kali/VulnerableLabs/PathTraversal/lab5');
    }

    // Check if the filename starts with the expected base folder
    if (!filename.startsWith(baseFolder)) {
        return res.status(400).send('Invalid filename');
    }

    // Construct the full path to the file
    const filePath = path.normalize(filename);

    // Read the file content
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }

        // Display the file content in the response
        res.send(`${data}`);
    });
});

app.get('/', (req, res) => {
  res.send('Hi to 5th Lab Path Traversal, the /vuln endpoint is what you want');
});
// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
