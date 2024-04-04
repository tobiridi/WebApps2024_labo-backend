const userValidator = require('../Validators/user.validator');
const authMiddleware = require('../Middlewares/auth.middleware');
const { callAPI } = require("../Utils/callAPI");
const cookieMiddleware = require("../Middlewares/cookie.middleware");

const userController = {
    register : (req, res, next) => {
        console.log(`[${req.path} - ${req.method}]`);
        if(req.method === 'GET') {
            res.render('register', {});
        }
        else if (req.method === 'POST') {
            try {
                (async () => {
                    //validate form data
                    const validData = await userValidator.register.validate(req.body);
                    const apiResponse = await callAPI('/user', 'POST', validData);

                    if(apiResponse) {
                        res.render('register', {message: `L'inscription a bien été effectuée`});
                    }
                })();
            } catch (error) {
                console.error(error);
                res.redirect('/register');
            }
        }
    },

    login : (req, res, next) => {
        console.log(`[${req.path} - ${req.method}]`);
        if(req.method === 'GET') {
            res.render('login', {});
        }
        else if (req.method === 'POST') {
            try {
                (async () => {
                    //validate form data
                    const validData = await userValidator.login.validate(req.body);
                    const apiResponse = await callAPI('/user/login', 'POST', validData);
                    console.log(apiResponse);

                    if(apiResponse.token) {
                        res.cookie('access_token', `Bearer ${apiResponse.token}`, cookieMiddleware.defaultCookieOptions)
                            .redirect('/profile')
                    }
                    else {
                        return res.send('email ou mot de passe incorrecte');
                    }
                })();
            } catch (error) {
                console.error(error);
                res.redirect('/login');
            }
        }
    },

    profile : (req, res, next) => {
        console.log(`[${req.path} - ${req.method}]`);
        if(req.method === 'GET') {
            try {
                (async () => {
                    const payload = authMiddleware.getTokenPayload(req.cookies.access_token);
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `${req.cookies.access_token}`
                    };

                    const apiResponse = await callAPI(`/user/${payload.id_user}`, 'GET', null, headers);

                    if (apiResponse) {
                        res.render('profile', apiResponse);
                    }
                    
                })();
            } catch (error) {
                console.error(error);
                res.redirect('/register');
            }
        }
        else if (req.method === 'POST') {
            try {
                (async () => {
                    //validate form data
                    const validData = await userValidator.updateProfile.validate(req.body);
                    const payload = authMiddleware.getTokenPayload(req.cookies.access_token);
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `${req.cookies.access_token}`
                    };

                    const apiResponse = await callAPI(`/user/${payload.id_user}`, 'PUT', validData, headers);
                    if (apiResponse) {
                        res.render('profile', {message: 'Profile mis à jour'});
                    }
                })();
            } catch (error) {
                console.error(error);
                res.redirect('/');
            }
        }
    },
};

module.exports = userController;