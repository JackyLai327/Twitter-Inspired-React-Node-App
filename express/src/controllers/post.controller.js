const db = require("../database");

// Select all posts
exports.allPosts = async (req, res) => {
    const post = await db.post.findAll();
    res.json(posts);
};

// Create a post
exports.createPost = async (req, res) => {
    const post = await db.post.create({
        content: req.body.content,
        image: req.body.image
    });
    res.json(post);
};

// Get all posts from a user
exports.allPostByUser = async (req, res) => {
    const post = await db.post.findAll({
        include: db.user,
        where: { username: req.query.username } 
    });
    res.json(post);
};

// Delete a post
exports.deletePost = async (req, res) => {
    const post = await db.post.destroy({
        where: { postID: req.body.postID }
    });
    res.json(post);
};

// Update a post
exports.updatePost = async (req, res) => {
    const post = await db.post.update({
        content: req.body.content
    }, {
        where: { postID: req.body.postID }
    });
    res.json(post);
};