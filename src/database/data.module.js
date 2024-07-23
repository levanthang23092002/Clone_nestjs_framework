// modules/database.module.js
const { Pool } = require('pg');
const { Module }= require('../decorator/common.decorator');
require('dotenv').config()


@Module({})
class DatabaseModule {
    static config = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
    };

    static pool; 

    static initialize() {
        this.pool = new Pool(this.config); 
        console.log('Database connected successfully');
    }

    static query(text, params) {
        if (!this.pool) {
            throw new Error('Database connection is not initialized. Call initialize() first.');
        }
        return this.pool.query(text, params); // Use this.pool to access static pool
    }

    static getConnection() {
        if (!this.pool) {
            throw new Error('Database connection is not initialized. Call initialize() first.');
        }
        return this.pool;
    }
}

module.exports = DatabaseModule;
