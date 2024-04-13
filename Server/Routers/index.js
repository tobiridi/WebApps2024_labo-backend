const router = require('express').Router();
const publicationController = require('../Controllers/publication.controller');
const homeController = require('../Controllers/home.controller');
const userController = require('../Controllers/user.controller');
const cookieMiddleware = require('../Middlewares/cookie.middleware');

router.get('/', homeController.homePage);

router.route('/register')
    .get(userController.register)


    

router.route('/login')
    .get(userController.login)
    .post(userController.login)

router.route('/profile')
    .get(cookieMiddleware.verifyCookie, userController.profile)
    .post(cookieMiddleware.verifyCookie, userController.profile)

router.route('/profile/delete')
    .get(cookieMiddleware.verifyCookie, userController.deleteProfile)
    
router.route('/publication')
    .get(cookieMiddleware.verifyCookie, publicationController.getAllPost)

router.route('/publication/create')
    .get(cookieMiddleware.verifyCookie, publicationController.publishNewPost)
    .post(cookieMiddleware.verifyCookie, publicationController.publishNewPost)


module.exports = router;