import db from '../db';
import logger from '../services/logger';

class Product {
    async create(data) {
        const createProduct = `INSERT INTO products (
            "title",
            "price",
            "description",
            "quantity",
            "status",
            "count",
            "producedBy",
        )
        VALUES($1,$2,$3,$4,$5,$6,$7)
        returning *`;
        const values = [
            data.title,
            data.price,
            data.description,
            data.quantity,
            data.status,
            data.count,
            data.producedBy,
        ]
        try {
            const { rows } = await db.query(createProduct, values)
            return rows[0]
        } catch (error) {
            return error
        }
    }

    async getById(id) {
        const text = `SELECT * FROM products WHERE id = $1`;
        try {
            const {rows} = await db.query(text, [id]);
            return rows[0];
        } catch (error) {
            logger.info(error)
            return error
        }
    }
    
    async getByField(field, value) {
        const text = `SELECT * FROM products WHERE "${field}" = $1`;
        try {
            const {rows} = await db.query(text, [value]);
            return rows[0];
        } catch (error) {
            logger.info(error)
            return error
        }
    }

    async getAllProducts() {
        const text = `SELECT * FROM products`;
        try {
            const {rows} = await db.query(text);
            return rows[0];
        } catch (error) {
            logger.info(error)
            return error
        }
    }
}

export default new Product();