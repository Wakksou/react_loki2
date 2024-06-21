// @flow
'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const validateUser = require('./some/path/validate_user.js');

const app = express();
const SECRET_JWT_KEY = 'REPLACEWITHAPLACEHOLDER';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Public endpoint
app.get('/public', (req, res) => {
    res.send('The public endpoint needs no token!');
});

// Get token endpoint
app.post('/gettoken', (req, res) => {
    validateUser(req.body.user, req.body.password, (err, userId) => {
        if (err != null) {
            res.status(401).send(err);
        } else if (userId) {
            const token = jwt.sign(
                { userId },
                SECRET_JWT_KEY,
                { algorithm: 'HS256', expiresIn: '1h' }
            );
            res.status(200).send(token);
        } else {
            res.status(401).send('Authentication failed');
        }
    });
});

// Middleware to check the authorization header
app.use((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('No token specified');
    }

    const token = authHeader.split(' ')[1];

    // Now validate the token itself
    jwt.verify(token, SECRET_JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send('Token expired or not valid');
        } else {
            // Token is good, use it
            req.user = { userId: decoded.userId };
            next();  // Keep processing the request
        }
    });
});

// Private endpoint
app.get('/private', (req, res) => {
    res.send('The private endpoint needs JWT, but it was provided: OK!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send('INTERNAL SERVER ERROR');
});

app.listen(8080, () => {
    console.log('JWT Mini server ready, at http://localhost:8080/');
});
