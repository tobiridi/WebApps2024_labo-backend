const userValidator = require('../Validators/user.validator');
const authMiddleware = require('../Middlewares/auth.middleware');
const cookieMiddleware = require("../Middlewares/cookie.middleware");

const userController = {
    register : async (req, res, next) => {
        console.log(`[${req.path} - ${req.method}]`);
        res.render('register', {});
    },

    login : async (req, res, next) => {
        console.log(`[${req.path} - ${req.method}]`);
        res.render('login', {});
    },

    profile : async (req, res, next) => {
        console.log(`[${req.path} - ${req.method}]`);
        res.render('profile', {});

        // try {
            //const payload = authMiddleware.getTokenPayload(req.cookies.access_token);
            // const headers = {
            //     'Content-Type': 'application/json',
            //     'Authorization': `${req.cookies.access_token}`
            // };

            //const apiResponse = await callAPI(`/user/${payload.id_user}`, 'GET', null, headers);

            // if (apiResponse) {
            //     res.render('profile', apiResponse);
            // }

        // } catch (error) {
        //     console.error(error);
        //     res.redirect('/login');
        // }
        // try {
        //     //validate form data
        //     //const validData = await userValidator.updateProfile.validate(req.body);
        //     const payload = authMiddleware.getTokenPayload(req.cookies.access_token);
        //     const headers = {
        //         'Content-Type': 'application/json',
        //         'Authorization': `${req.cookies.access_token}`
        //     };

        //     //const apiResponse = await callAPI(`/user/${payload.id_user}`, 'PUT', validData, headers);
        //     // if (apiResponse) {
        //     //     res.render('profile', { message: 'Profile mis à jour' });
        //     // }
        // } catch (error) {
        //     console.error(error);
        //     res.redirect('/');
        // }
    },

    deleteProfile: async (req, res, next) => {
        try {
            const payload = authMiddleware.getTokenPayload(req.cookies.access_token);
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `${req.cookies.access_token}`
            };

            //const apiResponse = await callAPI(`/user/${payload.id_user}`, 'DELETE', null, headers);
            if (apiResponse) {
                //clear cookie
                res.clearCookie('access_token');
                res.render('home', { message: 'Profile supprimer' });
            }

        } catch (error) {
            console.error(error);
            res.redirect('/');
        }
    },
};

module.exports = userController;