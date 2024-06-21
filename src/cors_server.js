const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
/*
// Middleware CORS
app.use(cors({
    origin: 'http://localhost:8000', // Origine autorisée
    methods: 'GET, POST, OPTIONS',
    allowedHeaders: 'dummy, content-type'
}));
*/

app.get('/', (req, res) => {
    res.json({ message: 'This is a CORS-enabled response' });
});

app.listen(port, () => {
    console.log('CORS-enabled server running on http://localhost:' + port);
});
