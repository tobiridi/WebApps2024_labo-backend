const publicationValidator = require('../Validators/publication.validator');
const authMiddleware = require('../Middlewares/auth.middleware');
const { callAPI } = require("../Utils/callAPI");
const cookieMiddleware = require("../Middlewares/cookie.middleware");

const publicationController = {
    getAllPost : (req, res, next) => {
        console.log(`[${req.path} - ${req.method}]`);
        try {
            const {id_publication} = req.query;
            
            //if delete publication
            //attempt to delete, verify owner in DB
            if (id_publication) {
                (async () => {
                    const { id_publication } = await publicationValidator.delete.validate(req.query);

                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `${req.cookies.access_token}`
                    };

                    const apiResponse = await callAPI(`/publication/${id_publication}`, 'DELETE', null, headers);

                    if (apiResponse.status === 204) {
                        return res.redirect('/publication');
                    }

                })();
            }
            else {
                (async () => {
                    const payload = authMiddleware.getTokenPayload(req.cookies.access_token);
                    const apiResponse = await callAPI('/publication', 'GET');

                    if (apiResponse.data) {
                        res.render('publication', { publications: apiResponse.data.publications, idUserOwner: payload.id_user });
                    }
                    else {
                        res.render('publication', { publications: [] });
                    }
                })();
            }

        } catch (error) {
            console.error(error);
            res.redirect('/');
        }
    },

    publishNewPost : (req, res, next) => {
        console.log(`[${req.path} - ${req.method}]`);
        if (req.method === 'GET') {
            res.render('publicationCreation', {});
        }
        else if (req.method === 'POST') {
            try {
                (async () => {
                    //validate form data
                    const validData = await publicationValidator.creation.validate(req.body);

                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `${req.cookies.access_token}`
                    };

                    const apiResponse = await callAPI('/publication', 'POST', validData, headers);

                    if(apiResponse) {
                        res.render('publicationCreation', {message: `Création de la publication réussi`});
                    }
                    else {
                        res.render('publicationCreation', {message: `Erreur lors de la creation de la publication`});
                    }
                })();
                
            } catch (error) {
                console.error(error);
                res.redirect('/');
            }
        }
    },

    writeCommentary : (req, res, next) => {
        console.log(`[${req.path} - ${req.method}]`);
        res.send('controller in development');
    },
};


module.exports = publicationController;