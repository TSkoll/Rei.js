const knex = require('knex')((require('../knexfile.js'))['development']);

class dbUtil {
    static async migrate() {
        return new Promise(async (resolve, reject) => {
            // Make sure we have the latest migrations
            knex.migrate.latest();
        });
    }

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

    static async ifRowExists(table, searchPattern) {
        return new Promise(async (resolve, reject) => {
            try {
                let rows = await knex(table)
                .select()
                .where(searchPattern);
    
                resolve(((rows.length > 0) ? true : false));
            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }
}
module.exports = dbUtil;