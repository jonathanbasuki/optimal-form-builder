const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { layout } = require('ejs-mate');

exports.renderLogin = async (req, res) => {
    try {
        res.render('auth/login', {
            layout: false
        });
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

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).render('auth/login', {
                error: 'Invalid username or password'
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return res.status(401).render('auth/login', {
                error: 'Invalid username or password'
            });
        }

        // Save session
        req.session.user = {
            id: user.user_id,
            username: user.username,
            role: user.role
        };

        res.redirect('/dashboard/forms');
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).render('login', {
            error: 'Internal server error'
        });
    }
};

// Logout handler
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Logout failed' });

        res.clearCookie('connect.sid');
        res.redirect('/auth/login');
    });
};
