const userService = require("../Services/user.service");
const userValidator = require('../Validators/user.validator');
const authMiddleware = require('../Middlewares/auth.middleware');
const bcrypt = require('bcrypt');

const apiUserController = {
    register : async (req, res, next) => {
        try {
            const {firstname, lastname, email, password} = await userValidator.register.validate(req.body);

            const hashedPassword = bcrypt.hashSync(password, 10);
            
            const dbResult = await userService.register({ email, hashedPassword, firstname, lastname });

            if (dbResult) {
                return res.status(201).json({ message: `user created` });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    },

    login : async (req, res, next) => {
        try {
            const {email, password} = await userValidator.login.validate(req.body);

            const user = await userService.login(email);

            if(user) {
                //check if password is the same
                if (bcrypt.compareSync(password, user.password)) {
                    //create jwt token
                    const token = authMiddleware.createToken(user.id, email);
                    
                    return res.status(200).json({data: {userId:user.id, token: token}});
                }
                else {
                    return res.status(403).json({ message: `email or password are wrong` });
                }
            }
            else {
                return res.status(403).json({ message: `user not found` });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    },

    //TODO: optimize
    updateProfile : async (req, res, next) => {
        try {
            const {firstname, lastname, password} = await userValidator.updateProfile.validate(req.body);
            const {id} = await userValidator.idUser.validate(req.params);
            
            let hashedPassword;
            if (password) {
                //hash password before update
                hashedPassword = bcrypt.hashSync(password, 10);
            }
            console.log('before update');
            const dbResult = await userService.updateProfile(id, {firstname, lastname, hashedPassword});

            if (dbResult) {
                return res.status(201).json({ message: `user has been modified` });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    },

    deleteProfile : async (req, res, next) => {
        try {
            const {id} = await userValidator.idUser.validate(req.params);

            const dbResult = await userService.deleteProfile(id);

            if (dbResult) {
                return res.sendStatus(204);
            }
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    },

    followUser : async (req, res, next) => {
        try {
            //id user followed
            const {id} = await userValidator.idUser.validate(req.params);
            //jwt payload
            const payload = req.payload;

            const dbResult = await userService.followUser(payload.id_user, id);

            if (dbResult) {
                return res.status(201).json({ message: `user ${id} is now followed` });
            }
            else {
                return res.status(404).json({ message: `user ${id} not found` });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    },

    getUserData: async (req, res, next) => {
        try {
            const {id} = await userValidator.idUser.validate(req.params);
            //get user with follwing user, own post, ...
            const userData = await userService.getUser(id);

            if(userData) {
                return res.status(200).json({data: userData});
            }
            else {
                return res.status(404).json({ message: `user ${id} not found` });
            }
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    }
};

module.exports = apiUserController;