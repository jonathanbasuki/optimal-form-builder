const userService = require('../services/userService');

exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);

        res.status(201).json({
            status: 201,
            message: 'User registered successfully!',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();

        res.status(200).json({
            status: 200,
            message: 'User data fetched successfully!',
            data: users
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

exports.getUserDetail = async (req, res) => {
    try {
        const user = await userService.getUserDetail(req.params.identifier);

        if (!user) return res.status(404).json({
            status: 404,
            message: 'User not found.'
        });

        res.status(200).json({
            status: 200,
            message: 'User details fetched successfully!',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.user_id, req.body);

        if (!updatedUser) {
            return res.status(404).json({
                status: 404,
                message: 'User not found or no changes made.'
            });
        }

        res.status(200).json({
            status: 200,
            message: 'User detail updated successfully!',
            data: updatedUser
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.user_id);

        if (!deletedUser) {
            return res.status(404).json({
                status: 404,
                message: 'User not found.'
            });
        }

        res.status(200).json({
            status: 200,
            message: 'User data deleted successfully!'
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};