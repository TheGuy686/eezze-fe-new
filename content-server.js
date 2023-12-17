const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Set the port number
const port = 2005;

// Serve the contents of the dist folder as static content
app.use(express.static(path.join(__dirname, 'dist')));

// Set the path to the demo.html file
const demoPath = path.join(__dirname, '/dist/index.html');

// Serve the demo.html file when the root URL is requested
app.get('/', (req, res) => res.sendFile(demoPath));

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});