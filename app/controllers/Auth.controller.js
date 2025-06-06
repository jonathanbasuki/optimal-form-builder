const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.renderLogin = async (req, res) => {
    try {
        res.render('auth/login');
    } catch (err) {
        res.status(404).json({
            status: 404,
            error: err.message
        });
    }
}

// Login handler
exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        where: { username }
    });

    if (!user) {
        return res.redirect('/auth/login');
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
        return res.redirect('/auth/login');
    }

    // Save session
    req.session.user = {
        id: user.user_id,
        username: user.username,
        role: user.role
    };

    res.redirect('/dashboard');
};

// Logout handler
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Logout failed' });

        res.clearCookie('connect.sid');
        res.redirect('/auth/login');
    });
};
