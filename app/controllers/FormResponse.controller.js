const formResponseService = require('../services/formResponseService');

// Create response
exports.addFormResponse = async (req, res) => {
    try {
        const result = await formResponseService.addFormResponse(req.body);

        return res.status(201).json({
            status: 201,
            message: 'Responses added successfully!',
            page: result.page,
            total_pages: result.total_pages,
            data: result.responses
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: error.message
        });
    }
};

// Get all form responses
exports.getAllFormResponses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 1;

        const result = await formResponseService.getAllFormResponses(req.params.form_id, page, limit);

        res.status(200).json({
            status: 200,
            message: 'Form responses fetched successfully!',
            data: {
                page: result.page,
                total_pages: result.total_pages,
                responses: result.responses
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
}

// Get response details answer
exports.getFormResponseDetail = async (req, res) => {
    try {
        const result = await formResponseService.getFormResponseDetail(req.params.response_id);

        if (!result) return res.status(404).json({
            status: 404,
            message: 'Form response not found.'
        });

        res.status(200).json({
            status: 200,
            message: 'Response answers fetched successfully!',
            data: result
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
}

// Update form
exports.updateFormResponse = async (req, res) => {
    // try {
    //     const result = await formResponseService.updateFormResponse(req.params.form_id, req.body);

    //     return res.status(201).json({
    //         status: 200,
    //         message: 'Form and fields updated successfully!',
    //         data: result
    //     });
    // } catch (error) {
    //     return res.status(500).json({
    //         status: 500,
    //         error: error.message
    //     });
    // }
};

// Delete form and related fields
exports.deleteFormResponse = async (req, res) => {
    try {
        const deletedResponse = await formResponseService.deleteFormResponse(req.params.response_id);

        if (!deletedResponse) {
            return res.status(404).json({
                status: 404,
                message: 'Form response not found.'
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Form response deleted successfully!'
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: err.message
        });
    }
}