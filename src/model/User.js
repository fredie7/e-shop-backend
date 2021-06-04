import db from '../db';
import logger from '../services/logger';

class User {
    async create(data) {
        const createQuery = `INSERT INTO users ("name", "email", "password", "isAdmin")
         VALUES($1, $2, $3, $4)
         returning*`;
        
        const values = [
            data.name,
            data.email,
            data.password,
            data.isAdmin,
        ];

        
        try {
            const { rows } = await db.query(createQuery, values);
            return rows[0]
        } catch (error) {
            logger.info(error);
            return error;
        }
    }

    async getById(id) {
        const createQuery = `SELECT * FROM users WHERE id=$1`;
        try {
            const { rows } = await db.query(createQuery, [id])
            return rows[0]
        } catch (error) {
            logger.info(error)
            return error
        }
    }

    async getByField(field, value) {
        const text = `SELECT * FROM users WHERE ${field} = $1`;
        try {
            const { rows } = await db.query(text, [value]);
            console.log(rows)
          return rows[0];
        } catch (error) {
          return error;
        }
    }
}

export default new User();
            