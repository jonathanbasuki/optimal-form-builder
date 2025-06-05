const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const UserRefreshToken = sequelize.define('UserRefreshToken', {
        token_id: {
            type: DataTypes.CHAR,
            primaryKey: true,
            defaultValue: () => uuidv4()
        },
        user_id: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'user_refresh_tokens',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false,
        paranoid: false,
    });

    UserRefreshToken.associate = (models) => {
        UserRefreshToken.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
    };

    return UserRefreshToken;
};