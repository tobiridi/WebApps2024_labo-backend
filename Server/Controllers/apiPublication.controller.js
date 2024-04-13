const authMiddleware = require("../Middlewares/auth.middleware");
const publicationService = require("../Services/publication.service");
const publicationValidator = require('../Validators/publication.validator');
const userValidator = require('../Validators/user.validator');

const apiPublicationController = {
    getAllPost : async (req, res, next) => {
        try {
            const dbResult = await publicationService.getAllPost();
    
            if (dbResult) {
                return res.status(200).json({data: dbResult});
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    },

    publishNewPost : async (req, res, next) => {
        try {
            //validate form data
            const validData = await publicationValidator.creation.validate(req.body);
            const id_user = req.payload.id_user;

            const dbResult = await publicationService.publishNewPost(id_user, validData);
    
            if (dbResult) {
                return res.status(201).json({message: `publication created`});
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    },

    deletePost : async (req, res, next) => {
        try {
            //validate form data
            const {id_publication} = await publicationValidator.delete.validate(req.params);
            const id_user = req.payload.id_user;

            const dbResult = await publicationService.deletePost(id_publication, id_user);
    
            if (dbResult) {
                return res.sendStatus(204);
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: error.message});
        }
    },

    writeCommentary : async (req, res, next) => {
        res.sendStatus(501);
    },
};


module.exports = apiPublicationController;