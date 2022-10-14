// Imports
const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
    Op: Sequelize.Op
};

// Create a Sequelize instance
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
});

// Create schema
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.comment = require("./models/comment.js")(db.sequelize, DataTypes);

// Create Cardinalities among tables
db.post.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false} });
db.comment.belongsTo(db.user, { foreignKey: { name: "username", allowNull: false } });
db.comment.belongsTo(db.post, { foreignKey: { name: "postByUser", allowNull: false }});

db.sync = async () => {
    // sync tables
    await db.sequelize.sync();
    // add seed data into tables
    await seedData();
};

async function seedData() {     // import seed data into tables
    const count = await db.user.count();
    if (count > 0) return;      // if there are some data, don't insert

    const argon2 = require("argon2");

    let hashedPassword = await argon2.hash("TestPass123123", { type:argon2.argon2id });
    await db.user.create({
        username: "jacky@gmail.com",
        hashed_password: hashedPassword,
        first_name: "Jacky",
        last_name: "Lai"
    })
    hashedPassword = await argon2.hash("TestPass321321", { type:argon2.argon2id });
    await db.user.create({
        username: "a@a.a",
        hashed_password: hashedPassword,
        first_name: "AAA",
        last_name: "aaa"
    })
};

module.exports = db;