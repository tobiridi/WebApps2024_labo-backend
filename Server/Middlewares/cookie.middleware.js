//required to install "cookie-parser" module
const cookieParser = require('cookie-parser');
const authMiddleware = require('./auth.middleware');

/**
 * see https://expressjs.com/en/4x/api.html#res.cookie
 */
const cookieMiddleware = {
    verifyCookie: (req, res, next) => {
        const access_token = req.cookies.access_token;
        if (!access_token) {
            //return res.sendStatus(401);
            return res.redirect(401, '/login');
        }
        
        next();
    },

};

module.exports = cookieMiddleware;