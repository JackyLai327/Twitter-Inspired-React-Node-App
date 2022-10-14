const argon2 = require("argon2");
const e = require("express");
const db = require("../database");

// Select all users
exports.allUsers = async (req, res) => {
    const user = await db.user.findAll();
    res.json(user);
};

// Get a user
exports.getUser = async (req, res) => {
    const user = await db.user.findByPk(req.params.username);
    console.log(req);
    res.json(user ? user : null);
};

// Select one user 
exports.login = async (req, res) => {
    const user = await db.user.findByPk(req.query.username);
    console.log(user, "\n", req);
    if (user === null || await argon2.verify(user.hashed_password, req.query.password) === false) {
        res.json(null);
    } else res.json(user);
};

// Create a user
exports.createUser = async (req, res) => {
    if (await db.user.findByPk(req.param.username)) return;

    const hashedPassword = await argon2.hash(req.body.password, { type: argon2.argon2id });
    
    const user = await db.user.create({
        username: req.body.username,
        hashed_password: hashedPassword,
        first_name: req.body.firstName,
        last_name: req.body.lastName
    });
    res.json(user ? user : null);
};

// Delete a user
exports.deleteUser = async (req, res) => {
    const user = await db.user.destroy({ where: { username: req.params.username } });
    res.json(user);
}

// Update a user's first name
exports.updateFirstName = async (req, res) => {

    const user = await db.user.update({
        first_name: req.params.firstName
    }, {
        where: { username: req.params.username }
    })
    res.json(user);
}

// Update a user's last name
exports.updateLastName = async (req, res) => {
    const user = await db.user.update({
        last_name: req.params.lastName
    }, {
        where: { username: req.params.username }
    })
    res.json(user);
}

// Update a user's profile picture
exports.updateProfilePicture = async (req, res) => {
    const user = await db.user.update({
        profile_picture: req.body.profilePicture
    }, {
        where: { username: req.body.username }
    })
    res.json(user);
}

// Follow a user
// Unfollow a user