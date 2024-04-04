const yup = require('yup');

const publicationValidator = {
    creation: yup.object({
        title: yup.string().min(5).max(50).required(),
        content: yup.string().min(5).max(500).required(),
    }),

    delete: yup.object({
        id_publication: yup.number().positive().required(),
    }),

};

module.exports = publicationValidator;