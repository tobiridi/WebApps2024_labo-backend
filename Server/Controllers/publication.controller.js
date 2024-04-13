const publicationValidator = require('../Validators/publication.validator');
const authMiddleware = require('../Middlewares/auth.middleware');
//const { callAPI } = require("../Utils/callAPI");
const cookieMiddleware = require("../Middlewares/cookie.middleware");

const publicationController = {
    getAllPost : async (req, res, next) => {
        console.log(`[${req.path} - ${req.method}]`);
        try {
            const {id_publication} = req.query;
            
            //if delete publication
            if (id_publication) {
                const { id_publication } = await publicationValidator.delete.validate(req.query);

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `${req.cookies.access_token}`
                };

                //const apiResponse = await callAPI(`/publication/${id_publication}`, 'DELETE', null, headers);

                if (apiResponse.status === 204) {
                    return res.redirect('/publication');
                }
            }
            else {
                const payload = authMiddleware.getTokenPayload(req.cookies.access_token);

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `${req.cookies.access_token}`
                };

                //const apiResponse = await callAPI('/publication', 'GET', null, headers);

                if (apiResponse.data) {
                    res.render('publication', { publications: apiResponse.data.publications, idUserOwner: payload.id_user });
                }
                else {
                    res.render('publication', { publications: [] });
                }
            }

        } catch (error) {
            console.error(error);
            res.redirect('/');
        }
    },

    publishNewPost : async (req, res, next) => {
        console.log(`[${req.path} - ${req.method}]`);
        if (req.method === 'GET') {
            res.render('publicationCreation', {});
        }
        else if (req.method === 'POST') {
            try {
                //validate form data
                const validData = await publicationValidator.creation.validate(req.body);

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `${req.cookies.access_token}`
                };

                //const apiResponse = await callAPI('/publication', 'POST', validData, headers);

                if (apiResponse) {
                    res.render('publicationCreation', { message: `Création de la publication réussi` });
                }
                else {
                    res.render('publicationCreation', { message: `Erreur lors de la creation de la publication` });
                }
                
            } catch (error) {
                console.error(error);
                res.redirect('/');
            }
        }
    },

    writeCommentary : async (req, res, next) => {
        console.log(`[${req.path} - ${req.method}]`);
        res.send('controller in development');
    },
};


module.exports = publicationController;