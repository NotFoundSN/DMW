const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors());

// Serve JSON files from server-data directory
app.use(express.static(path.join(__dirname, 'server-data')));

// Log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.listen(PORT, () => {
    console.log(`🚀 Dev data server running on http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${path.join(__dirname, 'server-data')}`);
    console.log(`\nAvailable endpoints:`);
    console.log(`  - http://localhost:${PORT}/arenas/colo-hero.json`);
    console.log(`  - http://localhost:${PORT}/dungeons/vajiramon.json`);
});
