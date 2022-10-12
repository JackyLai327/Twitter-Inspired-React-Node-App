const express = require("express");
const cors = require("cors");
const db = require("./src/database");

// Synchronise Database
db.sync();

const app = express();

// Prase requests of content-type - application/json.
app.use(express.json());

// Add CORS support
app.use(cors());

app.get("/", (req, res) => {
    res.json({message: "Welcome!"});
})

// Add user routes
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/post.routes.js")(express, app);
require("./src/routes/comment.routes.js")(express, app);

// Set port, listen for requests
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});