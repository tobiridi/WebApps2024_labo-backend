const sql = require('mssql');
const sqlConfig = require('../Database/database');

const userService = {
    register : async (data) => {
        try {
            const { email, hashedPassword, firstname, lastname, profile_img } = data;

            await sql.connect(sqlConfig);

            const result = await sql.query`INSERT INTO social_user (email, password, firstname, lastname, profile_img)
                             VALUES (${email}, ${hashedPassword}, ${firstname}, ${lastname}, null);`;

            if(result.rowsAffected[0] > 0) {
                return result;
            }
            return null;

        } catch (error) {
            console.error(error);
        }
    },

    login: async (email) => {
        try {
            await sql.connect(sqlConfig);
    
            const result = await sql.query`SELECT id, email, password FROM social_user WHERE email = ${email};`;

            if(result.recordset.length > 0) {
                return result.recordset[0];
            }
            return null;

        } catch (error) {
            console.error(error);
        }
    },

    getUser : async (idUser) => {
        try {
            await sql.connect(sqlConfig);
    
            const result = await sql.query`SELECT su.email, su.firstname, su.lastname, su.createAt, su.last_update,
                fu.id_followed, pu.createAt AS [pu_createAt], pu.title, pu.content
                FROM social_user su
                LEFT JOIN publication pu ON su.id = pu.id_user
                LEFT JOIN follow_user fu ON su.id = fu.id_follower
                WHERE su.id = ${idUser};`;

            if(result.recordset.length > 0) {
                const user = result.recordset[0];
                const following = result.recordset.map((value) => ({idFollowed: value.id_followed}));
                const publications = result.recordset.map((value) => ({title: value.title, content: value.content, createAt: value.pu_createAt}));
    
                // console.log(user);
                // console.log(following);
                // console.log(publications);

                //return result.recordset;
                return {user, following, publications};
            }
            return null;

        } catch (error) {
            console.error(error);
        }
    },

    updateProfile : async (id, data) => {
        try {
            const { firstname, lastname, profile_img } = data;
            //TODO: optimize
            //insert only not undefined properties
            // const dataFilter = Object.entries(data).filter(([key, value]) => typeof value !== 'undefined' );
            // //console.log(Object.keys(dataFilter));
            // const insertQuery = dataFilter.map(([key, value]) =>`${key} = ${value}`).join(', ');
            // //console.log(insertQuery);

            await sql.connect(sqlConfig);
    
            const result = await sql.query`UPDATE social_user SET firstname = ${firstname}, lastname = ${lastname} WHERE id = ${id};`

            if(result.rowsAffected[0] > 0) {
                return result;
            }
            return null;
    
        } catch (error) {
            console.error(error);
        }
    },

    deleteProfile : async (id) => {
        try {
            await sql.connect(sqlConfig);
    
            const result = await sql.query`DELETE FROM social_user WHERE id = ${id};`;
    
            if(result.rowsAffected[0] > 0) {
                return result;
            }
            return null;
            
        } catch (error) {
            console.error(error);
        }
    },

    followUser : async (idUserFollower, idUserFollowed) => {
        try {
            await sql.connect(sqlConfig);
    
            const result = await sql.query`INSERT INTO follow_user (id_follower, id_followed) VALUES (${idUserFollower}, ${idUserFollowed});`;
    
            if(result.rowsAffected[0] > 0) {
                return result;
            }
            return null;

        } catch (error) {
            console.error(error);
        }
    },
};

module.exports = userService;