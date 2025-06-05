const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Form = sequelize.define('Form', {
        form_id: {
            type: DataTypes.CHAR,
            primaryKey: true,
            defaultValue: () => uuidv4(),
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subtitle: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        confirmation_message: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        confirmation_action: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_open: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        created_by: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updated_by: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: 'forms',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: false,
    });

    // Define associations
    Form.associate = (models) => {
        Form.hasMany(models.FormField, {
            foreignKey: 'form_id',
            as: 'fields',
        });

        Form.hasMany(models.FormResponse, {
            foreignKey: 'form_id',
            as: 'responses',
        });
    };

    return Form;
};
