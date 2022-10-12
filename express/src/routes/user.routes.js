module.exports = (express, app) => {
    const controller = require("../controllers/user.controller.js");
    const router = express.Router();

    // Select all users
    router.get("/", controller.allUsers);

    // Select a user with username
    router.get("/select/:username", controller.getUser);

    // Login a user
    router.get("/login", controller.login);

    // Create a user
    router.post("/", controller.createUser);

    // Delete a user
    router.delete("/delete/:username", controller.deleteUser);

    // Update a user's first name
    router.put("/updateFName/:username/:firstName", controller.updateFirstName);

    // Update a user's last name
    router.put("/updateLName/:username/:lastName", controller.updateLastName);

    // Update a user's profile picture
    router.put("/updatePFP/:username", controller.updateProfilePicture);

    // Follow a user
    // Unfollow a user

    // Add routes to server
    app.use("/api/users", router);
}