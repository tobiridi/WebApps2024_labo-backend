const apiPublicationRouter = require('express').Router();
const apiPublicationController = require('../Controllers/apiPublication.controller');
const authMiddleware = require('../Middlewares/auth.middleware');

apiPublicationRouter.route('/')
    .get(apiPublicationController.getAllPost)
    .post(authMiddleware.verifyToken, apiPublicationController.publishNewPost)

apiPublicationRouter.route('/:id')
    .get(authMiddleware.verifyToken, apiPublicationController.getPost)

apiPublicationRouter.route('/:id_publication')
    .delete(authMiddleware.verifyToken, apiPublicationController.deletePost)

apiPublicationRouter.route('/:id/commentary/add')
    .post(authMiddleware.verifyToken, apiPublicationController.writeCommentary)

module.exports = apiPublicationRouter;