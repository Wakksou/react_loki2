// @flow
'use strict';

const express = require("express");
const routerCountries = express.Router();

routerCountries.get('/', (req, res) => {
    res.send("GET all countries... paths: " + req.originalUrl);
});

routerCountries.get('/URUGUAY', (req, res) => {
    res.send("GET Uruguay... paths: " + req.originalUrl);
});

routerCountries.get('/:country', (req, res) => {
    res.send("GET Single country... " + req.params.country);
});

module.exports = routerCountries;
