const DatabaseModule = require('../database/data.module')

export class UserRepositorys {
    find = async (tableName) => {
        try {
            const result = await DatabaseModule.query(`SELECT * FROM "${tableName}"`);
            return result.rows;
        } catch (error) {
            console.error('Error fetching users:', error.message);
            throw error;
        }
    }

    findById = async (tableName, id) => {
        try {
            const result = await DatabaseModule.query(`SELECT * FROM "${tableName}" WHERE id = $1`, [id]);
            return result.rows;
        } catch (error) {
            console.error('Error fetching users:', error.message);
            throw error;
        }
    }

    update = async (tableName, id, data) => {
        try {
            if (!data || Object.keys(data).length === 0) {
                throw new Error('Data to update cannot be empty');
            }

            const keys = Object.keys(data);
            const values = Object.values(data);

            const setQuery = keys.map((key, index) => `"${key}" = $${index + 2}`).join(', ');

            const query = `UPDATE "${tableName}" SET ${setQuery} WHERE id = $1 RETURNING *`;

            const result = await DatabaseModule.query(query, [id, ...values]);
            return result.rows[0];
        } catch (error) {
            console.error('Error updating user:', error.message);
            return "Lỗi Update UserRepositorys";
        }
    }

    save = async (tableName, data) => {
        try {
            if (!data || Object.keys(data).length === 0) {
                throw new Error('Data to create cannot be empty');
            }

            const keys = Object.keys(data);
            const values = Object.values(data);
            const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');

            const query = `INSERT INTO "${tableName}" (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;

            const result = await DatabaseModule.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating user:', error.message);
            throw error;
        }
    }

    delete = async (tableName, id) => {
        try {
            const query = `DELETE FROM "${tableName}" WHERE id = $1 RETURNING *`;
            const result = await DatabaseModule.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error deleting user:', error.message);
            throw error;
        }
    }

}



