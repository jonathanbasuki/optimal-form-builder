const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.conf');

const User = require('./User.model')(sequelize, DataTypes);
const UserRefreshToken = require('./UserRefreshToken.model')(sequelize, DataTypes);
const Form = require('./Form.model')(sequelize, DataTypes);
const FormField = require('./FormField.model')(sequelize, DataTypes);
const FormResponse = require('./FormResponse.model')(sequelize, DataTypes);

const models = {
    User,
    UserRefreshToken,
    Form,
    FormField,
    FormResponse
};

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

module.exports = {
    sequelize,
    Sequelize,
    ...models
};
