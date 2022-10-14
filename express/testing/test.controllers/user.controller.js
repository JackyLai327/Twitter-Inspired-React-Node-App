const argon2 = require("argon2");
const e = require("express");
const db = require("../test.database");

// Select all users
exports.allUsers = async (req, res) => {
    const user = await db.user.findAll();
    return user;
};

// Get a user
exports.getUser = async (req, res, username) => {
    const user = await db.user.findAll({where: {username: username}});
    return user;
};

// Select one user 
exports.login = async (req, res, username, password) => {
    const user = await db.user.findAll({where: {username: username}});
    console.log(user, "\n", req);
    if (user === null || await argon2.verify(user.hashed_password, password) === false) {
        return null;
    } else return user
};

// Create a user
exports.createUser = async (req, res, username) => {
    if (await db.user.findAll({where:{username: username}})) return null;

    const hashedPassword = await argon2.hash(req.body.password, { type: argon2.argon2id });
    
    const user = await db.user.create({
        username: req.body.username,
        hashed_password: hashedPassword,
        first_name: req.body.firstName,
        last_name: req.body.lastName
    });
    return user;
};

// Delete a user
exports.deleteUser = async (req, res) => {
    const user = await db.user.destroy({ where: { username: req.params.username } });
    return user;
}

// Update a user's first name
exports.updateFirstName = async (req, res, firstName, username) => {
    const user = await db.user.update({
        first_name: firstName
    }, {
        where: { username: username }
    })
    return user;
}

// Update a user's last name
exports.updateLastName = async (req, res, lastName, username) => {
    const user = await db.user.update({
        last_name: lastName
    }, {
        where: { username: username }
    })
    return user;
}

// Update a user's profile picture
exports.updateProfilePicture = async (req, res) => {
    const user = await db.user.update({
        profile_picture: req.body.profilePicture
    }, {
        where: { username: req.body.username }
    })
    return user;
}

// Follow a user
// Unfollow a user