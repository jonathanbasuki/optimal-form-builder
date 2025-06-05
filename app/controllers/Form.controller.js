const formService = require('../services/formService');

// Create form
exports.createFormWithFields = async (req, res) => {
    try {
        const result = await formService.createFormWithFields(req.body);

        return res.status(201).json({
            status: 201,
            message: 'Form and fields successfully created!',
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: error.message
        });
    }
};

// Get all form
exports.getAllForms = async (req, res) => {
    try {
        const forms = await formService.getAllForms();

        res.status(200).json({
            status: 200,
            message: 'Form data fetched successfully!',
            data: forms
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
}

// Get form details
exports.getFormWithFields = async (req, res) => {
    try {
        const form = await formService.getFormWithFields(req.params.form_id);

        res.status(200).json({
            status: 200,
            message: 'Form details fetched successfully!',
            data: form
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
}

// Update form
exports.updateFormWithFields = async (req, res) => {
    try {
        const result = await formService.updateFormWithFields(req.params.form_id, req.body);

        return res.status(201).json({
            status: 200,
            message: 'Form and fields updated successfully!',
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: error.message
        });
    }
};

// Delete form and related fields
exports.deleteFormWithFields = async (req, res) => {
    try {
        const deletedForm = await formService.deleteFormWithFields(req.params.form_id);

        if (!deletedForm) {
            return res.status(404).json({
                status: 404,
                message: 'Form not found.'
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Form and fields deleted successfully!'
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
}