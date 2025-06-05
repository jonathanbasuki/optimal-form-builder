const { DataTypes, Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const sequelize = require('../config/db.conf');

const FormResponse = sequelize.define('FormResponse', {
    response_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    form_id: {
        type: DataTypes.CHAR,
        allowNull: false,
    },
    field_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    response_value: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    response_type: {
        type: DataTypes.ENUM(
            'short text', 'long text', 'number',
            'date', 'multiple choice', 'yes/no',
            'dropdown', 'checkbox', 'rating',
            'scale', 'file'
        ),
        allowNull: false,
    },
}, {
    tableName: 'form_responses',
    timestamps: false,
    paranoid: false
});

FormResponse.associate = (models) => {
    FormResponse.belongsTo(models.Form, {
        foreignKey: 'form_id',
        as: 'form'
    });

    FormResponse.belongsTo(FormField, {
        foreignKey: 'field_id',
        as: 'field'
    });
}

module.exports = FormResponse;