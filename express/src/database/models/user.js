module.exports = (sequelize, DataTypes) => 
    sequelize.define("user", {
        username: {
            type: DataTypes.STRING(50),
            primaryKey: true
        },
        hashed_password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING(30),
            allowNull: false
        }, 
        last_name: {
            type: DataTypes.STRING(30),
            allowNull: false
        }, 
        profile_picture: {
            type: DataTypes.BLOB,
            allowNull: true
        },
        following: {
            type: DataTypes.ARRAY(DataTypes.STRING(50)),
            allowNull: false,
            defaultValue: 0
        }, 
        followers: {
            type: DataTypes.ARRAY(DataTypes.STRING(50)),
            allowNull: false,
            defaultValue: 0
        }
    }, { 
        timestamps: true,
        createdAt: "joined_timestamp",
        updatedAt: "updated_timestamp"
    })