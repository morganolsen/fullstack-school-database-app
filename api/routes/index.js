'use strict';

const express = require('express');

const router = express.Router();

const courses = require('./courses');
const users = require('./users');

router.use('/courses', courses);
router.use('/users', users);

module.exports = router;