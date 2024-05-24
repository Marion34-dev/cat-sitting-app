const { DataTypes } = require('sequelize');
const sequelize = require('@db');

// Define the User model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 30] // Username must be between 3 and 30 characters
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 100] // Password must be between 6 and 100 characters
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true // Email must be a valid email address (@, ., no whitespace characters)
        }
    },
    deletedAt: { // hold the timestamp of deletion or null if not deleted
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    } 
}, {
    paranoid: true // Enable soft deletion
});

// Sync the model with the database
(async () => {
    await User.sync();
    console.log("User model successfully synced with database");
})();

module.exports = User;
