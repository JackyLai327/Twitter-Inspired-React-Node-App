const db = require("../database");

// Select all posts
exports.allPosts = async (req, res) => {
    const posts = await db.post.findAll({
        include: db.user,
        raw: true});
    res.json(posts);
};

// Create a post
exports.createPost = async (req, res) => {
    console.log(req.body.image);
    const post = await db.post.create({
        username: req.body.username,
        content: req.body.content,
        image: req.body.image
    });
    res.json(post);
};

// Get all posts from a user
exports.allPostByUser = async (req, res) => {
    const posts = await db.post.findAll({
        raw: true,
        include: db.user,
        where: { username: req.params.username}});
    res.json(posts);
};

// Delete a post by username
exports.deletePostByUsername = async (req, res) => {
    const post = await db.post.destroy({
        where: { username: req.params.username }
    });
    res.json(post);
};

// Delete a post by post ID
exports.deletePostByPostID = async (req, res) => {
    console.log(req.params);
    const post = await db.post.destroy({
        where: { post_ID: req.params.postID }
    });
    res.json(post);
}

// Update a post
exports.updatePostByPostID = async (req, res) => {
    console.log(req.params);
    const post = await db.post.update({
        content: req.params.content,
        image: null
    }, {
        where: { post_ID: req.params.postID }
    });
    res.json(post);
};