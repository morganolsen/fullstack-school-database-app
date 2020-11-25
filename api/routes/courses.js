'use strict';

const express = require('express');

const router = express.Router();

const { asyncHandler } = require('../middleware/async-handler');
const { authenticate } = require('../middleware/auth-handler');
const { Course, User } = require('../models');

// GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
router.get('/', asyncHandler(async(req, res) => {
    const courses = await Course.findAll({
        attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded', 'userId'],
        include: [
            {
                model: User
            }
        ]
    });
    res.json(courses);
}));

// GET /api/courses/:id 200 - Returns the course (including the user that owns the course) for the provided course ID
router.get('/:id', asyncHandler(async(req, res) => {
    const course = await Course.findByPk(req.params.id, {
        attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded'],
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'emailAddress']
            }
        ]
    });
    if(!course){
        const err = new Error("Course Not found");
        err.status = 404;
        throw err;
    }
    res.json(course);
}));

// POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
router.post('/', authenticate, asyncHandler(async(req,res) => {
    const course = await Course.create(req.body);
    res.location('/' + course.id);
    res.status(201).end();
}));

// PUT /api/courses/:id 204 - Updates a course and returns no content
router.put('/:id', authenticate, asyncHandler(async(req,res) => {
    const course = await Course.findByPk(req.params.id);
    if(course.userId !== req.currentUser.id){
        const err = new Error("You do not have access to edit this course.");
        err.status = 403;
        throw err;
    }else{
        await Course.update(req.body, {where: {id: course.id}});
        res.status(204).end();
    }
}));

// DELETE /api/courses/:id 204 - Deletes a course and returns no content
router.delete('/:id', authenticate, asyncHandler(async(req,res) => {
    const course = await Course.findByPk(req.params.id);
    if(course.userId !== req.currentUser.id){
        const err = new Error("You do not have access to delete this course.");
        err.status = 403;
        throw err;
    }else{
        await Course.destroy({where: {id: course.id}});
        res.status(204).end();
    }
}));

module.exports = router;