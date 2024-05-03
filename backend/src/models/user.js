const { DataTypes } = require('sequelize');
const sequelize = require('../db.connection'); // Import Sequelize instance

// Define the User model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

// Sync the model with the database
(async () => {
    await User.sync();
    console.log("User model successfully synced with database");
})();

module.exports = User;
