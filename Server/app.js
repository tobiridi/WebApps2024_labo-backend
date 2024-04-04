const express = require('express');
const router = require('./Routers/index');
const apiRouter = require('./Routers/api.router');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const app = express();

//config server
app.set('view engine', 'ejs');
app.set('views', './Views');

//middlewares
app.use(express.static(`Public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//secure headers
app.use(helmet());
//use cookie parser, manage cookies
app.use(cookieParser());
//TODO: add cors and helmet for security
//cors

//routing
app.use('/api/v1', apiRouter);
app.use('/', router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
