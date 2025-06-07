exports.renderDashboard = async (req, res) => {
    try {
        res.render('pages/form/form', {
            title: 'Form Dashboard | Optimal Form Builder'
        });
    } catch (err) {
        res.status(404).json({
            status: 404,
            error: err.message
        });
    }
}

exports.renderNewForm = async (req, res) => {
    try {
        res.render('pages/form/new_form', {
            title: 'Create New Form | Optimal Form Builder'
        });
    } catch (err) {
        res.status(404).json({
            status: 404,
            error: err.message
        });
    }
}

exports.renderNewUser = async (req, res) => {
    try {
        res.render('pages/user/new_user', {
            title: 'Add New User | Optimal Form Builder'
        });
    } catch (err) {
        res.status(404).json({
            status: 404,
            error: err.message
        });
    }
}

exports.renderFormResponse = async (req, res) => {
    try {
        res.render('pages/response/index', {
            title: 'Form Responses Dashboard | Optimal Form Builder'
        });
    } catch (err) {
        res.status(404).json({
            status: 404,
            error: err.message
        });
    }
}