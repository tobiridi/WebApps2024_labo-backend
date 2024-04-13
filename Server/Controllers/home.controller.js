const homeController = {
    homePage: async (req, res, next) => {
        console.log(`[${req.path} - ${req.method}]`);
        res.render('home', {});
    }
}

module.exports = homeController;