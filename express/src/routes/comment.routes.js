module.exports = (express, app) => {
    const controller = require("../controllers/comment.controller.js");
    const router = express.Router();

    // Select all comment by a user
    router.get("/selectByUsername/:username", controller.allCommentsByUser);

    // Select all comment under a post
    router.get("/selectByPostID/:postID", controller.allCommentByPost);

    // Create a comment
    router.post("/", controller.createComment);

    // Delete a comment
    router.delete("/delete/:commentID", controller.deleteComment);

    // Update a comment
    router.post("/api/users/updateCommentByUser/:commentID", controller.updateComment);

    // Add routes to server
    app.use("api/comments", router)
}