const { DataTypes, Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const sequelize = require('../config/db.conf');

const FormField = sequelize.define('FormField', {
    field_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    form_id: {
        type: DataTypes.CHAR,
        allowNull: false,
    },
    field_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    field_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    field_type: {
        type: DataTypes.ENUM(
            'short text', 'long text', 'number',
            'date', 'multiple choice', 'yes/no',
            'dropdown', 'checkbox', 'rating',
            'scale', 'file'
        ),
        allowNull: false,
    },
    field_value: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    validation: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    is_required: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: 'form_fields',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    deletedAt: false,
    paranoid: false
});

FormField.associate = (models) => {
    FormField.belongsTo(models.Form, {
        foreignKey: 'form_id',
        as: 'form'
    });

    FormField.hasMany(models.FormResponse, {
        foreignKey: 'field_id',
        as: 'responses'
    });
};

module.exports = FormField;