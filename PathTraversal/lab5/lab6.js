const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Vulnerable endpoint
app.get('/vuln', (req, res) => {
    // Get the filename parameter from the query string
    const filename = req.query.filename;

    // Check if the filename ends with the expected file extension
    if (!filename.endsWith('.png')) {
        return res.status(400).send('Invalid filename');
    }

    // Find the position of the null byte in the filename
    const nullByteIndex = filename.indexOf('\0');

    // Extract the path part of the filename, up to the null byte position
    const pathPart = filename.substring(0, nullByteIndex);

    // Construct the full path to the file
    const filePath = path.resolve(__dirname, 'uploads', pathPart);

    // Read the file content
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }

        // Display the file content in the response
        res.send(`Hi to 4th Lab Path Traversal, the /vuln endpoint is what you want\n\n${data}`);
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
