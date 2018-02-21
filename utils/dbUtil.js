const knex = require('knex')((require('../knexfile.js'))['development']);

class dbUtil {
    static async migrate() {
        return new Promise(async (resolve, reject) => {
            // Make sure we have the latest migrations
            knex.migrate.latest();
        });
    }

    // Add data to a specific table in the database
    static async addData(table, data) {
        return new Promise(async (resolve, reject) => {
            try {
                let row = await knex(table).insert(data);
                resolve(row);
            } catch (err) {
                reject(err);
            }
        });
    }

    // Gets specific data from a table in the database
    static async getRow(table, searchPattern) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await knex(table)
                .select()
                .where(searchPattern);

                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
    }

    // Gets a specific row from a table in the database
    static async getSpecificFromRow(table, select, searchPattern) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await knex(table)
                .select(select)
                .where(searchPattern);

                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
    }

    // Update a specific row from a table in the database
    static async updateRow(table, searchPattern, updatedData) {
        return new Promise(async (resolve, reject) => {
            try {
                let row = await knex(table)
                .where(searchPattern)
                .update(updatedData);

                resolve(row);
            } catch (err) {
                reject(err);
            }
        });
    }

    // Check if a row exists in a table
    static async ifRowExists(table, searchPattern) {
        return new Promise(async (resolve, reject) => {
            try {
                let rows = await knex(table)
                .select()
                .where(searchPattern);
    
                resolve(((rows.length > 0) ? true : false));
            } catch (err) {
                reject(err);
            }
        });
    }

    static async deleteRows(table, searchPattern) {
        return new Promise(async (resolve, reject) => {
            try {
                let rows = await knex(table)
                .where(searchPattern)
                .del();

                resolve(rows);
            } catch (err) {
                reject(err);
            }
        });
    }
}
module.exports = dbUtil;
