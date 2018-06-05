
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('colorhistory', table => {
            table.increments('id'),
            table.string('userid'),
            table.string('color')
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('colorHistory')
    ]);
};
