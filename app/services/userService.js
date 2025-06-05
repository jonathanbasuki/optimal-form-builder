const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const { User } = require('../models');

// Create user
User.createUser = async ({ username, email_address, password }) => {
    const userId = uuidv4();
    const hashed = await bcrypt.hash(password, 16);

    return User.create({ user_id: userId, username, email_address, password_hash: hashed });
};

// Get user list
User.getAllUsers = async () => {
    return await User.findAll({
        attributes: ['username', 'email_address', 'role', 'created_at']
    });
};

// Get user by username/email
User.getUserDetail = async (identifier) => {
    return await User.findOne({
        attributes: ['user_id', 'username', 'email_address', 'role', 'updated_at'],
        where: {
            [Op.or]: [
                { user_id: identifier },
                { username: identifier }
            ]
        }
    });
};

// Update user
User.updateUser = async (user_id, { username, email_address, new_password }) => {
    const hashed = await bcrypt.hash(new_password, 16);

    const [updated] = await User.update(
        {
            username,
            email_address,
            password_hash: hashed
        },
        {
            where: {
                user_id,
            }
        }
    );

    if (!updated) return null;

    return await User.findByPk(user_id, {
        attributes: ['email_address', 'updated_at']
    });
};

// Delete user
User.deleteUser = async (user_id) => {
    return await User.destroy({
        where: {
            user_id
        }
    });
};

module.exports = User;