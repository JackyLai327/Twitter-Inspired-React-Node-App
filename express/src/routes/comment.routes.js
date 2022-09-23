module.exports = (express, app) => {
    const controller = require("../controllers/comment.controller.js");
    const router = express.Router();

    // Select all comment by a user
    router.get("/select/:username", controller.allCommentsByUser);

    // Select all comment under a post
    router.get("/select/:postID", controller.allCommentByPost);

    // Create a comment
    router.post("/", controller.createComment);

    // Delete a comment
    // Update a comment

    // Add routes to server
    app.use("api/comments", router)
}