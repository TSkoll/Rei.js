const knex = require('knex')((require('../knexfile.js'))['development']);

class dbUtil {
    static async migrate() {
        return new Promise((resolve, reject) => {
            // Make sure we have the latest migrations
            try {
                knex.migrate.latest();
                return resolve();
            } catch (err) {
                return reject(err);
            }
        });
    }

    // Add data to a specific table in the database
    static async addData(table, data) {
        try {
            const row = await knex(table).insert(data);
            return row;
        } catch (err) {
            throw err;
        }
    }

    // Gets specific data from a table in the database
    static async getRows(table, searchPattern) {
        try {
            const data = await knex(table)
            .select()
            .where(searchPattern);

            return data;
        } catch (err) {
            return err;
        }
    }

    // Gets a specific row from a table in the database
    static async getSpecificFromRow(table, select, searchPattern) {
        try {
            const data = await knex(table)
            .select(select)
            .where(searchPattern);

            return data;
        } catch (err) {
            throw err;
        }
    }

    // Update a specific row from a table in the database
    static async updateRow(table, searchPattern, updatedData) {
        try {
            const row = await knex(table)
            .where(searchPattern)
            .update(updatedData);

            return row;
        } catch (err) {
            throw err
        }
    }

    // Check if a row exists in a table
    static async ifRowExists(table, searchPattern) {
        try {
            const rows = await knex(table)
            .select()
            .where(searchPattern);

            return (rows.length > 0) ? true : false;
        } catch (err) {
            throw err;
        }
    }

    static async deleteRows(table, searchPattern) {
        try {
            const rows = await knex(table)
            .where(searchPattern)
            .del();

            return rows;
        } catch (err) {
            throw err;
        }
    }

    static raw(table) {
        return knex(table);
    }
}
module.exports = dbUtil;
