module.exports = (express, app) => {
    const controller = require("../test.controllers/post.controller.js");
    const router = express.Router();

    // Select all posts
    router.get("/all", controller.allPosts);

    // Create a post
    router.post("/", controller.createPost);

    // Select all posts by a username
    router.get("/select/:username", controller.allPostByUser);

    // Delete a post by username
    router.delete("/deletePostByUsername/:username", controller.deletePostByUsername);

    // Delete a post by post ID
    router.delete("/deletePostByPostID/:postID", controller.deletePostByPostID);

    // Update a post
    router.put("/updatePost/:postID/:image/:content", controller.updatePostByPostID);

    // Add routes to server
    app.use("/api/posts", router);

}