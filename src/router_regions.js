// @flow
'use strict';

const express = require("express");
const routerRegions = express.Router();

routerRegions.get('/all', (req, res) => {
    res.send("GET All Regions");
});

routerRegions.get('/:country', (req, res) => {
    res.send("GET All Regions for Country: " + req.params.country);
});

module.exports = routerRegions;
