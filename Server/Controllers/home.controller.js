const homeController = {
    homePage: (req, res, next) => {
        res.render('home', {});
    }
}

module.exports = homeController;