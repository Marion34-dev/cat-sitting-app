const { DataTypes } = require('sequelize');
const sequelize = require('@db');
const User = require('@modelUser');

const PetSitter = sequelize.define('PetSitter', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false,
        unique: true
    },
    experience: {
        type: DataTypes.INTEGER, // Years of experience
        allowNull: false
    },
    rate: {
        type: DataTypes.FLOAT, // Hourly rate
        allowNull: false
    },
    bio: {
        type: DataTypes.TEXT, // Short biography
        allowNull: false
    },
    availability: {
        type: DataTypes.JSON, // Store availability as JSON
        allowNull: true
    }
}, {
    paranoid: true // Enable soft deletion
});

// Establish the relationship
User.hasOne(PetSitter, { foreignKey: 'userId' });
PetSitter.belongsTo(User, { foreignKey: 'userId' });

// Sync the model with the database
(async () => {
    await PetSitter.sync();
    console.log("PetSitter model successfully synced with database");
})();

module.exports = PetSitter;
