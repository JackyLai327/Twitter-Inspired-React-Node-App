const db = require("../database");

// Select all comments by a user
exports.allCommentsByUser = async (req, res) => {
    const comment = await db.comment.findAll({
        include: db.user,
        where: { username: req.query.username }
    });
    res.json(comment);
};

// Select all posts by a user
exports.allCommentByPost = async (req, res) => {
    const comment = await db.comment.findAll({
        include: db.post,
        where: { post_id: req.query.postId }
    });
    res.json(comment);
};

// Create a comment
exports.createComment = async (req, res) => {
    const comment = await db.comment.create({
        content: req.body.content
    });
    res.json(comment);
};

// Delete Comment
exports.deleteComment = async (req, res) => {
    const comment = await db.comment.destroy({
        where: { comment_id: req.body.commentID }
    });
    res.json(comment);
};

// Update Comment
exports.updateComment = async (req, res) => {
    const comment = await db.comment.update({
        content: req.body.content
    }, {
        where: { comment_id: req.body.username }
    });
    res.json(comment);
};