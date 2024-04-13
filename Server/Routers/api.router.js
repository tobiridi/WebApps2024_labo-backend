const apiRouter = require('express').Router();
const apiPublicationRouter = require('./apiPublication.router');
const apiUserRouter = require('./apiUser.router');

apiRouter.use(`/user`, apiUserRouter);
apiRouter.use(`/publication`, apiPublicationRouter);

module.exports = apiRouter;