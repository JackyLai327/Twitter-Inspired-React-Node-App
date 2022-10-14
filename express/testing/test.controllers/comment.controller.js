const db = require("../test.database");

// Select all comments by a user
exports.allCommentsByUser = async (req, res) => {
    const comment = await db.comment.findAll({
        include: db.user,
        where: { username: req.query.username }
    });
    res;
};

// Select all posts by a user
exports.allCommentByPost = async (req, res) => {
    console.log(req.params);
    const comment = await db.comment.findAll({
        raw: true,
        where: { postByUser: req.params.postID }
    });
    return comment;
};

// Create a comment
exports.createComment = async (req, res) => {
    console.log(req.body);
    const comment = await db.comment.create({
        content: req.body.content,
        username: req.body.user.username,
        postByUser: req.body.post.post_id
    });
    return comment;
};

// Delete Comment
exports.deleteComment = async (req, res) => {
    const comment = await db.comment.destroy({
        where: { comment_id: req.body.commentID }
    });
    return comment;
};

// Update Comment
exports.updateComment = async (req, res) => {
    const comment = await db.comment.update({
        content: req.body.content
    }, {
        where: { comment_id: req.body.username }
    });
    return comment;
};

// Get All Comments
exports.getAllComments = async (req, res) => {
    const comments = await db.comment.findAll({
        raw: true
    });
    return comment;
}