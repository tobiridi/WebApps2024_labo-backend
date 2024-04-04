//required to install "cookie-parser" module
const cookieParser = require('cookie-parser');
const authMiddleware = require('./auth.middleware');

/**
 * see https://expressjs.com/en/4x/api.html#res.cookie
 */
const cookieMiddleware = {
    defaultCookieOptions: {
        //domain: ,
        encode: String,
        //expires: new Date(Date.now() + (1000 * 60 * 60)), //removes in 60 min
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        //path: ,
        //partitioned: ,
        //priority: ,
        secure: false,
        signed: false,
        //sameSite: ,
    },

    verifyCookie: (req, res, next) => {
        const access_token = req.cookies.access_token;
        if (!access_token) {
            //return res.sendStatus(401);
            return res.redirect('/login');
        }
        
        next();
    },

};

module.exports = cookieMiddleware;