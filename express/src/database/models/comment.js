module.exports = (sequelize, DataTypes) => 
    sequelize.define("comment", {
        comment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    }, { 
        timestamps: true,
        createdAt: "created_timestamp",
        updatedAt: "updated_timestamp"
    })