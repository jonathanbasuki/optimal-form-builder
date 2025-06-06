module.exports = (sequelize, DataTypes) => {
    const FormResponse = sequelize.define('FormResponse', {
        id: {
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
        response_id: {
            type: DataTypes.CHAR,
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
        tableName: 'form_responses',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
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
