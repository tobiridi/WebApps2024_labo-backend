const jwt = require('jsonwebtoken');

const authMiddleware = {
    createToken : (idUser, email) => {
        const payload = {
            id_user: idUser,
            email: email
        };

        const options = {
            //expiresIn : '10m'
            expiresIn : '1d'
        };

        return jwt.sign(payload, process.env.SECRET, options);
    },

    verifyToken : async (req, res, next) => {
        const headers = req.headers;
        if (!headers.authorization) {
            return res.sendStatus(401);
        }

        //get token from headers
        const token = headers.authorization.split(' ')[1];
        
        jwt.verify(token, process.env.SECRET, (error, payload) => {
            if(error) {
                console.error(error);
                return res.sendStatus(403);
            }
            else {
                //set payload in request, easily access
                req.payload = payload;
                next();
            }
        });
    },

    getTokenPayload: (cookie) => {
        const token = cookie.split(' ')[1];
        return jwt.decode(token);
    }
};

module.exports = authMiddleware;