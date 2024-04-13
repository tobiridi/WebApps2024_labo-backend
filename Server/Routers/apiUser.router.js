const apiUserRouter = require('express').Router();
const apiUserController = require('../Controllers/apiUser.controller');
const authMiddleware = require('../Middlewares/auth.middleware');

apiUserRouter.route('/')
    .post(apiUserController.register)


    
    
apiUserRouter.route('/login')
    .post(apiUserController.login)
    
apiUserRouter.route('/:id')
    .put(authMiddleware.verifyToken, apiUserController.updateProfile)
    .delete(authMiddleware.verifyToken, apiUserController.deleteProfile)
    .get(authMiddleware.verifyToken, apiUserController.getUserData)

apiUserRouter.route('/follow')
    .post(authMiddleware.verifyToken, apiUserController.followUser)

module.exports = apiUserRouter;