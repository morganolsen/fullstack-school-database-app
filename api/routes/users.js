'use strict';

const express = require('express');

const router = express.Router();

const { asyncHandler } = require('../middleware/async-handler');
const { authenticate } = require('../middleware/auth-handler');
const { User } = require('../models');

// GET /api/users 200 | NEEDS AUTHENTICATION
router.get('/', authenticate, asyncHandler(async(req, res) => {
    const user = req.currentUser;
    res.json({
        id: user.id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        emailAddress: user.emailAddress
    });
}));

// POST /api/users 201
router.post('/', asyncHandler(async(req, res) => {
    console.log(req.body);
    await User.create(req.body);
    res.location('/');
    res.status(201).end();
}))


// POST /api/users 201

module.exports = router;