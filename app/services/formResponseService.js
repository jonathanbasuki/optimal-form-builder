const { v4: uuidv4 } = require('uuid');

const { FormField, FormResponse, Form } = require('../models');

// Add new response
exports.addFormResponse = async (formData) => {
    const responseId = uuidv4();

    const t = await FormResponse.sequelize.transaction();

    try {
        const response = formData.answers.map((answer) => ({
            form_id: formData.form_id,
            field_id: answer.field_id,
            response_id: responseId,
            response_value: answer.response_value,
            response_type: answer.response_type
        }));

        await FormResponse.bulkCreate(response, { transaction: t });

        await t.commit();

        return {
            form_id: formData.form_id,
            response_id: responseId,
            created_at: new Date()
        };
    } catch (err) {
        await t.rollback();

        throw err;
    }
}

// Get form responses
exports.getAllFormResponses = async (form_id, page = 1, limit = 1) => {
    const allResponseIds = await FormResponse.findAll({
        where: { form_id },
        attributes: ['response_id', 'created_at'],
        group: ['response_id', 'created_at']
    });

    const total = allResponseIds.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;

    const selected = allResponseIds.slice(offset, offset + limit);

    if (selected.length === 0) {
        return {
            page,
            total_pages: totalPages,
            responses: []
        };
    }

    const responseIds = selected.map(r => r.response_id);

    const responses = await FormResponse.findAll({
        where: {
            form_id,
            response_id: responseIds
        },
        include: [
            {
                model: FormField,
                as: 'field',
                attributes: ['field_name']
            },
            {
                model: Form,
                as: 'form',
                attributes: ['title']
            }
        ],
    });

    const grouped = {};

    responses.forEach(response => {
        const rid = response.response_id;

        if (!grouped[rid]) {
            grouped[rid] = {
                form_id,
                title: response.form.title,
                response_id: rid,
                answers: [],
                created_at: response.created_at
            };
        }

        grouped[rid].answers.push({
            field_id: response.field_id,
            field_name: response.field.field_name,
            response_value: response.response_value,
            response_type: response.response_type
        });
    });

    return {
        page,
        total_pages: totalPages,
        responses: Object.values(grouped)
    };
};

// Get form response detail
exports.getFormResponseDetail = async (response_id) => {
    const responses = await FormResponse.findAll({
        where: { response_id },
        attributes: ['form_id', 'response_id', 'field_id', 'response_value', 'response_type', 'created_at'],
        include: [{
            model: FormField,
            as: 'field',
            attributes: ['field_name']
        }]
    });

    if (responses.length === 0) {
        return null;
    }

    const { form_id, created_at } = responses[0];

    const answers = responses.map(response => ({
        field_id: response.field_id,
        field_name: response.field?.field_name || null,
        response_value: response.response_value,
        response_type: response.response_type
    }));

    return {
        form_id,
        response_id,
        answers,
        created_at
    };
};

// Delete form response
exports.deleteFormResponse = async (response_id) => {
    const t = await FormResponse.sequelize.transaction();

    try {
        await FormResponse.destroy({
            where: { response_id },
            transaction: t
        });

        await t.commit();

        return { message: 'Form response deleted successfully' };
    } catch (err) {
        await t.rollback();

        throw err;
    }
};
