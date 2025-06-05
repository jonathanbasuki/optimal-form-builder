const bcrypt = require('bcryptjs');
const { DataTypes, Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const sequelize = require('../config/db.conf');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.CHAR,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email_address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('superuser', 'admin'),
        defaultValue: 'superuser',
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
    paranoid: false
});

User.associate = (models) => {
    User.hasMany(models.UserRefreshToken, {
        foreignKey: 'user_id',
        as: 'tokens'
    });
}

module.exports = User;