module.exports = (express, app) => {
    const controller = require("../controllers/post.controller.js");
    const router = express.Router();

    // Select all posts
    router.get("/", controller.allPosts);

    // Create a post
    router.post("/", controller.createPost);

    // Select all posts by a username
    router.get("/select/:username", controller.allPostByUser);

    // Delete a post
    router.delete("/delete/:username", controller.deletePost);

    // Update a post
    router.post("/updatePostUser/:username", controller.updatePost);

    // Add routes to server
    app.use("/api/posts", router);

}