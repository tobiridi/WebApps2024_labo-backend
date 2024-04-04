const sql = require('mssql');
const sqlConfig = require('../Database/database');

const publicationService = {
    getAllPost: async () => {
        try {
            await sql.connect(sqlConfig);

            const result = await sql.query`SELECT * FROM publication;`;
            
            if (result.recordset.length > 0) {
                return {publications: result.recordset};
            }
            return null;

        } catch (error) {
            console.error(error);
        }
    },

    publishNewPost: async (idUser, data) => {
        try {
            const {title, content} = data;

            await sql.connect(sqlConfig);

            const result = await sql.query`INSERT INTO publication (title, content, id_user)
                             VALUES (${title}, ${content}, ${idUser});`;

            if(result.rowsAffected[0] > 0) {
                return result;
            }
            return null;

        } catch (error) {
            console.error(error);
        }
    },

    deletePost: async (id, idUser) => {
        try {
            await sql.connect(sqlConfig);

            const result = await sql.query`DELETE FROM publication WHERE id = ${id} AND id_user = ${idUser};`;

            if(result.rowsAffected[0] > 0) {
                return result;
            }
            return null;

        } catch (error) {
            console.error(error);
        }
    },

    writeCommentary: async (content, idUser, idPublication) => {
        try {
            await sql.connect(sqlConfig);

            const result = await sql.query`INSERT INTO commentary (content, id_user, id_publication)
                             VALUES (${content}, ${idUser}, ${idPublication});`;

            if(result.rowsAffected[0] > 0) {
                return result;
            }
            return null;
        } catch (error) {
            console.error(error);
        }
    },
};

module.exports = publicationService;