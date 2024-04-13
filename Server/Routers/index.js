const router = require('express').Router();
const publicationController = require('../Controllers/publication.controller');
const homeController = require('../Controllers/home.controller');
const userController = require('../Controllers/user.controller');
const cookieMiddleware = require('../Middlewares/cookie.middleware');

router.get('/', homeController.homePage);

router.get('/register', userController.register);

router.get('/login', userController.login);

router.get('/profile', cookieMiddleware.verifyCookie, userController.profile);

//TODO: not done
router.route('/profile/delete')
    .get(cookieMiddleware.verifyCookie, userController.deleteProfile)
    
router.route('/publication')
    .get(cookieMiddleware.verifyCookie, publicationController.getAllPost)

router.route('/publication/create')
    .get(cookieMiddleware.verifyCookie, publicationController.publishNewPost)
    .post(cookieMiddleware.verifyCookie, publicationController.publishNewPost)


module.exports = router;