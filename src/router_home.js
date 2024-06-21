const express = require('express');
const router = express.Router();

// Define routes
router.get('/', function(req, res) {
    res.send('Home Page');
});

module.exports = router;
