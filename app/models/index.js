const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../config/db.conf');

const User = require('./User.model')(sequelize, DataTypes);
const UserRefreshToken = require('./UserRefreshToken.model')(sequelize, DataTypes);
const Form = require('./Form.model')(sequelize, DataTypes);
const FormField = require('./FormField.model')(sequelize, DataTypes);
const FormResponse = require('./FormResponse.model')(sequelize, DataTypes);

// Setup association
User.associate({ UserRefreshToken });
UserRefreshToken.associate({ User });

Form.associate({ FormField });
Form.associate({ FormResponse });

FormField.associate({ Form });
FormField.associate({ FormResponse });

FormResponse.associate({ Form });
FormResponse.associate({ FormField });

module.exports = {
    sequelize,
    User,
    UserRefreshToken,
    Form,
    FormField,
    FormResponse
};
