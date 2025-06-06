const { v4: uuidv4 } = require('uuid');

const { Form, FormField } = require('../models');

// Create new form
exports.createFormWithFields = async (formData) => {
    const formId = uuidv4();

    const t = await Form.sequelize.transaction();

    try {
        const form = await Form.create({
            form_id: formId,
            title: formData.title,
            subtitle: formData.subtitle,
            confirmation_message: formData.confirmation_message,
            confirmation_action: formData.confirmation_action,
            is_open: formData.is_open,
            created_by: formData.created_by,
            created_at: new Date()
        }, { transaction: t });

        const fieldsPayload = formData.fields.map(field => ({
            form_id: formId,
            field_name: field.field_name,
            field_type: field.field_type,
            field_value: field.field_value,
            validation: field.validation,
            is_required: field.is_required,
            created_at: new Date()
        }));

        await FormField.bulkCreate(fieldsPayload, { transaction: t });

        await t.commit();

        return {
            form_id: form.form_id,
            title: form.title,
            updated_by: form.updated_by,
            updated_at: form.updated_at
        };
    } catch (err) {
        await t.rollback();

        throw err;
    }
}

// Get all forms
exports.getAllForms = async () => {
    return await Form.findAll({
        attributes: ['form_id', 'title', 'is_open', 'updated_at']
    })
}

// Get form details
exports.getFormWithFields = async (form_id) => {
    try {
        const form = await Form.findOne({
            where: { form_id },
            include: [{
                model: FormField,
                as: 'fields',
                attributes: ['field_id', 'field_name', 'field_type', 'field_value', 'validation', 'is_required']
            }]
        });

        if (!form) {
            throw new Error('Form not found!');
        }

        return {
            form_id: form.form_id,
            title: form.title,
            subtitle: form.subtitle,
            confirmation_message: form.confirmation_message,
            confirmation_action: form.confirmation_action,
            is_open: form.is_open,
            fields: form.fields,
            updated_at: form.updated_at
        };
    } catch (err) {
        throw err;
    }
};

// Update form and related fields
exports.updateFormWithFields = async (form_id, formData) => {
    const t = await Form.sequelize.transaction();

    try {
        const form = await Form.findOne({
            where: { form_id }
        });

        if (!form) throw new Error("Form not found!");

        await form.update({
            title: formData.title,
            subtitle: formData.subtitle,
            confirmation_message: formData.confirmation_message,
            confirmation_action: formData.confirmation_action,
            is_open: formData.is_open,
            updated_at: new Date(),
            updated_by: formData.updated_by
        }, { transaction: t });

        await FormField.destroy({
            where: { form_id },
            transaction: t
        });

        const fieldsPayload = formData.fields.map(field => ({
            form_id,
            field_name: field.field_name,
            field_type: field.field_type,
            field_value: field.field_value,
            validation: field.validation,
            is_required: field.is_required,
            created_at: new Date()
        }));

        await FormField.bulkCreate(fieldsPayload, { transaction: t });

        await t.commit();

        return {
            form_id: form.form_id,
            title: form.title,
            updated_at: form.updated_at
        };
    } catch (err) {
        await t.rollback();

        throw err;
    }
};

// Delete form and related fields
exports.deleteFormWithFields = async (form_id) => {
    const t = await Form.sequelize.transaction();

    try {
        await FormField.destroy({
            where: { form_id },
            transaction: t
        });

        const deleted = await Form.destroy({
            where: { form_id },
            transaction: t
        });

        if (deleted === 0) {
            throw new Error('Form not found or already deleted');
        }

        await t.commit();

        return { message: 'Form and related fields deleted successfully' };
    } catch (err) {
        await t.rollback();

        throw err;
    }
};
