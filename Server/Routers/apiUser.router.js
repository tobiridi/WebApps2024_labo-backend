const apiUserRouter = require('express').Router();
const apiUserController = require('../Controllers/apiUser.controller');
const authMiddleware = require('../Middlewares/auth.middleware');

apiUserRouter.route('/')
    .post(apiUserController.register)
    
apiUserRouter.route('/login')
    .post(apiUserController.login)

apiUserRouter.route('/:id')
    .get(authMiddleware.verifyToken, apiUserController.getUserData)
    .put(authMiddleware.verifyToken, apiUserController.updateProfile)
    .delete(authMiddleware.verifyToken, apiUserController.deleteProfile)





apiUserRouter.route('/follow')
    .post(authMiddleware.verifyToken, apiUserController.followUser)

module.exports = apiUserRouter;