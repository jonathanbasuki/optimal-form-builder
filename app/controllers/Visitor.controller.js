const { layout } = require('ejs-mate');
const formService = require('../services/formService');

// Rendering 
exports.renderForm = async (req, res) => {
    try {
        const form = await formService.getFormWithFields(req.params.form_id);

        if (!form || !form.fields || form.fields.length === 0) {
            return res.status(404).json({
                status: 404,
                error: "Form not found or no longer accepting responses!"
            });;
        }

        res.render('form/index', {
            formData: {
                form_id: form.form_id,
                title: form.title,
                subtitle: form.subtitle,
                fields: form.fields,
                confirmation_message: form.confirmation_message,
                confirmation_action: form.confirmation_action,
                is_open: form.is_open,
            },
            layout: false
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
};
