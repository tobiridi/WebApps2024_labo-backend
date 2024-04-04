const yup = require('yup');

const userValidator = {
    register: yup.object({
        email: yup.string().min(10).max(100).required(),
        password: yup.string().min(5).max(50).required(),
        firstname: yup.string().min(3).max(100),
        lastname: yup.string().min(3).max(100),
        //profile_img : yup.object(),
    }),

    login: yup.object({
        email: yup.string().min(10).max(100).required(),
        password: yup.string().min(5).max(50).required(),
    }),

    updateProfile: yup.object({
        password: yup.string().min(5).max(50),
        firstname: yup.string().min(3).max(100),
        lastname: yup.string().min(3).max(100),
        //profile_img : yup.object(),
    }),

    idUser: yup.object({
        id: yup.string().uuid().required()
    }),
};

module.exports = userValidator;