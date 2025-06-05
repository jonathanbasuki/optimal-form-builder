module.exports = (sequelize, DataTypes) => {
    const FormResponse = sequelize.define('FormResponse', {
        response_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
        paranoid: false,
    });

    FormResponse.associate = (models) => {
        FormResponse.belongsTo(models.Form, {
            foreignKey: 'form_id',
            as: 'form',
        });

        FormResponse.belongsTo(models.FormField, {
            foreignKey: 'field_id',
            as: 'field',
        });
    };

    return FormResponse;
};
