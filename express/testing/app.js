'use strict'

const fastify = require('fastify');
const user = require('../testing/test.controllers/user.controller');
const post = require('../testing/test.controllers/post.controller');

function build(opts={}) {
    const app = fastify(opts);

    app.get('/', async function (req, res) {

        const oneUser = await user.getUser(req, res, "a@a.a");
        const allUsers = await user.allUsers();
        await user.updateFirstName(req, res, "CHANGED FNAME", "a@a.a");
        const updateFirstName = await user.getUser(req, res, "a@a.a");
        await user.updateFirstName(req, res, "A", "a@a.a");
        const postsByUser = await post.allPostByUser(req, res, "a@a.a");
        await user.updateLastName(req, res, "CHANGED LNAME", "a@a.a");
        const updateLastName = await user.getUser(req, res, "a@a.a");
        await user.updateLastName(req, res, "A", "a@a.a");
        const createDuplicatedPKUser = await user.createUser(req, res, "a@a.a");

        return { oneUser, allUsers, updateFirstName, updateLastName, postsByUser, createDuplicatedPKUser };
    });

    return app;
}

module.exports = build;