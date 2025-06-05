const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        user_id: {
            type: DataTypes.CHAR,
            primaryKey: true,
            defaultValue: () => uuidv4(),
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
            defaultValue: DataTypes.NOW,
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
        paranoid: false,
    });

    User.associate = (models) => {
        User.hasMany(models.UserRefreshToken, {
            foreignKey: 'user_id',
            as: 'tokens',
        });
    };

    return User;
};