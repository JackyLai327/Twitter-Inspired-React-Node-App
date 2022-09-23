module.exports = (sequelize, DataTypes) => 
    sequelize.define("post", {
        post_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: true
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, { 
        timestamps: true,
        createdAt: "created_timestamp",
        updatedAt: "updated_timestamp"
    })